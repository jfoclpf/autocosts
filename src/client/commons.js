/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

// COMMONS mainly on client/browser/front-end side
// see our module template: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#modules

// check for node
if (!autocosts && typeof window === 'undefined') { // eslint-disable-line
  var autocosts = {}
}

autocosts.commonsModule = (function (thisModule, serverInfo) {
  function initialize () {
    loadModuleDependencies()
  }

  function loadModuleDependencies () {
    /**/
  }

  /* function which returns whether this session is a (test/develop version) or a prod version */
  function isThisAtest () {
    if (serverInfo.booleans.isATest || serverInfo.selectedCountry === 'XX') {
      return true
    }

    // verifies top level domain
    var hostName = window.location.hostname
    var hostNameArray = hostName.split('.')
    var posOfTld = hostNameArray.length - 1
    var tld = hostNameArray[posOfTld]

    if (tld === 'work' || tld === 'dev') {
      return true
    }

    return false
  }

  /* Determine the mobile operating system.
     * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
     * @returns {String} */
  function getMobileOperatingSystem () {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone'
    }

    if (/android/i.test(userAgent)) {
      return 'Android'
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'
    }

    return 'unknown'
  }

  // is the client a mobile device?
  function isMobile () {
    return getMobileOperatingSystem() !== 'unknown' || window.matchMedia('only screen and (max-width: 760px)').matches
  }

  function removeHashFromUrl () {
    window.history.pushState('', document.title, window.location.pathname + window.location.search)
  }

  function getCurrency () {
    return serverInfo.translatedStrings.curr_code
  }

  function getCountryCode () {
    return serverInfo.selectedCountry
  }

  // Get the applicable standard units
  // see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#standards
  function getStandard (standard, databaseEntryInfo) {
    var fuelEfficiencyStandardOption, distanceStandardOption, fuelPriceVolumeStandard

    if (databaseEntryInfo) { /* used by statistical functions with nodeJS, such as statsFunctions.js (on back-end) */
      if (databaseEntryInfo.standard) {
        /* if the specific standard is available in database */
        return mapUnit(standard, databaseEntryInfo.standard)
      } else {
        /* use standards applicable for the country */
        fuelEfficiencyStandardOption = databaseEntryInfo.countryInfo.fuel_efficiency_std
        distanceStandardOption = databaseEntryInfo.countryInfo.distance_std
        fuelPriceVolumeStandard = databaseEntryInfo.countryInfo.fuel_price_volume_std
      }
    } else {
      /* used by the browser (on front-end) */
      fuelEfficiencyStandardOption = serverInfo.translatedStrings.fuel_efficiency_std_option
      distanceStandardOption = serverInfo.translatedStrings.distance_std_option
      fuelPriceVolumeStandard = serverInfo.translatedStrings.fuel_price_volume_std
    }

    // this dictionary is not a language dictionary, it is merely for backward
    // and broad function input compatibility and to encompass user old inputs in databases
    var dictionary = {
      distance: {
        'km': [1, 'kms', 'kilometre', 'kilometers', 'kilometres'],
        'mi': [2, 'mi', 'mile', 'miles'],
        'mil(10km)': [3, 'nordicMile', 'nordic mile', 'mil(10km)', 'scandinavian mile']
      },
      fuelPriceVolume: {
        'ltr': [1, 'l', 'litre', 'Litre', 'liter', 'Liter'],
        'gal(imp)': [2, 'imp gallon', 'imperial gallon', 'imperial gal', 'gal(UK)'],
        'gal(US)': [3, 'US gallon', 'US gal'],
        'kWh': [4, 'KWH']
      },
      fuelEfficiency: {
        'l/100km': [1, 'ltr/100km'],
        'km/l': [2, 'km/ltr'],
        'mpg(imp)': [3, 'mpg(imp.)', 'mpg(UK)'],
        'mpg(US)': [4, 'US mpg'],
        'ltr/mil(10km)': [5, 'l/nordicMile', 'l/mil', 'ltr/mil', 'l/mil(10km)', 'l/10km', 'ltr/10km'],
        'mil(10km)/ltr': [6, 'nordicMile/l', 'mil/l', 'mil/ltr', 'mil(10km)/l', '10km/l', '10km/ltr'],
        'km/gal(US)': [7, 'km/USGalon']
      }
    }

    function mapUnit (concept, value) {
      var val = !isNaN(value) ? parseInt(value, 10) : value
      for (var key in dictionary[concept]) {
        if (key === val || dictionary[concept][key].indexOf(val) !== -1) {
          return key
        }
      }
      throw Error('Uknown value "' + value + '" for concept "' + concept + '". Check the variable dictionary.\n')
    }

    switch (standard) {
      case 'distance':
        return mapUnit('distance', distanceStandardOption)
      case 'fuelPriceVolume':
        return mapUnit('fuelPriceVolume', fuelPriceVolumeStandard)
      case 'fuelEfficiency':
        return mapUnit('fuelEfficiency', fuelEfficiencyStandardOption)
      default:
        throw Error('Invalid standard:' + standard)
    }
  }

  // flatten object, that is, from an Object composed by elements in a Object's tree, returns simple list Object
  // i.e., from complex object with hierarchies, flattens to simple list Object
  function flatten (target, opts) {
    opts = opts || {}

    var delimiter = opts.delimiter || '.'
    var maxDepth = opts.maxDepth
    var output = {}

    function step (object, prev, currentDepth) {
      currentDepth = currentDepth || 1
      Object.keys(object).forEach(function (key) {
        var value = object[key]
        var isarray = opts.safe && Array.isArray(value)
        var type = Object.prototype.toString.call(value)
        var isbuffer = isBuffer(value)
        var isobject = (type === '[object Object]' || type === '[object Array]')

        var newKey = prev ? prev + delimiter + key : key

        if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
                (!opts.maxDepth || currentDepth < maxDepth)) {
          return step(value, newKey, currentDepth + 1)
        }

        output[newKey] = value
      })
    }

    function isBuffer (obj) {
      return obj != null && obj.constructor != null &&
               typeof obj.constructor.isBuffer === 'function' &&
               obj.constructor.isBuffer(obj)
    }

    step(target)

    return output
  }

  // this function is very important and checks if number is a finite valid number
  // no variable coercions, no bullshit, no string, no "1", no true, no NaN, no null, no 1/0,
  // and 0 returns true. n must be a finite valid number
  // USE THIS FUNCTION, see https://stackoverflow.com/a/8526029/1243247
  function isNumber (n) {
    return typeof n === 'number' && !isNaN(n) && isFinite(n)
  }

  /* === Public methods to be returned === */

  // own module, since it may have been defined erlier by children modules
  thisModule.initialize = initialize
  thisModule.isThisAtest = isThisAtest
  thisModule.getMobileOperatingSystem = getMobileOperatingSystem
  thisModule.isMobile = isMobile
  thisModule.removeHashFromUrl = removeHashFromUrl
  thisModule.getCurrency = getCurrency
  thisModule.getCountryCode = getCountryCode
  thisModule.getStandard = getStandard
  thisModule.flatten = flatten
  thisModule.isNumber = isNumber

  return thisModule
})(autocosts.commonsModule || {},
  autocosts.serverInfo || {})

// check for node
if (typeof window === 'undefined') {
  module.exports = autocosts.commonsModule
}
