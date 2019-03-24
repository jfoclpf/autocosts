/*
 File which generates the statistics tables. For each country it generates a html file and a jpg file located at bin/tables
 It uses the PhantomJS script 'build/rasterTables.js' to rasterize these tables into JPEG files
 It does it by using a handlebars statistics table template located at tables/template.hbs.
 With this template it renders for each country two html files, one html temporary file which is used to rasterize the public
 permament JPG file accessible via tables/XX.jpg, and another permanent html file that is publicly accessible via tables/XX.html
*/

// includes
const fs = require('fs')
const path = require('path')
const mysql = require('mysql') // module to get info from database
const sortObj = require('sort-object') // to sort JS objects
const isOnline = require('is-online')
const handlebars = require('handlebars') // see why here: https://stackoverflow.com/a/30032819/1243247
const async = require('async') // module to allow to execute the queries in series
const colors = require('colors')
const childProcess = require('child_process')
const phantomjsPath = require('phantomjs-prebuilt').path // to raster in jpg stats tables
const debug = require('debug')('build:generateTables')

const commons = require(path.join(__dirname, '..', 'commons'))
colors.setTheme(commons.getConsoleColors())

// database variables
var db, DB_INFO

// Global objects
var availableCountries, domainsCountries

commons.init()
// Main directories got from commons
const directories = commons.getDirectories()
const fileNames = commons.getFileNames()
const rootDir = commons.getROOT_DIR() // eslint-disable-line
var settings = commons.getSettings()

console.log('Running script ' + path.relative(directories.server.root, __filename))

// progress bar
var Bar

// checks for internet connection
isOnline().then(function (online) {
  if (!online) {
    console.log('ERROR: no Internet connection'.red.bold)
    process.exit(1) // exit with error
  }

  DB_INFO = settings.database.credentials
  // detect for null or empty object
  if (!DB_INFO || Object.keys(DB_INFO).length === 0) {
    throw commons.getDataBaseErrMsg(__filename, settings.database)
  }
  debug(DB_INFO)

  // getting country information from
  debug('Get Countries info from: ' + fileNames.project.countriesInfoFile)
  var countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesInfoFile, 'utf8'))
  availableCountries = countriesInfo.availableCountries // global
  domainsCountries = countriesInfo.domainsCountries

  // sorts array of countries
  availableCountries = sortObj(availableCountries)
  delete availableCountries.XX

  var numberOfCountries = Object.keys(availableCountries).length
  Bar = commons.getProgressBar((numberOfCountries * 3 + 2) + 1, debug.enabled)

  async.series([dbConnect, createTables, dbEnd, rasterTables],
    function (err, results) {
      if (err) {
        console.log(('There was an error: ' + err.message).error)
        process.exit(1)
      }
      Bar.tick({ info: '' })
      Bar.terminate()
      debug('Creation of html tables and rasterization of jpg tables successfully completed'.green)
      process.exit(0) // exit successfully
    }
  )
// catch in case not online
}).catch(function (err) {
  console.log(err)
  process.exit(1)
})

// main function from async.series([dbConnect, createTables, dbEnd, rasterTables])
function dbConnect (next) {
  db = mysql.createConnection(DB_INFO)
  db.connect(function (err) {
    if (err) {
      next(Error('Error connecting to database: ' + err.message))
    } else {
      debug('\n', ('User ' + DB_INFO.user + ' connected successfully to database ' +
        DB_INFO.database + ' at ' + DB_INFO.host).green, '\n')
      next()
    }
  })
}

// main function from async.series([dbConnect, createTables, dbEnd, rasterTables])
function createTables (next) {
  Bar.tick({ info: 'Creating html files' })

  debug('Creating html tables on ', directories.bin.tables)
  var countryCodesArray = Object.keys(availableCountries) // ['PT', 'US', 'AU', etc.]

  // async.each runs tasks in parallel
  async.each(countryCodesArray, createTable, function (err) {
    if (err) {
      db.end()
      next(Error('Error creating tables: ' + err.message))
    } else {
      debug('All html tables created')
      next()
    }
  })
}

