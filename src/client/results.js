/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/* SHOW CALCULATED RESULTS MODULE */
/* Module with functions that are used to print the final result */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules */

/* global autocosts, $ */

autocosts.resultsModule = (function (thisModule, translatedStrings, switches, language, uberApiObj, canonicalUrl) {
  // modules dependencies
  var chartsModule, pdfModule, commonsModule,
    isNumber // is function that is imported from commons.js

  var calculatedData

  var downloadPdfButton // submodule

  function initialize () {
    loadModuleDependencies()
    loadResultsSettingsAndHandlers()
    // loadSmartBanner()
  }

  function loadModuleDependencies () {
    commonsModule = autocosts.commonsModule
    isNumber = commonsModule.isNumber // function

    chartsModule = switches.charts ? autocosts.resultsModule.chartsModule : {}
    pdfModule = switches.pdf ? autocosts.resultsModule.pdfModule : {}
  }

  function setCalculatedData (data) {
    calculatedData = data
  }

  function getCostsColors () {
    return {
      depreciation: '#2ba3d6',
      insurance: '#10c6e6',
      credit: '#5ae0e2',
      inspection: '#99e6bc',
      roadTaxes: '#ffda70',
      fuel: '#ff9e84',
      maintenance: '#ff7192',
      repairsImprovements: '#e562aa',
      parking: '#ea90cd',
      tolls: '#eabcef',
      fines: '#9f97ef',
      washing: '#867ae3'
    }
  }

  function loadResultsSettingsAndHandlers () {
    $('#results #totalCostsPeriod').on('change', function () {
      setPeriodicCosts(calculatedData, $(this).val())
      chartsModule.drawCostsBars($(this).val())
      chartsModule.drawCostsDoughnut($(this).val())
    })

    if (switches.pdf) {
      downloadPdfButton.init()
      $('#results .button-pdf').on('click', downloadPdfButton.onClick)
    } else {
      $('#results .button-pdf').hide()
    }

    if (switches.pdf && switches.print) {
      $('#results .button-print').show().addClass('disabled')
      $('#results .button-print').on('click', function () {
        console.log('Print button clicked')
        pdfModule.print()
      })
    } else {
      $('#results .button-print').hide()
    }

    // edit form on results
    $('#results #edit_form_btn').on('click', function () {
      $('#form').show()
      $('#results').hide()
    })

    // canonicalUrl has the current complete URL, ex: "https://autocosts.info/FR"
    if (switches.social /* && !commonsModule.isThisAtest() */) {
      var descriptionText = translatedStrings.initial_text
        .split('.').slice(0, 2).join('.') // gets only the first 2 sentences of the text
        .replace(/<(?:.|\n)*?>/gm, '') // removes html tags such as <b></b>

      $('.share-buttons .facebook a')
        .attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(canonicalUrl))
        .attr('target', '_blank')

      $('.share-buttons .twitter a')
        .attr('href',
          'https://twitter.com/share?text=' + encodeURI(descriptionText) +
                     '&url=' + encodeURI(canonicalUrl) +
                     '&title=' + encodeURI(translatedStrings.web_page_title))
        .attr('target', '_blank')

      $('.share-buttons .linkedin a')
        .attr('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURI(canonicalUrl) +
                     '&summary= ' + encodeURI(descriptionText))
        .attr('target', '_blank')

      // only adds whatsapp share button for mobile devices
      if (commonsModule.isMobile()) {
        $('.share-buttons .whatsapp a').show()

        $('.share-buttons .whatsapp a')
          .attr('href', 'https://wa.me/?text=' + encodeURI(descriptionText + ' - ' + canonicalUrl))
      } else {
        $('.share-buttons .whatsapp a').hide()
      }
    } else {
      $('.share-buttons').hide()
    }

    // remove hash tag from url on mobile version caused by ARIA events: http://localhost:3027/XX#main-menu
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
    $('.right-actions-mobile #main-menu, .right-actions-mobile #main-menu-toggle').on('click', function (e) {
      // I cannot find a way to get a callback for these ARIA events
      setTimeout(function () {
        commonsModule.removeHashFromUrl()
      }, 100)
    })
  }

  // scans all flattened calculatedData and assigns each result value to respective HTML class element
  function setCalculatedDataToHTML (flattenedData) {
    var $i, toFixedN, amount, numToShow
    for (var key in flattenedData) {
      $i = $('#results .' + key)
      // check that the element with that class exists in the html page
      // and that the element is valid in the array of calculated data
      if (flattenedData.hasOwnProperty(key) && $i.length) {
        if (typeof flattenedData[key] === 'number' && !isNaN(flattenedData[key])) {
          // organising text or adding extra text according to classes: toFixedN, currency, hours, distance, percentage
          toFixedN = getToFixedNumFromClasses($i)
          amount = flattenedData[key].toFixed(toFixedN)

          if ($i.hasClass('currency')) {
            numToShow = currencyShow(amount)
          } else if ($i.hasClass('hours')) {
            numToShow = amount + ' ' + translatedStrings.hour_abbr
          } else if ($i.hasClass('distance')) {
            numToShow = amount + ' ' + commonsModule.getStringFor('distance')
          } else if ($i.hasClass('percentage')) {
            numToShow = amount + '&#37;' // percentage symbol
          } else {
            numToShow = amount
          }

          $i.show().html(numToShow)
        } else {
          $i.hide()
        }
      }
    }
  }

  // The first section of results page, showing the monthly/trimester/semester/yearly costs
  function setPeriodicCosts (calculatedData, period) {
    var numMonths, strPeriod
    var currSymb = translatedStrings.curr_symbol

    switch (period) {
      case 'month' :
        numMonths = 1
        strPeriod = translatedStrings.month
        break
      case 'trimester' :
        numMonths = 3
        strPeriod = translatedStrings.trimester
        break
      case 'semester' :
        numMonths = 6
        strPeriod = translatedStrings.semester
        break
      case 'year' :
        numMonths = 12
        strPeriod = translatedStrings.year
        break
      default:
        console.error('Period not valid ' + period)
    }

    // sets the dropdown meny
    $('#results #totalCostsPeriod').val(period)

    // main info box total costs
    $('#results #info-boxes .total_costs_per_period').html((calculatedData.costs.perMonth.total * numMonths).toFixed(0))

    // section h2 title
    $('#results #avg-periodic-cost .costs_per_type').html(translatedStrings.costs + ' ' + translatedStrings.word_per + strPeriod)

    var $htmlEl = $('#results #avg-periodic-cost .three-boxes')

    $htmlEl.find('.average_costs_per_type').html(translatedStrings.word_per + strPeriod)

    // sets the periodic costs according to period on span elements with class starting with "periodic_costs"
    $htmlEl.find('span').each(function () {
      var classNames = $(this).attr('class')
      // check if there is any class that contains expression "periodic_costs"
      if (classNames && classNames.indexOf('periodic_costs') >= 0) {
        var classesArr = classNames.split(' ')
        for (var i = 0; i < classesArr.length; i++) {
          var className, costItem, val
          if (classesArr[i].indexOf('periodic_costs') >= 0) {
            className = classesArr[i]
            costItem = className.replace('periodic_costs_', '')
            val = calculatedData.costs.perMonth.items[costItem] * numMonths
            $(this).html(currSymb + ' ' + val.toFixed(1))
          }
        }
      }
    })

    // extra items
    $htmlEl.find('.periodic_costs_halfOfMaintenance')
      .html(currSymb + ' ' + (calculatedData.costs.perMonth.items.maintenance / 2 * numMonths).toFixed(1))

    $htmlEl.find('.periodic_costs_total_standing_costs')
      .html(currSymb + ' ' + (calculatedData.costs.perMonth.standingCosts * numMonths).toFixed(2))
    $htmlEl.find('.periodic_costs_total_running_costs')
      .html(currSymb + ' ' + (calculatedData.costs.perMonth.runningCosts * numMonths).toFixed(2))
    $htmlEl.find('.periodic_costs_total_costs')
      .html(currSymb + ' ' + (calculatedData.costs.perMonth.total * numMonths).toFixed(2))
  }

  function setPeriodicCostsDetails (form, calculatedData) {
    // html element in which the costs details will be added
    var htmlEl = '#results #avg-periodic-cost .three-boxes'

    var errMsg = 'Error setting Periodic Costs details on results'

    // remove existing <ul> if they exist, to add new ones
    $(htmlEl + ' ul').remove()

    // add Cost <ul> for each cost details, for example add <ul> to div with class "fuel_details"
    for (var cost in calculatedData.costs.perMonth.items) {
      if (!calculatedData.costs.perMonth.items.hasOwnProperty(cost)) {
        continue
      }

      if ($(htmlEl + ' .' + cost + '_details').length) {
        $(htmlEl + ' .' + cost + '_details').append($('<ul>'))
      }
    }

    var addLiElm = function (costItem, text, text2) {
      var $item = $(htmlEl + ' .' + costItem + '_details ul')
      if (typeof text2 === 'undefined' || text2 === null) {
        $item.append($('<li>').text(text))
      } else {
        $item.append($('<li>').text(text + ': ' + text2))
      }
    }

    // Depreciation
    if (calculatedData.details.ageOfCarInMonths === 0) {
      addLiElm('depreciation', translatedStrings.error_depreciation_new_car)
    } else {
      addLiElm('depreciation',
        translatedStrings.aq_value, currencyShow(form.depreciation.acquisitionCost))
      addLiElm('depreciation',
        translatedStrings.final_value, currencyShow(form.depreciation.presentValue))
      addLiElm('depreciation',
        translatedStrings.period_own, calculatedData.details.ageOfCarInMonths + ' ' + translatedStrings.months)
      addLiElm('depreciation',
        '(' + currencyShow(form.depreciation.acquisitionCost) + '-' + currencyShow(form.depreciation.presentValue) + ')/' +
                     calculatedData.details.ageOfCarInMonths + ' ' + translatedStrings.months)
    }

    // Insurance
    switch (commonsModule.getTimePeriod(form.insurance.period)) {
      case 'month':
        addLiElm('insurance',
          form.insurance.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.month)
        break
      case 'trimester':
        addLiElm('insurance',
          form.insurance.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.trimester)
        break
      case 'semester':
        addLiElm('insurance',
          form.insurance.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.semester)
        break
      case 'year':
        addLiElm('insurance',
          form.insurance.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.year)
        break
      default:
        throw errMsg
    }

    // Credit interests
    if (form.credit.creditBool === 'true') {
      addLiElm('credit', translatedStrings.credit_loan2, currencyShow(form.credit.yesCredit.borrowedAmount))

      addLiElm('credit', translatedStrings.credit_period,
        form.credit.yesCredit.numberInstallments + ' ' + translatedStrings.months)

      addLiElm('credit', translatedStrings.credit_instalment, currencyShow(form.credit.yesCredit.amountInstallment))
      addLiElm('credit', translatedStrings.credit_residual_value1, currencyShow(form.credit.yesCredit.residualValue))

      addLiElm('credit', translatedStrings.credit_total_interests,
        currencyShow(calculatedData.details.credit.totalPaidInInterests))

      addLiElm('credit',
        '(' + calculatedData.details.credit.numberOfMonthlyInstalments + '*' +
                        form.credit.yesCredit.amountInstallment + ')+' +
                        form.credit_residual_value + '-' + form.credit.yesCredit.borrowedAmount)

      if (calculatedData.age_months >= calculatedData.details.credit.numberOfMonthlyInstalments) {
        addLiElm('credit', translatedStrings.credit_interests_month + ': ' +
                                   currencyShow(calculatedData.costs.perMonth.items.credit.toFixed(2)))
      }
    }

    // Inspection
    if (form.inspection.numberOfInspections !== 0) {
      addLiElm('inspection',
        form.inspection.numberOfInspections + ' ' +
                        translatedStrings.times_costing + ' ' + form.inspection.averageInspectionCost +
                        ' ' + translatedStrings.curr_name_plural + ' ' + translatedStrings.each_one_during + ' ' +
                        calculatedData.details.ageOfCarInMonths + ' ' + translatedStrings.months)
    }

    // Taxes
    addLiElm('roadTaxes',
      form.roadTaxes.amountPerYear + ' ' + translatedStrings.curr_name_plural + ' ' +
                 translatedStrings.word_per + ' ' + translatedStrings.year)

    // Fuel
    switch (form.fuel.typeOfCalculation) {
      case 'km':
        if (form.fuel.distanceBased.considerCarToJob === 'false') {
          switch (commonsModule.getTimePeriod(form.fuel.distanceBased.noCarToJob.period)) {
            case 'month':
              addLiElm('fuel',
                form.fuel.distanceBased.noCarToJob.distancePerPeriod + ' ' +
                                     translatedStrings.std_dist + ' ' + translatedStrings.word_per + ' ' + translatedStrings.month)
              break
            case 'twoMonths':
              addLiElm('fuel',
                form.fuel.distanceBased.noCarToJob.distancePerPeriod + ' ' +
                                     translatedStrings.dist_each_two_months)
              break
            case 'trimester':
              addLiElm('fuel',
                form.fuel.distanceBased.noCarToJob.distancePerPeriod + ' ' +
                                     translatedStrings.std_dist + ' ' + translatedStrings.word_per + ' ' + translatedStrings.trimester)
              break
            case 'semester':
              addLiElm('fuel',
                form.fuel.distanceBased.noCarToJob.distancePerPeriod + ' ' +
                                     translatedStrings.std_dist + ' ' + translatedStrings.word_per + ' ' + translatedStrings.semester)
              break
            case 'year':
              addLiElm('fuel',
                form.fuel.distanceBased.noCarToJob.distancePerPeriod + ' ' +
                                     translatedStrings.std_dist + ' ' + translatedStrings.word_per + ' ' + translatedStrings.year)
              break
            default:
              throw errMsg
          }
          addLiElm('fuel',
            translatedStrings.fuel_car_eff,
            form.fuel.distanceBased.fuelEfficiency + ' ' + translatedStrings.std_fuel_calc)
          addLiElm('fuel',
            translatedStrings.fuel_price1,
            currencyShow(form.fuel.distanceBased.fuelPrice) + '/' + translatedStrings.std_volume_short)
        } else {
          addLiElm('fuel',
            form.fuel.distanceBased.carToJob.daysPerWeek + ' ' + translatedStrings.fuel_job_calc1)
          addLiElm('fuel',
            translatedStrings.you_drive + ' ' + form.fuel.distanceBased.carToJob.distanceBetweenHomeAndJob + ' ' +
                             translatedStrings.fuel_dist_home_job1)
          addLiElm('fuel',
            translatedStrings.you_drive + ' ' + form.fuel.distanceBased.carToJob.distanceDuringWeekends + ' ' +
                             translatedStrings.fuel_dist_no_job1)

          if (calculatedData.drivingDistance.calculated) {
            addLiElm('fuel',
              translatedStrings.you_drive_totally_avg + ' ' +
                                 calculatedData.drivingDistance.perMonth.toFixed(1) + ' ' +
                                 translatedStrings.std_dist + ' ' + translatedStrings.word_per + ' ' +
                                 translatedStrings.month + ' (~30.5 ' + translatedStrings.days + ')')
          }

          addLiElm('fuel',
            translatedStrings.fuel_car_eff,
            form.fuel.distanceBased.fuelEfficiency + ' ' + translatedStrings.std_fuel_calc)
          addLiElm('fuel',
            translatedStrings.fuel_price,
            currencyShow(form.fuel.distanceBased.fuelPrice) + '/' + translatedStrings.std_volume_short)
        }
        break

      case 'euros':
        switch (commonsModule.getTimePeriod(form.fuel.currencyBased.period)) {
          case 'month':
            addLiElm('fuel', form.fuel.currencyBased.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                                 translatedStrings.word_per + ' ' + translatedStrings.month)
            break
          case 'twoMonths':
            addLiElm('fuel', form.fuel.currencyBased.amountPerPeriod + ' ' + translatedStrings.dist_each_two_months)
            break
          case 'trimester':
            addLiElm('fuel', form.fuel.currencyBased.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                                 translatedStrings.word_per + ' ' + translatedStrings.trimester)
            break
          case 'semester':
            addLiElm('fuel', form.fuel.currencyBased.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                                 translatedStrings.word_per + ' ' + translatedStrings.semester)
            break
          case 'year':
            addLiElm('fuel', form.fuel.currencyBased.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                                 translatedStrings.word_per + ' ' + translatedStrings.year)
            break
          default:
            throw errMsg
        }
        break
    }

    // Maintenance
    addLiElm('maintenance',
      form.maintenance.amountPerYear + ' ' + translatedStrings.curr_name_plural + ' ' +
                 translatedStrings.word_per + ' ' + translatedStrings.year)

    // Repairs
    addLiElm('repairsImprovements',
      form.repairsImprovements.amountPerYear + ' ' + translatedStrings.curr_name_plural + ' ' +
                 translatedStrings.word_per + ' ' + translatedStrings.year)

    // Tolls
    if (form.tolls.calculationBasedOnDay === 'false') {
      switch (commonsModule.getTimePeriod(form.tolls.noBasedOnDay.period)) {
        case 'month':
          addLiElm('tolls',
            form.tolls.noBasedOnDay.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                             translatedStrings.word_per + ' ' + translatedStrings.month)
          break
        case 'twoMonths':
          addLiElm('tolls', form.tolls.noBasedOnDay.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                                      translatedStrings.words_per_each + ' ' + translatedStrings.two_months)
          break
        case 'trimester':
          addLiElm('tolls',
            form.tolls.noBasedOnDay.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                             translatedStrings.word_per + ' ' + translatedStrings.trimester)
          break
        case 'semester':
          addLiElm('tolls',
            form.tolls.noBasedOnDay.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                             translatedStrings.word_per + ' ' + translatedStrings.semester)
          break
        case 'year':
          addLiElm('tolls',
            form.tolls.noBasedOnDay.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                             translatedStrings.word_per + ' ' + translatedStrings.year)
          break
        default:
          throw errMsg
      }
    } else {
      addLiElm('tolls', form.tolls.yesBasedOnDay.amountPerDay + ' ' + translatedStrings.curr_name_plural + ' ' +
                              translatedStrings.during + ' ' + form.tolls.yesBasedOnDay.daysPerMonth + ' ' +
                              translatedStrings.days + ' ' + translatedStrings.word_per + ' ' + translatedStrings.month)
    }

    // Fines
    switch (commonsModule.getTimePeriod(form.fines.period)) {
      case 'month':
        addLiElm('fines',
          form.fines.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.month)
        break
      case 'twoMonths':
        addLiElm('fines',
          form.fines.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.words_per_each + ' ' + translatedStrings.two_months)
        break
      case 'trimester':
        addLiElm('fines',
          form.fines.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.trimester)
        break
      case 'semester':
        addLiElm('fines',
          form.fines.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.semester)
        break
      case 'year':
        addLiElm('fines',
          form.fines.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.year)
        break
      default:
        throw errMsg
    }

    // Washing
    switch (commonsModule.getTimePeriod(form.washing.period)) {
      case 'month':
        addLiElm('washing',
          form.washing.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.month)
        break
      case 'twoMonths':
        addLiElm('washing',
          form.washing.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.words_per_each + ' ' + translatedStrings.two_months)
        break
      case 'trimester':
        addLiElm('washing',
          form.washing.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.trimester)
        break
      case 'semester':
        addLiElm('washing',
          form.washing.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.semester)
        break
      case 'year':
        addLiElm('washing',
          form.washing.amountPerPeriod + ' ' + translatedStrings.curr_name_plural + ' ' +
                         translatedStrings.word_per + ' ' + translatedStrings.year)
        break
      default:
        throw errMsg
    }
  }

  function setFinancialEffortDetails (form, calculatedData) {
    // html element in which the costs details will be added
    var htmlEl = '#results #financial-effort .values'

    var errMsg = 'Error setting Financial Costs details on results'

    // remove existing <ul> if they exist, to add new ones
    $(htmlEl + ' ul').remove()

    // add <ul> for each item details in financial effort
    if (!$(htmlEl + ' .panel ul').length) {
      $(htmlEl + ' .panel').append($('<ul>'))
    }

    var addLiElm = function (item, text, text2) {
      var $item = $(htmlEl + ' .' + item + '_details ul')
      if (typeof text2 === 'undefined' || text2 === null) {
        $item.append($('<li>').text(text))
      } else {
        $item.append($('<li>').text(text + ': ' + text2))
      }
    }

    // income
    var income = calculatedData.financialEffort.income
    if (income.calculated) {
      switch (form.income.incomePeriod) {
        case 'year':
          addLiElm('income',
            translatedStrings.net_income_per + ' ' + translatedStrings.year,
            currencyShow(form.income.year.amount))
          addLiElm('income',
            translatedStrings.average_net_income_per + ' ' + translatedStrings.month,
            currencyShow(income.averagePerMonth.toFixed(1)))
          break

        case 'month':
          addLiElm('income',
            translatedStrings.net_income_per + ' ' + translatedStrings.month,
            currencyShow(form.income.month.amountPerMonth))
          addLiElm('income',
            translatedStrings.number_of_months,
            form.income.month.monthsPerYear)
          addLiElm('income',
            translatedStrings.average_net_income_per + ' ' + translatedStrings.month,
            currencyShow(income.averagePerMonth.toFixed(1)))
          addLiElm('income',
            translatedStrings.average_net_income_per + ' ' + translatedStrings.year,
            currencyShow(income.perYear.toFixed(1)))
          break

        case 'week':
          addLiElm('income',
            translatedStrings.net_income_per + ' ' + translatedStrings.week,
            currencyShow(form.income.week.amountPerWeek))
          addLiElm('income',
            translatedStrings.number_of_weeks,
            form.income.week.weeksPerYear)
          addLiElm('income',
            translatedStrings.average_net_income_per + ' ' + translatedStrings.month,
            currencyShow(income.averagePerMonth.toFixed(1)))
          addLiElm('income',
            translatedStrings.average_net_income_per + ' ' + translatedStrings.year,
            currencyShow(income.perYear.toFixed(1)))
          break

        case 'hour':
          addLiElm('income',
            translatedStrings.net_income_per + ' ' + translatedStrings.hour,
            currencyShow(form.income.hour.amountPerHour))
          addLiElm('income',
            translatedStrings.number_of_hours,
            form.income.hour.hoursPerWeek + ' ' + translatedStrings.hour_abbr)
          addLiElm('income',
            translatedStrings.number_of_weeks,
            form.income.hour.weeksPerYear)
          addLiElm('income',
            translatedStrings.average_net_income_per + ' ' + translatedStrings.month,
            currencyShow(income.averagePerMonth.toFixed(1)))
          addLiElm('income',
            translatedStrings.average_net_income_per + ' ' + translatedStrings.year,
            currencyShow(income.perYear.toFixed(1)))
          break
        default:
          throw errMsg
      }
    }

    // working time
    var workingTime = calculatedData.financialEffort.workingTime
    if (workingTime.calculated) {
      if (form.income.incomePeriod !== 'hour') {
        if (form.workingTime.isActivated === 'true') {
          addLiElm('working_time',
            translatedStrings.hours_per + ' ' + translatedStrings.week,
            workingTime.hoursPerWeek + ' ' + translatedStrings.hour_abbr)
          addLiElm('working_time',
            translatedStrings.months_per + ' ' + translatedStrings.year,
            workingTime.monthsPerYear)

          // if workingTime.calculated is true, the values hoursPerMonth and hoursPerYear must be valid numbers
          addLiElm('working_time',
            translatedStrings.average_working_hours_per + ' ' + translatedStrings.month,
            workingTime.hoursPerMonth.toFixed(1) + ' ' + translatedStrings.hour_abbr)
          addLiElm('working_time',
            translatedStrings.working_hours_per + ' ' + translatedStrings.year,
            workingTime.hoursPerYear.toFixed(1) + ' ' + translatedStrings.hour_abbr)
        } else {
          addLiElm('working_time', translatedStrings.working_time_message)
        }
      }

      if (isNumber(income.averagePerHour)) {
        addLiElm('working_time',
          translatedStrings.average_net_income_per + ' ' + translatedStrings.hour,
          currencyShow(income.averagePerHour.toFixed(1)))
      }
    }

    // Driving Distance
    var drivingDistance = calculatedData.drivingDistance
    if (drivingDistance.calculated) {
      if (isNumber(drivingDistance.betweenHomeAndJob)) {
        addLiElm('distance',
          translatedStrings.dist_home_job,
          drivingDistance.betweenHomeAndJob.toFixed(1) + ' ' + translatedStrings.std_dist)
      }

      if (isNumber(calculatedData.details.numberOfDaysPerWeekUserDrivesToJob)) {
        addLiElm('distance',
          translatedStrings.days_drive_job,
          calculatedData.details.numberOfDaysPerWeekUserDrivesToJob.toFixed(0) + ' ' + translatedStrings.days)
      }

      if (isNumber(drivingDistance.duringEachWeekend)) {
        addLiElm('distance',
          translatedStrings.dist_jorney_weekend,
          drivingDistance.duringEachWeekend.toFixed(1) + ' ' + translatedStrings.std_dist)
      }

      // if drivingDistance.calculated is true, the values perWeek, perMonth and perYear must be valid numbers
      addLiElm('distance',
        translatedStrings.average_dist_per_week,
        drivingDistance.perWeek.toFixed(1) + ' ' + translatedStrings.std_dist)
      addLiElm('distance',
        translatedStrings.you_drive_per + ' ' + translatedStrings.month,
        drivingDistance.perMonth.toFixed(1) + ' ' + translatedStrings.std_dist)
      addLiElm('distance',
        translatedStrings.you_drive_per + ' ' + translatedStrings.year,
        drivingDistance.perYear.toFixed(1) + ' ' + translatedStrings.std_dist)
    }

    // time spent in driving
    var timeSpentInDriving = calculatedData.timeSpentInDriving
    if (timeSpentInDriving.calculated) {
      if (form.distance.considerCarToJob === 'true' || form.fuel.distanceBased.considerCarToJob === 'true') {
        addLiElm('time_spent_in_driving',
          translatedStrings.minutes_home_job,
          form.timeSpentInDriving.option1.minutesBetweenHomeAndJob + ' ' + translatedStrings.min)
        addLiElm('time_spent_in_driving',
          translatedStrings.days_drive_to_job,
          form.distance.carToJob.daysPerWeek + ' ' + translatedStrings.days)
        addLiElm('time_spent_in_driving',
          translatedStrings.time_drive_weekend,
          form.timeSpentInDriving.option1.minutesDuringWeekend + ' ' + translatedStrings.min)
        addLiElm('time_spent_in_driving',
          translatedStrings.minutes_drive_per + ' ' + translatedStrings.week,
          timeSpentInDriving.minutesPerWeek + ' ' + translatedStrings.min)
      } else {
        addLiElm('time_spent_in_driving',
          translatedStrings.minutes_drive_per + ' ' + translatedStrings.day,
          form.timeSpentInDriving.option2.minutesPerDay + ' ' + translatedStrings.min)
        addLiElm('time_spent_in_driving',
          translatedStrings.days_drive_per_month,
          form.timeSpentInDriving.option2.daysPerMonth + ' ' + translatedStrings.days)
      }

      // if timeSpentInDriving.calculated is true, the values hoursPerMonth and hoursPerYear must be valid numbers
      addLiElm('time_spent_in_driving',
        translatedStrings.hours_drive_per + ' ' + translatedStrings.month,
        timeSpentInDriving.hoursPerMonth.toFixed(1) + ' ' + translatedStrings.hour_abbr)

      addLiElm('time_spent_in_driving',
        translatedStrings.hours_drive_per + ' ' + translatedStrings.year,
        timeSpentInDriving.hoursPerYear.toFixed(1) + ' ' + translatedStrings.hour_abbr)
    }

    // financial effort
    var financialEffort = calculatedData.financialEffort
    if (financialEffort.calculated) {
      addLiElm('financial_effort',
        translatedStrings.total_costs_per_year,
        currencyShow(financialEffort.totalCarCostsPerYear.toFixed(1)))
      addLiElm('financial_effort',
        translatedStrings.hours_to_afford_car,
        financialEffort.workingHoursPerYearToAffordCar.toFixed(1) + ' ' + translatedStrings.hour_abbr)
      addLiElm('financial_effort',
        translatedStrings.months_to_afford_car,
        financialEffort.workingMonthsPerYearToAffordCar.toFixed(2))
      addLiElm('financial_effort',
        translatedStrings.days_car_paid,
        Math.ceil(financialEffort.daysForCarToBePaid) + ' ' + translatedStrings.days)
    }

    // speeds
    var speeds = calculatedData.speeds
    if (isNumber(speeds.averageKineticSpeed)) {
      addLiElm('financial_effort',
        translatedStrings.aver_yearly + ' ' + translatedStrings.kinetic_speed,
        speeds.averageKineticSpeed.toFixed(1) + ' ' + translatedStrings.std_dist + '/h')
    }
    if (isNumber(speeds.averageConsumerSpeed)) {
      addLiElm('financial_effort',
        translatedStrings.aver_yearly + translatedStrings.virtual_speed,
        speeds.averageConsumerSpeed.toFixed(1) + ' ' + translatedStrings.std_dist + '/h')
    }
  }

  function setEquivTransportCostsDetails (form, calculatedData) {
    // html element in which the costs details will be added
    var htmlEl = '#results #equivalent-transport-costs .values'

    // remove existing <ul> if they exist, to add new ones
    $(htmlEl + ' ul').remove()

    // add <ul> for each item details in  equivalent transport costs
    if (!$(htmlEl + ' .panel ul').length) {
      $(htmlEl + ' .panel').append($('<ul>'))
    }

    var addLiElm = function (item, text, text2) {
      var $item = $(htmlEl + ' .' + item + '_details ul')
      if (typeof text2 === 'undefined' || text2 === null) {
        $item.append($('<li>').text(text))
      } else {
        $item.append($('<li>').text(text + ': ' + text2))
      }
    }

    // Public transports more taxi
    var publicTransports = calculatedData.publicTransports
    if (publicTransports.toBeDisplayed) {
      addLiElm('public_transports',
        translatedStrings.fam_nbr,
        form.publicTransports.numberOfPeopleInFamily + ' ' + translatedStrings.person_or_people)

      addLiElm('public_transports',
        translatedStrings.pass_month_avg,
        currencyShow(form.publicTransports.monthlyPassCost))

      addLiElm('taxi',
        publicTransports.taxi.possibleDistanceDoneByTaxi.toFixed(1) + ' ' +
                     translatedStrings.std_dist + ' ' + translatedStrings.on_taxi_paying +
                     ' ' + currencyShow(publicTransports.taxi.costPerUnitDistance.toFixed(1)) + '/' + translatedStrings.std_dist)

      if (publicTransports.furtherPublicTransports.display) {
        addLiElm('other_pub_trans', translatedStrings.other_pub_trans_desc)
      }
    }

    // UBER
    var calculatedUber = calculatedData.uber

    if (switches.uber && calculatedUber && calculatedUber.calculated) {
      $('#equivalent-transport-costs .uber').show()

      if (calculatedUber.resultType === 1) {
        // in which driver can replace every km by uber
        // the remaining money is applied to public transport

        addLiElm('uber',
          'UBER - ' + translatedStrings.costs + ' ' + translatedStrings.word_per + ' ' + translatedStrings.std_dist_full,
          currencyShow(calculatedUber.uberCosts.perUnitDistance.toFixed(2)) + '/' + translatedStrings.std_dist)

        addLiElm('uber', 'UBER - ' + translatedStrings.costs + ' ' + translatedStrings.word_per + ' ' + translatedStrings.minutes,
          currencyShow(calculatedUber.uberCosts.perMinute.toFixed(2)) + '/' + translatedStrings.min)

        addLiElm('uber', translatedStrings.fuel_dist + ' ' + translatedStrings.word_per + ' ' + translatedStrings.month,
          calculatedUber.distanceDoneWithUber.toFixed(0) + ' ' + translatedStrings.std_dist_full)

        addLiElm('uber', translatedStrings.minutes_drive_per + ' ' + translatedStrings.month,
          (calculatedData.timeSpentInDriving.hoursPerMonth * 60).toFixed(0) + ' ' + translatedStrings.minutes)

        addLiElm('other_pub_trans_for_uber', translatedStrings.other_pub_trans_desc)
      } else if (calculatedUber.resultType === 2) {
        // the case where uber equivalent is more expensive
        // the driver shall spend the equivalent car money in public transports and the remaining in uber

        addLiElm('uber',
          'UBER - ' + translatedStrings.costs + ' ' + translatedStrings.word_per + ' ' + translatedStrings.std_dist_full,
          currencyShow(calculatedUber.uberCosts.perUnitDistance.toFixed(2)) + '/' + translatedStrings.std_dist)
        addLiElm('uber',
          'UBER - ' + translatedStrings.costs + ' ' + translatedStrings.word_per + ' ' + translatedStrings.minutes,
          currencyShow(calculatedUber.uberCosts.perMinute.toFixed(2)) + '/' + translatedStrings.min)
        addLiElm('uber',
          translatedStrings.kinetic_speed_title,
          calculatedData.speeds.averageKineticSpeed.toFixed(2) + ' ' + translatedStrings.std_dist + '/' +
                         translatedStrings.hour_abbr)
        addLiElm('uber',
          'UBER - ' + translatedStrings.std_dist_full + ' ' + translatedStrings.word_per + ' ' + translatedStrings.month,
          calculatedUber.distanceDoneWithUber.toFixed(0) + ' ' + translatedStrings.std_dist_full)
        addLiElm('uber',
          'UBER: ' + translatedStrings.costs + ' - ' + translatedStrings.word_total_cap,
          currencyShow(calculatedUber.uberCosts.total.toFixed(0)))

        addLiElm('other_pub_trans_for_uber',
          translatedStrings.fam_nbr, form.publicTransports.numberOfPeopleInFamily + ' ' +
                         translatedStrings.person_or_people)
        addLiElm('other_pub_trans_for_uber', translatedStrings.pass_month_avg,
          currencyShow(form.publicTransports.monthlyPassCost))
      }
    } else {
      $('#equivalent-transport-costs .uber').hide()
    }
  }

  // get from element with class in the set of toFixed0, toFixed1, toFixed2, etc.
  // respectively the integers 0, 1, 2, etc.
  function getToFixedNumFromClasses ($this) {
    if (!$this.length) {
      return 0
    }

    var toFixedN

    // gets all classes from $fieldHead
    var classList = $this.attr('class').split(/\s+/)
    $.each(classList, function (index, item) {
      // if there is a class which contains the string "field"?
      if (item.indexOf('toFixed') >= 0) {
        toFixedN = item
      }
    })

    if (!toFixedN) {
      return 0 // default
    }

    return parseInt(toFixedN.replace('toFixed', ''), 10)
  }

  // puts the currency symbol after the money value, for certain countries
  function currencyShow (value) {
    if (translatedStrings.invert_currency && JSON.parse(translatedStrings.invert_currency)) {
      return (value + ' ' + translatedStrings.curr_symbol)
    } else {
      return (translatedStrings.curr_symbol + ' ' + value)
    }
  }

  // Click handlers for class "accordion", which has further details  of costs items
  var wasClassAccordionHandlerSet = false

  function setClassAccordionHandler () {
    if (!wasClassAccordionHandlerSet) {
      var i; var acc = document.getElementsByClassName('accordion')

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function () {
          this.classList.toggle('active')
          var panel = this.nextElementSibling

          if (panel.style.maxHeight) {
            panel.style.maxHeight = null
          } else {
            panel.style.maxHeight = panel.scrollHeight + 'px'
          }
        })
      }

      wasClassAccordionHandlerSet = true
    }
  }

  // submodule that deals with the download pdf button
  downloadPdfButton = (function () {
    var $button = $('#results .button-pdf')
    var loaderPathname = '/img/loader30x30.gif'
    var htmlContent, buttonWidth

    function init (callback) {
      checkSanity()
      $button.show()
      htmlContent = $button.html()
      promise(callback)
    }

    function onClick () {
      checkSanity()
      buttonWidth = $button.width()
      console.log('Download pdf clicked')
      loadLoader(function () {
        setTimeout(function () {
          pdfModule.download()
          setTimeout(removeLoader, 500)
        }, 500)
      })
    }

    function loadLoader (callback) {
      checkSanity()
      $button.html('').removeClass('btn-blue medium').addClass('btn-blue-loader')
      promise(function () {
        // the loader gif is smaller in width. To avoid changes in layout set the same width
        $button.width(buttonWidth)
        $('<img/>').attr('src', loaderPathname).on('load', function () {
          $(this).remove()
          $button.css('background-image', 'url(' + loaderPathname + ')')
          promise(callback)
        })
      })
    }

    function removeLoader (callback) {
      checkSanity()
      $button.html(htmlContent).removeClass('btn-blue-loader').addClass('btn-blue medium')
      promise(function () {
        $button.width('') // removes css width property
        $button.css('background-image', '')
        promise(callback)
      })
    }

    function promise (callback) {
      $button.find('*').promise().done(function () {
        if (typeof callback === 'function') {
          callback()
        }
      })
    }

    function checkSanity () {
      if (!switches.pdf) {
        throw Error('pdf submodule downloadPdfButton but switches.pdf is false')
      }
    }

    return {
      init: init,
      onClick: onClick
    }
  })()

  // When the APP is fully operational with the new UI/UX uncomment this
  // Banner that appears on the top of the page on mobile devices, and directs the user to Google Play App
  // Based on this npm package: https://www.npmjs.com/package/smart-app-banner
  /* function loadSmartBanner () {
    new SmartBanner({
      daysHidden: 15, // days to hide banner after close button is clicked (defaults to 15)
      daysReminder: 90, // days to hide banner after "VIEW" button is clicked (defaults to 90)
      appStoreLanguage: language, // language code for the App Store (defaults to user's browser language)
      title: translatedStrings.ac_mobile,
      author: 'Autocosts Org',
      button: 'APP',
      store: {
        android: 'Google Play'
      },
      price: {
        android: 'FREE'
      },
      // Add an icon (in this example the icon of Our Code Editor)
      icon: '/img/logo/logo_sm.png',
      theme: 'android' // put platform type ('ios', 'android', etc.) here to force single theme on all device
      // force: 'android' // Uncomment for platform emulation
    })
  } */

  /* === Public methods to be returned === */

  // thisModule, since this is a parent module and it may have been defined erlier by a children module
  thisModule.initialize = initialize
  thisModule.getCostsColors = getCostsColors

  thisModule.setPeriodicCosts = setPeriodicCosts
  thisModule.setCalculatedDataToHTML = setCalculatedDataToHTML
  thisModule.setPeriodicCostsDetails = setPeriodicCostsDetails
  thisModule.setFinancialEffortDetails = setFinancialEffortDetails
  thisModule.setEquivTransportCostsDetails = setEquivTransportCostsDetails
  thisModule.setClassAccordionHandler = setClassAccordionHandler
  thisModule.setCalculatedData = setCalculatedData

  return thisModule
})(autocosts.resultsModule || {},
  autocosts.serverInfo.translatedStrings,
  autocosts.serverInfo.switches,
  autocosts.serverInfo.language,
  autocosts.main.uberApiObj,
  autocosts.paths.url.canonicalUrl)
