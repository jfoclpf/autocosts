/* Node script which populates the costs statistical database tables for each country */

const path = require('path')
const async = require('async') // module to allow to execute the queries in series
const mysql = require('mysql') // module to get info from database
const isOnline = require('is-online')
const request = require('request') // to make HTTP requests
const flatten = require('flat')
const sqlFormatter = require('sql-formatter')
const colors = require('colors') // eslint-disable-line
const debug = require('debug')('build:getAvgFromDB')

const commons = require(path.join(__dirname, '..', 'commons'))
const release = commons.getRelease()
const USE_MONEY_API = release !== 'test'
var fx = USE_MONEY_API ? require('money') : null // currency conversion API; needs to be "var" because it will change

commons.init()

const settings = commons.getSettings()
const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

console.log('Running script ' + path.relative(directories.server.root, __filename))

// own project modules
const statsFunctions = require(fileNames.build.statsFunctions)
const calculator = require(fileNames.project['calculator.js'])

var db // database Connection Object
const DB_INFO = settings.database.credentials

// Average Costs table database template
var AVG_DB_TEMPLATE, DB_TABLE_KEY

console.log('Updating statistics database...')

const BarBigTick = 3
// if debug is enabled disable the progress bar

var Bar = commons.getProgressBar(commons.getNumberOfCountries() + (USE_MONEY_API ? 6 : 4) * BarBigTick, debug.enabled)

