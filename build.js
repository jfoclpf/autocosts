/* Building script */

const commandLineArgs = require('command-line-args')
const colors = require('colors')
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const async = require('async') // module to allow to execute the queries in series
const concat = require('concat-files') // concatenation file tool

const commons = require(path.join(__dirname, 'commons'))

// basic command line settings
// the order is important, since when several options are present, the order is mantained
// Therefore keep this order
const optionDefinitions = [
  /* With these options it may run just locally */
  { name: 'copy', alias: 'c', type: Boolean },
  { name: 'compressImgs', alias: 'i', type: Boolean },
  { name: 'minify', alias: 'm', type: Boolean },

  /* With these options it needs internet connection to a server's Database */
  { name: 'release', alias: 'r', type: String },
  { name: 'specDB', alias: 's', type: Boolean },
  { name: 'refreshDB', alias: 'd', type: Boolean },
  { name: 'genTables', alias: 't', type: Boolean },

  /* ### */
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'All', alias: 'A', type: Boolean }
]

// get set options from command line arguments
let options
try {
  options = commandLineArgs(optionDefinitions)
  // this "option" object is just filled with the options that were inserted in the command line
  // console.log(options);
} catch (err) {
  console.log('Unknown option: ' + err.optionName)
  options = { help: true }
}

// check if --help was selected
if (options.help) {
  console.log(getArgvHelpMsg())
  process.exit()
}

// if --All was selected select all
if (options.All) {
  options.copy = true
  options.compressImgs = true
  options.minify = true
  options.specDB = true
  options.refreshDB = true
  options.genTables = true
}

let release = options.release
// check that release was correctly chosen
if (release !== 'dev' && release !== 'prod' && release !== 'test') {
  release = 'dev'
}

const debug = require('debug')(release + ':build')

console.log(("Release: '" + release + "'").mainOption)
const RELEASE = release // set Global variable

commons.setRelease(RELEASE)
// these calls must be called after setRelease()
const directories = commons.getDirectories()
const filenames = commons.getFileNames()

// from require('colors');
colors.setTheme(commons.getConsoleColors())

// makes sure the build.js script is called from this own directory
// (problems regarding the PhantomJS script which messes with relative paths)
const runDir = process.cwd() // directory from where the script is called
const diffDir = path.relative(runDir, directories.server.root)
if (diffDir !== '' && diffDir !== '.') {
  console.error('You must call this building script from within the directory where this file is located: ' + directories.server.root)
  console.error('Do first ' + ('cd ' + path.relative(runDir, directories.server.root)).blue + ' and then call this script again.')
  process.exit(1) // exit with error
}

// method that forces several methods to run synchronously
async.series([
  // copy new version from src/ to bin/
  function (callback) {
    if (options.copy) {
      copy()
      concatCSSFiles(callback)
    } else {
      callback()
    }
  },

  // Creates databse with countries' specifcations
  function (callback) {
    if (options.specDB) {
      specDB()
    }
    callback()
  },

  // Refreshes statistical costs databse
  function (callback) {
    if (options.refreshDB) {
      refreshDB()
    }
    callback()
  },

  // Generates statistical tables
  function (callback) {
    if (options.genTables) {
      genTables()
    }
    callback()
  },

  // Minify code
  function (callback) {
    if (options.minify) {
      minify()
    }
    callback()
  },

  // compress images
  function (callback) {
    if (options.compressImgs) {
      compressImgs()
    }
    process.exitCode = 0 // exiting correctly
    callback()
  }

])// async.series

