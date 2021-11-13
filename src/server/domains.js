// server side code to render url /domains

/* jslint node: true */

'use strict'

const path = require('path')
const url = require(path.join(__dirname, 'url'))
const debug = require('debug')('app:domains')

module.exports = function (req, res, serverData, WORDS) {
  const data = {}
  data.WORDS = JSON.parse(JSON.stringify(WORDS)) // clone object
  delete data.WORDS.XX

  const storedDomains = JSON.parse(JSON.stringify(serverData.urls)) // clone object
  const domainsCountries = storedDomains.canonicalHostname
  delete domainsCountries.XX
  debug(domainsCountries)

  const domains = {}
  // array serverData.urls.uniqueArrayOfCanonicalHostname has unique elements, i.e. an array without repeated elements
  for (let i = 0; i < serverData.urls.uniqueArrayOfCanonicalHostname.length; i++) {
    const domain = serverData.urls.uniqueArrayOfCanonicalHostname[i]
    domains[domain] = {} // creates an empty entry

    // get the domains that exist for a particular domain
    // i.e. which countries have, for example the "autocosts.info" as associated domain
    const domainsCC = getCCforDomain(domainsCountries, domain)

    domains[domain].nbrItems = domainsCC.length

    if (domainsCC.length === 1) {
      domains[domain].singular = true
    } else {
      domains[domain].singular = false
    }

    domains[domain].countries = {} // creates an empty entry
    for (let j = 0; j < domainsCC.length; j++) {
      const CC = domainsCC[j]
      const country = serverData.availableCountries[CC]

      // the "first" detects the first element to render correctly the table in handlebars
      // regarding the first line <td rowspan="x">
      const first = (j === 0)

      req.params.cc = CC
      const urlHref = url.getValidURL(req, storedDomains)

      const Obj = {
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
  const domainsCC = []
  for (const CC in domainsCountries) {
    if (domainsCountries[CC] === domain) {
      domainsCC.push(CC)
    }
  }
  return domainsCC
}
