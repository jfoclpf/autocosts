// server side code to render url /domains

const path = require('path')
const url = require(path.join(__dirname, 'url'))
const debug = require('debug')('app:domains')

module.exports = function (req, res, serverData, WORDS) {
  var data = {}
  data.WORDS = JSON.parse(JSON.stringify(WORDS)) // clone object
  delete data.WORDS.XX

  var storedDomains = JSON.parse(JSON.stringify(serverData.urls)) // clone object
  var domainsCountries = storedDomains.countries
  delete domainsCountries.XX
  debug(domainsCountries)

  var domains = {}
  // array serverData.urls.uniqueArrayOfCanonicalHostname has unique elements, i.e. an array without repeated elements
  for (var i = 0; i < serverData.urls.uniqueArrayOfCanonicalHostname.length; i++) {
    var domain = serverData.urls.uniqueArrayOfCanonicalHostname[i]
    domains[domain] = {} // creates an empty entry

    // get the domains that exist for a particular domain
    // i.e. which countries have, for example the "autocosts.info" as associated domain
    var domainsCC = getCCforDomain(domainsCountries, domain)

    domains[domain].nbrItems = domainsCC.length

    if (domainsCC.length === 1) {
      domains[domain].singular = true
    } else {
      domains[domain].singular = false
    }

    domains[domain].countries = {} // creates an empty entry
    for (var j = 0; j < domainsCC.length; j++) {
      var CC = domainsCC[j]
      var country = serverData.availableCountries[CC]

      // the "first" detects the first element to render correctly the table in handlebars
      // regarding the first line <td rowspan="x">
      var first = (j === 0)

      req.params.cc = CC
      var urlHref = url.getValidURL(req, storedDomains)

      var Obj = {
        country: country,
        first: first,
        urlHref: urlHref
      }
      domains[domain].countries[CC] = Obj
    }
  }
  debug(domains)
  data.domains = domains

  data.layout = false

  res.render('domains', data)
}

// get array of countries codes (CC) having a specific domain
function getCCforDomain (domainsCountries, domain) {
  var domainsCC = []
  for (var CC in domainsCountries) {
    if (domainsCountries[CC] === domain) {
      domainsCC.push(CC)
    }
  }
  return domainsCC
}
