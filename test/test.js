/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

const fs = require('fs')
const path = require('path')
const _cliProgress = require('cli-progress')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
const fileNames = commons.getFileNames()

const statsFunctions = require(fileNames.build.statsFunctions)
const transferData = require(fileNames.project['transferData.js'])
const calculator = require(fileNames.project['calculator.js'])

// create a new progress bar instance and use shades_classic theme
const progressBar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)

var parseJsonProperty = function (key, value) {
  return !isNaN(value) ? parseFloat(value) : value
}

var _countrySpecs = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'country_specs.json'), 'utf8'),
  parseJsonProperty)

// build a more code friendly Object
var countrySpecs = {}
for (let item of Object.keys(_countrySpecs)) {
  countrySpecs[_countrySpecs[item].Country] = _countrySpecs[item]
}

/* countrySpecs is now like this:
  ...
  UK:
   { Country: 'UK',
     currency: 'GBP',
     distance_std: '2',
     fuel_efficiency_std: '3',
     fuel_price_volume_std: '1' },
  US:
   { Country: 'US',
     currency: 'USD',
     distance_std: '2',
     fuel_efficiency_std: '4',
     fuel_price_volume_std: '3' }
  ...
*/

// reads user inputs from the calculator form and inserts them on the core calculator function
fs.readFile(path.join(__dirname, 'users_insertions.json'), 'utf8', function (err, data) {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  var usersInput = JSON.parse(data, parseJsonProperty)
  var numberofInputs = usersInput.length

  progressBar.start(numberofInputs, 0)

  for (let i = 0; i < numberofInputs; i++) {
    progressBar.update(i)

    try {
      let CC = usersInput[i].country // ISO Country Code

      if (CC) {
        var countryObject = {
          code: CC,
          currency: countrySpecs[CC].currency,
          distance_std: countrySpecs[CC].distance_std,
          fuel_efficiency_std: countrySpecs[CC].fuel_efficiency_std,
          fuel_price_volume_std: countrySpecs[CC].fuel_price_volume_std
        }

        if (statsFunctions.isUserDataEntryOk(usersInput[i], countryObject)) {
          var structuredUserInput = transferData.createUserDataObjectFromDB(usersInput[i])
          var calculatedData = calculator.calculateCosts(structuredUserInput, countryObject)
        }
      }
    } catch (err) {
      console.error(err)
      console.error('\n\ni:' + i, '\n',
        '\n\ncountryObject: ', countryObject,
        '\n\nusersInput: ', usersInput[i],
        '\n\nstructuredUserInput: ', JSON.stringify(structuredUserInput, undefined, 2),
        '\n\ncalculatedData: ', JSON.stringify(calculatedData, undefined, 2))

      process.exit(1)
    }
  }

  progressBar.stop()
  process.exit(0) // exit with no error
})
