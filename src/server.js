/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/* jslint node: true */

'use strict'

const fs = require('fs')
const path = require('path')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
const events = require('events')
const eventEmitter = new events.EventEmitter()
commons.init(eventEmitter)

const express = require('express')
const exphbs = require('express-handlebars')
const useragent = require('express-useragent')
const rateLimit = require('express-rate-limit')
const compression = require('compression')
const sortObj = require('sort-object') // to sort JS objects
const colors = require('colors') // does not alter string prototype
const util = require('util')
const debug = require('debug')('app:server')

// personalised requires
const url = require(path.join(__dirname, 'server', 'url')) // to deal with the full URL rules and redirect accordingly
const renderPageCC = require(path.join(__dirname, 'server', 'renderPageCC'))
const hbsHelpers = require(path.join(__dirname, 'server', 'hbsHelpers'))
const list = require(path.join(__dirname, 'server', 'list'))
const domains = require(path.join(__dirname, 'server', 'domains'))
const sitemap = require(path.join(__dirname, 'server', 'sitemap'))
const webmanifest = require(path.join(__dirname, 'server', 'webmanifest'))
const preprocess = require(path.join(__dirname, 'server', 'preprocess'))

const release = commons.getRelease() // release shall be 'dev', 'test' or 'prod', it's 'dev' by default

let directories = commons.getDirectories()
directories.index = __dirname // directory where this script server.js is located
let fileNames = commons.getFileNames()
let settings = commons.getSettings()

// fixed unchangeable global data which is constant for all HTTP requests independently of the country
const countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesInfoFile, 'utf8'))
const serverData = {
  release: release, // Release: "dev" or "prod"
  settings: settings, // Settings set in commons.js
  directories: directories, // {ROOT_DIR, SRC_DIR, BIN_DIR, COUNTRIES_DIR, COUNTRY_LIST_FILE, TABLES_DIR}
  fileNames: fileNames, // Object with the fileNames, on the server and client
  availableCountries: sortObj(countriesInfo.availableCountries), // Array of alphabetically sorted available Countries
  languagesCountries: countriesInfo.languagesCountries, // Array of Language Codes
  countriesStandards: countriesInfo.standards, // fuel efficiency standards (km/L, mpg, etc.), distance standards (km, mi, etc.)
  urls: commons.getUrlsObject(countriesInfo), // Object with Domains Infomation
  CClistOnString: commons.getCClistOnStr(countriesInfo.availableCountries), // a string with all the CC
  isOnline: undefined // if the server has access to Internet connection (to use database, uber, etc.)
}
debug(util.inspect(serverData, { showHidden: false, depth: null }))

let SWITCHES = settings.switches // Global switches with the available services; for more information see commons.js
const WORDS = {} // Object of Objects with all the words for each country

// processes and builds data (WORDS) here on server side, for fast delivery
preprocess(serverData, WORDS, eventEmitter)

// event handler to deal when the settings are changed
// particularly the event is triggered when
// it is detected that there is no Internet connection and settings are thus changed
eventEmitter.on('settingsChanged', function () {
  serverData.settings = settings = commons.getSettings()
  SWITCHES = settings.switches

  // updates filenames and directory objects
  serverData.fileNames = fileNames = commons.getFileNames()
  serverData.directories = directories = commons.getDirectories()
  serverData.directories.index = directories.index = __dirname

  console.log('Settings updated.')
  debug(util.inspect(serverData, { showHidden: false, depth: null }))
})

// if the server has or has not Internet access
eventEmitter.on('onlineStatus', function (isOnline) {
  serverData.isOnline = isOnline
})

console.log('\n\nRunning script at ', __dirname)

const app = express()
app.enable('case sensitive routing')
app.enable('trust proxy')

// rendering engine for dynamically loaded HTML/JS files
const hbs = exphbs.create({
  extname: '.hbs',
  partialsDir: [
    path.join(__dirname, 'views', 'common'),
    path.join(__dirname, 'views', 'main'),
    path.join(__dirname, 'css', 'merged-min'),
    path.join(__dirname, 'tables')
  ],
  helpers: hbsHelpers
})

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// static content, on root public directory of the site /
app.use(express.static(path.join(__dirname, 'public'), { etag: true, maxAge: '1y' }))
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/img', express.static(path.join(__dirname, 'img')))
app.use('/client', express.static(path.join(__dirname, 'client')))
app.use('/countries', express.static(path.join(__dirname, 'countries')))

