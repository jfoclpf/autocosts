const path = require('path')
const url = require(path.join(__dirname, 'url'))
const commons = require(path.join(__dirname, '..', '..', 'commons'))
const debug = require('debug')('app:sitemap') // run "DEBUG=app:sitemap node server.js"

module.exports = function (req, res, serverData) {
  var data = {}

  var domains = serverData.domains
  var languagesCountries = serverData.languagesCountries

  var sitemapData = {}
  for (const CC in domains.countries) {
    sitemapData[CC] = {}
    sitemapData[CC].host = domains.countries[CC]
    sitemapData[CC].urlPath = domains.urlPath[CC]
    sitemapData[CC].lang = languagesCountries[CC].substr(0, 2)
  }
  delete sitemapData.XX
  debug('\n\nsitemapData:'); debug(sitemapData)

  data.sitemapData = sitemapData
  data.sitemapData2 = JSON.parse(JSON.stringify(sitemapData)) // clone object

  // function that gets an Object associating a language with a country/domain
  var twoLetterLang = getUniqueLangObj(serverData)
  data.twoLetterLang = twoLetterLang
  debug('\n\ntwoLetterLang:'); debug(twoLetterLang)

  data.HTTP_Protocol = url.getProtocol(req)

  data.layout = false

  res.header('Content-Type', 'application/xml')
  res.render('sitemap', data)
}

// function that gets an Object associating a language with a country/domain
function getUniqueLangObj (serverData) {
  var languagesCountries = JSON.parse(JSON.stringify(serverData.languagesCountries)) // clone object
  delete languagesCountries.XX

  // gets an array of unique, Languages => [en, en-ES, es, pt-BR, pt-PT, it, etc.]
  var uniqueLangsTemp = commons.getUniqueArray(languagesCountries) // get unique Array from Object

  // gets just the 2 letters of language code, i.e. the 2 first letters
  // therefore gest a unique array, of non-specific-country, Languages
  //= > [en, es, pt, it, hu, etc.]
  var i
  for (i = 0; i < uniqueLangsTemp.length; i++) {
    if (uniqueLangsTemp[i].length > 2) {
      uniqueLangsTemp[i] = uniqueLangsTemp[i].substr(0, 2)
    }
  }
  var uniqueLangs = commons.getUniqueArray(uniqueLangsTemp) // removes duplicates

  // creates Object associating a Language to a single Country and domain
  var twoLetterLang = {}
  for (i = 0; i < uniqueLangs.length; i++) {
    var langCode = uniqueLangs[i]
    // because there are many countries whose language is English
    // it choses UK as default country for English
    if (langCode === 'en') {
      twoLetterLang.UK = {}
      twoLetterLang.UK.langCode = langCode
      twoLetterLang.UK.domain = serverData.domains.countries.UK
      twoLetterLang.UK.urlPath = serverData.domains.urlPath.UK
    } else {
      var CC = commons.getKeyByValue(languagesCountries, langCode)
      if (CC) {
        twoLetterLang[CC] = {}
        twoLetterLang[CC].langCode = langCode
        twoLetterLang[CC].domain = serverData.domains.countries[CC]
        twoLetterLang[CC].urlPath = serverData.domains.urlPath[CC]
      }
    }
  }

  return twoLetterLang
}
