/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

const fs = require('fs')
const path = require('path')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
const events = require('events')
var eventEmitter = new events.EventEmitter()
commons.init(eventEmitter)

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const compression = require('compression')
const sortObj = require('sort-object') // to sort JS objects
const colors = require('colors') // does not alter string prototype
const util = require('util')
const isOnline = require('is-online')
const debug = require('debug')('app:index')

// personalised requires
const url = require(path.join(__dirname, 'server', 'url')) // to deal with the full URL rules and redirect accordingly
const getCC = require(path.join(__dirname, 'server', 'getCC'))
const hbsHelpers = require(path.join(__dirname, 'server', 'hbsHelpers'))
const list = require(path.join(__dirname, 'server', 'list'))
const domains = require(path.join(__dirname, 'server', 'domains'))
const sitemap = require(path.join(__dirname, 'server', 'sitemap'))
const preprocess = require(path.join(__dirname, 'server', 'preprocess'))

const release = commons.getRelease() // release shall be 'dev', 'test' or 'prod', it's 'dev' by default

var directories = commons.getDirectories()
directories.index = __dirname // directory where this script index.js is located
var fileNames = commons.getFileNames()
var settings = commons.getSettings()

// fixed unchangeable global data which is constant for all HTTP requests independently of the country
var countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesInfoFile, 'utf8'))
var serverData = {
  release: release, // Release: "dev" or "prod"
  settings: settings, // Settings set in commons.js
  directories: directories, // {ROOT_DIR, SRC_DIR, BIN_DIR, COUNTRIES_DIR, COUNTRY_LIST_FILE, TABLES_DIR}
  fileNames: fileNames, // Object with the fileNames, on the server and client
  availableCountries: sortObj(countriesInfo.availableCountries), // Array of alphabetically sorted available Countries
  languagesCountries: countriesInfo.languagesCountries, // Array of Language Codes
  countriesStandards: countriesInfo.standards, // fuel efficiency standards (km/l, mpg, etc.), distance standards (km, mi, etc.)
  domains: commons.getDomainsObject(countriesInfo.domainsCountries), // Object with Domains Infomation
  CClistOnString: commons.getCClistOnStr(countriesInfo.availableCountries), // a string with all the CC
  isOnline: undefined // if the server has access to Internet connection (to use database, uber, etc.)
}
debug(util.inspect(serverData, { showHidden: false, depth: null }))

var SWITCHES = settings.switches // Global switches with the available services; for more information see commons.js
var WORDS = {} // Object of Objects with all the words for each country

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

var app = express()
app.enable('case sensitive routing')
app.enable('trust proxy')

// rendering engine for dynamically loaded HTML/JS files
var hbs = exphbs.create({
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

// static content
app.use(express.static(path.join(__dirname, 'public'))) // root public folder of the site /
app.use('/tables', express.static(path.join(__dirname, 'tables')))
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/img', express.static(path.join(__dirname, 'img')))
app.use('/client', express.static(path.join(__dirname, 'client')))
app.use('/countries', express.static(path.join(__dirname, 'countries')))

app.use(compression({ level: 1 })) // level 1 is for fastest compression
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// robots.txt for search engines
app.get('/robots.txt', function (req, res) {
  debug('\nRoute: app.get(\'/robots.txt\')')
  res.type('text/plain').render('robots.txt', { layout: false, isReleaseProd: release === 'prod' })
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
  sitemap(req, res, serverData, WORDS)
})

if (SWITCHES.uber) {
  const getUBER = require(path.join(__dirname, 'server', 'getUBER'))
  app.get('/getUBER/:CC', function (req, res, next) {
    if (serverData.isOnline) {
      debug('\nRoute: app.get(\'/getUBER\')')
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
  eventEmitter.on('statsColected', function (statistics, normalizedStatistics) {
    serverData.statsData = statistics
    serverData.normalizedStatistics = normalizedStatistics
    console.log('Statistical Data colected')
  })

  const stats = require(path.join(__dirname, 'server', 'stats'))

  // the /stats page shall only be rendered when there is internet, because it needs access to a database
  isOnline().then(function (online) {
    if (online) {
      serverData.isOnline = true
      if (release !== 'test') {
        stats.prepareStats(serverData, WORDS, eventEmitter)
      }
    } else {
      serverData.isOnline = false
    }
  })

  app.get('/stats', function (req, res, next) {
    if (serverData.isOnline || release === 'test') {
      debug('\nRoute: app.get(\'/stats\')')
      stats.req(req, res, serverData, WORDS.UK)
    } else {
      next()
    }
  })

  // process the users input to be sent to database
  const submitUserInput = require(path.join(__dirname, 'server', 'submitUserInput'))

  app.post('/submitUserInput', function (req, res, next) {
    if (serverData.isOnline && release !== 'test') {
      debug('\nRoute: app.post(\'/submitUserInput\')')
      submitUserInput(req, res, serverData)
    } else {
      next()
    }
  })
}

// before processing the request generate a pre CSP string
// for fast web delivery
getCC.preGenerateCSPstring(serverData)

// this middleware shall be the last before error
// this is the entry Main Page
app.get('/:CC', function (req, res) {
  debug('\nRoute: app.get(\'/CC\')')

  if (req.params.CC.length !== 2) {
    res.status(404)
    list(req, res, serverData, WORDS)
  } else {
    // wasRedirected is true if it was redirected to another URL
    const wasRedirected = url.getCC(req, res, serverData)
    if (wasRedirected) {
      return
    }
    // from here CC is acceptable and the page will be rendered
    // get words for chosen CC - Country Code
    const WORDS_CC = WORDS[req.params.CC]
    getCC.render(req, res, serverData, WORDS_CC)
  }
})

app.get('/', function (req, res) {
  debug('\nRoute: app.get(\'/\')')
  url.redirect(req, res, serverData)
})

// error handler
app.use(function (err, req, res) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// NODE_ENV is different from release; NODE_ENV is set to 'test' on Travis test module
if (process.env.NODE_ENV === 'test') {
  console.log('Does not start http server, exiting...\n')
  process.exit(0)
}

app.listen(settings.HTTPport, function () {
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
  }
})
