/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*
  This script inserts thousands of user inputs stored on test/users_insertions.json into the core calculator function
  and checks JS files syntax using jshint, and checks also standard rules using standardJS
  on all the .js files stored in directory /src
*/

const fs = require('fs')
const path = require('path')
const async = require('async')
const extractZip = require('extract-zip')
const ProgressBar = require('progress')
// const { execSync } = require('child_process')
const debug = require('debug')('test:test')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')
const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

const convertData = require(fileNames.project['convertData.js'])
const validateData = require(fileNames.project['validateData.js'])
const calculator = require(fileNames.project['calculator.js'])
convertData.initialize()
validateData.initialize()
calculator.initialize()

testCalculatorFunction(function () {
  // no need here to set release to test because it was done with "commons.setRelease('test')"
  commons.runNodeScriptSync(path.join(directories.server.root, 'test/validateJs.js'))
  commons.runNodeScriptSync(path.join(directories.server.root, 'test/validateHtml.js'))
  commons.runNodeScriptSync(path.join(directories.server.root, 'test/validateHtmlW3C.js'))
  commons.runNodeScriptSync(path.join(directories.server.root, 'test/validateCss.js'))
  commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-A'])

  console.log('All tests ran successfully'.green)
  process.exit(0)
})

// eof main script

function testCalculatorFunction (mainCallback) {
  console.log('building a clean copy from src/ to bin/ without minifying files')
  // no need here to set release to test because it was done with "commons.setRelease('test')"
  commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-c'], 'ignore')

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
        parseJsonProperty)

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

        var usersInput = JSON.parse(data, parseJsonProperty)
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
      process.exit(1)
    } else {
      mainCallback()
    }
  })
}

// to be used by JSON.parse
// if json property is a number within a String (!isNaN) convert its type to Number
function parseJsonProperty (key, value) {
  return !isNaN(value) ? parseFloat(value) : value
}
