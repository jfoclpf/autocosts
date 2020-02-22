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

autocosts.runResultsModule = (function (DOMForm, serverInfo, mainObjs, servicesAvailabilityObj, userInfo) {
  // modules dependencies
  var showResultsModule, calculatorModule, userFormModule, convertDataModule
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
    showResultsModule = autocosts.showResultsModule
    calculatorModule = autocosts.calculatorModule
    userFormModule = autocosts.userFormModule
    convertDataModule = autocosts.convertDataModule
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
      serverInfo.selectedCountry !== 'XX' && // Do not use if is test version
      servicesAvailabilityObj.googleCaptcha && // Do not use when service is not availble, i.e., when files were not loaded
      serverInfo.switches.googleCaptcha && // Do not use when flag from server is not triggered
      serverInfo.booleans.notLocalhost // Do not use when run for localhost
  }

  // The call of this function is defined in an URL declared in autocosts.paths.jsFiles.Google.recaptchaAPI (see main.js)
  // this function is called when the Google Captcha JS file is loaded and ready to be used
  function recaptchaCallback () {
    servicesAvailabilityObj.googleCaptcha = true

    if (useGreCapctha()) {
      console.log('Using Google ReCapctha!')
      runButton.set('show-g-recaptcha')

      grecaptcha.render(captchaRunButtonId, {
        sitekey: '6LeWQBsUAAAAANQOQFEID9dGTVlS40ooY3_IIcoh',
        callback: recaptchaSolved
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

            if (calculateCostsAndShowResults() && serverInfo.selectedCountry !== 'XX') {
              // if not a test triggers event for Google Analytics
              if (serverInfo.switches.googleAnalytics && servicesAvailabilityObj.googleAnalytics) {
                ga('send', 'event', 'form_part', 'run_OK')
              }
              // submits data to database if no XX version
              if (serverInfo.switches.database) {
                var databaseObj = convertDataModule.createDatabaseObjectFromForm(DOMForm)
                submitDataToDB(databaseObj)
              }
            }
          } else {
            // when the Google file was not accessible
            calculateCostsAndShowResults()
          }

          runButton.set('show-normal')
        })
    } else if (source === 'normal') {
      // here normally a human is already confirmed, for example when the same user runs the calculator twice

      if (!runButton.isNormal()) {
        console.error('Called Run() from source "normal" and run button does not comply')
      }

      var bWasCalculationOk = calculateCostsAndShowResults()
      var bIsDev = serverInfo.release === 'dev'
      var bSubmitToDatabase = serverInfo.switches.database &&
        serverInfo.selectedCountry !== 'XX' &&
        (userInfo.isHumanConfirmed || bIsDev) &&
        (serverInfo.booleans.notLocalhost || bIsDev)

      // console.log(bWasCalculationOk, bSubmitToDatabase, bIsDev)
      if (bWasCalculationOk && bSubmitToDatabase) {
        var databaseObj = convertDataModule.createDatabaseObjectFromForm(DOMForm)
        submitDataToDB(databaseObj)
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
          console.error('Bad paramter flag on runButton.set(flag), unknown \'flag\': ' + flag)
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
    var calculatedData, userDataFromForm

    // test if the form user inputs are correct
    if (!userFormModule.isReadyToCalc()) {
      return false
    }

    // for each form part gets object with content
    userDataFromForm = convertDataModule.createUserDataObjectFromForm(DOMForm)
    mainObjs.formData = userDataFromForm

    calculatedData = calculatorModule.calculateCosts(userDataFromForm)
    mainObjs.calculatedData = calculatedData // assigns to global variable
    // console.log(JSON.stringify(calculatedData, null, 4));

    // get Uber data if applicable
    if (serverInfo.switches.uber && calculatedData.publicTransports.calculated) {
      calculatedData.uber = calculatorModule.calculateUberCosts(mainObjs.uberApiObj)
    } else {
      calculatedData.uber = { calculated: false }
    }

    showResultsModule.showResults(calculatedData, userDataFromForm)

    return true
  }

  function submitDataToDB (databaseObj) {
    $.ajax({
      url: 'submitUserInput',
      type: 'POST',
      data: {
        databaseObj: databaseObj
      },
      success: function (data) {
        console.log('Values inserted into database with success. Returned: ', data)
        console.log('User took' + ' ' + databaseObj.time_to_fill_form + ' ' + 'seconds to fill the form')
      },
      error: function (error) {
        console.error(databaseObj)
        var errObj = JSON.parse(error.responseText)
        console.error('There was an error submitting the values into the database', errObj.code, errObj.sqlMessage)
      }
    })
  }

  return {
    initialize: initialize
  }
})(document.costs_form,
  autocosts.serverInfo,
  autocosts.main,
  autocosts.servicesAvailabilityObj,
  autocosts.userInfo)
