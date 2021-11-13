/* This server script is used to obtain the costs statistics for each country right after the server is
   started. When the server is started, this script is run fething the costs statistics from the monthly
   costs database; after the statistics are fetched from the database, this script triggers an event
   informing the main server that the statistics are ready to be used. Thus, the statistics data are
   transferred from the database into memory right after the server is started, for fast delivery */

/* jslint node: true */

'use strict'

const path = require('path')
const url = require(path.join(__dirname, 'url')) // own project module
const mysql = require('mysql') // module to get info from database
const async = require('async') // module to allow to execute the queries in series
const debug = require('debug')('app:worldStats') // run "DEBUG=app:stats node server.js"

const renderPageCC = require(path.join(__dirname, 'renderPageCC'))
const commons = require(path.join(__dirname, '..', '..', 'commons'))
const fileNames = commons.getFileNames()

const MIN_VALID_USERS = 20 // minimum number of valid users to show the country on world chart

let statsData // chartjs content of World statistics
let statsLabels // Labels used for stats chart
let chartTable // HTML table data relating to the chart
let dateOfCalculation // date when the chart data was calculated
let averageNormalizedCosts

module.exports = {

  req: function (req, res, serverData, wordsOfUK) {
    const data = {}

    data.isStats = true
    data.isGetCC = false

    data.words = wordsOfUK
    data.CC = 'UK'
    data.serverData = serverData
    delete data.serverData.availableCountries.XX

    data.statsData = statsData
    data.statsLabels = statsLabels
    data.chartTable = chartTable
    data.dateOfCalculation = dateOfCalculation
    data.averageNormalizedCosts = averageNormalizedCosts
    data.isThisStatsPage = true

    const isThisARecognizedHost = url.isThisARecognizedHost(req.get('host'), serverData.urls)

    // information depending on this request from the client
    const pageData = {
      /* check https://github.com/jfoclpf/autocosts/wiki/URL-parts-terminology */
      url: {
        href: url.getHref(req), // full url, ex: "https://autocosts.info/PT"
        origin: url.getOrigin(req), // basic url, ex: "https://autocosts.info"
        protocol: url.getProtocol(req) // `http:` or `https:`
      },
      languageCode: 'en', // this page of World Statistics of car, renders only in English
      isThisATest: url.isThisATest(req), // boolean variable regarding if present request is a test
      notLocalhost: !url.isThisLocalhost(req), // boolean variable regarding if present request is from localhost
      isThisARecognizedHost: isThisARecognizedHost
    }
    data.pageData = pageData

    // creates urls for statistics for each country, ex: autocustos.pt/stats or autocustos.info/br/stats
    let statsUrls = {}
    delete serverData.urls.canonicalStatsUrl.XX
    if (isThisARecognizedHost) {
      statsUrls = serverData.urls.canonicalStatsUrl
    } else { // for example dev or localhost
      for (const CC in serverData.urls.canonicalHostname) {
        statsUrls[CC] = req.get('host') + '/' + CC.toLowerCase() + '/stats'
      }
    }
    data.statsUrls = statsUrls

    data.layout = 'main'

    if (pageData.notLocalhost) {
      const CSPstr = renderPageCC.getCSPstr()
      debug(CSPstr.replace(/;/g, ';\n'))
      res.set('Content-Security-Policy', CSPstr)
    }

    res.render('worldStats', data)
  },

  // this method is executed right after the server starts and before the previous fucntion "req",
  // such that the statisitcal data may be pre-calculated and ready for the client
  prepareStats: function (serverData, WORDS, eventEmitter) {
    // get statsFunctions.js Object Constructors/Templates
    const calculator = require(fileNames.project['calculator.js'])

    const dbInfo = serverData.settings.database.credentials
    debug(' ===== dbInfo ===== \n', dbInfo)

    // get current date in a formated string
    const date = new Date()
    dateOfCalculation = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()

    const costs = {} // object of arrays, each property is a cost item array
    const labels = []
    const table = {} // table with useful information for each country stats (total users, valid users, etc.)
    let db
    // to send to other scripts via eventEmitter.emit
    const statisticsToEmit = {}
    const normalizedStatisticsToEmit = {}

    async.series([
      // creates database connection and connects
      function (next) {
        console.log('\nGetting normalised costs from ' +
          'database table ' + dbInfo.database + '->' + dbInfo.db_tables.monthly_costs_normalized)

        // tries to connect to DB every second till success
        const attemptConnection = () => {
          debug('Attempting to connect to db')
          dbInfo.connectTimeout = 1000 // set same as Timeout to avoid overloading the server
          db = mysql.createConnection(dbInfo)
          db.connect(function (err) {
            if (err) {
              debug('Error connecting to database, try again in 1 sec...')
              db.destroy() // destroy immediately failed instance of connection
              setTimeout(attemptConnection, 1000)
            } else {
              debug(('User ' + dbInfo.user + ' connected successfully to database ' +
                dbInfo.database + ' at ' + dbInfo.host).green)
              debug(dbInfo)
              next()
            }
          })
        }
        attemptConnection()
      },

      // Get the normalised costs
      function (next) {
        let i, n, cc
        db.query('SELECT * FROM ' + dbInfo.db_tables.monthly_costs_normalized,
          function (err, normalizedStatistics, fields) {
            debug('Got normalizedStatistics from DB, processing it...')
            // normalizedStatistics is a flattened object
            if (err) {
              console.log('Cannot connect to Database')
              throw err
            }

            // got normalized statistical results;
            // convert array to object to send to emitter
            for (i = 0; i < normalizedStatistics.length; i++) {
              cc = normalizedStatistics[i].countryCode
              normalizedStatisticsToEmit[cc] = Object.assign({}, normalizedStatistics[i]) // clone object
              normalizedStatisticsToEmit[cc].currencySymbol = WORDS[cc].curr_symbol
            }

            // removes entries with not enough valid users
            for (i = 0; i < normalizedStatistics.length; i++) {
              if (normalizedStatistics[i].validUsers < MIN_VALID_USERS) {
                normalizedStatistics.splice(i, 1) // removes element i
                i--
              }
            }

            // sort countries by total costs per year
            normalizedStatistics.sort(function (a, b) {
              return b.costs_totalPerYear - a.costs_totalPerYear
            })

            // debug(normalizedStatistics);

            // generates an array with the the costs items strings. that is:
            // ['depreciation', 'insurance', 'credit', 'inspection', etc. ]
            const costsStrings = []
            const monthlyCosts = calculator.CreateCalculatedDataObj().costs.perMonth.items
            for (const key of Object.keys(monthlyCosts)) {
              costsStrings.push(key)
            }
            debug('costsStrings: ', costsStrings)

            // on every cost item, builds an array of values for said cost item
            // to be used by the chartjs chart
            for (n = 0; n < costsStrings.length; n++) {
              costs[costsStrings[n]] = []// cost item array
              for (i = 0; i < normalizedStatistics.length; i++) {
                cc = normalizedStatistics[i].countryCode
                if (cc !== 'XX') {
                  const yearlyCost = normalizedStatistics[i]['costs_perMonth_items_' + costsStrings[n]] * 12
                  // copies value from db (monthly) to object (yearly)
                  costs[costsStrings[n]].push(yearlyCost)
                  // fills labels, but just needs once
                  if (n === 0) {
                    labels.push(normalizedStatistics[i].countryCode)
                  }
                }
              }
            }
            debug('costs: ', costs)

            // calculate values for the last table on web page
            // i.e.: "Notes and sources of these averages"
            for (i = 0; i < normalizedStatistics.length; i++) {
              let v, t

              cc = normalizedStatistics[i].countryCode // country code string

              // add some extra info the the object results to be passed into the web page
              normalizedStatistics[i].countryName = serverData.availableCountries[cc]
              normalizedStatistics[i].distance_std_option = WORDS[cc].distance_std_option

              table[cc] = {} // creates object for the country
              table[cc].countryName = serverData.availableCountries[cc]
              table[cc].validUsers = v = normalizedStatistics[i].validUsers
              table[cc].totalUsers = t = normalizedStatistics[i].totalUsers
              table[cc].globalTotalUsers = normalizedStatistics[i].globalTotalUsers // total users from all countries
              table[cc].percentageOfValidUsers = v / t * 100
              // currency
              table[cc].currencyConversionToEUR = normalizedStatistics[i].currencyConversionToEUR
              table[cc].currency = WORDS[cc].currency
            }
            // debug(table);

            averageNormalizedCosts = normalizedStatistics // values got directly from normalized costs database
            chartTable = table // table on the footnotes of the HTML worldstats webpage
            statsData = costs // costs array to be process the chart
            statsLabels = labels // labels of the chart

            console.log('World statistical data calculated')
            next()
          }
        )
      },
      function (next) {
        db.query('SELECT * FROM ' + dbInfo.db_tables.monthly_costs_statistics,
          function (err, statistics, fields) {
            debug('Got common statistics from DB, processing it...')
            // statistics is a flattened object
            if (err) {
              console.log('Cannot connect to Database')
              throw err
            }
            // got normalized statistical results;
            // convert array to object to send to emitter
            for (let i = 0; i < statistics.length; i++) {
              const cc = statistics[i].countryCode
              statisticsToEmit[cc] = Object.assign({}, statistics[i]) // clone object
              statisticsToEmit[cc].currencySymbol = WORDS[cc].curr_symbol
            }

            next()
          }
        )
      },
      function (next) {
        eventEmitter.emit('statsColected', statisticsToEmit, normalizedStatisticsToEmit)
        next()
      },
      function (next) {
        db.end(function (err) {
          if (err) {
            throw err
          }
          debug('DB closed successfully')
          next()
        })
      }
    ])// async.series
  }// prepareStats
}
