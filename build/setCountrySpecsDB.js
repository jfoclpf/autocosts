/* script that populates a country database with specifications for each country
   namely the standard distance (km, miles, etc.), fuel amount (ltr, gal, etc.) and
   fuel efficiency (l/100km, km/l, mpg(imp), etc.) */

console.log("Populating the 'countries specs DB' with information from the countries files")
console.log('\nRunning script ', __filename, '\n')

// includes
const fs = require('fs')
const path = require('path')
const async = require('async') // module to allow to execute the queries in series
const mysql = require('mysql') // module to get info from DB
const sortObj = require('sort-object') // to sort JS objects
const isOnline = require('is-online')
const colors = require('colors') // eslint-disable-line

const commons = require(path.join(__dirname, '..', 'commons'))

// database variables
var db, DB_INFO

// Object
var availableCountries

commons.init()
// Main directories got from commons
var directories = commons.getDirectories()
var settings = commons.getSettings()

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
  console.log(DB_INFO)

  // getting country information from
  const fileNames = commons.getFileNames()

  // getting country information from
  console.log('\nGet Countries info from: ' + fileNames.project.countriesListFile)
  var countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesListFile, 'utf8'))
  availableCountries = countriesInfo.availableCountries

  // sorts array of countries
  availableCountries = sortObj(availableCountries)
  delete availableCountries.XX

  async.series([dbConnects, deletesTable, populatesTable, dbEnd],
    function (err, results) {
      if (err) {
        console.log(err.message)
        process.exit(1)
      }
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

// main function of async.series([dbConnects, deletesTable, populatesTable]
function dbConnects (next) {
  db = mysql.createConnection(DB_INFO)
  db.connect(function (err) {
    if (err) {
      next(Error('Error connecting to database: ' + err.message))
    }
    console.log('User ' + DB_INFO.user +
                        ' connected successfully to DB ' + DB_INFO.database +
                        ' at ' + DB_INFO.host)
    next()
  })
}

// main function of async.series([dbConnects, deletesTable, populatesTable, dbEnd]
// delete table before populate it
function deletesTable (next) {
  console.log('Deleting DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.country_specs +
                    ' ' + 'before populating it with country specs')

  db.query('DELETE FROM ' + DB_INFO.db_tables.country_specs, function (err, results, fields) {
    if (err) {
      db.end()
      next(Error('Error on db query' + err.message))
    }
    // console.log(countries);
    console.log('Previous data deleted from table')
    next()
  })
}

// main function of async.series([dbConnects, deletesTable, populatesTable, dbEnd]
function populatesTable (next) {
  var countryCodesArray = Object.keys(availableCountries) // ['PT', 'US', 'AU', etc.]
  var numberOfCountries = countryCodesArray.length

  var createFunctionForAsync = function (CC) {
    return function (callback) {
      queryForCC(CC, callback)
    }
  }

  var functionsArray = []
  for (let i = 0; i < numberOfCountries; i++) {
    let CC = countryCodesArray[i]
    functionsArray.push(createFunctionForAsync(CC))
  }

  async.parallel(functionsArray, function (err, results) {
    if (err) {
      db.end()
      next(Error('Error inserting query: ' + err.message))
    }
    console.log('\nTable created')
    next()
  })
}

function queryForCC (CC, callback) {
  let WORDS = JSON.parse(fs.readFileSync(path.join(directories.src.countries, CC + '.json'), 'utf8'))

  let queryCC = 'INSERT INTO ' + DB_INFO.db_tables.country_specs + ' ( ' +
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
    }
    process.stdout.write(CC + ' ')
    callback()
  })
}

// main function of async.series([dbConnects, deletesTable, populatesTable, dbEnd]
function dbEnd (next) {
  db.end(function (err) {
    if (err) {
      next(Error('Error ending connection' + err.message))
    }
    next()
  })
}
