/*
  script do validate sitemap.xml
  based on https://toboid.com/posts/validating-sitemaps-in-nodejs
*/

const fs = require('fs')
const path = require('path')
const async = require('async')
const assert = require('assert')
const request = require('request')
const libxmljs = require('libxmljs')
const { fork } = require('child_process')
const debug = require('debug')('test:validateSitemap')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')

const settings = commons.getSettings()
const directories = commons.getDirectories()

// Read the sitemap and schema from the file system
// Could just as easily get these over HTTP
// const sitemap = fs.readFileSync('../sitemap.xml')
const schema = fs.readFileSync(path.join(directories.server.test, 'schemas/sitemap.xsd'))

async.series([startsHttpServer, validateSitemap],
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
      // Bar.tick({ info: '' })
      // Bar.terminate()
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

function validateSitemap (callback) {
  var url = 'http://localhost:' + settings.HTTPport + '/sitemap.xml'
  request({ uri: url }, function (err, response, body) {
    if (err) {
      callback(Error(err))
      return
    }
    // Parse the sitemap and schema
    const sitemapDoc = libxmljs.parseXml(body)
    const schemaDoc = libxmljs.parseXml(schema)

    // Perform validation
    const isValid = sitemapDoc.validate(schemaDoc)

    // Check results
    assert.ok(isValid, sitemapDoc.validationErrors)
  })
}
