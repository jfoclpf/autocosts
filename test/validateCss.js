/*
  script that runs a http server on localhost and then css-validates
  using W3 css validator all the css files served
*/

const path = require('path')
const find = require('find')
const async = require('async')
const request = require('request')
const validator = require('w3c-css')
const prettyjson = require('prettyjson')
const debug = require('debug')('test:validateCss')

// http server that is run locally on localhost, to serve the website's files
const testServer = require('./testServer')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')

const settings = commons.getSettings()
const directories = commons.getDirectories()

console.log('Running script ' + path.relative(directories.server.root, __filename))
console.log('Validating CSS files using W3 css online validator...')

// ['/css/colors.css', '/css/fonts.css', '/css/style.css', etc.]
var PathnamesToValidateArr = getPathnamesToValidate()
debug(PathnamesToValidateArr)

var Bar = commons.getProgressBar(PathnamesToValidateArr.length + 3, debug.enabled)

async.series([copyCssFilesToBin, startsHttpServer, validateCssOnAllPaths],
  // done after execution of above funcitons
  function (err, results) {
    testServer.closeServer()

    if (err) {
      console.log('Error : ', Error(err))
      process.exit(1)
    } else {
      Bar.tick({ info: '' })
      Bar.terminate()
      console.log('All css files validated correctly'.green)
      process.exit(0)
    }
  })

// copy from /src to /bin to be freshly loaded by the http server
function copyCssFilesToBin (callback) {
  debug('Copying files from /src to /bin')
  commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-c'], 'pipe')
  callback()
}

// starts http server on localhost on test default port
function startsHttpServer (callback) {
  Bar.tick({ info: 'starting local server' })

  testServer.startsServerForTests(function () {
    Bar.tick({ info: 'server started' })
    callback()
  }, function (err) {
    callback(Error(err))
  })
}

// returns ['/css/colors.css', '/css/fonts.css', '/css/style.css', etc.]
function getPathnamesToValidate () {
  var cssFilesArr = find.fileSync(/\.css$/, directories.src.css)

  for (let i = 0; i < cssFilesArr.length; i++) {
    cssFilesArr[i] = path.relative(directories.server.src, cssFilesArr[i])
    if (cssFilesArr[i].charAt(0) !== '/') {
      cssFilesArr[i] = '/' + cssFilesArr[i]
    }
  }

  return cssFilesArr
}

// validates css code using validator.w3.org/nu
function validateCssOnAllPaths (next) {
  async.eachSeries(PathnamesToValidateArr, validatePathname, function (err) {
    if (err) {
      next(Error('Error validating css on pages: ' + err))
    } else {
      debug('All css pages validated successfully'.green)
      next()
    }
  })
}

// pathname is for example '/css/style.css'
// see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#url-parts-terminology
function validatePathname (pathname, callback) {
  var url = 'http://localhost:' + settings.HTTPport + pathname
  debug(url)

  request({ uri: url }, function (err, response, body) {
    if (err) {
      debug('Error: ' + err)
      callback(Error('Error on request from server:' + err))
      return
    }

    const options = {
      profile: 'css3svg',
      warning: 'no', // medium warnings
      text: body
    }

    debug('validating...')
    validator.validate(options)
      .on('error', function (err) {
        debug('Error: ' + err)
        callback(Error(err))
      })
      .on('validation-error', function (data) {
        debug('on validation-error')
        console.log(`Error on ${url}\n`.error)
        console.log(addLinesToStr(body))
        console.log(`Error on ${url}\n`.error)
        console.log(prettyjson.render(data))
        callback(Error('Found css error'))
      })
      .on('validation-warning', function (data) {
        debug('on validation-warning')
        console.log(`Warning on ${url}\n`.error)
        console.log(addLinesToStr(body))
        console.log(`Warning on ${url}\n`.error)
        console.log(prettyjson.render(data))
        callback(Error('Found css warning'))
      })
      .on('end', function () {
        debug('on end')
        Bar.tick({ info: pathname })
        // since is a public service we should wait 2 s between requests
        // https://www.npmjs.com/package/w3c-css#public-css-validator
        setTimeout(callback, 2000)
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
