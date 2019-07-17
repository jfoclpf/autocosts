/*
  validate JS files syntax using both standardJS (https://standardjs.com/) and jshint (https://jshint.com/)
*/

console.log('Validating js files...')

const fs = require('fs')
const path = require('path')
const walk = require('walk')
const find = require('find')
const async = require('async')
const jshint = require('jshint').JSHINT
const prettyjson = require('prettyjson')
const standard = require('standard')
const debug = require('debug')('test:validateJs')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')
const directories = commons.getDirectories()

console.log('Running script ' + path.relative(directories.server.root, __filename))

const DirectoriesToCheckJs = [
  directories.server.src,
  directories.server.build,
  directories.server.test
]

var Bar = commons.getProgressBar(getNumberOfTotalProgressBarTicks() + 1, debug.enabled)

// main script
async.parallel([
  checkJsCodeSyntax,
  checkJsCodeStandard
],
function (err, results) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  for (let i = 0; i < results.length; i++) {
    if (results[i]) {
      process.exit(1) // exit test with error
    }
  }
  Bar.tick({ info: '' })
  Bar.terminate()
  console.log('All js files validated correctly'.green)
  process.exit(0)
})

// check JS files for JS syntax errors (jshint) and for StandardJS syntax rules (standardJS)
function checkJsCodeSyntax (callback) {
  var directoriesToCheck = DirectoriesToCheckJs

  // just console log the directories to be checked
  debug('Checking .js files syntax with jshint (https://jshint.com/) in the directories: ')
  var barMessage = 'Checking for js syntax on '
  var len = directoriesToCheck.length
  for (let i = 0; i < len; i++) {
    barMessage += path.relative(directories.server.root, directoriesToCheck[i])
    barMessage += i !== len - 1 ? ', ' : '.'
  }
  debug(barMessage)

  var numberOfTotalErrorsOrWanings = 0

  var JShintOpt = {
    '-W041': true,
    multistr: true,
    asi: true,
    expr: true,
    evil: true,
    funcscope: false,
    esversion: 6
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
        debug('jshint:', '  ', (path.relative(directories.server.root, filename)).verbose)
        Bar.tick({ info: path.relative(directories.server.root, filename) })
      } else {
        console.error('\njshint:')
        console.error((path.relative(directories.server.root, filename)).error)
        console.error(prettyjson.render(jshint.errors))
        numberOfTotalErrorsOrWanings++
      }
    }

    next()
  }

  async.each(directoriesToCheck,
    function (direcotry, callback) {
      var walker = walk.walk(direcotry)
      walker.on('file', walking)
      walker.on('end', callback)
    },

    function (err, results) {
      if (err) {
        callback(Error(err))
        return
      }

      debug('\nAll .js files checked for jshint rules\n')
      if (numberOfTotalErrorsOrWanings !== 0) {
        const pluralChar = numberOfTotalErrorsOrWanings > 1 ? 's' : ''
        console.log('\n',
          ('jshint found ' + numberOfTotalErrorsOrWanings + ' error' + pluralChar + ' or warning' + pluralChar + '\n').error
        )
        callback(null, 1)
      } else {
        debug('jshint found no errors nor warnings on .js files\n'.green)
        callback(null, 0)
      }
    }
  ) // async.each
}

// check JS files for StandardJS syntax rules (standardJS)
function checkJsCodeStandard (callback) {
  var directoriesToCheck = DirectoriesToCheckJs

  // just console log the directories to be checked
  debug('Checking for .js files standardJS rules (https://standardjs.com/) in the directories: ')
  var barMessage = 'Checking for js syntax on '
  var len = directoriesToCheck.length
  for (let i = 0; i < len; i++) {
    barMessage += path.relative(directories.server.root, directoriesToCheck[i]).mainOption
    barMessage += i !== len - 1 ? ', ' : '.'
  }
  debug(barMessage)

  var numberOfTotalErrorsOrWanings = 0

  var walking = function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    // gets file extension and avoids exceptions
    if (getFileExtension(filename) === 'js' &&
           !filename.includes('vfs_fonts') &&
           !filename.includes('js_timer.js')) {
      var code = fs.readFileSync(filename, 'utf-8')

      standard.lintText(code,
        { filename: filename,
          fix: false,
          envs: { browser: true, node: true, es6: true }
        },
        function (err, results) {
          if (err) {
            callback(Error(err))
            return
          }

          if (results.errorCount || results.warningCount) {
            consoleStandardJsErrors(results)
            numberOfTotalErrorsOrWanings += results.errorCount
            numberOfTotalErrorsOrWanings += results.warningCount
          } else {
            debug('standard: ', (path.relative(directories.server.root, filename)).verbose)
            Bar.tick({ info: path.relative(directories.server.root, filename) })
          }
          next()
        })
    } else {
      next()
    }
  }

  async.each(directoriesToCheck,
    function (directory, callback) {
      var walker = walk.walk(directory)
      walker.on('file', walking)
      walker.on('end', callback)
    },

    function (err, results) {
      if (err) {
        callback(Error(err))
        return
      }

      debug('\nAll .js files checked for standardJS rules\n')
      if (numberOfTotalErrorsOrWanings !== 0) {
        const pluralChar = numberOfTotalErrorsOrWanings > 1 ? 's' : ''
        console.log('\n',
          ('standardJS found ' + numberOfTotalErrorsOrWanings + ' error' + pluralChar + ' or warning' + pluralChar + '\n').error
        )
        callback(null, 1)
      } else {
        debug('standardJS found no errors nor warnings on .js files\n'.green)
        callback(null, 0)
      }
    }
  ) // async.each
}

function getNumberOfTotalProgressBarTicks () {
  var totalNumberOfFiles = 0

  for (let i = 0; i < DirectoriesToCheckJs.length; i++) {
    // all *.js files except vfs_fonts.js and js_timer.js
    totalNumberOfFiles += find.fileSync(/(?<!vfs_fonts|js_timer)\.js$$/, DirectoriesToCheckJs[i]).length
  }

  // it multiplies by 2 because it checks each js file twice, for standardJS and for jshint
  return totalNumberOfFiles * 2
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
