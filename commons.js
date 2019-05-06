/* Common information that will be used by other scripts and code */

// Default Country when any possible method to get country isn't available
var defaultCountry = 'UK' // when no other method finds the country of user, use this by default
var defaultPortProd = 3028 // default HTTP Port where the app listens - prod version
var defaultPortDev = 3027 // default HTTP Port where the app listens - dev version
var defaultPortTest = 3026 // default HTTP Port where the app listens - prod version

module.exports = {

  init: function (eventEmitter) {
    if (eventEmitter) {
      EVENTEMITTER = eventEmitter
    }
    _init()
  },

  getROOT_DIR: function () {
    if (!ROOT_DIR || typeof ROOT_DIR === 'undefined') {
      setROOT_DIR()
    }
    return ROOT_DIR
  },

  getSettings: function () {
    if (isEmptyOrInvalidObj(SETTINGS)) {
      _init()
    }
    return SETTINGS
  },

  getRelease: function () {
    if (!RELEASE || typeof RELEASE === 'undefined') {
      _init()
    }
    return RELEASE
  },

  setRelease: function (release) {
    // check that release was correctly chosen
    if (release !== 'dev' && release !== 'prod' && release !== 'test') {
      throw Error("Error on function setRelease(release) in commons.js; 'dev', 'test' or 'prod' must be selected")
    }
    RELEASE = release
  },

  getDirectories: function () {
    if (isEmptyOrInvalidObj(DIRECTORIES)) {
      setDIRECTORIES()
    }
    return DIRECTORIES
  },

  getFileNames: function () {
    if (isEmptyOrInvalidObj(FILENAMES)) {
      setFILENAMES()
    }
    return FILENAMES
  },

  getDomainsObject: getDomainsObject,

  getUniqueArray: getUniqueArray,

  getKeyByValue: getKeyByValue,

  getCClistOnStr: getCClistOnStr,

  getDataBaseErrMsg: getDataBaseErrMsg,

  getConsoleColors: getConsoleColors,

  checkForInternet: checkForInternet,

  extractHostname: extractHostname,

  runNodeScriptSync: runNodeScriptSync,

  getCountriesObj: getCountriesObj,

  getNumberOfCountries: getNumberOfCountries,

  getProgressBar: getProgressBar
}

/***************************************************************************************************/
/***************************************************************************************************/
/***************************************************************************************************/

var RELEASE // release, "dev", "test" or "prod"
var ROOT_DIR // root directory of the project
var SWITCHES, DIRECTORIES, SETTINGS, FILENAMES, EVENTEMITTER
var optionDefinitions // for the commandLineArgs

const path = require('path')
const fs = require('fs')
const commandLineArgs = require('command-line-args')
const colors = require('colors')
const isOnline = require('is-online')
const flat = require('flat')
const debug = require('debug')('app:commons')

colors.setTheme(getConsoleColors())

