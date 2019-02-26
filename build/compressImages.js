/* node script to compress and optimize all the images, namely JPG and PNG images, for the web page.
Optimal compression settings were defined by Google from the Page Speed Insights documentation */

console.log('\nRunning script ', __filename, '\n')

const im = require('imagemagick')
const path = require('path')
const fs = require('fs')
const async = require('async')
const walk = require('walk')
const colors = require('colors')

// own module
const commons = require(path.join(__dirname, '..', 'commons'))

var directories = commons.getDirectories()
console.log('bin/: ', directories.server.bin)

// from require('colors');
colors.setTheme(commons.getConsoleColors())

async.parallel([compressJPG, compressPNG], function (err, results) {
  if (err) {
    throw Error(err)
  }
  console.log('All images compressed successfully'.green)
})

// end of script
/* ###############################################################################
################################################################################ */

function compressJPG (callback) {
  console.log(('\n## Compressing JPG files \n').mainOptionStep)

  var walker = walk.walk(directories.server.bin)

  walker.on('file', function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    if (filename.includes('.jpg')) {
      console.log((path.relative(directories.server.root, filename)).verbose.bold)

      var params = [ filename,
        '-sampling-factor', '4:2:0',
        '-strip', '-quality', '85',
        '-interlace', 'Plane',
        '-colorspace', 'RGB',
        filename + '.min']

      im.convert(params, function (err, stdout) {
        if (err) {
          throw err
        }
        // removes original and renames
        fs.unlinkSync(filename)
        fs.renameSync(filename + '.min', filename)
        next()
      })
    } else {
      next()
    }
  })

  walker.on('end', function () {
    console.log('\nAll JPG files compressed\n')
    callback()
  })
}

function compressPNG (callback) {
  console.log(('\n## Compressing PNG files \n').mainOptionStep)

  var walker = walk.walk(directories.server.bin)

  walker.on('file', function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    if (filename.includes('.png')) {
      console.log((path.relative(directories.server.root, filename)).verbose)

      var params = [ filename,
        '-strip',
        filename + '.min']

      im.convert(params, function (err, stdout) {
        if (err) {
          throw err
        }
        // removes original and renames
        fs.unlinkSync(filename)
        fs.renameSync(filename + '.min', filename)
        next()
      })
    } else {
      next()
    }
  })

  walker.on('end', function () {
    console.log('\nAll PNG files compressed\n')
    callback()
  })
}
