/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

// TRANSFER DATA MODULE
// from user form or database to calculator core function
// see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules
// This file is used both by the browser and by node/commonsJS, the latter being called by getAvgFromDB.js

// check for node
if (!autocosts && typeof window === 'undefined') { // eslint-disable-line
  var autocosts = {}
}

autocosts.transferDataModule = (function (thisModule) {
  var commonsModule

  function initialize () {
    loadModuleDependencies()
  }

  function loadModuleDependencies () {
    if (typeof window === 'undefined') { // node
      commonsModule = require('./commons')
    } else { // browser
      commonsModule = autocosts.commonsModule
    }
  }

  // creates an Object from the html user form
  // to be passed into the calculator core function
  function createUserDataObjectFromForm (userForm) {
    var f = userForm // main user form document variable

    var data = {
      depreciation: {
        acquisitionMonth: f.acquisitionMonth.value,
        acquisitionYear: f.acquisitionYear.value,
        acquisitionCost: f.commercialValueAtAcquisition.value,
        presentValue: f.commercialValueAtNow.value
      },

      insurance: {
        amountPerPeriod: f.insuranceValue.value,
        period: commonsModule.getTimePeriod(commonsModule.getSelectedValueOnRadioButton(f.insurancePaymentPeriod))
      },

      credit: {
        creditBool: commonsModule.getSelectedValueOnRadioButton(f.AutoCreditRadioBtn),
        yesCredit: {
          borrowedAmount: f.borrowedAmount.value,
          numberInstallments: f.numberInstallments.value,
          amountInstallment: f.amountInstallment.value,
          residualValue: f.residualValue.value
        }
      },

      inspection: {
        averageInspectionCost: f.averageInspectionCost.value,
        numberOfInspections: f.numberInspections.value
      },

      roadTaxes: {
        amountPerYear: f.roadTaxes.value
      },

      // Form Part 2
      fuel: {
        typeOfCalculation: commonsModule.getSelectedValueOnRadioButton(f.calc_combustiveis), // binary variable: "currency/euros" or "distance/km"
        currencyBased: {
          amountPerPeriod: f.combustiveis_euro.value,
          period: commonsModule.getTimePeriod(f.combustiveis_periodo_euro.value) // month, two months, trimester, semester, year
        },
        distanceBased: {
          considerCarToJob: commonsModule.getSelectedValueOnRadioButton(f.car_job_form2), // binary variable: true or false
          carToJob: {
            daysPerWeek: f.dias_por_semana.value,
            distanceBetweenHomeAndJob: f.km_entre_casa_trabalho.value,
            distanceDuringWeekends: f.km_fds.value
          },
          noCarToJob: {
            distancePerPeriod: f.km_por_mes.value,
            period: commonsModule.getTimePeriod(f.combustivel_period_km.value), // month, two months,  trimester, semester, year
            distanceStandardUnit: f.distance_standard_onfuel.value // km, mile or mil(10km)
          },
          fuelEfficiency: f.fuel_efficiency.value, // fuel efficiency of the vehicle
          fuelEfficiencyStandard: f.fuel_efficiency_standard_onfuel.value, // l/100km, km/l, mpg(US), mpg(imp)
          fuelPrice: f.fuel_price.value // fuel price per unit volume
        }
      },

      maintenance: {
        amountPerYear: f.revisoes.value
      },

      repairsImprovements: {
        amountPerYear: f.reparacoes.value
      },

      parking: {
        amountPerMonth: f.parqueamento.value
      },

      tolls: {
        calculationBasedOnDay: commonsModule.getSelectedValueOnRadioButton(f.tolls_daily_radioBtn), // true or false
        yesBasedOnDay: {
          amountPerDay: f.daily_expense_tolls.value,
          daysPerMonth: f.number_days_tolls.value
        },
        noBasedOnDay: {
          amountPerPeriod: f.no_daily_tolls_value.value,
          period: commonsModule.getTimePeriod(f.tolls_period_select.value) // month, two months,  trimester, semester, year
        }
      },

      fines: {
        amountPerPeriod: f.tickets_value.value,
        period: commonsModule.getTimePeriod(f.tickets_period_select.value) // month, two months,  trimester, semester, year
      },

      washing: {
        amountPerPeriod: f.washing_value.value,
        period: commonsModule.getTimePeriod(f.washing_period_select.value) // month, two months,  trimester, semester, year
      },

      // Form Part 3
      publicTransports: {
        isOk: autocosts.userFormModule.validateFormModule.isPublicTransportsAlternativeOk(), // boolean
        numberOfPeopleInFamily: f.pessoas_agregado.value,
        monthlyPassCost: f.preco_passe.value
      },

      income: {
        isOk: autocosts.userFormModule.validateFormModule.isFinancialEffortOk(), // boolean if this section is correctly filled in
        incomePeriod: commonsModule.getSelectedValueOnRadioButton(f.radio_income), // "year", "month", "week" or "hour"
        year: {
          amount: f.income_per_year.value
        },
        month: {
          amountPerMonth: f.income_per_month.value,
          monthsPerYear: f.income_months_per_year.value
        },
        week: {
          amountPerWeek: f.income_per_week.value,
          weeksPerYear: f.income_weeks_per_year.value
        },
        hour: {
          amountPerHour: f.income_per_hour.value,
          hoursPerWeek: f.income_hours_per_week.value,
          weeksPerYear: f.income_hour_weeks_per_year.value
        }
      },

      workingTime: {
        isActivated: commonsModule.getSelectedValueOnRadioButton(f.radio_work_time),
        monthsPerYear: f.time_month_per_year.value,
        hoursPerWeek: f.time_hours_per_week.value
      },

      distance: {
        considerCarToJob: commonsModule.getSelectedValueOnRadioButton(f.drive_to_work), // binary variable: true or false
        carToJob: {
          daysPerWeek: f.drive_to_work_days_per_week.value,
          distanceBetweenHomeAndJob: f.dist_home_job.value,
          distanceDuringWeekends: f.journey_weekend.value
        },
        noCarToJob: {
          distancePerPeriod: f.km_per_month.value,
          period: commonsModule.getTimePeriod(f.period_km.value),
          distanceStandardUnit: f.distance_standard_ondistance.value
        }
      },

      timeSpentInDriving: {
        option1: {
          minutesBetweenHomeAndJob: f.time_home_job.value,
          minutesDuringWeekend: f.time_weekend.value
        },
        option2: {
          minutesPerDay: f.min_drive_per_day.value,
          daysPerMonth: f.days_drive_per_month.value
        }
      }
    }

    return data
  }

  // creates an Object from an entry of the database
  // to be passed into the calculator core function
  function createUserDataObjectFromDatabase (dbObject) {
    var data = {
      depreciation: {
        acquisitionMonth: dbObject.acquisition_month,
        acquisitionYear: dbObject.acquisition_year,
        acquisitionCost: dbObject.commercial_value_at_acquisition,
        presentValue: dbObject.commercial_value_at_now
      },

      insurance: {
        amountPerPeriod: dbObject.insurance_value,
        period: commonsModule.getTimePeriod(dbObject.insure_type)
      },

      credit: {
        creditBool: getBoleanFromDatabase(dbObject.credit), // binary variable: "true" or "false"
        yesCredit: {
          borrowedAmount: dbObject.credit_borrowed_amount,
          numberInstallments: dbObject.credit_number_installments,
          amountInstallment: dbObject.credit_amount_installment,
          residualValue: dbObject.credit_residual_value
        }
      },

      inspection: {
        averageInspectionCost: dbObject.inspection_average_inspection_cost,
        numberOfInspections: dbObject.inspection_number_inspections
      },

      roadTaxes: {
        amountPerYear: dbObject.vehicle_excise_tax
      },

      // Form Part 2
      fuel: {
        typeOfCalculation: getFuelTypeOfCalculationFromDatabase(dbObject.fuel_calculation), // "money" or "distance"
        currencyBased: {
          amountPerPeriod: dbObject.fuel_currency_based_currency_value,
          period: commonsModule.getTimePeriod(dbObject.fuel_currency_based_periodicity)
        },
        distanceBased: {
          considerCarToJob: getBoleanFromDatabase(dbObject.fuel_distance_based_car_to_work), // binary variable: true or false
          carToJob: {
            daysPerWeek: dbObject.fuel_distance_based_car_to_work_number_days_week,
            distanceBetweenHomeAndJob: dbObject.fuel_distance_based_car_to_work_distance_home_work,
            distanceDuringWeekends: dbObject.fuel_distance_based_car_to_work_distance_weekend
          },
          noCarToJob: {
            distancePerPeriod: dbObject.fuel_distance_based_no_car_to_work_distance,
            period: commonsModule.getTimePeriod(dbObject.fuel_distance_based_no_car_to_fuel_period_distance)
          },
          fuelEfficiency: dbObject.fuel_distance_based_fuel_efficiency,
          fuelPrice: dbObject.fuel_distance_based_fuel_price
        }
      },

      maintenance: {
        amountPerYear: dbObject.maintenance
      },

      repairsImprovements: {
        amountPerYear: dbObject.repairs
      },

      parking: {
        amountPerMonth: dbObject.parking
      },

      tolls: {
        calculationBasedOnDay: getBoleanFromDatabase(dbObject.tolls_daily), // true or false
        yesBasedOnDay: {
          amountPerDay: dbObject.tolls_daily_expense,
          daysPerMonth: dbObject.tolls_daily_number_days
        },
        noBasedOnDay: {
          amountPerPeriod: dbObject.tolls_no_daily_value,
          period: commonsModule.getTimePeriod(dbObject.tolls_no_daily_period)
        }
      },

      fines: {
        amountPerPeriod: dbObject.tickets_value,
        period: commonsModule.getTimePeriod(dbObject.tickets_periodicity)
      },

      washing: {
        amountPerPeriod: dbObject.washing_value,
        period: commonsModule.getTimePeriod(dbObject.washing_periodicity)
      },

      // Form Part 3
      publicTransports: {
        isOk: isPublicTransportsOkInDatabase(dbObject), // boolean
        numberOfPeopleInFamily: dbObject.household_number_people,
        monthlyPassCost: dbObject.public_transportation_month_expense
      },

      income: {
        isOk: isIncomeOkInDatabase(dbObject), // boolean whether this section was correctly filled in
        incomePeriod: dbObject.income_type, // "year", "month", "week" or "hour"
        year: {
          amount: dbObject.income_per_year
        },
        month: {
          amountPerMonth: dbObject.income_per_month,
          monthsPerYear: dbObject.income_months_per_year
        },
        week: {
          amountPerWeek: dbObject.income_per_week,
          weeksPerYear: dbObject.income_weeks_per_year
        },
        hour: {
          amountPerHour: dbObject.income_per_hour,
          hoursPerWeek: dbObject.income_hours_per_week,
          weeksPerYear: dbObject.income_hour_weeks_per_year
        }
      },

      workingTime: {
        isActivated: getBoleanFromDatabase(dbObject.work_time),
        monthsPerYear: dbObject.work_time_month_per_year,
        hoursPerWeek: dbObject.work_time_hours_per_week
      },

      distance: {
        considerCarToJob: getBoleanFromDatabase(dbObject.distance_drive_to_work), // true or false
        carToJob: {
          daysPerWeek: dbObject.distance_days_per_week,
          distanceBetweenHomeAndJob: dbObject.distance_home_job,
          distanceDuringWeekends: dbObject.distance_journey_weekend
        },
        noCarToJob: {
          distancePerPeriod: dbObject.distance_per_month,
          period: commonsModule.getTimePeriod(dbObject.distance_period)
        }
      },

      timeSpentInDriving: {
        option1: {
          minutesBetweenHomeAndJob: dbObject.time_spent_home_job,
          minutesDuringWeekend: dbObject.time_spent_weekend
        },
        option2: {
          minutesPerDay: dbObject.time_spent_min_drive_per_day,
          daysPerMonth: dbObject.time_spent_days_drive_per_month
        }
      }
    }

    return data
  }

  // Gets information from database whether database has or not Public Transport data
  function isPublicTransportsOkInDatabase (dbObject) {
    return (isDef(dbObject.household_number_people) && isDef(dbObject.public_transportation_month_expense))
  }

  // Gets information from database whether database has or not Financial Effort data
  function isIncomeOkInDatabase (dbObject) {
    switch (dbObject.income_type) {
      case 'year':
        return (isDef(dbObject.income_per_year))
      case 'month':
        return (isDef(dbObject.income_per_month) && isDef(dbObject.income_months_per_year))
      case 'week':
        return (isDef(dbObject.income_per_week) && isDef(dbObject.income_weeks_per_year))
      case 'hour':
        return (isDef(dbObject.income_per_hour) && isDef(dbObject.income_hours_per_week) &&
          isDef(dbObject.income_hour_weeks_per_year))
    }

    return false
  }

  function getFuelTypeOfCalculationFromDatabase (typeOfCalculation) {
    switch (typeOfCalculation) {
      case 'distance':
      case 'km': /* old version support */
        return 'distance'
      case 'money':
      case 'euros': /* old version support */
        return 'money'
      default:
        throw Error('Invalid typeOfCalculation: ' + typeOfCalculation)
    }
  }

  // in the database the booleans were initially stored as strings
  function getBoleanFromDatabase (bool) {
    if (bool === 'true') {
      return true
    } else if (bool === 'false') {
      return false
    } else {
      return undefined
    }
  }

  // detects if a variable is defined and different from zero
  function isDef (num) {
    return isFinite(num) && num !== 0
  }

  /* === Public methods to be returned === */

  // own module, since it may have been defined erlier by children modules
  thisModule.initialize = initialize
  thisModule.createUserDataObjectFromForm = createUserDataObjectFromForm
  thisModule.createUserDataObjectFromDatabase = createUserDataObjectFromDatabase

  return thisModule
})(autocosts.transferDataModule || {})

// check for node
if (typeof window === 'undefined') {
  module.exports = autocosts.transferDataModule
}