// initialization
function _init () {
  /* GLOBAL switches, false by default */
  /* these values are defined by the command line arguments */
  SWITCHES = {
    'cdn': false, /* Content Delivery Network */
    'uber': false, /* uses UBER API to give car user comparisions with UBER costs */
    'social': false, /* Social media pulgins */
    'disableCharts': false, /* Disable Charts on result */
    'googleCaptcha': false, /* Google Captcha to avoid spam-bots */
    'googleAnalytics': false, /* Google Analytics */
    'database': false, /* Inserts user input data into a DataBase */
    'print': false, /* Print result option, at the end */
    'pdf': false /* Download PDF report option */
  }

  // basic command line settings
  optionDefinitions = [
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'release', alias: 'r', type: String },
    { name: 'port', alias: 'p', type: Number }
  ]

  // populates optionDefinitions of commandLineArgs according to SWITCHES
  for (var service in SWITCHES) {
    optionDefinitions.push({ name: service, type: Boolean })
  }

  // get set options from command line arguments
  var options
  try {
    options = commandLineArgs(optionDefinitions)
    // this "option" object is just filled with the options that were inserted in the command line
    // console.log(options);
  } catch (err) {
    console.log('Unknown option: ' + err.optionName, '\n')
    options = { help: true }
  }

  RELEASE = RELEASE || options.release // set Global variable
  // check that release was correctly chosen
  if (RELEASE !== 'dev' && RELEASE !== 'test' && RELEASE !== 'prod') {
    RELEASE = 'dev'
  }
  console.log("Release: '" + RELEASE + "'")

  // shows NODE_ENV
  if (process.env.NODE_ENV) {
    console.log('NODE_ENV: ', process.env.NODE_ENV)
  }

  // after the RELEASE is known, the directories and files can be obtained and set
  setDIRECTORIES()
  setFILENAMES()

  // check if --help was selected
  if (options.help) {
    console.log(getArgvHelpMsg())
    process.exit()
  }

  // set HTTP port
  var HTTPport
  if (options.port) {
    HTTPport = options.port
  } else {
    if (RELEASE === 'prod') {
      HTTPport = defaultPortProd
    } else if (RELEASE === 'dev') {
      HTTPport = defaultPortDev
    } else if (RELEASE === 'test') {
      HTTPport = defaultPortTest
    } else {
      throw Error('Error setting port')
    }
  }

  // set SWITCHES according to commandLineArgs input options
  if (options.All) {
    for (let opt in SWITCHES) {
      SWITCHES[opt] = true
    }
  } else {
    for (let opt in options) {
      if (opt !== 'release') {
        SWITCHES[opt] = options[opt]
      }
    }
  }

  SETTINGS = {
    'release': RELEASE,
    'switches': SWITCHES,
    'HTTPport': HTTPport,
    'cdn': { // a CDN provider might be: https://app.keycdn.com/zones
      'enabled': SWITCHES.cdn,
      'name': 'cdn',
      'propName': 'url',
      'propType': 'string',
      'url': ''
    },
    'uber': {
      'enabled': SWITCHES.uber,
      'name': 'uber',
      'propName': 'token',
      'propType': 'string',
      'token': ''
    },
    'googleCaptcha': {
      'enabled': SWITCHES.googleCaptcha,
      'name': 'googleCaptcha',
      'propName': 'secretKey',
      'propType': 'string',
      'secretKey': ''
    },
    'googleAnalytics': {
      'enabled': SWITCHES.googleAnalytics,
      'name': 'googleAnalytics',
      'propName': 'trackingId',
      'propType': 'string',
      'trackingId': ''
    },
    'database': {
      'enabled': SWITCHES.database,
      'name': 'database',
      'propName': 'credentials',
      'propType': 'object',
      'credentials': {}
    },
    'money': {
      // in test version we don't use the money API because test version credentials are public
      // and money API credentials must be private
      'enabled': RELEASE === 'test' ? false : SWITCHES.database,
      'name': 'money',
      'propName': 'ApiId',
      'propType': 'string',
      'ApiId': ''
    },
    'defaultCountry': defaultCountry
  }

  checkForInternet()

  // reads data from JSON file with credentials for each service (in directory credentials/)
  var credentialsFileName
  if (RELEASE === 'prod') {
    credentialsFileName = FILENAMES.server.credentialsFullPath.prod
  } else if (RELEASE === 'dev') {
    credentialsFileName = FILENAMES.server.credentialsFullPath.dev
  } else if (RELEASE === 'test') {
    credentialsFileName = FILENAMES.server.credentialsFullPath.test
  } else {
    throw Error('Unkown Release ' + RELEASE)
  }

  debug(credentialsFileName)

  // fills missing information, for each service corresponding property: "url", "token", "secretKey", etc.
  // gets the information from the credentials JSON file
  for (service in SETTINGS) {
    var serviceObj = SETTINGS[service]
    if (serviceObj.enabled) {
      if (!fs.existsSync(credentialsFileName)) {
        throw getNoServiceErrMsg(serviceObj, credentialsFileName)
      }
      var credentialsData = JSON.parse(fs.readFileSync(credentialsFileName))

      if (serviceObj.propType === 'string') {
        var dataStr = credentialsData[serviceObj.name][serviceObj.propName]
        // check if string is valid (no just whitespaces or asterisks)
        if (!isValidCredentialString(dataStr)) {
          throw getNoServiceErrMsg(serviceObj, credentialsFileName)
        }
        serviceObj[serviceObj.propName] = dataStr
      } else if (serviceObj.propType === 'object') { // if service data is an object (normally applies to database)
        var dataObj = credentialsData[serviceObj.name]
        if (!isValidCredentialString(dataObj)) {
          throw getNoServiceErrMsg(serviceObj, credentialsFileName)
        }
        serviceObj[serviceObj.propName] = Object.assign({}, dataObj) // clone object
      } else {
        throw Error('Error getting service information from ' + serviceObj.name)
      }
    }
  }

  // set FILENAMES URIs for JS known files according to Local files or CDN
  // if cdn option is enabled, select CDN version, otherwise Local files
  setCdnOrLocalFiles(SWITCHES.cdn)

  debug('SETTINGS', SETTINGS)
  debug('DIRECTORIES', DIRECTORIES)
  debug('FILENAMES', FILENAMES)
}

