/*
  script that runs a http server on localhost and then html-validates
  using a LOCAL html validator for all the html pages served
*/

console.log('Validating html/hbs pages using local html validator (html-validate)...')

const fs = require('fs')
const path = require('path')
const async = require('async')
const request = require('request')
const colors = require('colors')
// const validator = require('html-validator')
const util = require('util')
const debug = require('debug')('test:validateHtml')

const HTMLValidate = require('html-validate').HtmlValidate
const htmlvalidate = new HTMLValidate({
  extends: ['html-validate:recommended'],
  rules: {
    'no-trailing-whitespace': 'off',
    'attr-case': 'off',
    'long-title': 'off',
    'wcag/h30': 'off',
    'prefer-tbody': 'off',
    'wcag/h32': 'off',
    'prefer-button': 'off',
    'prefer-native-element': 'off'
  }
})

// http server that is run locally on localhost, to serve the website's files
const testServer = require('./testServer')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')
colors.setTheme(commons.getConsoleColors())

const settings = commons.getSettings()
const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

console.log('Running script ' + path.relative(directories.server.root, __filename))

// ['/stats', '/list', '/PT', '/US', '/AU', etc.]
var PathnamesToValidateArr = getPathnamesToValidate()

var Bar = commons.getProgressBar(PathnamesToValidateArr.length + 3, debug.enabled)

async.series([startsHttpServer, validateHtmlOnAllPages],
  // done after execution of above funcitons
  function (err, results) {
    testServer.closeServer()

    if (err) {
      console.log(Error(err))
      process.exitCode = 1
    } else {
      Bar.tick({ info: '' })
      Bar.terminate()
      console.log('All html/hbs pages validated correctly'.green)
      process.exitCode = 0
    }
    console.log('\n')
  }
)

// starts http server on localhost on test default port
function startsHttpServer (callback) {
  console.log('building a clean copy without minifying html')
  // no need here to set release to test because it was done with "commons.setRelease('test')"
  commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-c'], 'ignore')

  Bar.tick({ info: 'starting local server' })
  testServer.startsServerForTests(
    ['--database'], // we need this option to test url /stats
    function () {
      Bar.tick({ info: 'server started' })
      callback()
    }, function (err) {
      callback(Error(err))
    })
}

// returns ['/stats', '/list', '/PT', '/US', '/AU', etc.]
function getPathnamesToValidate () {
  var countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesInfoFile, 'utf8'))
  var availableCountries = countriesInfo.availableCountries

  var countryCodesArray = Object.keys(availableCountries) // ['PT', 'US', 'AU', etc.]
  var numberOfCountries = countryCodesArray.length

  var pathnames = ['/stats', '/list', '/domains']
  for (let i = 0; i < numberOfCountries; i++) {
    pathnames.push('/' + countryCodesArray[i])
  }
  return pathnames
}

// validates html code of pages using validator.w3.org/nu
function validateHtmlOnAllPages (next) {
  async.eachOfSeries(PathnamesToValidateArr, validatePage, function (err) {
    if (err) {
      next(Error('Error validating html on pages: ' + err.message))
    } else {
      debug('All html pages validated')
      next()
    }
  })
}

// pathname is for example '/PT' or '/stats'
// see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#url-parts-terminology
function validatePage (pathname, key, callback) {
  var url = 'http://localhost:' + settings.HTTPport + pathname
  request({ uri: url }, function (err, response, body) {
    if (err) {
      callback(Error(err))
      return
    }

    const report = htmlvalidate.validateString(body)
    if (!report.valid) {
      console.log('\n\nERROR COUNT: ', report.results[0].errorCount)
      console.log(util.inspect(report.results[0].messages, false, null, true /* enable colors */))
      console.log(addLinesToStr(body))
      callback(Error(('Package html-validate found ' + report.results[0].errorCount + ' HTML errors on ' + pathname).error))
    } else {
      debug(pathname)
      Bar.tick({ info: pathname })
      callback()
    }
  })
}

// for debug purposes. On a big string of code with many breaklines,
// adds after a breakline, the correspondig line number
// from "abc\ndef\nghi" => "1: abc\n 2: def\n 3: ghi"
function addLinesToStr (str) {
  var arr = str.split('\n')
  for (let i = 0; i < arr.length; i++) {
    arr[i] = (i + 1).toString().padStart(4, ' ') + ':  ' + arr[i] + '\n'
  }
  return arr.join('')
}
