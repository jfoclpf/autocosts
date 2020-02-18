const jsdom = require('jsdom')
const { JSDOM } = jsdom
// const fs = require('fs')
const path = require('path')
const async = require('async')

// http server that is run locally on localhost, to serve the website's files
const testServer = require('./testServer')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')

const settings = commons.getSettings()
// const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

console.log('Running script ' + path.relative(directories.server.root, __filename))

async.series([startsHttpServer, validateClientJSFiles], endFunction)

// starts http server on localhost on test default port
function startsHttpServer (callback) {
  console.log('building a clean copy without minifying html')
  // no need here to set release to test because it was done with "commons.setRelease('test')"
  commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-c'], 'ignore')

  testServer.startsServerForTests(function () {
    callback()
  }, function (err) {
    callback(Error(err))
  })
}

function validateClientJSFiles (callback) {
  var url = 'http://localhost:' + settings.HTTPport + '/PT'

  const virtualConsole = new jsdom.VirtualConsole()
  virtualConsole.sendTo(console)

  JSDOM.fromURL(url, {
    virtualConsole: virtualConsole,
    userAgent: 'Node.js',
    includeNodeLocations: true,
    storageQuota: 100000000,
    runScripts: 'dangerously', // the source is trusthworthy
    resources: 'usable'
  }).then(function (dom) {
    dom.window.document.addEventListener('load', () => {
      console.log(dom.window.document.querySelector('h1').textContent)
      // callback()
    })
  })
}

// done after execution of above funcitons
function endFunction (err, results) {
  testServer.closeServer()
  if (err) {
    console.log(Error(err))
    process.exit(1)
  } else {
    console.log('All files validated correctly'.green)
    process.exit(0)
  }
}
