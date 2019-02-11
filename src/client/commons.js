/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

// TRANSFER DATA MODULE
// from user form or database to calculator
// see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules

/* global autocosts */

autocosts.commonsModule = (function (thisModule, serverInfo, translatedStrings) {
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

  // Get the applicable standard values
  function getStringFor (setting) {
    var errMsg = 'Error on getSettingsStringFor'

    switch (setting) {
      case 'fuelEfficiency':
        switch (translatedStrings.fuel_efficiency_std_option) {
          case 1:
            return 'l/100km'
          case 2:
            return 'km/l'
          case 3:
            return 'mpg(imp)'
          case 4:
            return 'mpg(US)'
          case 5:
            return 'l/mil'
          case 6:
            return 'km/gal(US)'
          default:
            console.error(errMsg + ': fuelEfficiency')
            return 'error'
        }
      /* falls through */ // avoid jshint warnings, for respecting JS standard as a `break` here would be unreachable
      case 'distance':
        switch (translatedStrings.distance_std_option) {
          case 1:
            return 'kilometres'
          case 2:
            return 'miles'
          case 3:
            return 'mil'
          default:
            console.error(errMsg + ': distance')
            return 'error'
        }
      /* falls through */
      case 'distanceShort':
        switch (translatedStrings.distance_std_option) {
          case 1:
            return 'km'
          case 2:
            return 'mi'
          case 3:
            return 'Mil'
          default:
            console.error(errMsg + ': distanceShort')
            return 'error'
        }
      /* falls through */
      case 'fuelPriceVolume':
        switch (translatedStrings.fuel_price_volume_std) {
          case 1:
            return 'litres'
          case 2:
            return 'imperial gallons'
          case 3:
            return 'US gallons'
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

  // function used to get from forms the selected option in radio buttons
  function getCheckedValue (radioObj) {
    var i

    if (!radioObj) {
      return ''
    }

    var radioLength = radioObj.length
    if (radioLength === undefined) {
      if (radioObj.checked) {
        return radioObj.value
      }
      return ''
    }

    for (i = 0; i < radioLength; i++) {
      if (radioObj[i].checked) {
        return radioObj[i].value
      }
    }
    return ''
  }

  // gets default protocol defined by Global Variable
  // it returns either "http://" or "https://", i.e., it returns including the "://"
  function getProtocol () {
    if (serverInfo.switches.https) {
      return window.location.protocol + '//'
    } else {
      return 'http://'
    }
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
  thisModule.getStringFor = getStringFor
  thisModule.getCheckedValue = getCheckedValue
  thisModule.getProtocol = getProtocol
  thisModule.isNumber = isNumber

  return thisModule
})(autocosts.commonsModule || {},
  autocosts.serverInfo,
  autocosts.serverInfo.translatedStrings)
