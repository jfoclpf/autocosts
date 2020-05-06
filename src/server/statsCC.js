const path = require('path')
const url = require(path.join(__dirname, 'url')) // own project module

module.exports = function (req, res, serverData, words) {
  var CC = req.params.CC
  var data = {}

  data.isCostsTable = true

  data.serverData = serverData
  delete data.serverData.availableCountries.XX

  data.words = words
  data.statsData = serverData.statsData[CC]

  data.CC = data.words.CC = req.params.CC
  data.countryName = serverData.availableCountries[CC]

  data.domain = serverData.domains.countries[CC]
  data.availableCountries = serverData.availableCountries

  // information depending on this request from the client
  var pageData = {
    /* check https://github.com/jfoclpf/autocosts/wiki/URL-parts-terminology */
    url: {
      href: url.getHref(req), // full url, ex: "https://autocosts.info/PT"
      origin: url.getOrigin(req), // basic url, ex: "https://autocosts.info"
      protocol: url.getProtocol(req) // `http:` or `https:`
    },
    languageCode: 'en', // this page of World Statistics of car, renders only in English
    isThisATest: url.isThisATest(req), // boolean variable regarding if present request is a test
    notLocalhost: !url.isThisLocalhost(req) // boolean variable regarding if present request is from localhost
  }
  data.pageData = pageData
  data.pageData.CC = req.params.CC

  data.layout = 'main'

  res.render('statsCC', data)
}