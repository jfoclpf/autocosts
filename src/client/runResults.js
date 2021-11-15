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
/* eslint prefer-const: "off" */
/* eslint no-var: "off" */

autocosts.runResultsModule = (function (DOMForm, serverInfo, mainObjs, servicesAvailabilityObj, userInfo) {
  // modules dependencies
  var showResultsModule, calculatorModule, userFormModule, convertDataModule

  // There are two buttons Run, but only one appears in the form
  // The code alternates between one of these buttons
  const $btnNormal = $('#calculate_costs_btn') // normal button
  const $btnCaptcha = $('#calculate_costs_btn_g_captcha') // button for Google Recaptcha

  function initialize () {
    loadModuleDependencies()
    recaptchaCallback()

    $btnNormal.on('click', function () {
      Run('normal')
    })
  }

  function loadModuleDependencies () {
    showResultsModule = autocosts.showResultsModule
    calculatorModule = autocosts.calculatorModule
    userFormModule = autocosts.userFormModule
    convertDataModule = autocosts.convertDataModule
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
      setRunButton('show-g-recaptcha')

      grecaptcha.render($btnCaptcha.prop('id'), {
        sitekey: '6LeWQBsUAAAAANQOQFEID9dGTVlS40ooY3_IIcoh',
        callback: function () {
          console.log('User finished filling Google Recaptcha on client side')
          Run('g-recaptcha')
        }
      })
    } else {
      setRunButton('show-normal')
    }
  }

  // when the user clicks one of the the buttons Run. There are two buttons Run, but only one appears in form.
  // One button Run is for Google Recaptcha and another has no Recaptcha (normal button)
  function Run (source) {
    // shows results immediately
    const bWasCalculationOk = calculateCostsAndShowResults()

    // now let's check if user is Human, to add entry into database
    // databaseObj is created right now to check precisely the time the user took to fill the form
    const databaseObj = convertDataModule.createDatabaseObjectFromForm(DOMForm)

    if (source === 'g-recaptcha') {
      // when the google recaptcha process is concluded on frontend
      // make now a POST command to server to check if the user is Human
      $.ajax({
        type: 'POST',
        url: '/captchaValidate',
        data: '&g-recaptcha-response=' + grecaptcha.getResponse()
      })
        .done(function (result) {
          console.log('recaptcha-result: ', result)

          if (result === 'ok') {
            userInfo.isHumanConfirmed = true
            console.log('You seem to be a Human')

            if (bWasCalculationOk && serverInfo.selectedCountry !== 'XX') {
              // if not a test triggers event for Google Analytics
              if (serverInfo.switches.googleAnalytics && servicesAvailabilityObj.googleAnalytics) {
                ga('send', 'event', 'form_part', 'run_OK')
              }
              if (serverInfo.switches.database) {
                submitDataToDB(databaseObj)
              }
            }
          } else {
            // when the Google recaptcha was not OK, don't send entry to database
            console.warn('Google recaptcha did not return OK', result)
          }

          // next time user fills the form (in this session) don't use recaptcha
          setRunButton('show-normal')
        })
        .fail(function (jqXHR, textStatus) {
          console.warn('Failed loading /captchaValidate', textStatus)
          setRunButton('show-normal')
        })
    } else if (source === 'normal') {
      // here Google Recaptcha service is NOT used,
      // see above function useGreCapctha() for the conditions on startup
      // or after Google Recaptcha has been called once before during the session

      var bIsDev = serverInfo.release === 'dev'
      var bSubmitToDatabase =
        serverInfo.switches.database &&
        serverInfo.selectedCountry !== 'XX' &&
        (userInfo.isHumanConfirmed || bIsDev) &&
        (serverInfo.booleans.notLocalhost || bIsDev)

      // console.log(bWasCalculationOk, bSubmitToDatabase, bIsDev)
      if (bWasCalculationOk && bSubmitToDatabase) {
        submitDataToDB(databaseObj)
      }

      setRunButton('show-normal')
    } else {
      console.error('Bad paramter source on function Run: ', source)
    }
  }

  // There are two buttons Run, but only one appears in the form
  // One button Run is for Google Recaptcha and another has no Recaptcha (normal button)
  // flag: 'show-g-recaptcha' or 'show-normal'
  function setRunButton (flag) {
    console.log('Run button set to: ' + flag)

    if (
      ($btnNormal.is(':disabled') && $btnCaptcha.is(':disabled')) ||
      ($btnNormal.is(':visible') && $btnCaptcha.is(':visible'))
    ) {
      console.error('runButton sanity between $btnNormal and $btnCaptcha')
    }

    switch (flag) {
      case 'show-g-recaptcha':
        $btnCaptcha.show().attr('disabled', false)
        $btnNormal.hide().attr('disabled', true)
        break
      case 'show-normal':
        $btnNormal.show().attr('disabled', false)
        $btnCaptcha.hide().attr('disabled', true)
        break
      default:
        console.error("Bad paramter flag on runButton.set(flag), unknown 'flag': " + flag)
    }
  }

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
      url: '/submitUserInput',
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