function setDIRECTORIES () {
  if (typeof ROOT_DIR === 'undefined') {
    setROOT_DIR()
  }

  /* Always leave the traling slash at the end on each directory */
  /* this directory structure was based on Node/JS most common practises,
    namely see: docs/nodeJS-directory-structure.md */

  // Source directory - the directory where the source code is stored
  var srcDir = path.join(ROOT_DIR, 'src')

  // Bin directory - the directory to where the source code is deployed after running the bash script ./build.sh
  var binDir = path.join(ROOT_DIR, 'bin')

  // Build directory - the directory to where the building scripts are stored
  var buildDir = path.join(ROOT_DIR, 'build')

  // directory where test scripts and files are stored
  var testDir = path.join(ROOT_DIR, 'test')

  // credentials directory where json credential files are stored for each service
  var credentialsDir = path.join(ROOT_DIR, 'credentials')

  var serverDirs = {
    'root': ROOT_DIR,
    'src': srcDir,
    'bin': binDir,
    'build': buildDir,
    'test': testDir,
    'credentials': credentialsDir
  }

  /* ################################# */

  // these paths are relative, and they refer to the paths which are seen by the browser
  var clientDirs = {
    'client': 'client', // directory with respect to src/ dir, where the client JS browser files will be stored
    'css': 'css', // directory with respect to src/ dir, where the CSS  files will be stored
    'tables': 'tables' // where the JPG tables with car costs for each country
  }

  /* ################################# */

  // these paths are relative and refer to the project's code parent folder,
  // i.e., the parent directory of these paths is either src/ or bin/
  var projectDirs = {
    'countries': 'countries',
    'css': 'css',
    'tables': 'tables',
    'images': 'images',
    'public': 'public',
    'views': 'views',
    'client': 'client',
    'server': 'server'
  }

  var srcProjectDirs = {}
  var binProjectDirs = {}

  for (var prop in projectDirs) {
    srcProjectDirs[prop] = path.join(srcDir, projectDirs[prop])
    binProjectDirs[prop] = path.join(binDir, projectDirs[prop])
  }

  DIRECTORIES = {
    // these paths are absolute
    'server': serverDirs, // these paths are absolute
    'src': srcProjectDirs, // these paths are absolute
    'bin': binProjectDirs, // these paths are absolute
    'client': clientDirs, // these paths are relative (as seen by the browser)
    'project': projectDirs // these paths are relative (as seen by either src/ or bin/)
  }
}

