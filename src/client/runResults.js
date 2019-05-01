/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/* File with Javascript Charts Functions */

// RUN RESULTS MODULE, IT IS A SUBMODULE OF RESULTS MODULE
// see our module template: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#modules

/* global autocosts, $, ga, grecaptcha */

autocosts.resultsModule = autocosts.resultsModule || {}
autocosts.resultsModule.runResultsModule = (function (DOMForm, translatedStrings, switches, selectedCountry, booleans, mainObjs, servicesAvailabilityObj, userInfo) {
  // modules dependencies
  var resultsModule, calculatorModule, userFormModule, convertDataModule, databaseModule
  // subModule of this module
  var runButton

  // ids in the HTML document
  var normalRunButtonId = 'calculate_costs_btn'
  var captchaRunButtonId = 'calculate_costs_btn_g_captcha'

  function initialize () {
    loadModuleDependencies()
    loadRunButtonHandler()
    recaptchaCallback()
  }

  function loadModuleDependencies () {
    resultsModule = autocosts.resultsModule
    calculatorModule = autocosts.calculatorModule
    userFormModule = autocosts.userFormModule
    convertDataModule = autocosts.convertDataModule
    databaseModule = switches.database ? autocosts.databaseModule : {}
  }

  function loadRunButtonHandler () {
    // run button
    $('#calculate_costs_btn').on('click', function () {
      Run('normal')
    })
  }

  // Returns boolean whether to use or not Google Captcha
  function useGreCapctha () {
    return !userInfo.isHumanConfirmed && // Do not use if human is already confirmed
           selectedCountry !== 'XX' && // Do not use if is test version
           servicesAvailabilityObj.googleCaptcha && // Do not use when service is not availble, i.e., when files were not loaded
           switches.googleCaptcha && // Do not use when flag from server is not triggered
           booleans.notLocalhost // Do not use when run for localhost
  }

  // The call of this function is defined in an URL declared in autocosts.paths.jsFiles.Google.recaptchaAPI (see main.js)
  // this function is called when the Google Captcha JS file is loaded and ready to be used
  function recaptchaCallback () {
    servicesAvailabilityObj.googleCaptcha = true
    console.log('use Google ReCapctha!')

    if (useGreCapctha()) {
      runButton.set('show-g-recaptcha')

      grecaptcha.render(captchaRunButtonId, {
        'sitekey': '6LeWQBsUAAAAANQOQFEID9dGTVlS40ooY3_IIcoh',
        'callback': recaptchaSolved
      })
    } else {
      runButton.set('show-normal')
    }
  }

  function recaptchaSolved () {
    console.log('recaptchaSolved()')
    Run('g-recaptcha')
  }

  // creates the grecaptcha after the API Google function was loaded
  // runs when grecaptcha was solved
  function Run (source) {
    // if human is already confirmed by previous Google Captcha, doesn't request Google Captcha API again
    // In XX version or localhost doesn't use google captcha
    if (source === 'g-recaptcha') {
      if (!runButton.isCaptcha()) {
        console.error('Called Run() from source "g-recaptcha" and run button does not comply')
      }

      runButton.set('loading-g-recaptcha')

      // make a POST command to server to check if the user is human
      $.ajax({
        type: 'POST',
        url: 'captchaValidate',
        data: '&g-recaptcha-response=' + grecaptcha.getResponse()
      })
        .done(function (result) {
          console.log('recaptcha-result: ', result)

          if (result === 'ok') {
            // Google Recaptcha
            userInfo.isHumanConfirmed = true

            if (calculateCostsAndShowResults() && selectedCountry !== 'XX') {
              // if not a test triggers event for Google Analytics
              if (switches.googleAnalytics && servicesAvailabilityObj.googleAnalytics) {
                ga('send', 'event', 'form_part', 'run_OK')
              }
              // submits data to database if no XX version
              if (switches.database) {
                databaseModule.submitResultsToDatabase()
              }
            }
          } else {
            // when the Google file was not accessible
            calculateCostsAndShowResults()
          }

          runButton.set('show-normal')
        })
    } else if (source === 'normal') {
      if (!runButton.isNormal()) {
        console.error('Called Run() from source "normal" and run button does not comply')
      }

      // here normally a human is already confirmed, for example when the same user runs the calculator twice
      if (calculateCostsAndShowResults() &&
           userInfo.isHumanConfirmed &&
           selectedCountry !== 'XX' &&
           switches.database &&
           booleans.notLocalhost) {
        databaseModule.submitResultsToDatabase() // submits data to database if no test version nor localhost
      }

      runButton.set('show-normal')
    } else {
      console.error('Bad paramter source on Run(source)')
    }
  }

  // Submodule relating to Run Button, alternating between Normal button and Google Recaptcha button
  // see buttons html elements on file form.hbs, last lines
  runButton = (function () {
    var $btnNormal = $('#' + normalRunButtonId)
    var $btnCaptcha = $('#' + captchaRunButtonId)

    function set (flag) {
      console.log('Run button set to: ' + flag)
      switch (flag) {
        case 'show-g-recaptcha':
          $btnCaptcha.show().attr('disabled', false)
          $btnNormal.hide().attr('disabled', true)
          break
        case 'show-normal':
          $btnNormal.show().attr('disabled', false)
          $btnCaptcha.hide().attr('disabled', true)
          break
        case 'loading-g-recaptcha':
          if (isCaptcha()) {
            $btnCaptcha.hide()
          } else {
            console.error('Run Button set to "loading-g-recaptcha" but g-recaptcha is not active')
          }
          break
        default:
          console.error("Bad paramter flag on runButton.set(flag), unknown 'flag': " + flag)
      }
    }

    function getButton () {
      checkSanity()

      if ($btnNormal.is(':enabled') && $btnNormal.is(':visible')) {
        return 'normal'
      }
      if ($btnCaptcha.is(':enabled') && $btnCaptcha.is(':visible')) {
        return 'g-recaptcha'
      }

      return 'none' // neither button is both enabled and visible; they may be both invisible
    }

    function isNormal () {
      return checkSanity() && $btnNormal.is(':visible')
    }

    function isCaptcha () {
      return checkSanity() && $btnCaptcha.is(':visible')
    }

    function checkSanity () {
      var errMsg = 'runButton sanity between $btnNormal and $btnCaptcha'
      if ($btnNormal.is(':disabled') && $btnCaptcha.is(':disabled')) {
        throw errMsg
      }
      if ($btnNormal.is(':visible') && $btnCaptcha.is(':visible')) {
        throw errMsg
      }
      return true
    }

    return {
      set: set,
      getButton: getButton,
      isNormal: isNormal,
      isCaptcha: isCaptcha
    }
  })()

  // function that is run when user clicks "run/calculate"
  function calculateCostsAndShowResults () {
    var calculatedData, form, countryObj

    // test if the form user inputs are correct
    if (!userFormModule.isReadyToCalc()) {
      return false
    }

    // for each form part gets object with content
    form = convertDataModule.createUserDataObjectFromForm(DOMForm)
    mainObjs.formData = form

    // country object with country specific variables
    countryObj = {
      countryCode: selectedCountry,
      currency: translatedStrings.curr_code,
      distance_std: translatedStrings.distance_std_option,
      speed_std: translatedStrings.std_dist + '/h',
      fuel_efficiency_std: translatedStrings.fuel_efficiency_std_option,
      fuel_price_volume_std: translatedStrings.fuel_price_volume_std,
      taxi_price: translatedStrings.taxi_price_per_dist
    }

    calculatedData = calculatorModule.calculateCosts(form, countryObj)
    mainObjs.calculatedData = calculatedData // assigns to global variable
    // console.log(JSON.stringify(calculatedData, null, 4));

    // get Uber data if applicable
    if (switches.uber && calculatedData.publicTransports.calculated) {
      calculatedData.uber = calculatorModule.calculateUberCosts(mainObjs.uberApiObj)
    } else {
      calculatedData.uber = { calculated: false }
    }

    resultsModule.showResults(calculatedData, form)
  }

  return {
    initialize: initialize
  }
})(document.costs_form,
  autocosts.serverInfo.translatedStrings,
  autocosts.serverInfo.switches,
  autocosts.serverInfo.selectedCountry,
  autocosts.serverInfo.booleans,
  autocosts.main,
  autocosts.servicesAvailabilityObj,
  autocosts.userInfo)