// creates for each country two html files
function createTable (CC, callback) {
  var countryName = availableCountries[CC]
  var words = JSON.parse(fs.readFileSync(path.join(directories.src.countries, CC + '.json'), 'utf8'))

  var dbQuery = 'SELECT * FROM ' + DB_INFO.db_tables.monthly_costs_statistics + " WHERE countryCode='" + CC + "'"
  db.query(dbQuery, function (err, results, fields) {
    if (err) {
      let errMsg = 'Error inserting query for ' + CC + '. ' + err.message
      callback(Error(errMsg))
      return // this MUST be here, see https://caolan.github.io/async/
    }

    var statsData = results[0]
    debug(statsData)

    var fileNameOfTemplate = path.join(directories.src.tables, 'template.hbs')
    var templateRawData = fs.readFileSync(fileNameOfTemplate, 'utf8')

    // external files to be used by the template; that is, register Partials
    var partialsDir = path.join(directories.bin.views, 'common', 'svgIcons')
    var filenames = fs.readdirSync(partialsDir)
    filenames.forEach(function (filename) {
      var matches = /^([^.]+).hbs$/.exec(filename)
      if (!matches) {
        return
      }
      var name = matches[1]
      var template = fs.readFileSync(path.join(partialsDir, filename), 'utf8')
      handlebars.registerPartial(name, template)
    })

    // to convert long numbers to decimal, ex: 1.2222222 to "1.2"
    var toFixed = function (num, n) {
      if (num && !isNaN(num)) {
        return num.toFixed(n)
      } else {
        return ''
      }
    }
    handlebars.registerHelper('toFixed', toFixed)

    var hbsTemplate = handlebars.compile(templateRawData)

    var data = {
      'countryCode': CC,
      'countryName': countryName,
      'availableCountries': availableCountries,
      'fileNames': fileNames,
      'statsData': statsData,
      'words': words,
      'domain': domainsCountries[CC]
    }

    var dataHtml = Object.assign({}, data) // clone object
    var dataJpg = Object.assign({}, data) // clone object

    // check tables/template.hbs
    dataHtml.isHtmlPage = true
    dataJpg.isJpgImage = true

    var resultForHtmlPage = hbsTemplate(dataHtml)
    var resultForJpgImage = hbsTemplate(dataJpg)

    var htmlPermanentFilePath = path.join(directories.bin.tables, CC + '.htm')
    var htmlFilePathToRenderInJpg = path.join(directories.bin.tables, CC + 'jpg.htm')

    async.parallel([
      // writes html file
      function (fsWriteCallback) {
        fs.writeFile(htmlPermanentFilePath, resultForHtmlPage, 'utf8', function (err) {
          if (err) {
            let errMsg = 'Error creating html permanent file ' + htmlPermanentFilePath + '. ' + err.message
            fsWriteCallback(Error(errMsg))
          } else {
            let filePathRelative = path.relative(rootDir, htmlPermanentFilePath)
            Bar.tick({ info: filePathRelative }); debug(filePathRelative)
            fsWriteCallback()
          }
        })// fs.writeFile
      },

      // writes temporary html file to render jpg
      function (fsWriteCallback) {
        fs.writeFile(htmlFilePathToRenderInJpg, resultForJpgImage, 'utf8', function (err) {
          if (err) {
            let errMsg = 'Error creating temporary html (for jpg) file ' + htmlFilePathToRenderInJpg + '. ' + err.message
            fsWriteCallback(Error(errMsg))
          } else {
            let filePathRelative = path.relative(rootDir, htmlFilePathToRenderInJpg)
            Bar.tick({ info: filePathRelative }); debug(filePathRelative)
            fsWriteCallback()
          }
        })// fs.writeFile
      }
    ],
    function (err, results) {
      if (err) {
        callback(Error(err.message))
      } else {
        callback()
      }
    })
  }) // db.query
}
// eof createTable

// main function from async.series([dbConnect, createTables, dbEnd, rasterTables])
function dbEnd (next) {
  db.end(function (err) {
    if (err) {
      next(Error('Error ending connection' + err.message))
    } else {
      next()
    }
  })
}

// main function from async.series([dbConnect, createTables, dbEnd, rasterTables])
// Runs PhantomJS script to raster the tables, only after the HTML.hbs generation was completed
function rasterTables (next) {
  debug('Rasterizing JPG tables using phantomjs')
  debug('phantomjs path: ' + phantomjsPath + '\n')

  Bar.tick({ info: 'Rastering tables' })

  var countryCodesArray = Object.keys(availableCountries) // ['PT', 'US', 'AU', etc.]

  async.each(countryCodesArray, rasterTable, function (err, results) {
    if (err) {
      next(Error('Error rasterizing tables: ' + err.message))
    } else {
      debug('All tables created')
      next()
    }
  })
}

function rasterTable (CC, callback) {
  let htmlTempFilePath = path.join(directories.bin.tables, CC + 'jpg.htm')
  let imageFilePath = path.join(directories.bin.tables, CC + '.jpg')

  if (!path.isAbsolute(htmlTempFilePath) || !path.isAbsolute(imageFilePath)) {
    console.log(htmlTempFilePath, imageFilePath, ':: either of these paths is not an absolute path')
    process.exit(1) // exit with error
  }

  let childArgs = [
    path.join(__dirname, 'rasterTables.js'), // phantomJS script
    htmlTempFilePath,
    imageFilePath
  ]

  childProcess.execFile(phantomjsPath, childArgs, function (err, stdout, stderr) {
    if (err) {
      let errMsg = 'Error exectuing phantomJS\n' + stdout
      errMsg += 'Try also rebuilding phantomjs module with: ' + 'npm rebuild phantomjs-prebuilt'.bold + '\n'
      errMsg += err.message
      callback(Error(errMsg))
      return
    }
    debug((path.relative(rootDir, childArgs[1]) + ' => ' + path.relative(rootDir, childArgs[2])).verbose)

    // delete jpg.html file because it was temporary and merely to render jpg file
    fs.unlink(childArgs[1], function (err) {
      if (err) {
        callback(Error('error deleting file ' + childArgs[1] + '. ' + err.message))
      } else {
        let filePathRelative = path.relative(rootDir, imageFilePath)
        Bar.tick({ info: filePathRelative }); debug(filePathRelative)
        callback()
      }
    })
  })
}
