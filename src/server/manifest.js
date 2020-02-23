const path = require('path')
const url = require(path.join(__dirname, 'url'))
// const commons = require(path.join(__dirname, '..', '..', 'commons'))

module.exports = function (req, res, next, serverData, WORDS) {
  var CC = req.params.CC.toUpperCase() // ISO 2 letter Country Code

  if (url.isCCinCountriesList(CC, serverData.availableCountries) || CC === 'XX') {
    var data = {}
    data.CC = CC

    data.words = JSON.parse(JSON.stringify(WORDS[CC])) // clone object
    delete data.words.XX

    data.short_name = data.words.domain.split('.')[0]

    data.layout = false

    res.header('Content-Type', 'application/json')
    res.render('manifest', data)
  } else {
    next()
  }
}
