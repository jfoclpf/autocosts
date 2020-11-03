/* NodeJS script that minifies files stored in the bin/ folder replacing their content
  with the minfied version, that is, it minifies all js files that will be sent to the client side,
  namely on the build/client/ directory. These are thus .js files that will be sent from
  the server to the client. It also concatenates somes files, for better bandwith performance
*/

// node/npm includes
const fs = require('fs')
const path = require('path')
const async = require('async')
const find = require('find')
const walk = require('walk')
const colors = require('colors')
const debug = require('debug')('build:minifyFiles')

// minification tools
const UglifyJS = require('uglify-js')
const uglifycss = require('uglifycss')
const minifyHTML = require('html-minifier').minify
const jsonminify = require('jsonminify')

// own module
const commons = require(path.join(__dirname, '..', 'commons'))
const directories = commons.getDirectories()

console.log('Running script ' + path.relative(directories.server.root, __filename))

// from require('colors');
colors.setTheme(commons.getConsoleColors())

debug('Minifying files')
const Bar = commons.getProgressBar(getNuberOfTotalFiles() + 1, debug.enabled)

async.parallel([processJSfiles, processCSSFiles, processHTMLfiles, processJSONfiles],
  function (err, results) {
    if (err) {
      console.log(Error(('\nError minifying file.\n' + err.message).error), err)
      process.exit(1) // exit with error immediately
    } else {
      console.log('\nAll files minified successfully'.green)
      process.exitCode = 0 // exit successfully
    }
    Bar.tick({ info: '' })
    Bar.terminate()
  }
)

function processJSfiles (callback) {
  debug(('## Minifying JS files in ' + path.join('build', 'client')).mainOptionStep)

  const walker = walk.walk(directories.bin.client)

  walker.on('file', function (root, fileStats, next) {
    const filename = path.join(root, fileStats.name)

    // gets file extension
    if (getFileExtension(filename) === 'js' &&
           !filename.includes('vfs_fonts.js') &&
           !filename.includes('.min.js')) {
      const code = fs.readFileSync(filename, 'utf-8')

      // file 'Globals.js.hbs' because is a JS file rendered by handlebars
      // needs a special treatment upon minification
      const options = { output: { beautify: false, quote_style: 1 } }
      const result = UglifyJS.minify(code, options)

      if (result.error) {
        callback(Error(`Error minifying file with UglifyJS at ${filename} at line:${result.error.line}, col:${result.error.col}:\n${result.error}`))
        return
      } else {
        const fileRelativePath = path.relative(directories.server.root, filename)
        Bar.tick({ info: fileRelativePath }); debug(fileRelativePath)
        fs.writeFileSync(filename, result.code, 'utf8')
      }
    }
    next()
  })

  walker.on('errors', function (root, nodeStatsArray, next) {
    callback(Error('There was an error with' + nodeStatsArray.name))
  })

  walker.on('end', function () {
    debug('All JS files minified')
    callback()
  })
}

// minifies all css files on the client side, namely on the build/css/ directory,
// i.e., these are CSS files that will be sent from the server to the client
function processCSSFiles (callback) {
  debug(('## Minifying CSS files in build/css/').mainOptionStep)

  const walker = walk.walk(directories.bin.css) // dir to walk into

  walker.on('file', function (root, fileStats, next) {
    const filename = path.join(root, fileStats.name)

    if (filename.includes('.css')) {
      const code = fs.readFileSync(filename, 'utf-8')
      const result = uglifycss.processString(code)

      if (!result) {
        callback(Error('Error minifying file: ' + filename + '.\n'))
        return
      } else {
        const fileRelativePath = path.relative(directories.server.root, filename)
        Bar.tick({ info: fileRelativePath }); debug(fileRelativePath)
        fs.writeFileSync(filename, result, 'utf8')
      }
    }
    next()
  })

  walker.on('errors', function (root, nodeStatsArray, next) {
    callback(Error('There was an error with' + nodeStatsArray.name))
  })

  walker.on('end', function () {
    debug('All CSS files minified')
    callback()
  })
}

