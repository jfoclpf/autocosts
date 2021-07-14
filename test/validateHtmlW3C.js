/*
  script that runs a http server on localhost and then html-validates
  using W3C html validator all the html pages served
  Since the W3C server is not fully reliable in terms of connection
  this script retries several times the request for the same page to be sure
  the error is not due to the connection with the W3C server
*/

console.log('Validating html/hbs pages using official W3C server...')

const fs = require('fs')
const path = require('path')
const async = require('async')
const request = require('request')
const isOnline = require('is-online')
const validator = require('html-validator')
const debug = require('debug')('test:validateHtmlW3C')

// http server that is run locally on localhost, to serve the website's files
const testServer = require('./testServer')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')

const settings = commons.getSettings()
const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

console.log('Running script ' + path.relative(directories.server.root, __filename))

// ['/worldstats', '/list', '/pt', '/us', '/au', etc.]
const PathnamesToValidateArr = getPathnamesToValidate()

const Bar = commons.getProgressBar(PathnamesToValidateArr.length + 3, debug.enabled)

async.series([checkForInternet, startsHttpServer, validateHtmlOnAllPages],
  // done after execution of above funcitons
  function (err, results) {
    testServer.closeServer()

    Bar.tick({ info: '' })
    Bar.terminate()

    if (err) {
      console.log(Error(err))
      process.exitCode = 1
    } else {
      console.log('All html/hbs pages validated OK'.green)
      process.exitCode = 0
    }
    console.log('\n')
  }
)

// checks for internet connection
function checkForInternet (callback) {
  isOnline().then(function (online) {
    if (!online) {
      callback('ERROR: no Internet connection'.red.bold)
    } else {
      callback()
    }
  })
}

// starts http server on localhost on test default port
function startsHttpServer (callback) {
  console.log('building a clean copy and minifying html')
  commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-cm'], 'ignore')

  Bar.tick({ info: 'starting local server' })
  testServer.startsServerForTests(
    ['--database'], // we need this option to test url /worldstats
    function () {
      Bar.tick({ info: 'server started' })
      setTimeout(callback, 1000) // altough this is already a callback, give some more time for server to start
    }, function (err) {
      callback(Error(err))
    })
}

// returns ['/worldstats', '/list', '/pt', '/us', '/au', etc.]
function getPathnamesToValidate () {
  const countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesInfoFile, 'utf8'))
  const availableCountries = countriesInfo.availableCountries

  const countryCodesArray = Object.keys(availableCountries) // ['PT', 'US', 'AU', etc.]
  const numberOfCountries = countryCodesArray.length

  const pathnames = ['/worldstats', '/list', '/domains']
  for (let i = 0; i < numberOfCountries; i++) {
    pathnames.push('/' + countryCodesArray[i].toLowerCase())
  }
  for (let i = 0; i < numberOfCountries; i++) {
    pathnames.push('/' + countryCodesArray[i].toLowerCase() + '/stats')
  }

  return pathnames
}

// validates html code of pages using validator.w3.org/nu
function validateHtmlOnAllPages (next) {
  // maximum of 10 requests on the same time to avoid overloading the W3C checker,
  // and thus avoid rejection of request with 504 error
  async.eachOfLimit(PathnamesToValidateArr, 10,
    (pathname, key, callback) => {
      // try calling validatePage for the same page 10 times with exponential backoff
      // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
      async.retry({
        times: 10,
        interval: function (retryCount) {
          return 50 * Math.pow(2, retryCount)
        }
      },
      (callback) => {
        validatePage(pathname, key, callback)
      },
      function (err, result) {
        if (err) {
          callback(Error(`Error validating html on page ${pathname}\n\n${err}`))
        } else {
          callback()
        }
      })
    },
    function (err) {
      if (err) {
        next(Error(err))
      } else {
        debug('All html pages validated OK')
        next()
      }
    })
}

// pathname is for example '/pt' or '/worldstats'
// see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#url-parts-terminology
function validatePage (pathname, key, callback) {
  const url = 'http://localhost:' + settings.HTTPport + pathname
  request({ uri: url }, function (err, response, body) {
    if (err) {
      callback(Error(err.message + ', error on url: ' + url))
      return
    }

    const options = {
      format: 'text',
      data: body
    }

    validator(options)
      .then((result) => {
        if (result.toLowerCase().includes('error')) {
          debug(`html error on ${url}, may be false alarm`)
          callback(Error(`\n\nFound html error on ${url}\n\n${result}\n\n${addLinesToStr(body)}`))
        } else if (result.toLowerCase().includes('warning')) {
          debug(`html warning on ${url}, may be false alarm`)
          callback(Error(`\n\nFound html warning on ${url}\n\n${result}\n\n${addLinesToStr(body)}`))
        } else {
          debug(pathname)
          Bar.tick({ info: pathname })
          callback()
        }
      })
      .catch((err) => {
        debug(`error on ${url}, may be false alarm`)
        callback(Error(`\n\nError on ${url}: ${err}`))
      })
  })
}

// for debug purposes. On a big string of code with many breaklines,
// adds after a breakline, the correspondig line number
// from "abc\ndef\nghi" => "1: abc\n 2: def\n 3: ghi"
function addLinesToStr (str) {
  const arr = str.split('\n')
  for (let i = 0; i < arr.length; i++) {
    arr[i] = (i + 1).toString().padStart(4, ' ') + ':  ' + arr[i] + '\n'
  }
  return arr.join('')
}
