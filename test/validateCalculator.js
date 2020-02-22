const fs = require('fs')
const path = require('path')
const async = require('async')
const extractZip = require('extract-zip')
const ProgressBar = require('progress')
const colors = require('colors')
const debug = require('debug')('test:test')

// commons
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')
colors.setTheme(commons.getConsoleColors())
const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

console.log('building a clean copy from src/ to bin/ minifying core calculator JS files')
// no need here to set release to test because it was done with "commons.setRelease('test')"
commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-cm'], 'ignore')

const convertData = require(fileNames.project['convertData.js'])
const validateData = require(fileNames.project['validateData.js'])
const calculator = require(fileNames.project['calculator.js'])
convertData.initialize()
validateData.initialize()
calculator.initialize()

// file which is zip compressed on the repo, and it's used for testing the core calculator
var userInsertionsZipFile = path.join(__dirname, 'users_insertions.json.zip')
var userInsertionsFile = path.join(__dirname, 'users_insertions.json')

var countrySpecs = {}

console.log('Testing core calculator function with thousands of inputs...')
debug('Inserting thousands of user inputs from ' +
  path.relative(directories.server.root, userInsertionsFile) +
  ' into the core calculator function. Progress bar...\n')

async.series([
  // read country_specs info from file
  function (callback) {
    var _countrySpecs = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'country_specs.json'), 'utf8'),
      commons.parseJsonProperty)

    // build a more code friendly Object
    for (const item of Object.keys(_countrySpecs)) {
      countrySpecs[_countrySpecs[item].Country] = _countrySpecs[item]
    }
    debug(countrySpecs)
    callback()
  },
  // unzip JSON file with user insertions
  function (callback) {
    extractZip(userInsertionsZipFile, { dir: __dirname }, function (errOnUnzip) {
      if (errOnUnzip) {
        callback(Error('Error unziping file ' + userInsertionsZipFile + '. ' + errOnUnzip.message))
      } else {
        callback()
      }
    })
  },
  // test main calculator function
  function (callback) {
    // here the file was unzip successfully, the zip extractor removes the extension .zip
    fs.readFile(userInsertionsFile, 'utf8', function (err, data) {
      if (err) {
        callback(Error('Error reading file ' + userInsertionsFile + '. ' + err.message))
        return
      }

      var usersInput = JSON.parse(data, commons.parseJsonProperty)
      var numberofInputs = usersInput.length

      var Bar = new ProgressBar('[:bar] :percent',
        { total: numberofInputs, width: 80 }
      )

      for (let i = 0; i < numberofInputs; i++) {
        let countryInfo, userData, calculatedData
        Bar.tick()

        try {
          const CC = usersInput[i].country // ISO Country Code

          if (CC) {
            countryInfo = {
              code: CC,
              currency: countrySpecs[CC].currency,
              distance_std: countrySpecs[CC].distance_std,
              fuel_efficiency_std: countrySpecs[CC].fuel_efficiency_std,
              fuel_price_volume_std: countrySpecs[CC].fuel_price_volume_std
            }

            userData = convertData.createUserDataObjectFromDatabase(usersInput[i], countryInfo)
            validateData.setUserData(userData)
            const isUserDataEntryOk = validateData.isUserDataFormPart1_Ok() && validateData.isUserDataFormPart2_Ok()

            if (isUserDataEntryOk) {
              calculatedData = calculator.calculateCosts(userData)
            }
          }
        } catch (error) {
          console.error('\n\nError on i:' + i, '\n',
            '\n\ncountryObject: ', countryInfo,
            '\n\nusersInput: ', usersInput[i],
            '\n\nuserData: ', JSON.stringify(userData, undefined, 2),
            '\n\ncalculatedData: ', JSON.stringify(calculatedData, undefined, 2))

          callback(Error(error))
        }
      }

      Bar.terminate()
      callback()
    })
  },
  // remove unziped file
  function (callback) {
    fs.unlinkSync(userInsertionsFile)
    callback()
  }
],
// after all the series task are done
function (error) {
  if (error) {
    console.error(Error(error))
    process.exitCode = 1 // wxit with error
  } else {
    console.log('Calculator core funciton tested OK\n'.green)
    process.exitCode = 0 // wxit with success
  }
})
