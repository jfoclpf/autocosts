/*
  script that uses the JSDOM npm package to simulate the browser behaviour using merely nodeJS code,
  such that the scripts used on the front-end/client, mainly on the directory client/, could be tested
*/

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const path = require('path')
const async = require('async')
const colors = require('colors')

// http server that is run locally on localhost, to serve the website's files
const testServer = require('./testServer')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')
colors.setTheme(commons.getConsoleColors())

const settings = commons.getSettings()
const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

const thisScriptPath = path.relative(directories.server.root, __filename)
console.log('Running script ' + thisScriptPath)
console.server = (text) => { console.log(text.server) }

const convertData = require(fileNames.project['convertData.js'])
const validateData = require(fileNames.project['validateData.js'])
const calculator = require(fileNames.project['calculator.js'])
convertData.initialize()
validateData.initialize()
calculator.initialize()

var dom // from JSDOM

async.series([
  // starts http server on localhost on test default port
  function (next) {
    console.log('building a clean copy without minifying html')
    // no need here to set release to test because it was done with "commons.setRelease('test')"
    commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-c'], 'ignore')

    testServer.startsServerForTests(function () {
      next()
    }, function (err) {
      next(Error(err))
    })
  },
  // open JSDOM console
  function (next) {
    console.log('\nserver log'.server + ' and ' + 'client log:\n'.client)

    var pathname = '/XX'
    var url = 'http://localhost:' + settings.HTTPport + pathname

    const virtualConsole = new jsdom.VirtualConsole()
    // virtualConsole.sendTo(console)
    virtualConsole.on('log', (text) => { console.log(text.client) })
    virtualConsole.on('error', (err) => {
      console.log(('Error on the client side on: ' + pathname).error)
      console.log(err.error)
      next(err)
    })
    virtualConsole.on('jsdomError', (err) => {
      console.log(('Error on the client side on: ' + pathname).error)
      console.log(err.message.error)
      next(err)
    })

    JSDOM.fromURL(url, {
      virtualConsole: virtualConsole,
      userAgent: 'Node.js',
      includeNodeLocations: true,
      storageQuota: 100000000,
      runScripts: 'dangerously', // the source is trusthworthy
      resources: 'usable'
    }).then((domLocal) => {
      dom = domLocal
      console.server('DOM available')
      next()
    })
  },
  // on DOM Available
  function (next) {
    var window = dom.window
    var document = window.document

    // when both async triggers are complete, move on
    async.parallel([
      function (asyncCallback) {
        // this funcion is triggered from client/main.js
        window.onAllInitLoaded = () => {
          console.server('Triggered "onAllInitLoaded"')
          asyncCallback()
        }
      },
      function (asyncCallback) {
        document.addEventListener('load', () => {
          console.server('Triggered "load" event')
          asyncCallback()
        })
      }
    ],
    function (err, results) {
      if (err) {
        console.log(Error(err))
        process.exit = 1
      } else {
        console.server('Full initial loading OK')
        next()
      }
    })
  },
  // clicks button #calculateButton
  function (next) {
    var window = dom.window
    var document = window.document
    // var autocosts = window.autocosts

    // this funcion is triggered from client/initialize.js
    window.onAllDeferredLoaded = () => {
      console.server('Triggered "onAllDeferredLoaded"')
      console.server('form accessible')
      next()
    }

    console.server('Clicking button #calculateButton')
    document.getElementById('calculateButton').click()
  },
  // closes JSDOM window
  function (next) {
    dom.window.close()
    next()
  }
],
// done after execution of above funcitons
function endFunction (err, results) {
  testServer.closeServer()
  if (err) {
    console.log(Error(err))
    console.log(('Exited ' + thisScriptPath + ' with error').error)
    process.exitCode = 1
  } else {
    console.log('Validation correct'.green)
    process.exitCode = 0
  }
  console.log('\n')
})