app.use(express.json()) // support json encoded bodies
app.use(express.urlencoded({ extended: true })) // support encoded bodies

app.use(compression({ level: 1 })) // level 1 is for fastest compression
app.use(useragent.express()) // to detect type of browser and if it is a mobile device

// robots.txt for search engines
app.get('/robots.txt', function (req, res) {
  debug('\nRoute: app.get(\'/robots.txt\')')
  res.type('text/plain').render('robots', { layout: false, isReleaseProd: release === 'prod' })
})

// lists all Countries information - /list or /lista or /liste
app.get('/list[a,e]?$/', function (req, res) {
  debug('\nRoute: app.get(\'/list\')')
  list(req, res, serverData, WORDS)
})

// lists all available domains
app.get('/domains', function (req, res) {
  debug('\nRoute: app.get(\'/domains\')')
  domains(req, res, serverData, WORDS)
})

// sitemap.xml for Search Engines optimization
app.get('/sitemap.xml', function (req, res) {
  debug('\nRoute: app.get(\'/sitemap.xml\')')
  sitemap(req, res, serverData)
})

// web-app-manifest; see https://github.com/jfoclpf/autocosts/issues/126
app.get('/:cc/webmanifest', function (req, res, next) {
  debug(`\nRoute: app.get('/${req.params.cc}/webmanifest')`)
  webmanifest(req, res, next, serverData, WORDS)
})

if (SWITCHES.uber) {
  const getUBER = require(path.join(__dirname, 'server', 'getUBER'))
  app.get('/:cc/getUBER', function (req, res, next) {
    if (serverData.isOnline) {
      debug(`\nRoute: app.get('/${req.params.cc}/getUBER')`)
      getUBER(req, res, serverData)
    } else {
      next()
    }
  })
}

if (SWITCHES.googleCaptcha) {
  const captchaValidate = require(path.join(__dirname, 'server', 'captchaValidate'))
  app.post('/captchaValidate', function (req, res, next) {
    if (serverData.isOnline && !url.isThisLocalhost(req)) {
      debug('\nRoute: app.post(\'/captchaValidate\')')
      captchaValidate(req, res, serverData)
    } else {
      next()
    }
  })
}

if (SWITCHES.database) {
  const worldStats = require(path.join(__dirname, 'server', 'worldStats'))
  const statsCC = require(path.join(__dirname, 'server', 'statsCC'))
  // process the users input to be sent to database
  const submitUserInput = require(path.join(__dirname, 'server', 'submitUserInput'))

  eventEmitter.on('statsColected', function (statistics, normalizedStatistics) {
    serverData.statsData = statistics
    serverData.normalizedStatistics = normalizedStatistics
    console.log('Statistical Data collected')
    if (process.send) {
      process.send('STATSDATA_COLLECTED')
    }
  })

  worldStats.prepareStats(serverData, WORDS, eventEmitter)

  app.get('/worldstats', function (req, res, next) {
    if (serverData.isOnline) {
      debug('\nRoute: app.get(\'/worldstats\')')
      worldStats.req(req, res, serverData, WORDS.UK)
    } else {
      next()
    }
  })

  app.post('/submitUserInput', function (req, res, next) {
    if (serverData.isOnline && release !== 'test') {
      debug('\nRoute: app.post(\'/submitUserInput\')')
      submitUserInput(req, res, serverData)
    } else {
      next()
    }
  })

  // tables with costs for each country
  app.get(['/:cc/stats', '/stats'], function (req, res, next) {
    debug(`Route: app.get('/${req.params.cc}/stats')`)

    const ccParams = req.params.cc
    const ccHost = url.isDomainAccTLD(req.get('host')) // returns cc if true
    let cc

    if (!ccParams && ccHost) { // for example autocustos.pt/stats
      cc = ccHost
    } else if (ccParams && !ccHost) { // for example autocustos.info/br/stats
      cc = ccParams
    } else {
      next()
      return
    }

    if (!url.isCCinCountriesList(cc, serverData.availableCountries) || cc.toLowerCase() !== cc) {
      next()
      return
    }

    const WORDS_CC = WORDS[cc.toUpperCase()]
    req.params.cc = cc
    statsCC(req, res, serverData, WORDS_CC)
  })

  // Tables with costs for each country
  // since it requests files from the drive, limit the requests
  const getLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: 'Too many images requested from this IP, please try again later'
  })
  app.get(['/:cc/stats.jpg', '/stats.jpg'], getLimiter, function (req, res, next) {
    const ccParams = req.params.cc
    const ccHost = url.isDomainAccTLD(req.get('host')) // returns cc if true
    let cc

    if (!ccParams && ccHost) { // for example autocustos.pt/stats
      cc = ccHost
    } else if (ccParams && !ccHost) { // for example autocustos.info/br/stats
      cc = ccParams
    } else {
      next()
      return
    }

    // Is cc a valid cc? If not, return false. Also upercase it
    const CC = url.sanitizeCC(cc, serverData.availableCountries)
    if (!CC) {
      next()
      return
    }

    res.sendFile(path.join(__dirname, 'tables', CC + '.jpg'))
  })
}

