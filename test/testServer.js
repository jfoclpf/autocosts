// Local server used for tests

const path = require('path')
const { fork } = require('child_process')
const debug = require('debug')('test:testServer')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')

const directories = commons.getDirectories()

module.exports = {
  startsServerForTests: startsServerForTests,
  closeServer: closeServer
}

let httpLocalServer

// starts http server on localhost on test default port
// arguments: CLI arguments for the node bin/server.js (optional), onStart, onError
function startsServerForTests () {
  debug('Starting http server...')

  let args, onStart, onError
  if (arguments.length === 3) {
    args = arguments[0]
    onStart = arguments[1]
    onError = arguments[2]
  } else if (arguments.length === 2) {
    onStart = arguments[0]
    onError = arguments[1]
  } else {
    console.error('Arguments for startsServerForTests are:')
    console.error('CLI arguments for the node bin/server.js (optional), onStart, onError')
    process.exit(1) // exit with error
  }

  try {
    const index = path.join(directories.server.bin, 'server.js')
    args = args || []
    args.push('-r', 'test')
    const options = {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    }
    httpLocalServer = fork(index, args, options)
    httpLocalServer.on('exit', (code, signal) => {
      debug('Exited the fork for httpLocalServer')
      if (code === 1) { // error
        debug('Exited with error')
        onError(Error('Exited the server with error.\nProbably the PORT number is already in use'))
      } else {
        debug('Exited the server successfully')
      }
    })
    httpLocalServer.stderr.on('data', (data) => {
      console.error(`child stderr:\n${data}`)
    })

    let SERVER_STARTED = false
    let STATSDATA_COLLECTED = false
    const isSetDatabase = args.includes('--database')

    httpLocalServer.on('message', message => {
      debug('message from child:', message)
      if (message.includes('SERVER_STARTED')) {
        debug('Server started')
        if (!isSetDatabase) {
          onStart()
          return
        }
        SERVER_STARTED = true
      } else if (message.includes('STATSDATA_COLLECTED')) {
        STATSDATA_COLLECTED = true
      }
      if (SERVER_STARTED && STATSDATA_COLLECTED) {
        onStart()
      }
    })
  } catch (err) {
    onError(Error(err))
  }
}

function closeServer () {
  if (httpLocalServer) {
    debug('Closing http server')
    httpLocalServer.kill('SIGINT')
  } else {
    debug('Nothing to close, server had not been opened')
  }
}
