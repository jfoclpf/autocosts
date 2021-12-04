/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/* MAIN MODULE */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#modules */
/* This is the first JS file to be loaded, right after jquery, see views/main.hbs */

/* global $, ga */
/* eslint prefer-const: "off" */
/* eslint no-var: "off" */

var autocosts = (function () {
  var mainVariables = {
    main: {
      calculatedData: undefined, // calculated meta-data after user clicks "Run"
      formData: undefined, // Form data filled by the user
      uberApiObj: undefined, // UBER API object with city specific costs (cost per km, per minute, etc.)
      databaseObj: undefined // Object from user form, that is stored in database
    },
    paths: {
      jsFiles: undefined, // Object with locations of Javascript Files
      url: {
        origin: undefined, // origin from URL, example 'http://autocosts.info'
        href: undefined, // the true current full URL of the page, example 'http://autocosts.info/XX'
        protocol: undefined, // `http:` or `https:`
        // if this is UK => 'http://autocosts.info/UK'
        cdnUrl: undefined, // it's defined in the node server side server.js
        uberApi: undefined, // uber url to get UBER API information through AJAX
        canonicalPathname: undefined, // object with pathname of url, ex: '/pt' for each country
        canonicalHostname: undefined // object with canonical hosts for each country
      },
      dirs: {
        clientDir: undefined, // client directory seen by the browser
        languagesJsonDir: undefined, // path of JSON Translation files
        translationsDir: undefined
      }
    },
    statistics: {
      statisticsObj: undefined // Object with countrys' users costs statistics
    },
    serverInfo: {
      release: undefined, // dev or prod
      switches: undefined, // GLOBAL switches Object, got from server configuration
      selectedCountry: undefined, // Current Country Code
      countryListObj: undefined, // List of countries in a Javascript Object
      countriesStandards: undefined, // fuel efficiency standards (km/L, mpg, etc.), distance standards (km, mi, etc.)
      domainListObj: undefined, // List of domains in a Javascript Object
      language: undefined, // Current Language Code according to ISO_639-1 codes
      translatedStrings: undefined, // Object with country's language text strings
      nonce: undefined, // Number used only once for CSP rules in scrips
      googleAnalyticsTrackingId: undefined, // Google analytics Tracking ID
      booleans: {
        isATest: undefined, // server refers that this session is a test
        notLocalhost: undefined, // true when this session does not come from localhost
        isThisARecognizedHost: undefined // autocustos.info or autocustos.pt are for ex. recognized hosts
      }
    },
    servicesAvailabilityObj: {
      googleCaptcha: false, // variable that says whether Google Captcha JS files are available
      googleAnalytics: false, // variable that says whether Google Analytics JS files are available
      uber: false
    },
    userInfo: {
      uniqueUserId: undefined, // Unique User Identifier
      isHumanConfirmed: false, // for Google reCaptcha
      timeCounter: undefined // function used for assessing the time user takes to fill the form
    }
  };

  // gets switches from server side configuration
  (function () {
    var globalSwitches = document.getElementById('global_switches')
    mainVariables.serverInfo.switches = {
      uber: JSON.parse(globalSwitches.dataset.uber), /* Uber */
      social: JSON.parse(globalSwitches.dataset.social), /* Social media pulgins */
      charts: JSON.parse(globalSwitches.dataset.charts), /* Charts */
      googleCaptcha: JSON.parse(globalSwitches.dataset.g_captcha), /* Google Captcha */
      googleAnalytics: JSON.parse(globalSwitches.dataset.g_analytics), /* Google Analytics */
      database: JSON.parse(globalSwitches.dataset.data_base), /* Inserts user input data into DataBase */
      print: JSON.parse(globalSwitches.dataset.print), /* Print option */
      pdf: JSON.parse(globalSwitches.dataset.pdf) /* Download PDF report option */
    }
    // freezes switches on client such that its properties cannot be changed
    // since these switches are only defined by the server
    Object.freeze(mainVariables.serverInfo.switches)
  })();

  // gets main module's global variables from server side configuration
  (function () {
    var globalVariables = document.getElementById('global_variables')

    // information obtained from the server
    mainVariables.serverInfo.release = globalVariables.dataset.release
    mainVariables.serverInfo.selectedCountry = globalVariables.dataset.country
    mainVariables.serverInfo.countryListObj = JSON.parse(decodeURI(globalVariables.dataset.country_list))
    mainVariables.serverInfo.countriesStandards = JSON.parse(decodeURI(globalVariables.dataset.countries_standards))
    mainVariables.serverInfo.domainListObj = JSON.parse(decodeURI(globalVariables.dataset.domain_list))
    mainVariables.serverInfo.language = globalVariables.dataset.language
    mainVariables.serverInfo.translatedStrings = JSON.parse(decodeURI(globalVariables.dataset.words))
    mainVariables.serverInfo.nonce = globalVariables.dataset.nonce
    mainVariables.serverInfo.googleAnalyticsTrackingId = globalVariables.dataset.ga_tracking_id

    // booleans, server refers whether this session is a test
    mainVariables.serverInfo.booleans.isATest = JSON.parse(globalVariables.dataset.is_this_a_test)
    mainVariables.serverInfo.booleans.notLocalhost = JSON.parse(globalVariables.dataset.not_localhost)
    mainVariables.serverInfo.booleans.isThisARecognizedHost = JSON.parse(globalVariables.dataset.is_this_recognized_host)

    // paths
    mainVariables.paths.url.protocol = globalVariables.dataset.url_protocol
    mainVariables.paths.url.cdnUrl = globalVariables.dataset.cdn_url
    mainVariables.paths.url.canonicalPathname = JSON.parse(decodeURI(globalVariables.dataset.canonical_url_path))
    mainVariables.paths.url.canonicalHostname = mainVariables.serverInfo.domainListObj
    mainVariables.paths.dirs.clientDir = globalVariables.dataset.client_dir

    mainVariables.statistics.statisticsObj = JSON.parse(decodeURI(globalVariables.dataset.stats))
  })();

  // defines some main module global variables
  (function () {
    var selectedCountry = mainVariables.serverInfo.selectedCountry

    mainVariables.main.uberApiObj = {}
    mainVariables.paths.url.uberApi = '/' + selectedCountry.toLowerCase() + '/getUBER'

    mainVariables.paths.url.origin = window.location.origin
    mainVariables.paths.url.href = window.location.href // current full url

    mainVariables.paths.dirs.translationsDir = '/countries/' // path JSON Translation files
  })();

  // Sets location of Javascript Files (some defined in /commons.js)
  (function () {
    var globalVariables = document.getElementById('global_variables')
    var jsfilesDefinedByServer = JSON.parse(decodeURI(globalVariables.dataset.js_files))
    /* var recaptchaFunction = "autocosts.showResultsModule.recaptchaCallback"; */

    mainVariables.paths.jsFiles = {
      google: {
        recaptchaAPI: jsfilesDefinedByServer.GrecaptchaAPI +
                    /* "?onload=" + recaptchaFunction + */
                    '?render=explicit&hl=' + mainVariables.serverInfo.language,
        analytics: '/client/analytics.js'
      },

      // core functions
      calculator: '/client/core/calculator.js',
      conversions: '/client/core/conversions.js',

      initialize: '/client/initialize.js',
      commons: '/client/commons.js',
      userForm: '/client/userForm.js',
      validateData: '/client/validateData.js',
      runResults: '/client/runResults.js',
      convertData: '/client/convertData.js',
      showResults: '/client/showResults.js',

      jQuerySidebar: '/client/jquery/jquery.sidebar.min.js',
      jQueryColor: '/client/jquery/jquery.color.min.js',
      jTimer: '/client/jquery/js_timer.js',

      PDF: {
        pdfmake: '/client/pdf/pdfmake.min.js',
        pdfModule: '/client/pdf/pdfModule.js',
        vfs_fonts: '/client/pdf/vfs_fonts.js',
        vfs_fonts_IN: '/client/pdf/IN/vfs_fonts.js',
        vfs_fonts_JP: '/client/pdf/JP/vfs_fonts.js',
        vfs_fonts_CN: '/client/pdf/CN/vfs_fonts.js'
      },

      charts: '/client/chart/charts.js',
      chartjs: '/client/chart/chartjs.min.js',
      smartAppBanner: '/client/smart-app-banner.js'
    }

    Object.freeze(mainVariables.paths.jsFiles)
  })()

  return mainVariables
})()