// checks for internet connection
isOnline().then(function (online) {
  if (!online) {
    console.log('ERROR: no Internet connection'.red.bold)
    process.exit(1) // exit with error
  }

  // Template of the DBs (monthly costs statistics and monthly costs normalized) that will be created
  // and into which the averages from the users will be stored, with a row of said database for each country
  (function () {
    DB_TABLE_KEY = 'countryCode'
    AVG_DB_TEMPLATE = {
      countryCode: 'VARCHAR(2)', // this is the index/key of the database tables
      dateOfCalculation: 'date',
      currency: 'VARCHAR(3)',
      currencyConversionToEUR: 'float',
      totalUsers: 'int(11)',
      validUsers: 'int(11)',
      globalTotalUsers: 'int(11)'
    }

    const objectWithCalculatedAverages = flatten(calculator.CreateCalculatedDataObj(), { delimiter: '_' })

    for (const averageItem of Object.keys(objectWithCalculatedAverages)) {
      // if Template has already the property, use the one from template
      if (AVG_DB_TEMPLATE.hasOwnProperty(averageItem)) { // eslint-disable-line no-prototype-builtins
        objectWithCalculatedAverages[averageItem] = AVG_DB_TEMPLATE[averageItem]
      } else {
        // the last properties named "calculated" in the object chain are booleans
        if (averageItem.endsWith('_calculated')) {
          objectWithCalculatedAverages[averageItem] = 'boolean'
        } else {
          objectWithCalculatedAverages[averageItem] = 'float'
        }
      }
    }

    // concatenates objects
    AVG_DB_TEMPLATE = Object.assign(AVG_DB_TEMPLATE, objectWithCalculatedAverages)
    debug(AVG_DB_TEMPLATE)
  }())

  // detect for null or empty object
  if (!DB_INFO || Object.keys(DB_INFO).length === 0) {
    throw commons.getDataBaseErrMsg(__filename, settings.database)
  }

  var countries = [] // array of objects with countries information
  var uniqueUsers = [] // array of objects having uniqueUsers IDs and respective countries
  var AllUserInputDb = [] // array of objects with all the data from the inputs users database
  var queryInsert // SQL string to where all the average costs will be inserted

  if (USE_MONEY_API) {
    // SQL query to where all the average Normalized (in EUR) Costs will be inserted
    var queryInsertNorm
  }

  // method that forces several methods to run synchronously
  async.series([

    /* ========================================================================= */
    // Load money API for the currency conversion
    // see: http://openexchangerates.github.io/money.js/
    // and: https://openexchangerates.org/account/app-ids
    function (next) {
      if (!USE_MONEY_API) {
        // It is always good practice to return after next(err, result)
        // whenever a next call is not the last statement of a function
        // from https://caolan.github.io/async/
        next()
        return // this MUST be here
      }

      debug('\nLoad exchange rates via API on openexchangerates.org')

      const MoneyApiId = settings.money.ApiId
      const ApiUrl = 'https://openexchangerates.org/api/latest.json?app_id=' + MoneyApiId
      // HTTP Header request
      const options = {
        url: ApiUrl,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      request(options, function (err, response, body) {
        if (!err && typeof fx !== 'undefined' && fx.rates) {
          const result = JSON.parse(body)
          fx.rates = result.rates
          fx.base = result.base

          Bar.tick(BarBigTick, { info: 'Loaded exchange rates API' })
          next()
        } else {
          console.error('Error loading money API')
          next(Error(err))
        }
      })
    },

    /* ========================================================================= */
    // creates database connection and connects
    function (next) {
      db = mysql.createConnection(DB_INFO)
      debug('\nGetting the set of different countries from: ' +
        DB_INFO.database + '->' + DB_INFO.db_tables.country_specs)

      db.connect(function (err) {
        if (err) {
          next(Error(err))
        } else {
          debug(('User ' + DB_INFO.user + ' connected successfully to database ' +
            DB_INFO.database + ' at ' + DB_INFO.host).green)
          debug(DB_INFO)
          Bar.tick(BarBigTick, { info: 'Created sql connection' })
          next()
        }
      })
    },

    /* ========================================================================= */
    // Get the set of different countries and the corresponding specifications/standards
    function (next) {
      db.query('SELECT * FROM ' + DB_INFO.db_tables.country_specs, function (err, results, fields) {
        if (err) {
          next(Error(err))
        } else {
          // copy info to global array countries
          for (var i = 0; i < results.length; i++) {
            if (results[i].Country) {
              countries.push(results[i])
            }
          }
          debug(countries)
          // countries[i]: {Country: 'UK', currency: 'GBP', distance_std: 2, fuel_efficiency_std: 3, fuel_price_volume_std: 1 }
          Bar.tick(BarBigTick, { info: 'Loaded countries standards' })
          next()
        }
      })
    },

    /* ========================================================================= */
    // Get users unique ID
    function (next) {
      debug('Getting users unique IDs from: ' +
        DB_INFO.database + '->' + DB_INFO.db_tables.users_insertions)

      db.query('SELECT DISTINCT uuid_client, country FROM ' + DB_INFO.db_tables.users_insertions,
        function (err, results, fields) {
          if (err) {
            next(Error(err))
          } else {
            // copy info to global array uniqueUsers
            // array of objects having uniqueUsers IDs and respective countries
            for (var i = 0; i < results.length; i++) {
              uniqueUsers.push(results[i])
            }
            debug(uniqueUsers)
            Bar.tick(BarBigTick, { info: 'Loaded unique users' })
            next()
          }
        }
      )
    },

    /* ========================================================================= */
    // Get all data from users input database
    function (next) {
      debug('Getting all user insertion data from: ' +
        DB_INFO.database + '->' + DB_INFO.db_tables.users_insertions)

      db.query('SELECT * FROM ' + DB_INFO.db_tables.users_insertions, function (err, results, fields) {
        if (err) {
          next(Error(err))
        } else {
          // copy results to global array
          AllUserInputDb = []
          for (var i = 0; i < results.length; i++) {
            AllUserInputDb.push(results[i])
          }
          debug(AllUserInputDb)
          Bar.tick(BarBigTick, { info: 'Loaded all users' })
          next()
        }
      })
    },

    /* ========================================================================= */
    // Calculates statistical average costs for each country and builds SQL query
    function (next) {
      var numberOfCountries = countries.length
      var numberOfUniqueUsers = uniqueUsers.length
      var numberOfTotalUserInputs = AllUserInputDb.length

      // queries header
      queryInsert = getInsertDataQueryHeader('monthly_costs_statistics')

      if (USE_MONEY_API) {
        queryInsertNorm = getInsertDataQueryHeader('monthly_costs_normalized')
      }

      // builds the query to insert all the vaules for each country
      // sql query:... VALUES (PT, value1, value2,...),(BR, value1, value2,...),etc.
      for (let i = 0; i < numberOfCountries; i++) {
        const countryCode = countries[i].Country
        const currency = countries[i].currency

        Bar.tick({ info: 'Calculating statistics for ' + countryCode })

        const countryUsers = [] // array with unique users for selected countries[i]
        const countryData = [] // array with everything for selected countries[i]

        // creates an array of unique users for the selected country
        for (let j = 0; j < numberOfUniqueUsers; j++) {
          if (uniqueUsers[j].country === countryCode) {
            countryUsers.push(uniqueUsers[j])
          }
        }

        // creates an array with all the inputs for the selected country
        for (let j = 0; j < numberOfTotalUserInputs; j++) {
          if (AllUserInputDb[j].country === countryCode) {
            countryData.push(AllUserInputDb[j])
          }
        }

        const countryInfo = {
          code: countryCode,
          currency: currency,
          distance_std: countries[i].distance_std,
          fuel_efficiency_std: countries[i].fuel_efficiency_std,
          fuel_price_volume_std: countries[i].fuel_price_volume_std
        }

        const statisticsResults = statsFunctions.calculateStatisticsForADefinedCountry(
          countryUsers,
          countryData,
          countryInfo,
          USE_MONEY_API ? fx : null)
        debug(JSON.stringify(statisticsResults, null, 4))

        // add computed data to countries array of objects
        countries[i].validUsers = statisticsResults.validUsers
        countries[i].totalUsers = countryUsers.length
        countries[i].totalCosts = statisticsResults.costs.perMonth.total

        queryInsert += getQueryWithValuesForCountry('monthly_costs_statistics',
          statisticsResults, countries[i], numberOfUniqueUsers)

        // sql query for table for the normalized costs (all costs in EUR), check var AVG_DB_TEMPLATE
        if (USE_MONEY_API) {
          queryInsertNorm += getQueryWithValuesForCountry('monthly_costs_normalized',
            statisticsResults, countries[i], numberOfUniqueUsers)
        }

        // add `,` after, except on the last set of values
        queryInsert += i !== numberOfCountries - 1 ? ', ' : ''
        if (USE_MONEY_API) {
          queryInsertNorm += i !== numberOfCountries - 1 ? ', ' : ''
        }
      }
      debug(sqlFormatter.format(queryInsert))

      next()
    },

    /* ========================================================================= */
    // statistical data is calculated: create table, create key, and inserts data
    function (next) {
      async.parallel([
        function (callback) {
          createTableAndKeyToInsertData(queryInsert, DB_INFO.db_tables.monthly_costs_statistics, callback)
        },
        function (callback) {
          if (USE_MONEY_API) {
            createTableAndKeyToInsertData(queryInsertNorm, DB_INFO.db_tables.monthly_costs_normalized, callback)
          } else {
            callback()
          }
        }
      ],
      function (err, results) {
        if (err) {
          next(Error(err))
        } else {
          next()
        }
      })
    },

    /* ========================================================================= */
    // finishes database connection
    function (next) {
      db.end(function (err) {
        if (err) {
          next(Error(err))
        } else {
          next()
        }
      })
    }
  ],
  function (err, results) {
    if (err) {
      // if any error occurs in the process, closes the database connection
      db.end(function (errDbEnd) {
        if (errDbEnd) {
          console.error(Error(errDbEnd))
        }
        console.error(Error(err))
        console.error('Error while calculating statistics'.error)
        process.exit(1)
      })
    } else {
      consoleLogTheFinalAverages(countries)
      console.log('All the statistics have been computed successfully and updated into database'.green)
      process.exit(0)
    }
  })
}).catch(function (err) {
  console.log(Error(err))
  process.exit(1)
})

// for each country, get the header of the insert data query
function getInsertDataQueryHeader (tableParameter) {
  var table

  if (tableParameter === 'monthly_costs_statistics') {
    table = DB_INFO.db_tables.monthly_costs_statistics
  } else if (tableParameter === 'monthly_costs_normalized') {
    table = DB_INFO.db_tables.monthly_costs_normalized
  } else {
    throw Error('wrong table' + tableParameter)
  }

  var query = 'REPLACE INTO ' + table + ' '

  // builds sql query Header based on database table template
  var queriesHeader = sqlStringFromArray(Object.keys(AVG_DB_TEMPLATE), false) // false removes quotes from strings
  debug(queriesHeader)

  query += queriesHeader + 'VALUES '

  return query
}

function getQueryWithValuesForCountry (tableParameter, statisticsResults, country, numberOfUniqueUsers) {
  if (tableParameter !== 'monthly_costs_statistics' && tableParameter !== 'monthly_costs_normalized') {
    throw Error('wrong table' + tableParameter)
  }

  // mysql query string to be returned
  var query

  var countryCode = country.Country
  var currency = country.currency

  // string with current date DD/MM/YYYY
  var date = new Date()
  var dateString = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString()

  var flattenStatisticsResults = flatten(statisticsResults, { delimiter: '_' })
  delete flattenStatisticsResults.countryCode
  delete flattenStatisticsResults.currency
  delete flattenStatisticsResults.validUsers

  // currency conversion to EUR
  var currencyConversionToEUR = USE_MONEY_API ? fx(1).from('EUR').to(currency) : null

  // converts all costs to EUR, the costs are in object costs,
  // which after being flattened every property starts with "costs_"
  if (tableParameter === 'monthly_costs_normalized') {
    for (const costItem of Object.keys(flattenStatisticsResults)) {
      if (costItem.startsWith('costs_') && costItem in flattenStatisticsResults &&
        isFinite(flattenStatisticsResults[costItem])) {
        /* if */
        flattenStatisticsResults[costItem] = fx(flattenStatisticsResults[costItem]).from(currency).to('EUR')
      }
    }
  }

  // builds sql query for respective country, check var AVG_DB_TEMPLATE
  let queryInsertCountryArray = [
    countryCode,
    dateString,
    tableParameter === 'monthly_costs_normalized' ? 'EUR' : currency,
    currencyConversionToEUR,
    country.totalUsers,
    country.validUsers,
    numberOfUniqueUsers
  ]

  // concatenate arrays
  queryInsertCountryArray = queryInsertCountryArray.concat(Object.values(flattenStatisticsResults))

  query = sqlStringFromArray(queryInsertCountryArray)

  return query
}

function createTableAndKeyToInsertData (query, table, callback) {
  createDatabaseTable(table, function () {
    createDatabaseTableKey(table, function () {
      insertCalculatedDataIntoTable(query, table, callback)
    })
  })
}

function createDatabaseTable (table, callback) {
  debug('Creating new database table if nonexistent: ', table)

  let createTableQuery = 'CREATE TABLE IF NOT EXISTS ' + table + ' '

  const arrayOfEntries = []
  for (const key of Object.keys(AVG_DB_TEMPLATE)) {
    arrayOfEntries.push(key + ' ' + AVG_DB_TEMPLATE[key])
  }

  createTableQuery += sqlStringFromArray(arrayOfEntries, false)
  debug(sqlFormatter.format(createTableQuery))

  db.query(createTableQuery, function (err, results, fields) {
    if (err) {
      callback(Error(err))
    } else {
      debug('Table created if nonexistent: ' + table)
      callback()
    }
  })
}

function createDatabaseTableKey (table, callback) {
  debug('Creating key \'' + DB_TABLE_KEY + '\' on table: ', table)

  var querySetKey = 'CREATE UNIQUE INDEX `' + DB_TABLE_KEY +
    '` ON ' + table + '(`' + DB_TABLE_KEY + '`);'

  db.query(querySetKey, function (err, results, fields) {
    if (err) {
      // mysql returns error when keys are already present
      // on the table and this query is executed
      debug('Key was already present')
    } else {
      debug('Key \'' + DB_TABLE_KEY + '\' created on table: ', table)
    }
    callback()
  })
}

// executes the query into the chosen table, verbosing calculated data
function insertCalculatedDataIntoTable (query, table, callback) {
  debug('Inserting new calculated data into table: ', table)

  db.query(query, function (err, results, fields) {
    if (err) {
      console.error(('\n\n SQL ERROR: ' + err.sqlMessage + '\n\n').error)
      console.error(addLinesToStr(sqlFormatter.format(err.sql)))
      callback(Error(err))
    } else {
      debug('All new data successfully added into table: ', table)
      Bar.tick(BarBigTick, { info: 'New stats data successfully added' })
      callback()
    }
  })
}

// from an array ["a", "b", undefined, true, 3, false] returns string "('a', 'b', NULL, 1, 3, 0)"
function sqlStringFromArray (inputArray, addQuotesInStringsBool = true) {
  var str = '('

  var length = inputArray.length
  for (let i = 0; i < length; i++) {
    let item = inputArray[i]
    let isStr = typeof item === 'string' && addQuotesInStringsBool

    // sanitize for sql string
    if (typeof item === 'undefined' ||
           (typeof item === 'number' && !isFinite(item))) {
      item = 'NULL'
      isStr = false
    }

    str += (isStr ? '\'' : '') + item + (isStr ? '\'' : '')
    str += (i !== length - 1 ? ', ' : ') ')
  }

  return str
}

// prints in the shell a sorted list of the computed countries
function consoleLogTheFinalAverages (countries) {
  countries.sort(function (a, b) { // sorts the array by the valid users field
    return parseFloat(b.valid_users) - parseFloat(a.valid_users)
  })

  var totalValidUsers = 0
  var totalUsers = 0

  for (let i = 0; i < countries.length; i++) {
    totalValidUsers += countries[i].validUsers
    totalUsers += countries[i].totalUsers
  }

  console.log('\nTotal users: ' + totalUsers)
  console.log('Total valid users: ' + totalValidUsers)

  console.log('\nCountry | Monthly costs | Valid users | Total users | Valid ratio | % of total valid users')
  for (let i = 0; i < countries.length; i++) {
    const totalCostsStr = !isNaN(countries[i].totalCosts) ? countries[i].totalCosts.toFixed(0) : ''

    console.log('\n' + ('        ' + countries[i].Country).slice(-5) + '  ' +
            ' | ' + ('          ' + totalCostsStr).slice(-9) + ' ' + countries[i].currency +
            ' | ' + ('            ' + countries[i].validUsers).slice(-11) +
            ' | ' + ('            ' + countries[i].totalUsers).slice(-11) +
            ' | ' + ('            ' + (countries[i].validUsers / countries[i].totalUsers * 100).toFixed(1) + '%').slice(-11) +
            ' | ' + ('               ' + (countries[i].validUsers / totalValidUsers * 100).toFixed(1) + '%').slice(-14))
  }
}

// for debug purposes. On a big string of code with many breaklines,
// adds after a breakline, the correspondig line number
// from "abc\ndef\nghi" => "1: abc\n 2: def\n 3: ghi"
function addLinesToStr (str) {
  var arr = str.split('\n')
  for (let i = 0; i < arr.length; i++) {
    arr[i] = (i + 1).toString().padStart(4, ' ') + ':  ' + arr[i] + '\n'
  }
  return arr.join('')
}
