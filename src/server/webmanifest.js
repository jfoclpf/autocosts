/* jslint node: true */

'use strict'

const path = require('path')
const url = require(path.join(__dirname, 'url'))
// const commons = require(path.join(__dirname, '..', '..', 'commons'))

module.exports = function (req, res, next, serverData, WORDS) {
  const CC = req.params.cc.toUpperCase() // ISO 2 letter Country Code

  if (url.isCCinCountriesList(CC, serverData.availableCountries) || CC === 'XX') {
    const data = {}
    data.CC = CC

    data.words = JSON.parse(JSON.stringify(WORDS[CC])) // clone object
    delete data.words.XX

    data.short_name = data.words.domain.split('.')[0]

    data.layout = false

    res.header('Content-Type', 'application/manifest+json')
    res.render('webmanifest', data)
  } else {
    next()
  }
}
