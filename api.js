const path = require('path')
const commons = require(path.join(__dirname, 'commons'))
commons.init()

const fileNames = commons.getFileNames()
const calculator = require(fileNames.project['calculator.js'])
calculator.initialize()

module.exports = {
  calculate: function (userData) {
    return calculator.calculateCosts(userData)
  }
}
