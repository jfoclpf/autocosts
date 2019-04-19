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

    if (tld === 'work') {
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

  // Get the applicable standard units
  // see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#standards
  function getStandard (setting, countryInfo) {
    var fuelEfficiencyStandardOption, distanceStandardOption, fuelPriceVolumeStandard
    if (countryInfo) { /* used by statistical functions, such as statsFunctions.js (on back-end) */
      fuelEfficiencyStandardOption = countryInfo.fuel_efficiency_std
      distanceStandardOption = countryInfo.distance_std
      fuelPriceVolumeStandard = countryInfo.fuel_price_volume_std
    } else { /* used by the browser (on front-end) */
      fuelEfficiencyStandardOption = serverInfo.translatedStrings.fuel_efficiency_std_option
      distanceStandardOption = serverInfo.translatedStrings.distance_std_option
      fuelPriceVolumeStandard = serverInfo.translatedStrings.fuel_price_volume_std
    }
    var errMsg = 'Error on getSettingsStringFor'

    switch (setting) {
      case 'fuelEfficiency':
        switch (fuelEfficiencyStandardOption) {
          case 1:
            return 'ltr/100km'
          case 2:
            return 'km/ltr'
          case 3:
            return 'mpg(imp)'
          case 4:
            return 'mpg(US)'
          case 5:
            return 'ltr/mil(10km)'
          case 6:
            return 'mil(10km)/ltr'
          case 7:
            return 'km/gal(US)'
          default:
            console.error(errMsg + ': fuelEfficiency')
            return 'error'
        }
      /* falls through */ // avoid jshint warnings, for respecting JS standard as a `break` here would be unreachable
      case 'distance':
        switch (distanceStandardOption) {
          case 1:
            return 'km'
          case 2:
            return 'mi'
          case 3:
            return 'mil(10km)'
          default:
            console.error(errMsg + ': distance')
            return 'error'
        }
      /* falls through */
      case 'fuelPriceVolume':
        switch (fuelPriceVolumeStandard) {
          case 1:
            return 'ltr'
          case 2:
            return 'gal(UK)'
          case 3:
            return 'gal(US)'
          default:
            console.error(errMsg + ': fuelPriceVolume')
            return 'error'
            /* falls through */
        }
      /* falls through */
      default:
        throw errMsg
    }
  }

  // this function allows broader defintion inputs from user form and
  // backward compatibility from user old inputs on database for time periods
  // for example if timePeriod is either 'month', 1, '1', 'monthly', 'mensal' or 'mês' => 'month'
  function getTimePeriod (timePeriod) {
    var timePeriodsObj = {
      'hour': ['hourly'],
      'week': ['weekly'],
      'month': [1, 'monthly', 'mensal', 'mês'],
      'twoMonths': [2, 'two_months', 'two months', '2 months', 'bimestral', 'bimestre'],
      'trimester': [3, 'trimesterly', 'quarterly', 'trimestral'],
      'semester': [4, 'semesterly', 'semestral', 'half&#8209;yearly', 'halfyearly'],
      'year': [5, 'yearly', 'anual', 'ano']
    }

    var val = !isNaN(timePeriod) ? parseInt(timePeriod, 10) : timePeriod
    for (var key in timePeriodsObj) {
      if (key === val || timePeriodsObj[key].indexOf(val) !== -1) {
        return key
      }
    }

    return null
  }

  // for Radio Buttons
  function getSelectedValueOnRadioButton (radioObj) {
    var i

    var processReturn = function (value) {
      if (value === 'true') {
        return true
      } else if (value === 'false') {
        return false
      } else {
        return value
      }
    }

    if (!radioObj) {
      return ''
    }

    var radioLength = radioObj.length
    if (radioLength === undefined) {
      if (radioObj.checked) {
        return processReturn(radioObj.value)
      }
      return ''
    }

    for (i = 0; i < radioLength; i++) {
      if (radioObj[i].checked) {
        return processReturn(radioObj[i].value)
      }
    }
    return ''
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
  thisModule.getStandard = getStandard
  thisModule.getTimePeriod = getTimePeriod
  thisModule.getSelectedValueOnRadioButton = getSelectedValueOnRadioButton
  thisModule.flatten = flatten
  thisModule.isNumber = isNumber

  return thisModule
})(autocosts.commonsModule || {},
  autocosts.serverInfo || {})

// check for node
if (typeof window === 'undefined') {
  module.exports = autocosts.commonsModule
}
