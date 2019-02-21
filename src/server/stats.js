const path = require('path')
const url = require(path.join(__dirname, 'url')) // own project module
const mysql = require('mysql') // module to get info from DB
const async = require('async') // module to allow to execute the queries in series
const debug = require('debug')('app:stats') // run "DEBUG=app:stats node index.js"

const getCC = require(path.join(__dirname, 'getCC'))
const commons = require(path.join(__dirname, '..', '..', 'commons'))
const fileNames = commons.getFileNames()

const MIN_VALID_USERS = 20 // minimum number of valid users to show the country on world chart

var statsData // chartjs content of World statistics
var statsLabels // Labels used for stats chart
var chartTable // HTML table data relating to the chart
var dateOfCalculation // date when the chart data was calculated
var averageNormalizedCosts

module.exports = {

  req: function (req, res, serverData, wordsOfUK) {
    var data = {}

    data.isStats = true
    data.isGetCC = false

    data.words = wordsOfUK
    data.serverData = serverData
    delete data.serverData.availableCountries.XX

    data.statsData = statsData
    data.statsLabels = statsLabels
    data.chartTable = chartTable
    data.dateOfCalculation = dateOfCalculation
    data.averageNormalizedCosts = averageNormalizedCosts
    data.isThisStatsPage = true

    // information depending on this request from the client
    var pageData = {
      /* check https://github.com/jfoclpf/autocosts/wiki/URL-parts-terminology */
      url: {
        href: url.getHref(req), // full url, ex: "https://autocosts.info/PT"
        origin: url.getOrigin(req), // basic url, ex: "https://autocosts.info"
        protocol: url.getProtocol(req) // `http:` or `https:`
      },
      languageCode: 'en', // this page of World Statistics of car, renders only in English
      isThisATest: url.isThisATest(req), // boolean variable regarding if present request is a test
      notLocalhost: !url.isThisLocalhost(req) // boolean variable regarding if present request is from localhost
    }
    data.pageData = pageData

    data.layout = false
    var fileToRender = path.join(serverData.directories.index, 'views', 'stats.hbs')

    if (pageData.notLocalhost) {
      let CSPstr = getCC.getCSPstr()
      debug(CSPstr.replace(/;/g, `;\n`))
      res.set('Content-Security-Policy', CSPstr)
    }

    res.render(fileToRender, data)
  },

  // this method is executed right after the server starts, such that the statisitcal data may be pre-calculated and ready for the client
  prepareStats: function (serverData, WORDS, eventEmitter) {
    // get statsFunctions.js Object Constructors/Templates
    const calculator = require(fileNames.project['calculator.js'])

    var dbInfo = serverData.settings.dataBase.credentials
    debug(' ===== dbInfo ===== \n', dbInfo)

    // get current date in a formated string
    var date = new Date()
    dateOfCalculation = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()

    var costs = {} // object of arrays, each property is a cost item array
    var labels = []
    var table = {} // table with useful information for each country stats (total users, valid users, etc.)
    var db

    async.series([
      // creates DB connection and connects
      function (callback) {
        db = mysql.createConnection(dbInfo)
        debug(dbInfo)
        console.log('\nGetting normalised costs from ' +
                            'DB table ' + dbInfo.database + '->' + dbInfo.db_tables.monthly_costs_normalized)

        db.connect(function (err) {
          if (err) {
            console.error('error connecting: ' + err.stack)
            return
          }
          callback()
        })
      },

      // Get the normalised costs
      function (callback) {
        var i, n, cc
        db.query('SELECT * FROM ' + dbInfo.db_tables.monthly_costs_normalized,
          function (err, normalizedStatistics, fields) {
            // normalizedStatistics is a flattened object

            // got normalized statistical results; convert array to object and send to index.js for sidebar statistics
            (function () {
              var resultsToSendToIndex = {}
              for (i = 0; i < normalizedStatistics.length; i++) {
                cc = normalizedStatistics[i].countryCode
                resultsToSendToIndex[cc] = Object.assign({}, normalizedStatistics[i])// clone object
                resultsToSendToIndex[cc].currencySymbol = WORDS[cc].curr_symbol
              }

              eventEmitter.emit('statsColected', resultsToSendToIndex)
            })()

            if (err) {
              console.log('Cannot connect to Database')
              throw err
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

            // fills array with the costs items names/strings
            var costsStrs = []
            var monthlyCosts = calculator.CreateCalculatedDataObj().costs.perMonth.items
            for (let key of Object.keys(monthlyCosts)) {
              costsStrs.push(key)
            }

            // on every cost item, builds an array of values for said cost item
            // to be used by the chartjs chart
            for (n = 0; n < costsStrs.length; n++) {
              costs[costsStrs[n]] = []// cost item array
              for (i = 0; i < normalizedStatistics.length; i++) {
                cc = normalizedStatistics[i].countryCode
                if (cc !== 'XX') {
                  let yearlyCost = normalizedStatistics[i]['costs_perMonth_items_' + costsStrs[n]] * 12
                  // copies value from db (monthly) to object (yearly)
                  costs[costsStrs[n]].push(yearlyCost)
                  // fills labels, but just needs once
                  if (n === 0) {
                    labels.push(normalizedStatistics[i].countryCode)
                  }
                }
              }
            }
            // debug(costs);

            // calculate values for the last table on web page
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
          }
        )
      }
    ])// async.series
  }// prepareStats
}
