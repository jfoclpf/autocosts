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

const release = commons.getRelease() // release shall be 'work' or 'prod', it's 'work' by default

var directories = commons.getDirectories()
directories.index = __dirname // directory where this script index.js is located
var fileNames = commons.getFileNames()
var settings = commons.getSettings()

// fixed unchangeable global data which is constant for all HTTP requests independently of the country
var countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesListFile, 'utf8'))
var serverData = {
  'release': release, // Release: "work" or "prod"
  'settings': settings, // Settings set in commons.js
  'directories': directories, // {ROOT_DIR, SRC_DIR, BIN_DIR, COUNTRIES_DIR, COUNTRY_LIST_FILE, TABLES_DIR}
  'fileNames': fileNames, // Object with the fileNames, on the server and client
  'availableCountries': sortObj(countriesInfo.availableCountries), // Array of alphabetically sorted available Countries
  'languagesCountries': countriesInfo.languagesCountries, // Array of Language Codes
  'domains': commons.getDomainsObject(countriesInfo.domainsCountries), // Object with Domains Infomation
  'CClistOnString': commons.getCClistOnStr(countriesInfo.availableCountries), // a string with all the CC
  'isOnline': undefined // if the server has access to Internet connection (to use database, uber, etc.)
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
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: [ path.join(__dirname, 'views', 'main'),
    path.join(__dirname, 'views', 'common'),
    path.join(__dirname, 'css', 'merged-min'),
    path.join(__dirname, 'tables')],
  helpers: hbsHelpers
})

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

// static content
app.use(express.static(path.join(__dirname, 'public'))) // root public folder
app.use('/tables', express.static(path.join(__dirname, 'tables')))
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/img', express.static(path.join(__dirname, 'img')))
app.use('/client', express.static(path.join(__dirname, 'client')))
app.use('/countries', express.static(path.join(__dirname, 'countries')))

app.use(compression({ level: 1 })) // level 1 is for fastest compression
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// lists all Countries information
app.get('/list', function (req, res) {
  debug("\nRoute: app.get('/list')")
  list(req, res, serverData, WORDS)
})

// lists all available domains
app.get('/domains', function (req, res) {
  debug("\nRoute: app.get('/domains')")
  domains(req, res, serverData, WORDS)
})

// sitemap.xml for Search Engines optimization
app.get('/sitemap.xml', function (req, res) {
  debug("\nRoute: app.get('/sitemap.xml')")
  sitemap(req, res, serverData, WORDS)
})

if (SWITCHES.uber) {
  const getUBER = require(path.join(__dirname, 'server', 'getUBER'))
  app.get('/getUBER/:CC', function (req, res, next) {
    if (serverData.isOnline) {
      debug("\nRoute: app.get('/getUBER')")
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
      debug("\nRoute: app.post('/captchaValidate')")
      captchaValidate(req, res, serverData)
    } else {
      next()
    }
  })
}

if (SWITCHES.dataBase) {
  eventEmitter.on('statsColected', function (statsData) {
    serverData.statsData = statsData
    console.log('Statistical Data colected')
  })

  const stats = require(path.join(__dirname, 'server', 'stats'))

  // the /stats page shall only be rendered when there is internet, because it needs access to a DB
  isOnline().then(function (online) {
    if (online) {
      serverData.isOnline = true
      stats.prepareStats(serverData, WORDS, eventEmitter)
    } else {
      serverData.isOnline = false
    }
  })

  app.get('/stats', function (req, res, next) {
    if (serverData.isOnline) {
      debug("\nRoute: app.get('/stats')")
      stats.req(req, res, serverData, WORDS.UK)
    } else {
      next()
    }
  })

  // process the users input to be sent to database
  const submitUserInput = require(path.join(__dirname, 'server', 'submitUserInput'))

  app.post('/submitUserInput', function (req, res, next) {
    if (serverData.isOnline) {
      debug("\nRoute: app.post('/submitUserInput')")
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
app.get('/:CC', function (req, res, next) {
  debug("\nRoute: app.get('/CC')")

  // returns true if it was redirected to another URL
  let wasRedirected = url.getCC(req, res, serverData)
  if (wasRedirected) {
    return
  }
  // from here CC is acceptable and the page will be rendered

  // get words for chosen CC - Country Code
  let WORDS_CC = WORDS[req.params.CC]
  getCC.render(req, res, serverData, WORDS_CC)
})

app.get('/', function (req, res, next) {
  debug("\nRoute: app.get('/')")
  url.redirect(req, res, serverData)
})

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

if (process.env.NODE_ENV === 'TEST') {
  console.log('Does not start http server, exiting...\n')
  process.exit(0)
}

app.listen(settings.HTTPport, function () {
  console.log('Listening on port ' + settings.HTTPport)
  console.log('To stop server press ' + colors.red.bold('CTRL+C') + '\n')
  console.log('check ' + colors.green.bold('http://localhost:' + settings.HTTPport) + '\n')
})