function setFILENAMES () {
  if (!RELEASE) {
    _init()
  }

  if (isEmptyOrInvalidObj(DIRECTORIES)) {
    setDIRECTORIES()
  }

  var countriesDir = RELEASE === 'prod' ? DIRECTORIES.bin.countries : DIRECTORIES.src.countries
  var clientDir = RELEASE === 'prod' ? DIRECTORIES.bin.client : DIRECTORIES.src.client

  // Default file names for JSON files with credentials for each external service
  FILENAMES = {
    // these paths are ABSOLUTE
    'build': {
      'compressImages': path.join(DIRECTORIES.server.build, 'compressImages.js'),
      'generateTables': path.join(DIRECTORIES.server.build, 'generateTables.js'),
      'getAvgFromDB': path.join(DIRECTORIES.server.build, 'getAvgFromDB.js'),
      'minifyFiles': path.join(DIRECTORIES.server.build, 'minifyFiles.js'),
      'rasterTables': path.join(DIRECTORIES.server.build, 'rasterTables.js'),
      'setCountrySpecsDB': path.join(DIRECTORIES.server.build, 'setCountrySpecsDB.js'),
      'statsFunctions': path.join(DIRECTORIES.server.build, 'statsFunctions.js')
    },
    'project': {
      'countriesInfoFile': path.join(countriesDir, 'info.json'),
      'conversions.js': path.join(clientDir, 'core', 'conversions.js'),
      'calculator.js': path.join(clientDir, 'core', 'calculator.js'),
      'convertData.js': path.join(clientDir, 'convertData.js'),
      'validateData.js': path.join(clientDir, 'validateData.js')
    },
    'server': {
      'credentials': {
        'prod': 'prodCredentials.json',
        'dev': 'devCredentials.json',
        'test': 'testCredentials.json'
      },
      'credentialsFullPath': {
        'prod': '',
        'dev': '',
        'test': ''
      }
    },
    // the LOCAL paths are RELATIVE to the main host as seen by the BROWSER,
    // thus don't use node 'fs' nor 'path' functions, i.e., these are URI or part of URI
    'client': {
      'jquery': {
        'local': DIRECTORIES.client.client + '/jquery/jquery.min.js',
        'cdn': 'https://code.jquery.com/jquery-latest.min.js',
        'uri': '' // it will be one of the above
      },
      'chartjs': {
        'local': DIRECTORIES.client.client + '/chart/chartjs.min.js',
        'cdn': 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js',
        'uri': '' // it will be one of the above
      },
      'GrecaptchaAPI': 'https://www.google.com/recaptcha/api.js',
      'Ganalytics': 'https://www.google-analytics.com/analytics.js'
    }
  }

  // fills credentialsFullPath subObject
  for (let file in FILENAMES.server.credentials) {
    FILENAMES.server.credentialsFullPath[file] =
            path.join(DIRECTORIES.server.credentials, FILENAMES.server.credentials[file])
  }
}

// get parent directory of project directory tree
// tries to get according to engine, NodeJS or PhantomJS
function setROOT_DIR () { // eslint-disable-line camelcase
  var rootDir

  if ((typeof process !== 'undefined') &&
        (process.release.name.search(/node|io.js/) !== -1)) { // node
    // the root directory of the project is where this file is stored
    rootDir = path.resolve(__dirname, '.')
    debug('Node is running. ROOT_DIR: ' + rootDir)
  } else { // PhantomJS?
    try {
      // considering the phantom is called from build/
      // it needs to go back to the parent directory to get the root directory of the project
      rootDir = fs.absolute('../')
      debug('Phantom is running. ROOT_DIR: ' + rootDir)
    } catch (err) {
      throw Error('Engine not recognized, nor NodeJS nor PhantomJS')
    }
  }

  ROOT_DIR = rootDir
}

// set FILENAMES URI for JS known files according to Local files or CDN
// if cdn option is enabled, select CDN version, otherwise local files
// true for CDN; false for Local files
function setCdnOrLocalFiles (isCDN) {
  for (let key in FILENAMES.client) {
    var obj = FILENAMES.client[key]
    // it is a client filename with different values for cdn and local
    if (obj.local && obj.cdn) {
      obj.uri = isCDN ? obj.cdn : obj.local
    }
  }
  // ensures that CDN URL to be passed to client is blank in case cdn option is not enabled
  if (!isCDN) {
    SETTINGS.cdn.url = ''
  }
}