// before processing the request generate a pre CSP string
// for fast web delivery
renderPageCC.preGenerateCSPstring(serverData)

// this middleware shall be the last before error
// this is the entry Main Page
app.get('/:cc', function (req, res, next) {
  debug(`\nRoute: app.get('/cc'), cc:${req.params.cc}`)

  if (req.params.cc.length !== 2) {
    res.status(404)
    list(req, res, serverData, WORDS)
  } else {
    // wasRedirected is true if the session was redirected to another URL by the function url.getCC
    // if it was redirected by expressJS via res.redirect() there's no need to continue this session
    const wasRedirected = url.getCC(req, res, serverData)
    if (!wasRedirected) {
      // from here cc is acceptable and the page will be rendered
      // get words for chosen cc - Country Code
      const WORDS_CC = WORDS[req.params.cc.toUpperCase()]
      renderPageCC.render(req, res, serverData, WORDS_CC)
    }
  }
})

app.get('/', function (req, res) {
  debug('\nRoute: app.get(\'/\')')
  // wasRedirected is true if the session was redirected to another URL by the function url.root
  // it it was redirected by expressJS via res.redirect() there's no need to continue this session
  const returnedObj = url.root(req, res, serverData)
  if (!returnedObj.wasRedirected) {
    // from here the domain/cc combination is correct
    req.params.cc = returnedObj.cc
    const WORDS_CC = WORDS[req.params.cc.toUpperCase()]
    renderPageCC.render(req, res, serverData, WORDS_CC)
  }
})

// if nothing matches, redirect to root url
app.use(function (req, res) {
  res.redirect('/')
})

const server = app.listen(settings.HTTPport, function () {
  console.log('Listening on port ' + settings.HTTPport)
  console.log('To stop server press ' + colors.red.bold('CTRL+C') + '\n')
  console.log('*******************************************************************************')
  console.log('**                    The Car Costs Calculator                               **')
  console.log('**             can be now accessed on ' +
    colors.green.bold('http://localhost:' + settings.HTTPport) + '                  **')
  console.log('**                                                                           **')
  console.log('*******************************************************************************')

  // this is a code received by parent scripts (ex: test/test.js)
  // https://medium.com/@NorbertdeLangen/communicating-between-nodejs-processes-4e68be42b917
  if (process.send) {
    process.send('SERVER_STARTED:' + settings.HTTPport)
    process.send('ready') // very important, trigger to PM2 that app is ready
  }
})

// gracefully exiting upon CTRL-C or when PM2 stops the process
process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
function gracefulShutdown (signal) {
  if (signal) {
    console.log(`Received signal ${signal}`)
  }
  console.log('Gracefully closing http server')

  try {
    server.close(function (err) {
      if (!err) {
        console.log('http server closed successfully. Exiting!')
      }
      process.exit(err ? 1 : 0)
    })
  } catch (err) {
    console.error('There was an error')
    setTimeout(() => process.exit(1), 500)
  }
}
