/* NodeJS script that minifies files stored in the bin/ folder replacing their content
  with the minfied version, that is, it minifies all js files that will be sent to the client side,
  namely on the build/client/ directory. These are thus .js files that will be sent from
  the server to the client. It also concatenates somes files, for better bandwith performance
*/

console.log('\nRunning script ', __filename, '\n')

// node/npm includes
const fs = require('fs')
const path = require('path')
const async = require('async')
const walk = require('walk')
const colors = require('colors')

// minification tools
const UglifyJS = require('uglify-js')
const uglifycss = require('uglifycss')
const minifyHTML = require('html-minifier').minify
const jsonminify = require('jsonminify')

// own module
const commons = require(path.join(__dirname, '..', 'commons'))

// Main directories got from commons
var directories = commons.getDirectories()
var ROOT_DIR = directories.server.root
var BIN_DIR = directories.server.bin

// from require('colors');
colors.setTheme(commons.getConsoleColors())

console.log('Minifying files')

async.parallel([processJSfiles, processCSSFiles, processHTMLfiles, processJSONfiles],
  function (err, results) {
    console.log() // adds a breakline
    if (err) {
      console.log(Error(err))
      process.exit(1) // exit with error
    }
    console.log('All files minified successfully'.green)
    process.exit(0) // exit successfully
  }
)

function processJSfiles (callback) {
  console.log(('## Minifying JS files in ' + path.join('build', 'client')).mainOptionStep)

  var walker = walk.walk(path.join(BIN_DIR, directories.client.client))

  walker.on('file', function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    // gets file extension
    if (getFileExtension(filename) === 'js' &&
           !filename.includes('vfs_fonts.js') &&
           !filename.includes('.min.js')) {
      console.log((path.relative(ROOT_DIR, filename)).verbose) // removes base directory from file name
      var code = fs.readFileSync(filename, 'utf-8')

      // file 'Globals.js.hbs' because is a JS file rendered by handlebars
      // needs a special treatment upon minification
      var options = { output: { beautify: false, quote_style: 1 } }
      var result = UglifyJS.minify(code, options)

      if (result.error) {
        console.log('ERROR minifying JS file ', filename, result.error, '\n')
        callback(Error(result.error))
      } else {
        fs.writeFileSync(filename, result.code, 'utf8')
      }
    }

    next()
  })

  walker.on('errors', function (root, nodeStatsArray, next) {
    callback(Error('There was an error with' + nodeStatsArray.name))
  })

  walker.on('end', function () {
    console.log('All JS files minified')
    callback()
  })
}

// minifies all css files on the client side, namely on the build/css/ directory,
// i.e., these are CSS files that will be sent from the server to the client
function processCSSFiles (callback) {
  console.log(('## Minifying CSS files in build/css/').mainOptionStep)

  var walker = walk.walk(directories.bin.css)// dir to walk into

  walker.on('file', function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    if (filename.includes('.css')) {
      console.log((path.relative(ROOT_DIR, filename)).verbose)

      var code = fs.readFileSync(filename, 'utf-8')
      var result = uglifycss.processString(code)

      if (!result) {
        console.log(('ERROR minifying CSS file ', filename, '\n').error)
        callback(Error(result.error))
      } else {
        fs.writeFileSync(filename, result, 'utf8')
      }
    }

    next()
  })

  walker.on('errors', function (root, nodeStatsArray, next) {
    callback(Error('There was an error with' + nodeStatsArray.name))
  })

  walker.on('end', function () {
    console.log('All CSS files minified')
    callback()
  })
}

// minifies all html handlebars templates .hbs files on the client side,
// namely on the build/views/ directory,
// i.e., these are handlebars .hbs files that will be rendered as HTML files
// and then sent from the server to the client/browser
function processHTMLfiles (callback) {
  console.log(('## Minifying HTML .hbs files in build/views/').mainOptionStep)

  var walker = walk.walk(directories.server.bin)// dir to walk into
  walker.on('file', function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    if (getFileExtension(filename) === 'hbs' &&
              !filename.includes('sitemap.hbs') &&
              !filename.includes('.js.hbs') && // excludes js files generated bu handlebars
              !filename.includes('.css.hbs')) { // excludes css files generated bu handlebars
      console.log((path.relative(ROOT_DIR, filename)).verbose)

      var code = fs.readFileSync(filename, 'utf-8')

      var result = minifyHTML(code, {
        ignoreCustomFragments: [/{{[{]?(.*?)[}]?}}/, // ignore fragments from handlebars
          /<%[\s\S]*?%>/, // ignore default fragments
          /<\?[\s\S]*?\?>/ ], // ignore default fragments
        collapseWhitespace: true, // collapse white space that contributes to text nodes in a document tree
        removeComments: true, // strip HTML comments
        removeOptionalTags: true, // remove optional tags http://perfectionkills.com/experimenting-with-html-minifier/#remove_optional_tags
        caseSensitive: true // treat attributes in case sensitive manner (useful for custom HTML tags)
      })

      if (!result) {
        console.log('ERROR minifying .hbs file ', filename, '\n')
        callback(Error(result.error))
      } else {
        fs.writeFileSync(filename, result, 'utf8')
      }
    }

    next()
  })

  walker.on('errors', function (root, nodeStatsArray, next) {
    callback(Error('There was an error with' + nodeStatsArray.name))
  })

  walker.on('end', function () {
    console.log('All html/hbs files minified')
    callback()
  })
}

// minifies all json files on the client side, namely on the build/countries/ directory,
function processJSONfiles (callback) {
  console.log(('## Minifying JSON files in build/countries/').mainOptionStep)

  var walker = walk.walk(directories.bin.countries)// dir to walk into

  walker.on('file', function (root, fileStats, next) {
    var filename = path.join(root, fileStats.name)

    if (filename.includes('.json')) {
      console.log((path.relative(ROOT_DIR, filename)).verbose)

      var code = fs.readFileSync(filename, 'utf-8')
      var result = jsonminify(code)

      if (!result) {
        console.log(('ERROR minifying JSON file ', filename, '\n').error)
        callback(Error(result.error))
      } else {
        fs.writeFileSync(filename, result, 'utf8')
      }
    }

    next()
  })

  walker.on('errors', function (root, nodeStatsArray, next) {
    callback(Error('There was an error with' + nodeStatsArray.name))
  })

  walker.on('end', function () {
    console.log('All JSON files minified')
    callback()
  })
}

function getFileExtension (fileName) {
  return fileName.split('.').pop()
}