// checks for internet connection in case of "uber", "cdn", "social", "googleCaptcha" or "googleAnalytics"
// options are selected. These options require Internet and thus disables them
function checkForInternet () {
  // bin/index.js services demanding Internet
  var demandingInternet = ['uber', 'cdn', 'social', 'database', 'googleCaptcha', 'googleAnalytics']

  var isAny = false
  for (var i = 0; i < demandingInternet.length; i++) {
    isAny = isAny || SWITCHES[demandingInternet[i]]
  }

  if (isAny) {
    // check for Internet connection
    isOnline().then(function (online) {
      if (!online) {
        if (EVENTEMITTER) { EVENTEMITTER.emit('onlineStatus', false) }

        console.log('There is no Internet connection'.warn)

        if (SWITCHES.cdn) {
          setCdnOrLocalFiles(false) // set Local files with "false"
        }

        let servicesDisabled = []
        for (let i = 0; i < demandingInternet.length; i++) {
          if (SWITCHES[demandingInternet[i]]) {
            SWITCHES[demandingInternet[i]] = false
            servicesDisabled.push(demandingInternet[i])
          }
        }

        let len = servicesDisabled.length
        if (len) {
          process.stdout.write('Services disabled: ')
          for (let i = 0; i < len; i++) {
            process.stdout.write(servicesDisabled[i] + (i !== len - 1 ? ', ' : '.\n'))
          }

          if (EVENTEMITTER) { EVENTEMITTER.emit('settingsChanged') }
        } else {
          process.stdout.write('No services disabled\n')
        }
      } else {
        debug('The server is online')
        if (EVENTEMITTER) { EVENTEMITTER.emit('onlineStatus', true) }
      }
    })
  }
}

function getCountriesObj () {
  if (isEmptyOrInvalidObj(FILENAMES)) {
    setFILENAMES()
  }

  var countriesInfo = JSON.parse(fs.readFileSync(FILENAMES.project.countriesInfoFile, 'utf8'))
  var availableCountries = countriesInfo.availableCountries
  return availableCountries
}

function getNumberOfCountries () {
  if (isEmptyOrInvalidObj(FILENAMES)) {
    setFILENAMES()
  }

  var countriesInfo = JSON.parse(fs.readFileSync(FILENAMES.project.countriesInfoFile, 'utf8'))
  var numberOfCountries = Object.keys(countriesInfo.availableCountries).length
  return numberOfCountries
}

// gets Array with unique non-repeated values
// ex: [2,2,3,4,4] returns [2,3,4]
function getUniqueArray (Arr) {
  var newArr = (Object.values(Arr))
    .filter(function (x, i, a) {
      return a.indexOf(x) === i
    })

  return newArr
}

// get Key by Value, ex: var hash = {foo: 1, bar: 2}; getKeyByValue(hash, 2); => 'bar'
function getKeyByValue (object, value) {
  var key = Object.keys(object)
    .find(function (key) {
      return object[key] === value
    })

  return key
}

// from the countries Object "available_CT" get a string of CC separated by commas
// for example: "PT, BR, US, UK, etc."
function getCClistOnStr (availableCT) {
  var str = ''
  for (let CC in availableCT) {
    str += CC + ', '
  }
  // strip the last two character of the string, the last ", "
  str = str.slice(0, -2)
  return str
}

function getArgvHelpMsg () {
  var filename = path.basename(process.mainModule.filename)

  // credentials Directory seen from Root directory
  var credDirRelativePath = path.relative(DIRECTORIES.server.root, DIRECTORIES.server.credentials)

  var messg = '\n\n' +
        'Usage: node ' + filename + ' [options]\n' +
        'Ex:    node ' + filename + ' -r prod --uber --database\n' +
        '\n' +
        'Options: \n' +
        '-r, --release              [dev]elopment, [test] or [prod]uction\n' +
        '-p, --port                 HTTP port on which the application is listening. ' +
                                    'Default (test|dev|prod)=(' + defaultPortTest + '|' + defaultPortDev + '|' + defaultPortProd + ')\n' +
        '    --print                Enables the standard printing of final report\n' +
        '    --pdf                  Enables the downloading of a pdf final report (using pdfmake)\n' +
        '    --social               Enables social media plugin\n' +
        '    --disableCharts        Disables Charts on final report\n' +
        '\n' +
        '    External API services, disabled by default\n' +
        '    API credentials must be in either ' + credDirRelativePath + '/(prod|work|test)Credentials.json according to release\n' +
        '    --cdn                  Enables Content Delivery Network\n' +
        '    --uber                 Enables UBER API\n' +
        '    --googleCaptcha        Enables Google Captcha V2 anti-bot for calculation button\n' +
        '    --googleAnalytics      Enables Google Analytics\n' +
        '    --database             Enables a mysql Database\n' +
        '\n'

  return messg
}

