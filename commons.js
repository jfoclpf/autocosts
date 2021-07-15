/* Common information that will be used by other scripts and code */

// Default Country when any possible method to get country isn't available
const defaultCountry = 'UK' // when no other method finds the country of user, use this by default
const defaultPortProd = 3028 // default HTTP Port where the app listens - prod version
const defaultPortDev = 3027 // default HTTP Port where the app listens - dev version
const defaultPortTest = 3026 // default HTTP Port where the app listens - prod version

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

  getUrlsObject: getUrlsObject,

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

  getProgressBar: getProgressBar,

  parseJsonProperty: parseJsonProperty
}

/***************************************************************************************************/
/***************************************************************************************************/
/***************************************************************************************************/

let RELEASE // release, "dev", "test" or "prod"
let ROOT_DIR // root directory of the project
let SWITCHES, DIRECTORIES, SETTINGS, FILENAMES, EVENTEMITTER
let optionDefinitions // for the commandLineArgs

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
    cdn: false, /* Content Delivery Network */
    uber: false, /* uses UBER API to give car user comparisions with UBER costs */
    social: false, /* Social media pulgins */
    disableCharts: false, /* Disable Charts on result */
    googleCaptcha: false, /* Google Captcha to avoid spam-bots */
    googleAnalytics: false, /* Google Analytics */
    database: false, /* Inserts user input data into a DataBase */
    print: false, /* Print result option, at the end */
    pdf: false /* Download PDF report option */
  }

  // basic command line settings
  optionDefinitions = [
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'release', alias: 'r', type: String },
    { name: 'port', alias: 'p', type: Number }
  ]

  // populates optionDefinitions of commandLineArgs according to SWITCHES
  for (const service in SWITCHES) {
    optionDefinitions.push({ name: service, type: Boolean })
  }

  // get set commandLineArgsObject from command line arguments
  let commandLineArgsObject
  try {
    commandLineArgsObject = commandLineArgs(optionDefinitions)
    // this "commandLineArgsObject" is just filled with the options that were inserted in the command line
    // console.log(commandLineArgsObject);
  } catch (err) {
    console.log('Unknown option: ' + err.optionName, '\n')
    commandLineArgsObject = { help: true }
  }

  RELEASE = RELEASE || commandLineArgsObject.release // set Global variable
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
  if (commandLineArgsObject.help) {
    console.log(getArgvHelpMsg())
    process.exit()
  }

  // set HTTP port
  let HTTPport
  if (commandLineArgsObject.port) {
    HTTPport = commandLineArgsObject.port
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
  if (commandLineArgsObject.All) {
    for (const opt in SWITCHES) {
      SWITCHES[opt] = true
    }
  } else {
    for (const opt in commandLineArgsObject) {
      if (opt !== 'release') {
        SWITCHES[opt] = commandLineArgsObject[opt]
      }
    }
  }

  SETTINGS = {
    release: RELEASE,
    switches: SWITCHES,
    HTTPport: HTTPport,
    cdn: { // a CDN provider might be: https://app.keycdn.com/zones
      enabled: SWITCHES.cdn,
      name: 'cdn',
      propName: 'url',
      propType: 'string',
      url: ''
    },
    uber: {
      enabled: SWITCHES.uber,
      name: 'uber',
      propName: 'token',
      propType: 'string',
      token: ''
    },
    googleCaptcha: {
      enabled: SWITCHES.googleCaptcha,
      name: 'googleCaptcha',
      propName: 'secretKey',
      propType: 'string',
      secretKey: ''
    },
    googleAnalytics: {
      enabled: SWITCHES.googleAnalytics,
      name: 'googleAnalytics',
      propName: 'trackingId',
      propType: 'string',
      trackingId: ''
    },
    database: {
      enabled: SWITCHES.database,
      name: 'database',
      propName: 'credentials',
      propType: 'object',
      credentials: {}
    },
    money: {
      // in test version we don't use the money API because test version credentials are public
      // and money API credentials must be private
      enabled: RELEASE === 'test' ? false : SWITCHES.database,
      name: 'money',
      propName: 'ApiId',
      propType: 'string',
      ApiId: ''
    },
    defaultCountry: defaultCountry
  }

  checkForInternet()

  // reads data from JSON file with credentials for each service (in directory credentials/)
  let credentialsFileName
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
  for (const service in SETTINGS) {
    const serviceObj = SETTINGS[service]
    if (serviceObj.enabled) {
      if (!fs.existsSync(credentialsFileName)) {
        throw getNoServiceErrMsg(serviceObj, credentialsFileName)
      }
      const credentialsData = JSON.parse(fs.readFileSync(credentialsFileName))

      if (serviceObj.propType === 'string') {
        const dataStr = credentialsData[serviceObj.name][serviceObj.propName]
        // check if string is valid (no just whitespaces or asterisks)
        if (!isValidCredentialString(dataStr)) {
          throw getNoServiceErrMsg(serviceObj, credentialsFileName)
        }
        serviceObj[serviceObj.propName] = dataStr
      } else if (serviceObj.propType === 'object') { // if service data is an object (normally applies to database)
        const dataObj = credentialsData[serviceObj.name]
        if (!isValidCredentialString(dataObj)) {
          throw getNoServiceErrMsg(serviceObj, credentialsFileName)
        }
        serviceObj[serviceObj.propName] = Object.assign({}, dataObj) // clone object
      } else {
        throw Error('Error getting service information from ' + serviceObj.name)
      }
    }
  }

  // downloads/copy google analytics file from Google Server
  if (SWITCHES.googleAnalytics) {
    downloadGoogleAnalyticsJSFIle()
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
  const srcDir = path.join(ROOT_DIR, 'src')

  // Bin directory - the directory to where the source code is deployed after running the bash script ./build.sh
  const binDir = path.join(ROOT_DIR, 'bin')

  // Build directory - the directory to where the building scripts are stored
  const buildDir = path.join(ROOT_DIR, 'build')

  // directory where test scripts and files are stored
  const testDir = path.join(ROOT_DIR, 'test')

  // credentials directory where json credential files are stored for each service
  const credentialsDir = path.join(ROOT_DIR, 'credentials')

  const serverDirs = {
    root: ROOT_DIR,
    src: srcDir,
    bin: binDir,
    build: buildDir,
    test: testDir,
    credentials: credentialsDir
  }

  /* ################################# */

  // these paths are relative, and they refer to the paths which are seen by the browser
  const clientDirs = {
    client: 'client', // directory with respect to src/ dir, where the client JS browser files will be stored
    css: 'css', // directory with respect to src/ dir, where the CSS  files will be stored
    tables: 'tables' // where the JPG tables with car costs for each country
  }

  /* ################################# */

  // these paths are relative and refer to the project's code parent folder,
  // i.e., the parent directory of these paths is either src/ or bin/
  const projectDirs = {
    countries: 'countries',
    css: 'css',
    tables: 'tables',
    images: 'images',
    public: 'public',
    views: 'views',
    client: 'client',
    server: 'server'
  }

  const srcProjectDirs = {}
  const binProjectDirs = {}

  for (const prop in projectDirs) {
    srcProjectDirs[prop] = path.join(srcDir, projectDirs[prop])
    binProjectDirs[prop] = path.join(binDir, projectDirs[prop])
  }

  DIRECTORIES = {
    // these paths are absolute
    server: serverDirs, // these paths are absolute
    src: srcProjectDirs, // these paths are absolute
    bin: binProjectDirs, // these paths are absolute
    client: clientDirs, // these paths are relative (as seen by the browser)
    project: projectDirs // these paths are relative (as seen by either src/ or bin/)
  }
}

function setFILENAMES () {
  if (!RELEASE) {
    _init()
  }

  if (isEmptyOrInvalidObj(DIRECTORIES)) {
    setDIRECTORIES()
  }

  // for release "prod" and "test" use /bin directories
  const countriesDir = RELEASE === 'dev' ? DIRECTORIES.src.countries : DIRECTORIES.bin.countries
  const clientDir = RELEASE === 'dev' ? DIRECTORIES.src.client : DIRECTORIES.bin.client

  // Default file names for JSON files with credentials for each external service
  FILENAMES = {
    // these paths are ABSOLUTE
    build: {
      compressImages: path.join(DIRECTORIES.server.build, 'compressImages.js'),
      generateTables: path.join(DIRECTORIES.server.build, 'generateTables.js'),
      getAvgFromDB: path.join(DIRECTORIES.server.build, 'getAvgFromDB.js'),
      minifyFiles: path.join(DIRECTORIES.server.build, 'minifyFiles.js'),
      rasterTables: path.join(DIRECTORIES.server.build, 'rasterTables.js'),
      setCountrySpecsDB: path.join(DIRECTORIES.server.build, 'setCountrySpecsDB.js'),
      statsFunctions: path.join(DIRECTORIES.server.build, 'statsFunctions.js'),
      gAnalytics: path.join(DIRECTORIES.server.build, 'gAnalytics.js')
    },
    project: {
      countriesInfoFile: path.join(countriesDir, 'info.json'),
      'conversions.js': path.join(clientDir, 'core', 'conversions.js'),
      'calculator.js': path.join(clientDir, 'core', 'calculator.js'),
      'convertData.js': path.join(clientDir, 'convertData.js'),
      'validateData.js': path.join(clientDir, 'validateData.js')
    },
    server: {
      credentials: {
        prod: 'prodCredentials.json',
        dev: 'devCredentials.json',
        test: 'testCredentials.json'
      },
      credentialsFullPath: {
        prod: '',
        dev: '',
        test: ''
      }
    },
    // the LOCAL paths are RELATIVE to the main host as seen by the BROWSER,
    // thus don't use node 'fs' nor 'path' functions, i.e., these are URI or part of URI
    client: {
      jquery: {
        local: DIRECTORIES.client.client + '/jquery/jquery.min.js',
        cdn: 'https://code.jquery.com/jquery-latest.min.js',
        uri: '' // it will be one of the above
      },
      chartjs: {
        local: DIRECTORIES.client.client + '/chart/chartjs.min.js',
        cdn: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js',
        uri: '' // it will be one of the above
      },
      GrecaptchaAPI: 'https://www.google.com/recaptcha/api.js',
      Ganalytics: 'https://www.google-analytics.com/analytics.js'
    }
  }

  // fills credentialsFullPath subObject
  for (const file in FILENAMES.server.credentials) {
    FILENAMES.server.credentialsFullPath[file] =
            path.join(DIRECTORIES.server.credentials, FILENAMES.server.credentials[file])
  }
}

// get parent directory of project directory tree
// tries to get according to engine, NodeJS or PhantomJS
function setROOT_DIR () { // eslint-disable-line camelcase
  let rootDir

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
  for (const key in FILENAMES.client) {
    const obj = FILENAMES.client[key]
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

// checks for internet conn. in case of either options "uber", "cdn", "social", "googleCaptcha" or "googleAnalytics"
// are selected. These options require Internet and thus enables/disables them according to Internet connection
function checkForInternet () {
  // bin/server.js services demanding Internet
  const servicesDemandingInternet = ['uber', 'cdn', 'social', 'database', 'googleCaptcha', 'googleAnalytics']

  const activatedServiceDemandingInternet = []
  for (let i = 0; i < servicesDemandingInternet.length; i++) {
    if (SWITCHES[servicesDemandingInternet[i]]) {
      activatedServiceDemandingInternet.push(servicesDemandingInternet[i])
    }
  }

  const debugInternet = require('debug')('app:checkForInternet')

  // if there are no services requiring internet, there is no need to check for internet
  if (activatedServiceDemandingInternet.length === 0) {
    debugInternet('No activated services requiring Internet, thus no need to check for Internet')
    return
  }

  debugInternet('Activated services requiring Internet:', activatedServiceDemandingInternet)

  // check for Internet connection every 3 seconds and updates if status changes
  let internetStatus = 'offline'
  const checkInternetConnection = () => {
    isOnline({ timeout: 3000 }).then(function (online) {
      debugInternet(online ? 'online' : 'offline')

      if (!online && internetStatus === 'online') {
        console.log('There is no Internet connection'.warn)
        internetStatus = 'offline'

        if (SWITCHES.cdn) {
          setCdnOrLocalFiles(false) // set Local files, with paramter "false"
        }

        // disable activated services that require internet
        const len = activatedServiceDemandingInternet.length
        for (let i = 0; i < len; i++) {
          SWITCHES[activatedServiceDemandingInternet[i]] = false
        }

        process.stdout.write('Services disabled: ')
        for (let i = 0; i < len; i++) {
          process.stdout.write(activatedServiceDemandingInternet[i] + (i !== len - 1 ? ', ' : '.\n'))
        }

        if (EVENTEMITTER) {
          EVENTEMITTER.emit('settingsChanged')
          EVENTEMITTER.emit('onlineStatus', false)
        }
      } else if (online && internetStatus === 'offline') {
        console.log('The server is online'.green)
        internetStatus = 'online'

        // enabling services that were initially activated on startup and that require internet
        const len = activatedServiceDemandingInternet.length
        for (let i = 0; i < len; i++) {
          SWITCHES[activatedServiceDemandingInternet[i]] = true
        }

        process.stdout.write('Services enabled: ')
        for (let i = 0; i < len; i++) {
          process.stdout.write(activatedServiceDemandingInternet[i] + (i !== len - 1 ? ', ' : '.\n'))
        }

        if (EVENTEMITTER) {
          EVENTEMITTER.emit('onlineStatus', true)
          EVENTEMITTER.emit('settingsChanged')
        }
      }

      setTimeout(checkInternetConnection, 3000)
    })
  }
  checkInternetConnection()
}

function getCountriesObj () {
  if (isEmptyOrInvalidObj(FILENAMES)) {
    setFILENAMES()
  }

  const countriesInfo = JSON.parse(fs.readFileSync(FILENAMES.project.countriesInfoFile, 'utf8'))
  const availableCountries = countriesInfo.availableCountries
  return availableCountries
}

function getNumberOfCountries () {
  if (isEmptyOrInvalidObj(FILENAMES)) {
    setFILENAMES()
  }

  const countriesInfo = JSON.parse(fs.readFileSync(FILENAMES.project.countriesInfoFile, 'utf8'))
  const numberOfCountries = Object.keys(countriesInfo.availableCountries).length
  return numberOfCountries
}

function downloadGoogleAnalyticsJSFIle () {
  if (isEmptyOrInvalidObj(FILENAMES)) {
    setFILENAMES()
  }

  const https = require('https')

  const gAnalyticsJSFile = path.join(DIRECTORIES.bin.client, 'analytics.js')

  // download and save file
  const file = fs.createWriteStream(gAnalyticsJSFile)
  https.get(FILENAMES.client.Ganalytics, function (response) {
    response.pipe(file)
    console.log(`Downloaded Google Analytics Javascript file from ${FILENAMES.client.Ganalytics} to ${gAnalyticsJSFile}`)
    fs.chmod(gAnalyticsJSFile, 0o766, (err) => {
      if (err) {
        console.error(`Can't change the permissions of file ${file}`)
      } else {
        debug(`The permissions for file ${gAnalyticsJSFile} have been changed!`)
      }
    })
  })
}

// gets Array with unique non-repeated values
// ex: [2,2,3,4,4] returns [2,3,4]
function getUniqueArray (Arr) {
  const newArr = (Object.values(Arr))
    .filter(function (x, i, a) {
      return a.indexOf(x) === i
    })

  return newArr
}

// get Key by Value, ex: var hash = {foo: 1, bar: 2}; getKeyByValue(hash, 2); => 'bar'
function getKeyByValue (object, value) {
  const key = Object.keys(object)
    .find(function (key) {
      return object[key] === value
    })

  return key
}

// from the countries Object "available_CT" get a string of CC separated by commas
// for example: "PT, BR, US, UK, etc."
function getCClistOnStr (availableCT) {
  let str = ''
  for (const CC in availableCT) {
    str += CC + ', '
  }
  // strip the last two character of the string, the last ", "
  str = str.slice(0, -2)
  return str
}

function getArgvHelpMsg () {
  const filename = path.basename(process.mainModule.filename)

  // credentials Directory seen from Root directory
  const credDirRelativePath = path.relative(DIRECTORIES.server.root, DIRECTORIES.server.credentials)

  const messg = '\n\n' +
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
        '    API credentials must be in either ' + credDirRelativePath + '/(prod|dev|test)Credentials.json according to release\n' +
        '    --cdn                  Enables Content Delivery Network\n' +
        '    --uber                 Enables UBER API\n' +
        '    --googleCaptcha        Enables Google Captcha V2 anti-bot for calculation button\n' +
        '    --googleAnalytics      Enables Google Analytics\n' +
        '    --database             Enables a mysql Database\n' +
        '\n'

  return messg
}

function getNoServiceErrMsg (serviceObj, fileName) {
  const messg = '\nConsidering you enabled the ' + serviceObj.name +
    " services and you're using the release '" + RELEASE + "', " +
    'you have to either:\n' +
    '  - insert within the file ' + colors.green.bold(path.relative(ROOT_DIR, fileName)) + ' a valid ' +
    colors.green.bold(serviceObj.name + ' ' + serviceObj.propName) + ' (see readme.md), or\n' +
    '  - disable the ' + serviceObj.name + ' service.\n'

  return messg
}

function getDataBaseErrMsg (scriptFullPath, serviceObj) {
  const messg = '\nThis building script ' + path.relative(ROOT_DIR, scriptFullPath) +
    ' needs the Database credentials to run, therefore:\n' +
    '- enable the Database option (--database) and provide also its credentials on ' +
    path.relative(ROOT_DIR, FILENAMES.server.credentialsFullPath[RELEASE]) + ', or\n' +
    '- do not run this particular building script file while building.\n'

  return messg
}

function getConsoleColors () {
  const colorsTheme = {
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
    server: 'magenta',
    client: 'blue',
    error: ['red', 'bold']
  }

  return colorsTheme
}

// returns an object with several different information about the domains
function getUrlsObject (countriesInfo) {
  if (!countriesInfo) {
    countriesInfo = JSON.parse(fs.readFileSync(FILENAMES.project.countriesInfoFile, 'utf8'))
  }

  const domainsCountries = countriesInfo.domainsCountries

  const domainsObj = {}
  domainsObj.__url_selector = 'https://github.com/jfoclpf/autocosts/wiki/URL-selector'
  domainsObj.__domainName_policy = 'https://github.com/jfoclpf/autocosts/wiki/Domain-name-policy'

  domainsObj.canonicalHostname = domainsCountries // Object that associates a Country Code (CC) with a domain
  domainsObj.uniqueArrayOfCanonicalHostname = getUniqueArray(domainsCountries) // Array with unique domain names
  domainsObj.devDomain = countriesInfo.devDomain
  domainsObj.legacyDomains = countriesInfo.legacyDomains

  // for every domain, count how many domain names
  // ex: 'autocustos.pt': 1, 'autocosts.info': 19
  const countsOfCanonicalHostname = {}
  const arr = Object.values(domainsCountries)
  for (let i = 0; i < arr.length; i++) {
    countsOfCanonicalHostname[arr[i]] = 1 + (countsOfCanonicalHostname[arr[i]] || 0)
  }
  domainsObj.countsOfCanonicalHostname = countsOfCanonicalHostname

  // object with the url path after host/domain '/ar' for AR or '' for PT
  // because the url for PT is merely autocustos.pt without path
  const canonicalPathname = {}
  for (const CC in domainsCountries) {
    // check if domain is a ccTLD, ex: autocustos.pt is and autocustos.info is not
    const uppperExtension = domainsCountries[CC].split('.').pop().toUpperCase() // 'PT' in autocustos.pt
    if (isoCountries.hasOwnProperty(uppperExtension)) { // eslint-disable-line no-prototype-builtins
      canonicalPathname[CC] = ''
    } else {
      canonicalPathname[CC] = '/' + CC.toLowerCase()
    }
  }
  domainsObj.canonicalPathname = canonicalPathname

  const canonicalStatsUrl = {}
  for (const CC in domainsCountries) { // PT: autocustos.pt, CA: autocosts.info, etc.
    canonicalStatsUrl[CC] = domainsCountries[CC] + canonicalPathname[CC] + '/stats'
  }
  domainsObj.canonicalStatsUrl = canonicalStatsUrl

  return domainsObj
}

// returns true when an object is empty = {} or invalid
function isEmptyOrInvalidObj (obj) {
  return typeof obj === 'undefined' || !obj || isEmpty(obj)
}

// detects whether an Object is empty
function isEmpty (obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) { // eslint-disable-line no-prototype-builtins
      return false
    }
  }

  return JSON.stringify(obj) === JSON.stringify({})
}

// checks if a credential is valid
function isValidCredentialString (data) {
  if (typeof data === 'string') {
    // check if string is valid (no just whitespaces or asterisks)
    return data && data.replace(/(\s|\*)/g, '').length
  } else if (typeof data === 'object') {
    const flattenedObj = flat.flatten(data)
    for (const key in flattenedObj) {
      const str = flattenedObj[key]
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
  let hostname
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

  debug('Running: node ' + args.join(' '))
  try {
    execSync('node ' + args.join(' '), { stdio: ['inherit', 'inherit', 'inherit'] })
  } catch (err) {
    const errMsg = 'Error executing script: ' + path.relative(__dirname, scriptPath).error
    console.error(Error(errMsg + '\n' + err))
    process.exit(1)
  }
}

function getProgressBar (totalNumberOfTicks, muted) {
  let Bar
  if (!muted) {
    const ProgressBar = require('progress')
    Bar = new ProgressBar('[:bar] :percent :info', { total: totalNumberOfTicks, width: 80 })
  } else {
    Bar = { tick: function () {}, terminate: function () {} }
  }
  return Bar
}

// to be used by JSON.parse
// if json property is a number within a String (!isNaN) convert its type to Number
function parseJsonProperty (key, value) {
  return !isNaN(value) ? parseFloat(value) : value
}

// 2-letter ISO Country Codes
const isoCountries = {
  AF: 'Afghanistan',
  AX: 'Aland Islands',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua And Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia And Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CD: 'Congo, Democratic Republic',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: 'Cote D\'Ivoire',
  HR: 'Croatia',
  CU: 'Cuba',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands (Malvinas)',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island & Mcdonald Islands',
  VA: 'Holy See (Vatican City State)',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran, Islamic Republic Of',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle Of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KR: 'Korea',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: 'Lao People\'s Democratic Republic',
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libyan Arab Jamahiriya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MK: 'Macedonia',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia, Federated States Of',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  AN: 'Netherlands Antilles',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestinian Territory, Occupied',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  BL: 'Saint Barthelemy',
  SH: 'Saint Helena',
  KN: 'Saint Kitts And Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin',
  PM: 'Saint Pierre And Miquelon',
  VC: 'Saint Vincent And Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome And Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia And Sandwich Isl.',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard And Jan Mayen',
  SZ: 'Swaziland',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad And Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks And Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  UK: 'United Kingdom',
  US: 'United States',
  UM: 'United States Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Viet Nam',
  VG: 'Virgin Islands, British',
  VI: 'Virgin Islands, U.S.',
  WF: 'Wallis And Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe'
}