// copies all files from src/ to bin/
// copyies also files from npm packages to bin/, according to the object "npmFilesToImport" in package.json
function copy () {
  debug('\n' + ('# --' + optionDefinitions[0].name).mainOption)
  console.log('Making a clean copy from src/ to bin/')

  // deletes fully the directory and creates empty one
  fse.removeSync(directories.server.bin) // equivalent in Unix to "rm -rf"
  fs.mkdirSync(directories.server.bin)

  fse.copySync(directories.server.src, directories.server.bin)

  console.log('Files from src/ to bin/ copied successfully'.green)

  console.log('Copying npm packages files to bin/')

  // copying files from npm packages, according to the object "npmFilesToImport" in package.json
  const copiedNpmPackages = []

  const packageJsonFile = path.join(directories.server.root, 'package.json')
  const rawdata = fs.readFileSync(packageJsonFile, 'utf8')

  let npmFilesToImport
  try {
    npmFilesToImport = JSON.parse(rawdata).npmFilesToImport
  } catch (err) {
    console.log(err)
    console.log(colors.red('\n package.json has syntax errors\n'))
    console.log(rawdata)
    process.exit(1)
  }

  // copies one file, from an npm package, to the bin directory
  const copyFile = function (npmPackage, // oficial name of the npm package from which the file is to be copied from
    fileRelativePath, // file path with respect to the main directory of the npm package (node_modules/<package>/)
    destFilePath) { // file's path to where it is copied, relative to the project bin/ directory
    // trick to get the npm module main directory
    // https://stackoverflow.com/a/49455609/1243247
    const packageDirFullpath = path.dirname(require.resolve(path.join(npmPackage, 'package.json')))

    fse.copySync(path.join(packageDirFullpath, fileRelativePath), path.join(directories.server.bin, destFilePath))

    const packageDirRelativepath = path.relative(path.dirname(path.dirname(packageDirFullpath)), packageDirFullpath)
    const consoleMsg = npmPackage + ': ' + (path.join(packageDirRelativepath, fileRelativePath)).verbose + ' -> ' +
            (path.join(path.relative(path.dirname(directories.server.bin), directories.server.bin), destFilePath)).verbose

    debug(consoleMsg)
    copiedNpmPackages.push(npmPackage)
  }

  const throwJsonError = function (msg) {
    if (msg) {
      console.log(colors.red(msg), '\n')
    }
    console.log(colors.red(`JSON file "${packageJsonFile}" has good syntax but fails template, see readme on https://www.npmjs.com/package/cordova-import-npm`))
    process.exit(1)
  }

  for (const npmPackage in npmFilesToImport) {
    const npmFiles = npmFilesToImport[npmPackage]

    if (!Array.isArray(npmFiles) && typeof npmFiles === 'object') {
      // in case just one file is copied for the npm package
      if (!(Array.isArray(npmFiles.from) || typeof npmFiles.from === 'string')) {
        throwJsonError(`Path "${npmFiles.from}" related to package ${npmPackage} must be string or array`)
      }
      if (!(Array.isArray(npmFiles.to) || typeof npmFiles.to === 'string')) {
        throwJsonError(`Path "${npmFiles.to}" related to package ${npmPackage} must be string or array`)
      }

      copyFile(npmPackage,
        Array.isArray(npmFiles.from) ? path.join.apply(this, npmFiles.from) : npmFiles.from,
        Array.isArray(npmFiles.to) ? path.join.apply(this, npmFiles.to) : npmFiles.to
      )
    } else if (Array.isArray(npmFiles)) {
      // in case several files are copied for the npm package
      for (let i = 0; i < npmFiles.length; i++) {
        const npmFilesI = npmFiles[i]

        if (!(Array.isArray(npmFilesI.from) || typeof npmFilesI.from === 'string')) {
          throwJsonError(`Path "${npmFilesI.from}" related to package ${npmPackage} must be string or array`)
        }
        if (!(Array.isArray(npmFilesI.to) || typeof npmFilesI.to === 'string')) {
          throwJsonError(`Path "${npmFilesI.to}" related to package ${npmPackage} must be string or array`)
        }

        copyFile(npmPackage,
          Array.isArray(npmFilesI.from) ? path.join.apply(this, npmFilesI.from) : npmFilesI.from,
          Array.isArray(npmFilesI.to) ? path.join.apply(this, npmFilesI.to) : npmFilesI.to
        )
      }
    } else {
      console.log(colors.red(`JSON file "${packageJsonFile}" has good syntax but fails "npmFilesToImport" object template`))
      process.exit(1)
    }
  }

  // get array of unique elements
  const npmPackages = Array.from(new Set(copiedNpmPackages))
  process.stdout.write('Copied: '.green)
  const len = npmPackages.length
  for (let i = 0; i < len; i++) {
    // prints '[a, b, c]'
    process.stdout.write((i === 0 ? '[' : '') + npmPackages[i] + (i !== len - 1 ? ', ' : ']'))
  }
  process.stdout.write('\n\n')
}

