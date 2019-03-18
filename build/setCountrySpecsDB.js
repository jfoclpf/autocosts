/* script that populates a country database with specifications for each country
   namely the standard distance (km, miles, etc.), fuel amount (ltr, gal, etc.) and
   fuel efficiency (l/100km, km/l, mpg(imp), etc.) */

console.log("Populating the 'countries specs database' with information from the countries files")

// includes
const fs = require('fs')
const path = require('path')
const async = require('async') // module to allow to execute the queries in series
const mysql = require('mysql') // module to get info from database
const sortObj = require('sort-object') // to sort JS objects
const isOnline = require('is-online')
const colors = require('colors') // eslint-disable-line
const debug = require('debug')('build:setCountrySpecsDB')

const commons = require(path.join(__dirname, '..', 'commons'))

// database variables
var db, DB_INFO

// Object
var availableCountries

commons.init()
// Main directories got from commons
const directories = commons.getDirectories()
const settings = commons.getSettings()

console.log('Running script ' + path.relative(directories.server.root, __filename))

var Bar = commons.getProgressBar(commons.getNumberOfCountries() + 5, debug.enabled)

// checks for internet connection
isOnline().then(function (online) {
  if (!online) {
    console.log('ERROR: no Internet connection'.red.bold)
    process.exit(1) // exit with error
  }

  DB_INFO = settings.dataBase.credentials
  // detect for null or empty object
  if (!DB_INFO || Object.keys(DB_INFO).length === 0) {
    throw commons.getDataBaseErrMsg(__filename, settings.dataBase)
  }
  debug(DB_INFO)

  // getting country information from
  const fileNames = commons.getFileNames()

  // getting country information from
  debug('\nGet Countries info from: ' + fileNames.project.countriesListFile)
  var countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesListFile, 'utf8'))
  availableCountries = countriesInfo.availableCountries

  // sorts array of countries
  availableCountries = sortObj(availableCountries)
  delete availableCountries.XX

  async.series([dbConnects, createTable, createTableKey, populatesTable, dbEnd],
    function (err, results) {
      if (err) {
        console.log(err.message)
        process.exit(1)
      }
      Bar.tick({ info: '' })
      Bar.terminate()
      console.log('Countries specifications and standards inserted successfully into respective database'.green)
      process.exit(0) // exit successfully
    }
  )
  // end of async
  // if not online
}).catch(function (err) {
  console.log(err)
  process.exit(1) // with error
})

// main function of async.series([dbConnects, createTable, createTableKey, populatesTable, dbEnd])
function dbConnects (next) {
  db = mysql.createConnection(DB_INFO)
  db.connect(function (err) {
    if (err) {
      next(Error('Error connecting to database: ' + err.message))
    } else {
      debug(('User ' + DB_INFO.user + ' connected successfully to database ' +
        DB_INFO.database + ' at ' + DB_INFO.host).green)
      Bar.tick()
      next()
    }
  })
}

// main function of async.series([dbConnects, createTable, createTableKey, populatesTable, dbEnd])
// creates table if nonexistent
function createTable (next) {
  debug('Creating table if nonexistent: ' + DB_INFO.database + '->' + DB_INFO.db_tables.country_specs.mainOption +
                    ' ' + 'before populating it with country specs')

  var queryCreate = 'CREATE TABLE IF NOT EXISTS ' + DB_INFO.db_tables.country_specs +
      ' ( ' +
        'Country VARCHAR(2), ' +
        'currency VARCHAR(3), ' +
        'distance_std int(11), ' +
        'fuel_efficiency_std int(11), ' +
        'fuel_price_volume_std int(11)' +
      ')'

  db.query(queryCreate, function (err, results, fields) {
    if (err) {
      db.end()
      next(Error('Error on db query (creatign table): ' + err.message))
    } else {
      Bar.tick()
      next()
    }
  })
}

// main function of async.series([dbConnects, createTable, createTableKey, populatesTable, dbEnd])
function createTableKey (next) {
  debug('Creating table keys')

  var querySetKey = 'CREATE UNIQUE INDEX `Country` ON ' + DB_INFO.db_tables.country_specs + '(`Country`);'

  var dbQuery = querySetKey
  db.query(dbQuery, function (err, results, fields) {
    if (err) {
      debug('Keys were already present')
    } else {
      debug('Keys created')
    }
    Bar.tick()
    next()
  })
}

// main function of async.series([dbConnects, createTable, createTableKey, populatesTable, dbEnd])
function populatesTable (next) {
  var countryCodesArray = Object.keys(availableCountries) // ['PT', 'US', 'AU', etc.]

  async.each(countryCodesArray, queryForCC, function (err, results) {
    if (err) {
      db.end(function (errDbEnd) {
        if (errDbEnd) {
          next(Error('Error inserting query\n' + errDbEnd.message + '\n' + err.message))
        } else {
          next(Error('Error inserting query\n' + err.message))
        }
      })
    } else {
      debug('All insert queries executed successfully')
      Bar.tick()
      next()
    }
  })
}

function queryForCC (CC, callback) {
  var WORDS = JSON.parse(fs.readFileSync(path.join(directories.src.countries, CC + '.json'), 'utf8'))

  var queryCC = 'REPLACE INTO ' + DB_INFO.db_tables.country_specs + ' ( ' +
    'Country, ' +
    'currency, ' +
    'distance_std, ' +
    'fuel_efficiency_std, ' +
    'fuel_price_volume_std ' +
    ') ' +
    'VALUES ( ' +
    '"' + CC + '", ' +
    '"' + WORDS.curr_code + '", ' +
    WORDS.distance_std_option + ', ' +
    WORDS.fuel_efficiency_std_option + ', ' +
    WORDS.fuel_price_volume_std +
    ')'

  db.query(queryCC, function (err, results, fields) {
    if (err) {
      callback(Error('Error inserting query for ' + CC + '. ' + err.message))
    } else {
      debug('Inserting query for ' + CC)
      Bar.tick({ info: CC })
      callback()
    }
  })
}

// main function of async.series([dbConnects, createTable, createTableKey, populatesTable, dbEnd])
function dbEnd (next) {
  db.end(function (err) {
    if (err) {
      next(Error('Error ending connection' + err.message))
    } else {
      Bar.tick()
      next()
    }
  })
}
