/*
  script that runs a http server on localhost and then html-validates
  using W3 html validator all the html pages served
*/

console.log('Running script ', __filename)
console.log('Validating html/hbs pages...')

const fs = require('fs')
const path = require('path')
const async = require('async')
const request = require('request')
const { fork } = require('child_process')
const validator = require('html-validator')
const debug = require('debug')('test:validateHtml')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')

const settings = commons.getSettings()
const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

// ['/stats', '/list', '/PT', '/US', '/AU', etc.]
var PathnamesToValidateArr = getPathnamesToValidate()

var Bar = commons.getProgressBar(PathnamesToValidateArr.length + 1, debug.enabled)

async.series([startsHttpServer, validateHtmlOnAllPages],
  // done after execution of above funcitons
  function (err, results) {
    if (results[0] && results[0].httpLocalServer) {
      debug('Closing http server')
      // results[0] makes reference always to the first declared function: startsHttpServer
      results[0].httpLocalServer.kill('SIGINT')
    }
    if (err) {
      console.log(Error(err))
      process.exit(1)
    } else {
      Bar.tick({ info: '' })
      Bar.terminate()
      console.log('All html/hbs pages validated correctly'.green)
      process.exit(0)
    }
  }
)

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
      debug('message from child:', message)
      if (message.includes('SERVER_STARTED')) {
        callback(null, { httpLocalServer: httpLocalServer })
      }
    })
  } catch (err) {
    callback(Error(err), { httpLocalServer: httpLocalServer })
  }
}

// returns ['/stats', '/list', '/PT', '/US', '/AU', etc.]
function getPathnamesToValidate () {
  var countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesListFile, 'utf8'))
  var availableCountries = countriesInfo.availableCountries

  var countryCodesArray = Object.keys(availableCountries) // ['PT', 'US', 'AU', etc.]
  var numberOfCountries = countryCodesArray.length

  var pathnames = ['/stats', '/list']
  for (let i = 0; i < numberOfCountries; i++) {
    pathnames.push('/' + countryCodesArray[i])
  }
  return pathnames
}

// validates html code of pages using validator.w3.org/nu
function validateHtmlOnAllPages (next) {
  async.each(PathnamesToValidateArr, validatePage, function (err) {
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
          debug(pathname)
          Bar.tick({ info: pathname })
          callback()
        }
      })
      .catch((err) => {
        console.log(err)
        callback(Error(err))
      })
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
