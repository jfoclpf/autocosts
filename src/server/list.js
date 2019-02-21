const path = require('path')
const url = require(path.join(__dirname, 'url')) // own project module

module.exports = function (req, res, serverData, words) {
  var data = {}

  data.isList = true

  data.wordsMatrix = JSON.parse(JSON.stringify(words)) // clone object
  delete data.wordsMatrix.XX

  data.words = data.wordsMatrix.UK

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

  data.layout = false

  var fileToRender = path.join(serverData.directories.index, 'views', 'list.hbs')
  res.render(fileToRender, data)
}
