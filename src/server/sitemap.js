/* jslint node: true */

'use strict'

const path = require('path')
const url = require(path.join(__dirname, 'url'))
const commons = require(path.join(__dirname, '..', '..', 'commons'))
const debug = require('debug')('app:sitemap') // run "DEBUG=app:sitemap node server.js"

module.exports = function (req, res, serverData) {
  const data = {}

  const urls = serverData.urls
  const languagesCountries = serverData.languagesCountries

  const sitemapData = {}
  for (const CC in urls.canonicalHostname) {
    sitemapData[CC] = {}
    sitemapData[CC].host = urls.canonicalHostname[CC]
    sitemapData[CC].canonicalPathname = urls.canonicalPathname[CC]
    sitemapData[CC].lang = languagesCountries[CC].substr(0, 2)
  }
  delete sitemapData.XX
  debug('\n\nsitemapData:'); debug(sitemapData)

  data.sitemapData = sitemapData
  data.sitemapData2 = JSON.parse(JSON.stringify(sitemapData)) // clone object

  // function that gets an Object associating a language with a country/domain
  const twoLetterLang = getUniqueLangObj(serverData)
  data.twoLetterLang = twoLetterLang
  debug('\n\ntwoLetterLang:'); debug(twoLetterLang)

  // stats web pages
  data.canonicalStatsUrl = serverData.urls.canonicalStatsUrl
  delete data.canonicalStatsUrl.XX

  data.HTTP_Protocol = url.getProtocol(req)

  data.layout = false

  res.header('Content-Type', 'application/xml')
  res.render('sitemap', data)
}

// function that gets an Object associating a language with a country/domain
function getUniqueLangObj (serverData) {
  const languagesCountries = JSON.parse(JSON.stringify(serverData.languagesCountries)) // clone object
  delete languagesCountries.XX

  // gets an array of unique, Languages => [en, en-ES, es, pt-BR, pt-PT, it, etc.]
  const uniqueLangsTemp = commons.getUniqueArray(languagesCountries) // get unique Array from Object

  // gets just the 2 letters of language code, i.e. the 2 first letters
  // therefore gest a unique array, of non-specific-country, Languages
  //= > [en, es, pt, it, hu, etc.]
  let i
  for (i = 0; i < uniqueLangsTemp.length; i++) {
    if (uniqueLangsTemp[i].length > 2) {
      uniqueLangsTemp[i] = uniqueLangsTemp[i].substr(0, 2)
    }
  }
  const uniqueLangs = commons.getUniqueArray(uniqueLangsTemp) // removes duplicates

  // creates Object associating a Language to a single Country and domain
  const twoLetterLang = {}
  for (i = 0; i < uniqueLangs.length; i++) {
    const langCode = uniqueLangs[i]
    // because there are many countries whose language is English
    // it choses UK as default country for English
    if (langCode === 'en') {
      twoLetterLang.UK = {}
      twoLetterLang.UK.langCode = langCode
      twoLetterLang.UK.domain = serverData.urls.canonicalHostname.UK
      twoLetterLang.UK.canonicalPathname = serverData.urls.canonicalPathname.UK
    } else {
      const CC = commons.getKeyByValue(languagesCountries, langCode)
      if (CC) {
        twoLetterLang[CC] = {}
        twoLetterLang[CC].langCode = langCode
        twoLetterLang[CC].domain = serverData.urls.canonicalHostname[CC]
        twoLetterLang[CC].canonicalPathname = serverData.urls.canonicalPathname[CC]
      }
    }
  }

  return twoLetterLang
}
