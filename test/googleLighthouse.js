// value from 0 to 1 below which an error is triggered
const THRESHOLD_AVG_SCORE = 0.90
const PATH_TO_BE_TESTED = '/br'

const path = require('path')
const async = require('async')
const isOnline = require('is-online')
const prettyjson = require('prettyjson')
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const debug = require('debug')('test:googleLighthouse')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')

const settings = commons.getSettings()
const directories = commons.getDirectories()

// http server that is run locally on localhost, to serve the website's files
const testServer = require('./testServer')

console.log(`Testing code and web page ${PATH_TO_BE_TESTED} with Google Lighthouse...`)

async.series([checkForInternet, startsHttpServer, checkPagePerformance],
  // done after execution of above funcitons
  function (err, results) {
    testServer.closeServer()

    if (err) {
      console.error(Error(err))
      process.exitCode = 1
    } else {
      console.log('Google Lighthouse ran OK'.green)
      process.exitCode = 0
    }
  }
)

function checkPagePerformance (callback) {
  function launchChromeAndRunLighthouse (url, opts, config = null) {
    console.log('Lunching Chrome Launcher, please wait...')
    return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
      opts.port = chrome.port
      console.log('Launching and running Light House, please wait...')
      return lighthouse(url, opts, config).then(results => {
        // use results.lhr for the JS-consumable output
        // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
        // use results.report for the HTML/JSON/CSV output as a string
        // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
        return chrome.kill().then(() => {
          checkResults(results, callback)
          return results.lhr
        })
      })
    }).catch(err => {
      console.error(err)
      console.error('ERROR launching Chromium'.yellow)
      console.error('You must have Chromium on your machine to make this performance test. Install Chromium!'.yellow)
      console.error('On Ubuntu/Debian run: sudo apt install chromium-browser'.yellow)
      console.error('Skipping this performance test'.yellow)
      callback()
    })
  }

  function checkResults (results, callback) {
    const audits = results.lhr.audits

    let total = 0
    let count = 0
    for (const key in audits) {
      if (audits[key].score) {
        total += audits[key].score
        count++
      }
    }

    const averageScore = total / count
    console.log(`\nThe average score is ${averageScore.toFixed(2)}`)

    if (averageScore > THRESHOLD_AVG_SCORE) {
      for (const key in audits) {
        if (audits[key].score && audits[key].score < 1) {
          debug(prettyjson.render(audits[key]))
          debug('\n\n')
          debug('==========================================================================')
          debug('\n\n')
        }
      }
      callback()
    } else {
      for (const key in audits) {
        if (audits[key].score && audits[key].score < THRESHOLD_AVG_SCORE) {
          console.log(prettyjson.render(audits[key]))
          console.log('\n\n')
          console.log('==========================================================================')
          console.log('\n\n')
        }
      }

      const errMsg = 'The average score of Google Lighthouse is not enough, ' +
        `it must be greater than ${THRESHOLD_AVG_SCORE} and it is ${averageScore.toFixed(2)}`
      console.error(errMsg)
      callback(Error(errMsg))
    }
  }

  const opts = {
    chromeFlags: ['--headless'],
    quiet: true
  }

  const url = 'http://localhost:' + settings.HTTPport + PATH_TO_BE_TESTED
  launchChromeAndRunLighthouse(url, opts).then(results => {
    // Use results!
  })
}

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
  commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-cimt'], 'ignore')

  testServer.startsServerForTests(
    function () {
      callback()
    }, function (err) {
      callback(Error(err))
    })
}
