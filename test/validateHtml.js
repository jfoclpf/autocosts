/*
  script that runs a http server on localhost and then html-validates
  using W3 html validator all the html pages served
*/

const fs = require('fs')
const path = require('path')
const async = require('async')
const request = require('request')
const { fork } = require('child_process')
const validator = require('html-validator')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')
const settings = commons.getSettings()
const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

async.series([startsHttpServer, validateHtmlOnAllPages],
  // done after execution of above funcitons
  function (err, results) {
    if (results[0].httpLocalServer) {
      console.log('Closing http server')
      results[0].httpLocalServer.kill('SIGINT')
    }
    if (err) {
      console.log(Error(err))
      process.exit(1)
    } else {
      console.log('All pages validated correctly'.green)
      process.exit(0)
    }
  })

// starts http server on localhost on test default port
function startsHttpServer (callback) {
  // the process where the http server will run
  var httpLocalServer
  try {
    let index = path.join(directories.server.bin, 'index.js')
    let parameters = ['-r', 'test']
    let options = {
      stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
    }
    httpLocalServer = fork(index, parameters, options)
    httpLocalServer.on('message', message => {
      console.log('message from child:', message)
      if (message.includes('SERVER_STARTED')) {
        callback(null, { httpLocalServer: httpLocalServer })
      }
    })
  } catch (err) {
    callback(Error(err), { httpLocalServer: httpLocalServer })
  }
}

// validates html code of pages using validator.w3.org/nu
function validateHtmlOnAllPages (next) {
  var countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesListFile, 'utf8'))
  var availableCountries = countriesInfo.availableCountries

  var countryCodesArray = Object.keys(availableCountries) // ['PT', 'US', 'AU', etc.]
  var numberOfCountries = countryCodesArray.length

  var createFunctionForAsync = function (pathname) {
    return function (callback) {
      validatePage(pathname, callback)
    }
  }

  var functionsArray = []
  for (let i = 0; i < numberOfCountries; i++) {
    let CC = countryCodesArray[i]
    functionsArray.push(createFunctionForAsync('/' + CC))
  }

  functionsArray.push(createFunctionForAsync('/stats'))
  functionsArray.push(createFunctionForAsync('/list'))

  async.parallel(functionsArray, function (err, results) {
    if (err) {
      next(Error('Error validating html on pages: ' + err.message))
    } else {
      console.log('\nAll html pages validated')
      next()
    }
  })
}

// pathname is for example '/PT' or '/stats'
// see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#url-parts-terminology
function validatePage (pathname, callback) {
  var url = 'http://localhost:' + settings.HTTPport + pathname
  request({ uri: url }, function (err, response, body) {
    if (err) {
      callback(Error(err))
      return
    }

    let options = {
      format: 'text',
      data: body
    }

    validator(options)
      .then((result) => {
        if (result.toLowerCase().includes('error')) {
          console.log(`Error on ${url}\n`.error, result)
          console.log(addLinesToStr(body))
          console.log(`Error on ${url}\n`.error, result)
          callback(Error('Found html error'))
        } else if (result.toLowerCase().includes('warning')) {
          console.log(`Warning on ${url}\n`.error, result)
          console.log(addLinesToStr(body))
          console.log(`Warning on ${url}\n`.error, result)
          callback(Error('Found html warning'))
        } else {
          process.stdout.write(pathname.green + ' ')
          callback()
        }
      })
      .catch((err) => {
        console.log(err)
        callback(Error(err))
      })
  })
}

function addLinesToStr (str) {
  var arr = str.split('\n')
  for (let i = 0; i < arr.length; i++) {
    arr[i] = (i + 1).toString() + ': ' + arr[i] + '\n'
  }
  return arr.join('')
}
