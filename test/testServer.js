const path = require('path')
const { fork } = require('child_process')
const debug = require('debug')('test:testServer')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')

const directories = commons.getDirectories()

module.exports = {
  startsServer: startsServer,
  closeServer: closeServer
}

var httpLocalServer

// starts http server on localhost on test default port
function startsServer (onStart, onError) {
  debug('Starting http server...')
  // the process where the http server will run
  try {
    const index = path.join(directories.server.bin, 'index.js')
    const parameters = ['-r', 'test']
    const options = {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    }
    httpLocalServer = fork(index, parameters, options)
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
    httpLocalServer.on('message', message => {
      debug('message from child:', message)
      if (message.includes('SERVER_STARTED')) {
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