function getNoServiceErrMsg (serviceObj, fileName) {
  var messg = '\nConsidering you enabled the ' + serviceObj.name +
    " services and you're using the release '" + RELEASE + "', " +
    'you have to either:\n' +
    '  - insert within the file ' + colors.green.bold(path.relative(ROOT_DIR, fileName)) + ' a valid ' +
    colors.green.bold(serviceObj.name + ' ' + serviceObj.propName) + ' (see readme.md), or\n' +
    '  - disable the ' + serviceObj.name + ' service.\n'

  return messg
}

function getDataBaseErrMsg (scriptFullPath, serviceObj) {
  var messg = '\nThis building script ' + path.relative(ROOT_DIR, scriptFullPath) +
    ' needs the Database credentials to run, therefore:\n' +
    '- enable the Database option (--database) and provide also its credentials on ' +
    path.relative(ROOT_DIR, FILENAMES.server.credentialsFullPath[RELEASE]) + ', or\n' +
    '- do not run this particular building script file while building.\n'

  return messg
}

function getConsoleColors () {
  var colorsTheme = {
    mainOption: ['yellow', 'bold'],
    mainOptionStep: ['blue', 'bold'],
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: ['red', 'bold']
  }

  return colorsTheme
}

// returns an object with several different information about the domains
function getDomainsObject (domainsCountries) {
  if (!domainsCountries) {
    let countriesInfo = JSON.parse(fs.readFileSync(FILENAMES.project.countriesInfoFile, 'utf8'))
    domainsCountries = countriesInfo.domainsCountries
  }

  var domainsObj = {}
  domainsObj.countries = domainsCountries // Object that associates a Country Code (CC) with a domain
  domainsObj.uniqueArr = getUniqueArray(domainsCountries) // Array with unique domain names

  var counts = {}
  var arr = Object.values(domainsCountries)
  for (var i = 0; i < arr.length; i++) {
    counts[arr[i]] = 1 + (counts[arr[i]] || 0)
  }
  domainsObj.counts = counts // for every domain, count how many domain names

  return domainsObj
}

// returns true when an object is empty = {} or invalid
function isEmptyOrInvalidObj (obj) {
  return typeof obj === 'undefined' || !obj || isEmpty(obj)
}

// detects whether an Object is empty
function isEmpty (obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) { return false }
  }

  return JSON.stringify(obj) === JSON.stringify({})
}

// checks if a credential is valid
function isValidCredentialString (data) {
  if (typeof data === 'string') {
    // check if string is valid (no just whitespaces or asterisks)
    return data && data.replace(/(\s|\*)/g, '').length
  } else if (typeof data === 'object') {
    var flattenedObj = flat.flatten(data)
    for (var key in flattenedObj) {
      var str = flattenedObj[key]
      // first character. When property of obj starts with '_' it's comment, thus ignore
      if (key.charAt(0) !== '_') {
        if (!str || !str.replace(/(\s|\*)/g, '').length) {
          return false
        }
      }
    }
    return true
  } else {
    return false
  }
}

// extract hostname/domain from url
function extractHostname (url) {
  var hostname
  // find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('://') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove "?"
  hostname = hostname.split('?')[0]

  return hostname
}

function runNodeScriptSync (scriptPath, args, stdio = 'inherit') {
  const { execSync } = require('child_process')

  args = args || []
  args.unshift(scriptPath) // adds element at beginning
  args.push('-r', RELEASE)
  try {
    execSync('node ' + args.join(' '), { stdio: stdio })
  } catch (err) {
    let errMsg = 'Error executing script: ' + path.relative(__dirname, scriptPath).error
    console.log(Error(errMsg + '\n' + err))
    process.exit(1)
  }
}

function getProgressBar (totalNumberOfTicks, muted) {
  var Bar
  if (!muted) {
    let ProgressBar = require('progress')
    Bar = new ProgressBar('[:bar] :percent :info', { total: totalNumberOfTicks, width: 80 })
  } else {
    Bar = { tick: function () {}, terminate: function () {} }
  }
  return Bar
}
