
/* MAIN MODULE'S INITIALIZATION MODULE */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#modules */

/* global autocosts, $, ga */
/* eslint prefer-const: "off" */
/* eslint no-var: "off" */

autocosts.initializeModule = (function (thisModule, serverInfo, translatedStrings, userInfo, statistics, servicesAvailabilityObj, paths) {
  var getFilesModule, commonsModule

  function initialize () {
    loadModuleDependencies()

    oldIE() // detects old versions of Internet Explorer, and in that case warn the user to update browser
    setFormSelectBoxes() // fills periods (month, two months, etc.) in HTML select boxes and sets other settings
    loadMainPageSettings()
    loadsPrefilledValues() // loads pre-filled values, for example for XX/
    initTimer()
    initGoogleAnalytics()
    getUniqueIdentifier()
    renderImages()
    registerServiceWorker()
  }

  function loadModuleDependencies () {
    commonsModule = autocosts.commonsModule
    getFilesModule = autocosts.getFilesModule
  }

  // detects old versions of Internet Explorer and warns the user to update the browser
  function oldIE () {
    var div = document.createElement('div')
    div.innerHTML = '<!--[if lt IE 9]><i></i><![endif]-->'
    var isIeLessThan9 = (div.getElementsByTagName('i').length === 1)
    if (isIeLessThan9) {
      document.getElementById('main_div').innerHTML = 'Please update your browser!'
      window.alert('Please update your browser!')
    }
  }

  // function that sets and fills the the time periods (month, trimester, etc.) on the dropdown select boxes
  function setFormSelectBoxes () {
    // adjust the width of dropdown select according to content
    var adjustWidthOfSelect = function () {
      var text = $(this).find('option:selected').text()
      var $aux = $('<select/>').append($('<option/>').text(text))
      $(this).after($aux)
      $(this).width($aux.width())
      $aux.remove()
    }

    // language HTML select dropdowns for Time Periods
    var selectTimeList = ['month', 'twoMonths', 'trimester', 'semester', 'year']
    $('select.time_period').each(function () {
      var $dropdown = $(this)
      for (var i = 0; i < selectTimeList.length; i++) {
        var value = selectTimeList[i]
        $dropdown.append($('<option/>').val(value).text(translatedStrings[value]))
      }
    })

    // standard distance select boxes (km, mi, mil(10km))
    $('select.distance_standard').each(function () {
      var $dropdown = $(this)
      $.each(serverInfo.countriesStandards.distance, function (key, value) {
        var $option = $('<option/>').val(value).text(value)
        if (parseInt(key) === translatedStrings.distance_std_option) {
          $option.attr('selected', 'selected')
        }
        $dropdown.append($option)
      })
    })
    $('select.distance_standard').change(adjustWidthOfSelect)

    // fuel efficiency select boxes
    $('select.fuel_efficiency_standard').each(function () {
      var $dropdown = $(this)
      $.each(serverInfo.countriesStandards.fuelEfficiency, function (key, value) {
        var $option = $('<option/>').val(value).text(value)
        if (parseInt(key) === translatedStrings.fuel_efficiency_std_option) {
          $option.attr('selected', 'selected')
        }
        $dropdown.append($option)
      })
      $dropdown.width()
    })
    $('select.fuel_efficiency_standard').change(adjustWidthOfSelect)
  }

  // settings and handlers of the elements on the landing page
  function loadMainPageSettings () {
    $('#hero').slideDown('fast')

    // When clicked the Calculate Button shown on the landing page
    var calculateButtonOnclick = function () {
      $('#hero, footer').fadeOut('slow', function () {
        $('main > .img_loader').show()
      })

      getFilesModule.loadDeferredFiles(function () {
        $('#hero, footer, main > .img_loader').stop(true).hide()

        // on test version shows everything right from the beginning
        if (serverInfo.selectedCountry === 'XX') {
          $('.field_container, .form_part_head_title').show()
        }

        $('#form').show()
      })
    }

    // Load statistics table on sidebars.hbs; paramter cc stands for Country Code
    function updateStatsTable (cc) {
      if (!cc || cc.toUpperCase() === 'XX' || !serverInfo.switches.database) {
        return
      }

      // rounds a number
      var round = function (number, precision) {
        var shift = function (number, precision) {
          var numArray = ('' + number).split('e')
          return +(numArray[0] + 'e' + (numArray[1] ? (+numArray[1] + precision) : precision))
        }
        return shift(Math.round(shift(number, +precision)), -precision)
      }

      var currencySymbol = statistics.statisticsObj[cc].currencySymbol

      for (var key in statistics.statisticsObj[cc]) {
        var elementClass = 'stats_table-' + key // see sidebars.hbs
        if ($('.' + elementClass).length) { // element exists
          var $el = $('.' + elementClass)

          var value = statistics.statisticsObj[cc][key]
          value = key.includes('maintenance') ? value / 2 : value // it shows maintenance in both standing and running costs
          if (key === 'costs_perUnitDistance_runningCosts' || key === 'costs_perUnitDistance_totalCosts') {
            $el.text(currencySymbol + round(value, 2) + '/' + commonsModule.getStandard('distance'))
          } else if (key === 'speeds_averageKineticSpeed' || key === 'speeds_averageConsumerSpeed') {
            $el.text(round(value, 0) + commonsModule.getStandard('distance') + '/h')
          } else {
            $el.text(currencySymbol + ' ' + round(value, 0))
          }
        }
      }

      // assigns hanlder to show country costs tables as image
      $('.sidebar-right-container')
        .off('click', '.tableImgButton')
        .on('click', '.tableImgButton', function (e) {
          if (serverInfo.booleans.isThisARecognizedHost) {
            window.location.href = window.location.protocol + '//' +
              paths.url.canonicalHostname[cc.toUpperCase()] +
              paths.url.canonicalPathname[cc.toUpperCase()] +
              '/stats.jpg'
          } else {
            window.location.href = window.location.origin + '/' + cc.toLowerCase() + '/stats.jpg'
          }
        })

      // assigns hanlder to show tables
      $('.sidebar-right-container')
        .off('click', '.tableHtmlButton')
        .on('click', '.tableHtmlButton', function (e) {
          if (serverInfo.booleans.isThisARecognizedHost) {
            window.location.href = window.location.protocol + '//' +
              paths.url.canonicalHostname[cc.toUpperCase()] +
              paths.url.canonicalPathname[cc.toUpperCase()] +
              '/stats'
          } else {
            window.location.href = window.location.origin + '/' + cc.toLowerCase() + '/stats'
          }
        })

      // assigns hanlder to show world stats
      $('.sidebar-right-container')
        .off('click', '.worldStatsButton')
        .on('click', '.worldStatsButton', function (e) {
          window.location.href = '/worldstats'
        })
    }

    // adjusts the size of select according to content
    var resizeSelectToContent = function (jqueryId) {
      var $this = $(jqueryId)
      var arrowWidth = 5
      // create test element
      var text = $this.find('option:selected').text()
      var $test = $('<span>').html(text).css({
        'font-size': $this.css('font-size'), // ensures same size text
        visibility: 'hidden', // prevents FOUC */
        'white-space': 'nowrap'
      })
      // add to parent, get width, and get out
      $test.appendTo($this.parent())
      var width = $test.width()
      $test.remove()
      // set select width
      $this.width(width + arrowWidth)
    }

    // All sides
    var sides = ['left', 'right']
    // Initialize sidebars
    for (var i = 0; i < sides.length; ++i) {
      var cSide = sides[i]
      $('.sidebar.' + cSide).sidebar({ side: cSide })
    }

    // hides the calculator form on the landing page
    $('#form, #results').hide()
    $('.sidebar').show()

    // button shown on the landing page
    $('#calculateButton').on('click', calculateButtonOnclick)

    $('#country_select').on('change', function () {
      window.location.href = this.value
    })

    // Sidebars click handlers
    $('.btn[data-action]').on('click', function () {
      var $this = $(this)
      var action = $this.attr('data-action')
      var side = $this.attr('data-side')

      if (action === 'open') {
        $('.sidebar.' + side).trigger('sidebar:' + action)
        $('.sidebar.' + side).animate({ backgroundColor: 'rgb(0, 0, 0, 0.4)' })
      } else if (action === 'close') {
        $('.sidebar.' + side).animate({ backgroundColor: 'rgb(0,0,0,0)' }, function () {
          $('.sidebar.' + side).trigger('sidebar:' + action)
        })
      } else {
        console.error('Error in sidebar click hanlders')
      }

      return false
    })

    // close the sidebar
    $('.sidebar').on('click', function (event) {
      // detect if user clicks outside the sidebar, when sidebar is opened
      if ($(event.target).hasClass('sidebar')) {
        // closing the sidebar
        var $this = $(this)
        $this.animate({ backgroundColor: 'rgb(0,0,0,0)' }, function () {
          $this.trigger('sidebar:close')
        })
      }
    })

    // adjusts the size of select according to content
    resizeSelectToContent('#country_select')
    // upon windows resize, resize the select
    $(window).on('resize', function () {
      resizeSelectToContent('#country_select')
    })

    // load statistics table on sidebars.hbs
    updateStatsTable(serverInfo.selectedCountry)

    $('#country_select_stats').on('change', function () {
      var countryCode = this.value
      updateStatsTable(countryCode)
    })
  }

  function initGoogleAnalytics () {
    // detects whether Google Analytics has loaded
    var checkGoogleAnalytics = function (t) {
      if (commonsModule.isThisAtest()) {
        servicesAvailabilityObj.googleAnalytics = false
        return
      }

      if (typeof ga === 'function') {
        servicesAvailabilityObj.googleAnalytics = true
      } else {
        servicesAvailabilityObj.googleAnalytics = false
        setTimeout(checkGoogleAnalytics, t)
      }
    }

    /* Google Analytics */
    if (navigator.userAgent.indexOf('Speed Insights') === -1 && !commonsModule.isThisAtest() && serverInfo.switches.googleAnalytics) {
      $.getScript(paths.jsFiles.google.analytics)
        .done(function () {
          window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date()
          // change according to your site
          ga('create', serverInfo.googleAnalyticsTrackingId, 'auto')
          ga('set', 'displayFeaturesTask', null)
          ga('send', 'pageview')

          // detects whether Google Analytics has loaded
          // tries every second
          checkGoogleAnalytics(1000)
        })
        .fail(function (jqxhr, settings, exception) {
          console.error('Error loading Google Analytics')
          servicesAvailabilityObj.googleAnalytics = false
        })
    }
  }

  /* User Unique Identifier functions */
  function getUniqueIdentifier () {
    function S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    function guid () {
      return (S4() + '-' + S4() + '-' + S4())
    }
    userInfo.uniqueUserId = guid()
  }

  // allows images to be rendered after the document is loaded
  function renderImages () {
    $('img').each(function () {
      $(this).attr('src', $(this).data('delayedsrc'))
    })
  }

  /* Timer function */
  /* jshint ignore:start */
  function initTimer () {
    $.getScript(paths.jsFiles.jTimer, function () {
      // timeCounter is defined as global variable in main.js
      userInfo.timeCounter = new function () {
        var incrementTime = 500
        var currentTime = 0
        $(function () {
          userInfo.timeCounter.Timer = $.timer(updateTimer, incrementTime, true)
        })
        function updateTimer () {
          currentTime += incrementTime
        }
        this.resetStopwatch = function () {
          currentTime = 0
        }
        this.getCurrentTimeInSeconds = function () {
          return currentTime / 1000
        }
      }()
      userInfo.timeCounter.resetStopwatch()
    })
  }
  /* jshint ignore:end */

  // register service worker script, which allows, f.ex. the webmanifest.json to be fetched
  // to be able to add a "download" option on browsers on Android
  // see https://github.com/jfoclpf/autocosts/issues/126
  function registerServiceWorker () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(function (registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope)
        }).catch(function (err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err)
        })
    }
  }

  // the standard values are used if we want the form to be pre-filled
  // because file XX has standard values filed, it shows pre-filled values for /XX
  function loadsPrefilledValues () {
    // the key the name of the variable in translatedStrings
    // the value is the name of the id in the form
    var mappingIDs = {
      std_acq_month: 'acquisitionMonth',
      std_acq_year: 'acquisitionYear',
      std_price_paid: 'commercialValueAtAcquisition',
      std_price_today: 'commercialValueAtNow',
      std_insurance_sem: 'insuranceValue',
      std_loan: 'borrowedAmount',
      std_period_of_credit: 'numberInstallments',
      std_monthly_pay: 'amountInstallment',
      std_residual_value: 'residualValue',
      std_nbr_inspection: 'numberInspections',
      std_inspection_price: 'averageInspectionCost',
      std_road_tax: 'roadTaxes',
      std_fuel_paid_per_month: 'fuel_currency_value',
      std_days_per_week: 'car_to_work_number_days_week',
      std_jorney_2work: 'car_to_work_distance_home_work',
      std_jorney_weekend: 'car_to_work_distance_weekend',
      std_km_per_month: 'no_car_to_work_distance',
      std_car_fuel_efficiency: 'fuel_efficiency',
      std_fuel_price: 'fuel_price',
      std_maintenance_per_year: 'maintenance',
      std_repairs: 'repairs',
      std_parking: 'parking',
      std_tolls: 'no_daily_tolls_value',
      std_tolls_day: 'daily_expense_tolls',
      std_tolls_days_per_month: 'number_days_tolls',
      std_fines: 'tickets_value',
      std_washing: 'washing_value',
      std_nr_ppl_family: 'household_number_people',
      std_pass_price: 'public_transportation_month_expense',
      std_income_year: 'income_per_year',
      std_income_month: 'income_per_month',
      std_income_week: 'income_per_week',
      std_income_hour: 'income_per_hour',
      std_months_year: 'income_months_per_year',
      std_hours_week: 'income_hours_per_week',
      std_weeks_year: 'income_hour_weeks_per_year',
      std_time_home_job: 'time_home_job',
      std_time_weekend: 'time_weekend',
      std_time_in_driving: 'min_drive_per_day',
      std_days_month: 'days_drive_per_month',
      std_time_month_per_year: 'time_month_per_year',
      std_time_hours_per_week: 'time_hours_per_week',
      std_dist_per_month: 'dist_per_month'
    }

    $.each(mappingIDs, function (key, value) {
      if ($('#' + value).length && translatedStrings[key]) {
        $('#' + value).val(translatedStrings[key])
      }
    })
  }

  /* === Public methods to be returned === */

  // own module, since it may have been defined erlier by children modules
  thisModule.initialize = initialize

  return thisModule
})(autocosts.initializeModule || {},
  autocosts.serverInfo,
  autocosts.serverInfo.translatedStrings,
  autocosts.userInfo,
  autocosts.statistics,
  autocosts.servicesAvailabilityObj,
  autocosts.paths)
