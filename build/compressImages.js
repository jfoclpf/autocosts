/* node script to compress and optimize all the images, namely JPG and PNG images, for the web page.
Optimal compression settings were defined by Google from the Page Speed Insights documentation */

console.log('Compressing JPG and PNG images...')
const os = require('os')
if (os.type()) {
  const osType = os.type().trim().toLowerCase()
  if (process.env.NODE_ENV === 'test' && (osType.includes('windows') || osType.includes('darwin'))) {
    console.log(`skipping image compressing for test suite, this test system ${osType()} does not easily support it`)
    process.exit(0)
  }
}

const fs = require('fs')
const path = require('path')
const find = require('find')
const async = require('async')
const walk = require('walk')
const im = require('imagemagick')
const colors = require('colors')
const debug = require('debug')('build:compressImages')

// own module
const commons = require(path.join(__dirname, '..', 'commons'))

const directories = commons.getDirectories()
console.log('Running script ' + path.relative(directories.server.root, __filename))

debug('bin/: ', directories.server.bin)

// from require('colors');
colors.setTheme(commons.getConsoleColors())

const Bar = commons.getProgressBar(getNuberOfTotalFiles() + 1, debug.enabled)

async.parallel([compressJPG, compressPNG], function (err, results) {
  if (err) {
    console.log(Error(`An error was found:\n\n${err}`))
    process.exitCode = 1 // exit with error
  } else {
    Bar.tick({ info: '' })
    Bar.terminate()
    console.log('All images compressed OK'.green)
    process.exitCode = 0 // exit successfully
  }
})

function compressJPG (callback) {
  debug(('\n## Compressing JPG files \n').mainOptionStep)

  const walker = walk.walk(directories.server.bin)

  walker.on('file', function (root, fileStats, next) {
    const filename = path.join(root, fileStats.name)

    if (filename.includes('.jpg')) {
      const filePathRelative = path.relative(directories.server.root, filename)
      debug(filePathRelative.verbose.bold)

      const params = [filename,
        '-sampling-factor', '4:2:0',
        '-strip', '-quality', '85',
        '-interlace', 'Plane',
        '-colorspace', 'RGB',
        filename + '.min']

      im.convert(params, function (err, stdout) {
        if (err) {
          callback(Error('Error compressing ' + filename + '. ' + err.message))
        } else {
          // removes original and renames
          fs.unlinkSync(filename)
          fs.renameSync(filename + '.min', filename)
          Bar.tick({ info: filePathRelative })
          next()
        }
      })
    } else {
      next()
    }
  })

  walker.on('end', function () {
    debug('\nAll JPG files compressed\n')
    callback()
  })
}

function compressPNG (callback) {
  debug(('\n## Compressing PNG files \n').mainOptionStep)

  const walker = walk.walk(directories.server.bin)

  walker.on('file', function (root, fileStats, next) {
    const filename = path.join(root, fileStats.name)

    if (filename.includes('.png')) {
      const filePathRelative = path.relative(directories.server.root, filename)
      debug(filePathRelative.verbose.bold)

      const params = [filename,
        '-strip',
        filename + '.min']

      im.convert(params, function (err, stdout) {
        if (err) {
          callback(Error('Error compressing ' + filename + '. ' + err.message))
        } else {
          // removes original and renames
          fs.unlinkSync(filename)
          fs.renameSync(filename + '.min', filename)
          Bar.tick({ info: filePathRelative })
          next()
        }
      })
    } else {
      next()
    }
  })

  walker.on('end', function () {
    debug('\nAll PNG files compressed\n')
    callback()
  })
}

function getNuberOfTotalFiles () {
  let numberOfTotalFiles = find.fileSync(/\.jpg$/, directories.server.bin).length
  numberOfTotalFiles += find.fileSync(/\.png$/, directories.server.bin).length

  return numberOfTotalFiles
}