// minifies all html handlebars templates .hbs files on the client side,
// namely on the build/views/ directory,
// i.e., these are handlebars .hbs files that will be rendered as HTML files
// and then sent from the server to the client/browser
function processHTMLfiles (callback) {
  debug(('## Minifying HTML .hbs files in build/views/').mainOptionStep)

  const walker = walk.walk(directories.server.bin) // dir to walk into
  walker.on('file', function (root, fileStats, next) {
    const filename = path.join(root, fileStats.name)

    if (getFileExtension(filename) === 'hbs' &&
              !filename.includes('sitemap.hbs') &&
              !filename.includes('.js.hbs') && // excludes js files generated bu handlebars
              !filename.includes('.css.hbs')) { // excludes css files generated bu handlebars
      const code = fs.readFileSync(filename, 'utf-8')

      const result = minifyHTML(code, {
        ignoreCustomFragments: [/{{[{]?(.*?)[}]?}}/, // ignore fragments from handlebars
          /<%[\s\S]*?%>/, // ignore default fragments
          /<\?[\s\S]*?\?>/], // ignore default fragments
        collapseWhitespace: true, // collapse white space that contributes to text nodes in a document tree
        removeComments: true, // strip HTML comments
        removeOptionalTags: true, // remove optional tags http://perfectionkills.com/experimenting-with-html-minifier/#remove_optional_tags
        caseSensitive: true // treat attributes in case sensitive manner (useful for custom HTML tags)
      })

      if (!result) {
        callback(Error('Error minifying file: ' + filename + '.\n'))
        return
      } else {
        const fileRelativePath = path.relative(directories.server.root, filename)
        Bar.tick({ info: fileRelativePath }); debug(fileRelativePath)
        fs.writeFileSync(filename, result, 'utf8')
      }
    }
    next()
  })

  walker.on('errors', function (root, nodeStatsArray, next) {
    callback(Error('There was an error with' + nodeStatsArray.name))
  })

  walker.on('end', function () {
    debug('All html/hbs files minified')
    callback()
  })
}

// minifies all json files on the client side, namely on the build/countries/ directory,
function processJSONfiles (callback) {
  debug(('## Minifying JSON files in build/countries/').mainOptionStep)

  const walker = walk.walk(directories.bin.countries) // dir to walk into

  walker.on('file', function (root, fileStats, next) {
    const filename = path.join(root, fileStats.name)

    if (filename.includes('.json')) {
      const code = fs.readFileSync(filename, 'utf-8')
      const result = jsonminify(code)

      if (!result) {
        callback(Error('Error minifying file: ' + filename + '.\n'))
        return
      } else {
        const fileRelativePath = path.relative(directories.server.root, filename)
        Bar.tick({ info: fileRelativePath }); debug(fileRelativePath)
        fs.writeFileSync(filename, result, 'utf8')
      }
    }
    next()
  })

  walker.on('errors', function (root, nodeStatsArray, next) {
    callback(Error('There was an error with' + nodeStatsArray.name))
  })

  walker.on('end', function () {
    debug('All JSON files minified')
    callback()
  })
}

function getNuberOfTotalFiles () {
  // all *.js files except *.min.js and except *vfs_fonts.js in directories.bin.client
  let numberOfTotalFiles = find.fileSync(/(?<!\.min|vfs_fonts)\.js$$/, directories.bin.client).length

  numberOfTotalFiles += find.fileSync(/\.css$/, directories.bin.css).length

  // all *.hbs files except *sitemap.hbs and except *.js.hbs and except *.css.hbs
  numberOfTotalFiles += find.fileSync(/(?<!sitemap|.js|.css)\.hbs$$/, directories.server.bin).length

  numberOfTotalFiles += find.fileSync(/\.json$/, directories.bin.countries).length

  return numberOfTotalFiles
}

function getFileExtension (fileName) {
  return fileName.split('.').pop()
}
