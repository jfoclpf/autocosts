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
const walk = require('walk')
const async = require('async')
const jshint = require('jshint').JSHINT
const prettyjson = require('prettyjson')
const standard = require('standard')
const _cliProgress = require('cli-progress')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

const statsFunctions = require(fileNames.build.statsFunctions)
const transferData = require(fileNames.project['transferData.js'])
const calculator = require(fileNames.project['calculator.js'])

// create a new progress bar instance and use shades_classic theme
const progressBar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)

// if json property is a number within a String (!isNaN) convert its type to Number
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

var stepCounter = 0
console.log()

async.parallel([
  testCalculatorFunction,
  checkJsCodeSyntax,
  checkJsCodeStandard
], function (err, results) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  for (let i = 0; i < results.length; i++) {
    if (results[i]) {
      process.exit(1) // exit test with error
    }
  }
  process.exit(0) // exit test successfully
})

function testCalculatorFunction (callback) {
  console.log(++stepCounter + '. Inserting thousands of user inputs from ' +
    path.relative(directories.server.root, path.join(__dirname, 'users_insertions.json')) +
    ' into the core calculator function. Progress bar...\n')

  fs.readFile(path.join(__dirname, 'users_insertions.json'), 'utf8', function (err, data) {
    if (err) {
      callback(new Error(err))
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
        console.error('\n\ni:' + i, '\n',
          '\n\ncountryObject: ', countryObject,
          '\n\nusersInput: ', usersInput[i],
          '\n\nstructuredUserInput: ', JSON.stringify(structuredUserInput, undefined, 2),
          '\n\ncalculatedData: ', JSON.stringify(calculatedData, undefined, 2))

        callback(new Error(err))
      }
    }

    progressBar.stop()
    callback(null, 0)
  })
}

// check JS files for JS syntax errors (jshint) and for StandardJS syntax rules (standardJS)
function checkJsCodeSyntax (callback) {
  var directoriesToCheck = [
    directories.server.src
  ]

  // just console log the directories to be checked
  process.stdout.write(++stepCounter + '. Checking .js files syntax with jshint (https://jshint.com/) in the directories: ')
  var len = directoriesToCheck.length
  for (let i = 0; i < len; i++) {
    process.stdout.write(path.relative(directories.server.root, directoriesToCheck[i]).mainOption)
    process.stdout.write(i !== len - 1 ? ', ' : '.\n\n')
  }

  var numberOfTotalErrorsOrWanings = 0

  var JShintOpt = {
    '-W041': true,
    'multistr': true,
    'asi': true,
    'expr': true,
    'evil': true,
    'funcscope': false,
    'esversion': 6
  }

  var walking = function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    // gets file extension and avoids exceptions
    if (getFileExtension(filename) === 'js' &&
           !filename.includes('vfs_fonts') &&
           !filename.includes('js_timer.js')) {
      var code = fs.readFileSync(filename, 'utf-8')

      jshint(code, JShintOpt, {})

      if (jshint.errors.length === 0) { // no errors
        console.log('jshint:', '  ', (path.relative(directories.server.root, filename)).verbose)
      } else {
        console.error('\njshint:')
        console.error((path.relative(directories.server.root, filename)).error)
        console.error(prettyjson.render(jshint.errors))
        numberOfTotalErrorsOrWanings++
      }
    }

    next()
  }

  var functionArray = []
  for (let i = 0; i < directoriesToCheck.length; i++) {
    functionArray.push(function (callback) {
      var walker = walk.walk(directoriesToCheck[i])
      walker.on('file', walking)
      walker.on('end', callback)
    })
  }

  async.parallel(functionArray, function (err, results) {
    if (err) {
      callback(new Error(err))
    }

    console.log('\nAll .js files checked for jshint rules\n')
    if (numberOfTotalErrorsOrWanings !== 0) {
      let pluralChar = numberOfTotalErrorsOrWanings > 1 ? 's' : ''
      console.log(
        ('jshint found ' + numberOfTotalErrorsOrWanings + ' error' + pluralChar + ' or warning' + pluralChar + '\n').error
      )
      callback(null, 1)
    } else {
      console.log('jshint found no errors nor warnings on .js files\n'.green)
      callback(null, 0)
    }
  })
}

// check JS files for StandardJS syntax rules (standardJS)
function checkJsCodeStandard (callback) {
  var directoriesToCheck = [
    directories.server.src,
    directories.server.build,
    directories.server.test
  ]

  // just console log the directories to be checked
  process.stdout.write(++stepCounter + '. Checking for .js files standardJS rules (https://standardjs.com/) in the directories: ')
  var len = directoriesToCheck.length
  for (let i = 0; i < len; i++) {
    process.stdout.write(path.relative(directories.server.root, directoriesToCheck[i]).mainOption)
    process.stdout.write(i !== len - 1 ? ', ' : '.\n\n')
  }

  var numberOfTotalErrorsOrWanings = 0

  var walking = function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    // gets file extension and avoids exceptions
    if (getFileExtension(filename) === 'js' &&
           !filename.includes('vfs_fonts') &&
           !filename.includes('js_timer.js')) {
      var code = fs.readFileSync(filename, 'utf-8')

      standard.lintText(code, { filename: filename }, function (err, results) {
        if (err) {
          callback(new Error(err))
        }

        if (results.errorCount || results.warningCount) {
          consoleStandardJsErrors(results)
          numberOfTotalErrorsOrWanings += results.errorCount
          numberOfTotalErrorsOrWanings += results.warningCount
        } else {
          console.log('standard: ', (path.relative(directories.server.root, filename)).verbose)
        }
      })
    }

    next()
  }

  var functionArray = []
  for (let i = 0; i < directoriesToCheck.length; i++) {
    functionArray.push(function (callback) {
      var walker = walk.walk(directoriesToCheck[i])
      walker.on('file', walking)
      walker.on('end', callback)
    })
  }

  async.parallel(functionArray, function (err, results) {
    if (err) {
      callback(new Error(err))
    }

    console.log('\nAll .js files checked for standardJS rules\n')
    if (numberOfTotalErrorsOrWanings !== 0) {
      let pluralChar = numberOfTotalErrorsOrWanings > 1 ? 's' : ''
      console.log(
        ('standardJS found ' + numberOfTotalErrorsOrWanings + ' error' + pluralChar + ' or warning' + pluralChar + '\n').error
      )
      callback(null, 1)
    } else {
      console.log('standardJS found no errors nor warnings on .js files\n'.green)
      callback(null, 0)
    }
  })
}

function getFileExtension (fileName) {
  return fileName.split('.').pop()
}

function consoleStandardJsErrors (results) {
  console.error('\nstandard:')
  for (let i = 0; i < results.results.length; i++) {
    console.error(path.relative(directories.server.root, results.results[i].filePath).error)
    for (let j = 0; j < results.results[i].messages.length; j++) {
      console.log(prettyjson.render(results.results[i].messages[j]))
    }
  }
}
