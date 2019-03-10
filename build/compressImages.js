/* node script to compress and optimize all the images, namely JPG and PNG images, for the web page.
Optimal compression settings were defined by Google from the Page Speed Insights documentation */

console.log('\nRunning script ', __filename, '\n')

const fs = require('fs')
const path = require('path')
const find = require('find')
const async = require('async')
const walk = require('walk')
const im = require('imagemagick')
const colors = require('colors')
const ProgressBar = require('progress')
const debug = require('debug')('build:compressImages')

// own module
const commons = require(path.join(__dirname, '..', 'commons'))

var directories = commons.getDirectories()
debug('bin/: ', directories.server.bin)

// from require('colors');
colors.setTheme(commons.getConsoleColors())

var Bar = new ProgressBar('[:bar] :percent',
  { total: getNuberOfTotalFiles(), width: 80 }
)

async.parallel([compressJPG, compressPNG], function (err, results) {
  if (err) {
    console.log(Error('An error was found: '.error + err.message))
    process.exit(1) // exit with error
  }
  console.log('All images compressed successfully'.green)
  process.exit(0) // exit successfully
})

function compressJPG (callback) {
  debug(('\n## Compressing JPG files \n').mainOptionStep)

  var walker = walk.walk(directories.server.bin)

  walker.on('file', function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    if (filename.includes('.jpg')) {
      debug((path.relative(directories.server.root, filename)).verbose.bold)

      var params = [ filename,
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
          Bar.tick()
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

  var walker = walk.walk(directories.server.bin)

  walker.on('file', function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    if (filename.includes('.png')) {
      debug((path.relative(directories.server.root, filename)).verbose)

      var params = [ filename,
        '-strip',
        filename + '.min']

      im.convert(params, function (err, stdout) {
        if (err) {
          callback(Error('Error compressing ' + filename + '. ' + err.message))
        } else {
          // removes original and renames
          fs.unlinkSync(filename)
          fs.renameSync(filename + '.min', filename)
          Bar.tick()
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
  // var numberOfTotalFiles = find.fileSync(/(?<!\.min|vfs_fonts)\.js$$/, directories.bin.client).length

  var numberOfTotalFiles = find.fileSync(/\.jpg$/, directories.server.bin).length
  numberOfTotalFiles += find.fileSync(/\.png$/, directories.server.bin).length

  return numberOfTotalFiles
}