/***********************************************************************/

/* GET FILES MODULE */
/* Module used to get extra files with JS or CSS code */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#modules */

// module for getting JS, CSS or other files
autocosts.getFilesModule = (function (jsFiles, switches, country, notLocalhost, translatedStrings, servicesAvailabilityObj, uberApiUrl) {
  function getUberInfo () {
    var $deferredEvent = $.Deferred()

    if (country !== 'XX') { // if not test version
      // gets asynchronously UBER information
      $.get(uberApiUrl)
        .done(function (data) {
          // alert(JSON.stringify(data, null, 4));
          if (data && !$.isEmptyObject(data)) {
            autocosts.main.uberApiObj = data // uberApi is a global variable
            // console.log("uber data got from uber API: ", data);
            servicesAvailabilityObj.uber = true
            console.log('Uber info loaded OK')
          } else {
            servicesAvailabilityObj.uber = false
            console.warn('No uber info')
          }
          $deferredEvent.resolve()
        })
        .fail(function () {
          servicesAvailabilityObj.uber = false
          console.warn('No uber info')
          $deferredEvent.resolve()
        })
    } else { // test version (London city, in Pounds)
      var uberApi = {}
      uberApi.cost_per_distance = 1.25
      uberApi.cost_per_minute = 0.15
      uberApi.currency_code = 'GBP'
      uberApi.distance_unit = 'mile'

      autocosts.main.uberApiObj = uberApi
      servicesAvailabilityObj.uber = true

      $deferredEvent.resolve()
    }

    return $deferredEvent
  }

  function getPdfJsFiles () {
    var $deferredEvent = $.Deferred()

    // wait until all PDF related files are loaded
    // to activate the downloadPDF button
    $.getScript(jsFiles.PDF.pdfModule, function () {
      $.getScript(jsFiles.PDF.pdfmake, function () {
        // path where the fonts for PDF are stored
        var pdfFontsPath
        if (country === 'CN') {
          pdfFontsPath = jsFiles.PDF.vfs_fonts_CN
        } else if (country === 'JP') {
          pdfFontsPath = jsFiles.PDF.vfs_fonts_JP
        } else if (country === 'IN') {
          pdfFontsPath = jsFiles.PDF.vfs_fonts_IN
        } else {
          pdfFontsPath = jsFiles.PDF.vfs_fonts
        }
        $.getScript(pdfFontsPath).done(function () {
          console.log('All pdf related files loaded OK')
          $deferredEvent.resolve()
        })
      })
    })

    return $deferredEvent
  }

  /* The function below will create and add to the document all the stylesheets that you wish to load asynchronously.
    (But, thanks to the Event Listener, it will only do so after all the window's other resources have loaded.) */
  function loadCSSFiles (styleSheets) {
    var head = document.getElementsByTagName('head')[0]

    for (var i = 0; i < styleSheets.length; i++) {
      var link = document.createElement('link')
      var rel = document.createAttribute('rel')
      var href = document.createAttribute('href')

      rel.value = 'stylesheet'
      href.value = styleSheets[i]

      link.setAttributeNode(rel)
      link.setAttributeNode(href)

      head.appendChild(link)
    }
  }

  /* function that loads extra files and features, that are not loaded immediately after the page is opened
    because such files and features are not needed on the initial page load, so that initial loading time can be reduced */
  function loadDeferredJSFiles (callback) {
    var promisesArray = [$.getScript(jsFiles.calculator),
      $.getScript(jsFiles.conversions),
      $.getScript(jsFiles.smartAppBanner),
      $.getScript(jsFiles.convertData),
      $.getScript(jsFiles.showResults),
      $.getScript(jsFiles.runResults),
      $.getScript(jsFiles.userForm),
      $.getScript(jsFiles.validateData)]

    if (switches.charts) {
      promisesArray.push($.getScript(jsFiles.chartjs))
      promisesArray.push($.getScript(jsFiles.charts))
    }
    if (switches.pdf || switches.print) {
      promisesArray.push(getPdfJsFiles())
    }
    if (switches.uber) {
      promisesArray.push(getUberInfo())
    }
    if (switches.googleCaptcha && notLocalhost) {
      promisesArray.push($.getScript(jsFiles.google.recaptchaAPI))
    }

    $.when.apply($, promisesArray).then(function () {
      callback()
    }, function () {
      console.error('Some of the files in loadDeferredJSFiles() were not loaded')
    })
  }

  /* === Public methods === */

  function loadInitialFiles () {
    $.when(
      $.getScript(jsFiles.jQueryColor),
      $.getScript(jsFiles.jQuerySidebar),
      $.getScript(jsFiles.initialize),
      $.getScript(jsFiles.commons))
      .then(function () {
        autocosts.initializeModule.initialize()
        autocosts.commonsModule.initialize()

        console.log('All initial JS files/modules loaded and initialized OK')
      }, function () {
        console.error('Some of the files in loadInitialFiles() were not loaded')
      })
  }

  function loadDeferredFiles (callback) {
    loadCSSFiles(['css/mergedDeferred.css'])
    // loadCSSFiles(['css/colors.css', 'css/results.css', 'css/smart-app-banner.css']); //temporary debug line

    loadDeferredJSFiles(function () {
      autocosts.calculatorModule.initialize()
      autocosts.convertDataModule.initialize()

      autocosts.showResultsModule.initialize()
      autocosts.runResultsModule.initialize()

      autocosts.userFormModule.initialize()
      autocosts.validateDataModule.initialize()

      if (switches.pdf || switches.print) {
        autocosts.showResultsModule.pdfModule.initialize()
      }

      if (switches.googleAnalytics && servicesAvailabilityObj.googleAnalytics) {
        ga('send', 'event', 'form_part', 'form_loaded')
      }

      console.log('All deferred JS files/modules loaded and initialized OK')
      callback()
    })
  }

  return {
    loadInitialFiles: loadInitialFiles,
    loadDeferredFiles: loadDeferredFiles
  }
})(autocosts.paths.jsFiles,
  autocosts.serverInfo.switches,
  autocosts.serverInfo.selectedCountry,
  autocosts.serverInfo.booleans.notLocalhost,
  autocosts.serverInfo.translatedStrings,
  autocosts.servicesAvailabilityObj,
  autocosts.paths.url.uberApi)

// the whole program indeed starts here
$(document).ready(function () {
  autocosts.getFilesModule.loadInitialFiles()
})