// concatenate some CSS files
function concatCSSFiles (mainCallback) {
  console.log('Concatenating CSS files')

  // CSS files to be concatenated,
  // the ones which are needed for initial main page loading
  const files1Arr = [
    'style.css', 'responsive.css', 'fonts.css'
  ]
  // name given to the merged file
  const files1MergedName = 'mergedInit.css'

  // CSS files to be concatenated,
  // the ones which are deferred from initial loading
  // loaded through JS on client/main.js
  const files2Arr = [
    'colors.css', 'results.css', 'smart-app-banner.css'
  ]
  // name given to the merged file
  const files2MergedName = 'mergedDeferred.css'

  /*************************************************************/

  const CSS_DIR = directories.bin.css

  // joins the CSS dir
  const files1ArrFullPath = []
  for (let i = 0; i < files1Arr.length; i++) {
    files1ArrFullPath[i] = path.join(CSS_DIR, files1Arr[i])
  }
  const files2ArrFullPath = []
  for (let i = 0; i < files2Arr.length; i++) {
    files2ArrFullPath[i] = path.join(CSS_DIR, files2Arr[i])
  }

  // concatenating files
  async.series([
    function (callback) {
      concat(files1ArrFullPath, path.join(CSS_DIR, files1MergedName),
        function (err) {
          if (err) { throw err };

          // builds console.log msg
          let consoleMsg = 'Merged file ' + files1MergedName.magenta.bold + ' from: '
          for (let i = 0; i < files1Arr.length; i++) {
            consoleMsg += files1Arr[i].magenta.bold + (i === files1Arr.length - 1 ? '.' : (i === files1Arr.length - 2 ? ' and ' : ', '))
          }
          console.log(consoleMsg)

          callback()
        }
      )
    },
    function (callback) {
      concat(files2ArrFullPath, path.join(CSS_DIR, files2MergedName),
        function (err) {
          if (err) { throw err };

          // builds console.log msg
          let consoleMsg = 'Merged file ' + files2MergedName.magenta.bold + ' from: '
          for (let i = 0; i < files2Arr.length; i++) {
            consoleMsg += files2Arr[i].magenta.bold + (i === files1Arr.length - 1 ? '.' : (i === files1Arr.length - 2 ? ' and ' : ', '))
          }
          console.log(consoleMsg)

          callback()
        }
      )
    },
    function () {
      mainCallback()
    }
  ])// async.series
}

// -i compress [i]mages, jpg and png files in bin/ | with ImageMagick
function compressImgs () {
  // the compressImages script does not work on windows, due to imagemagick package
  if (process.platform === 'win32') {
    return
  }

  debug('\n' + ('# --' + optionDefinitions[1].name).mainOption)
  console.log('Compress images in jpg and png files')
  commons.runNodeScriptSync(filenames.build.compressImages)
}

// -m  [m]inify js, json, css and html files in bin/ | with npm: minifier, html-minifier, uglifycss and json-minify
function minify () {
  debug('\n' + ('# --' + optionDefinitions[2].name).mainOption)
  console.log('Minify js, html/hbs, css and json files')

  commons.runNodeScriptSync(filenames.build.minifyFiles)
}

/* With these options it needs internet connection to a server's Database */

// -s  creates a Database with countries' [s]pecifcations  connection to a Database
function specDB () {
  debug('\n' + ('# --' + optionDefinitions[4].name).mainOption)
  console.log('Creates database with countries specifcations')

  commons.runNodeScriptSync(filenames.build.setCountrySpecsDB, ['--database'])
}

// -d refreshes the statistical costs [d]atabase | connection to the countries' specifcations Database
function refreshDB () {
  debug('\n' + ('# --' + optionDefinitions[5].name).mainOption)
  console.log('Refreshes statistical costs database')

  commons.runNodeScriptSync(filenames.build.getAvgFromDB, ['--database'])
}

// -t generate html and jpeg stats [t]ables in bin/ | based on the statistical costs Database
function genTables () {
  debug('\n' + ('# --' + optionDefinitions[6].name).mainOption)
  console.log('Generating statistical html and jpg tables')
  commons.runNodeScriptSync(filenames.build.generateTables, ['--database'])
}

function getArgvHelpMsg () {
  const filename = path.basename(process.mainModule.filename)

  const messg = '\n' +
                'Example: \n' +
                'node ' + filename + ' -cim \n' +
                'node ' + filename + ' -A -r prod \n' +
                '\n' +
                '# With these options it may run just locally\n' +
                '-c  --copy          makes a [c]lean copy from src/ to bin/                need to be done on the 1st time \n' +
                '-i  --compressImgs  compress [i]mages, jpg and png files in bin/          with ImageMagick \n' +
                '-m  --minify        [m]inify js, json, css and html files in bin/         with npm: minifier, html-minifier, uglifycss and json-minify \n' +
                '\n\n' +
                "# With these options it needs internet connection to a server's Database\n" +
                '-r  --release       selects Database [r]elease ("dev", "test" or "prod")  Database credentials in directory credentials/\n' +
                "-s  --specDB        creates a Database with countries' [s]pecifications   connection to a Database\n" +
                "-d  --refreshDB     refreshes the statistical costs [d]atabase            connection to the countries' specifcations Database \n" +
                '-t  --genTables     generate jpeg stats [t]ables in bin/                  based on the statistical costs Database \n' +
                '\n' +
                '-A  --All           enables [a]ll previous options\n' +
                '-h  --help          (this output) \n\n'

  return messg
}
