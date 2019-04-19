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

autocosts.convertDataModule = (function (thisModule) {
  var commonsModule

  // object with country code, currency, standard distance, etc.
  var countryInfo

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

  // public function
  function createUserDataCleanObjectFromForm (userForm) {
    var userCleanForm = createUserDataObjectFromForm(userForm)
    // converts properties from string to number when applicale
    sanitizeObject(userCleanForm)
    return userCleanForm
  }

  // creates an Object from an entry of the database
  // to be passed into the calculator core function
  // countryObj has country standards (currency, distance standard, etc.)
  function createUserDataObjectFromDatabase (dbObject, countryInfoLoc) {
    if (!countryInfoLoc) {
      throw Error('countryInfo has no information')
    } else {
      countryInfo = countryInfoLoc
    }

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
            period: commonsModule.getTimePeriod(dbObject.fuel_distance_based_no_car_to_fuel_period_distance),
            distanceStandardUnit: distanceStandardUnitFromDatabase(dbObject.fuel_distance_based_no_car_to_distance_standard_unit)
          },
          fuelEfficiency: dbObject.fuel_distance_based_fuel_efficiency,
          fuelEfficiencyStandard: fuelEfficiencyStandardFromDatabase(dbObject.fuel_distance_based_fuel_efficiency_standard),
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
          period: commonsModule.getTimePeriod(dbObject.distance_period),
          distanceStandardUnit: distanceStandardUnitFromDatabase(dbObject.distance_distance_standard_unit)
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

    // converts properties from string to number when applicale
    sanitizeObject(data)

    return data
  }

  function createDatabaseObjectFromForm (DOMform) {
    var databaseObj = {}

    var form = createUserDataObjectFromForm(DOMform)

    // depreciation
    databaseObj.acquisition_month = form.depreciation.acquisitionMonth
    databaseObj.acquisition_year = form.depreciation.acquisitionYear
    databaseObj.commercial_value_at_acquisition = form.depreciation.acquisitionCost
    databaseObj.commercial_value_at_now = form.depreciation.presentValue

    // insurance
    databaseObj.insure_type = form.insurance.period
    databaseObj.insurance_value = form.insurance.amountPerPeriod

    // credit
    databaseObj.credit = form.credit.creditBool
    databaseObj.credit_borrowed_amount = form.credit.yesCredit.borrowedAmount
    databaseObj.credit_number_installments = form.credit.yesCredit.numberInstallments
    databaseObj.credit_amount_installment = form.credit.yesCredit.amountInstallment
    databaseObj.credit_residual_value = form.credit.yesCredit.residualValue

    // inspection
    databaseObj.inspection_number_inspections = form.inspection.numberOfInspections
    databaseObj.inspection_average_inspection_cost = form.inspection.averageInspectionCost

    // road taxes
    databaseObj.vehicle_excise_tax = form.roadTaxes.amountPerYear

    // fuel
    databaseObj.fuel_calculation = form.fuel.typeOfCalculation
    databaseObj.fuel_currency_based_currency_value = form.fuel.currencyBased.amountPerPeriod
    databaseObj.fuel_currency_based_periodicity = form.fuel.currencyBased.period
    databaseObj.fuel_distance_based_car_to_work = form.fuel.distanceBased.considerCarToJob
    databaseObj.fuel_distance_based_car_to_work_number_days_week = form.fuel.distanceBased.carToJob.daysPerWeek
    databaseObj.fuel_distance_based_car_to_work_distance_home_work = form.fuel.distanceBased.carToJob.distanceBetweenHomeAndJob
    databaseObj.fuel_distance_based_car_to_work_distance_weekend = form.fuel.distanceBased.carToJob.distanceDuringWeekends
    databaseObj.fuel_distance_based_no_car_to_work_distance = form.fuel.distanceBased.noCarToJob.distancePerPeriod
    databaseObj.fuel_distance_based_no_car_to_fuel_period_distance = form.fuel.distanceBased.noCarToJob.period
    databaseObj.fuel_distance_based_no_car_to_distance_standard_unit = form.fuel.distanceBased.noCarToJob.distanceStandardUnit
    databaseObj.fuel_distance_based_fuel_efficiency = form.fuel.distanceBased.fuelEfficiency
    databaseObj.fuel_distance_based_fuel_efficiency_standard = form.fuel.distanceBased.fuelEfficiencyStandard
    databaseObj.fuel_distance_based_fuel_price = form.fuel.distanceBased.fuelPrice

    // maintenance
    databaseObj.maintenance = form.maintenance.amountPerYear

    // repairs and improvements
    databaseObj.repairs = form.repairsImprovements.amountPerYear

    // parking
    databaseObj.parking = form.parking.amountPerMonth

    // tolls
    databaseObj.tolls_daily = form.tolls.calculationBasedOnDay
    databaseObj.tolls_no_daily_value = form.tolls.noBasedOnDay.amountPerPeriod
    databaseObj.tolls_no_daily_period = form.tolls.noBasedOnDay.period
    databaseObj.tolls_daily_expense = form.tolls.yesBasedOnDay.amountPerDay
    databaseObj.tolls_daily_number_days = form.tolls.yesBasedOnDay.daysPerMonth

    // fines
    databaseObj.tickets_value = form.fines.amountPerPeriod
    databaseObj.tickets_periodicity = form.fines.period

    // washing
    databaseObj.washing_value = form.washing.amountPerPeriod
    databaseObj.washing_periodicity = form.washing.period

    // public transports
    databaseObj.household_number_people = form.publicTransports.numberOfPeopleInFamily
    databaseObj.public_transportation_month_expense = form.publicTransports.monthlyPassCost

    // income
    databaseObj.income_type = form.income.incomePeriod
    databaseObj.income_per_year = form.income.year.amount
    databaseObj.income_per_month = form.income.month.amountPerMonth
    databaseObj.income_months_per_year = form.income.month.monthsPerYear
    databaseObj.income_per_week = form.income.week.amountPerWeek
    databaseObj.income_weeks_per_year = form.income.week.weeksPerYear
    databaseObj.income_per_hour = form.income.hour.amountPerHour
    databaseObj.income_hours_per_week = form.income.hour.hoursPerWeek
    databaseObj.income_hour_weeks_per_year = form.income.hour.weeksPerYear

    // working time
    databaseObj.work_time = form.workingTime.isActivated
    databaseObj.work_time_month_per_year = form.workingTime.monthsPerYear
    databaseObj.work_time_hours_per_week = form.workingTime.hoursPerWeek

    // distance
    databaseObj.distance_drive_to_work = form.distance.considerCarToJob
    databaseObj.distance_days_per_week = form.distance.carToJob.daysPerWeek
    databaseObj.distance_home_job = form.distance.carToJob.distanceBetweenHomeAndJob
    databaseObj.distance_journey_weekend = form.distance.carToJob.distanceDuringWeekends
    databaseObj.distance_per_month = form.distance.noCarToJob.distancePerPeriod
    databaseObj.distance_period = form.distance.noCarToJob.period
    databaseObj.distance_distance_standard_unit = form.distance.noCarToJob.distanceStandardUnit

    // time spent in driving
    databaseObj.time_spent_home_job = form.timeSpentInDriving.option1.minutesBetweenHomeAndJob
    databaseObj.time_spent_weekend = form.timeSpentInDriving.option1.minutesDuringWeekend
    databaseObj.time_spent_min_drive_per_day = form.timeSpentInDriving.option2.minutesPerDay
    databaseObj.time_spent_days_drive_per_month = form.timeSpentInDriving.option2.daysPerMonth

    // *************
    // sanity checks

    // converts all true to 'true' and false to 'false' to store in database,
    // because those fields are strings in dabase (it was created like that initially)
    for (var key in databaseObj) {
      if (typeof databaseObj[key] === 'boolean') {
        databaseObj[key] = JSON.stringify(databaseObj[key])
      }
    }

    if (databaseObj.credit === 'false' || !databaseObj.credit) {
      databaseObj.credit_borrowed_amount = null
      databaseObj.credit_number_installments = null
      databaseObj.credit_amount_installment = null
      databaseObj.credit_residual_value = null
    }

    if (databaseObj.fuel_calculation === 'currency' || databaseObj.fuel_calculation === 'euros') {
      databaseObj.fuel_distance_based_car_to_work = null
      databaseObj.fuel_distance_based_car_to_work_number_days_week = null
      databaseObj.fuel_distance_based_car_to_work_distance_home_work = null
      databaseObj.fuel_distance_based_car_to_work_distance_weekend = null
      databaseObj.fuel_distance_based_no_car_to_work_distance = null
      databaseObj.fuel_distance_based_no_car_to_fuel_period_distance = null
      databaseObj.fuel_distance_based_no_car_to_distance_standard_unit = null
      databaseObj.fuel_distance_based_fuel_efficiency = null
      databaseObj.fuel_distance_based_fuel_efficiency_standard = null
      databaseObj.fuel_distance_based_fuel_price = null
    } else {
      databaseObj.fuel_currency_based_currency_value = null
      databaseObj.fuel_currency_based_periodicity = null
      if (databaseObj.fuel_distance_based_car_to_work === 'true') {
        databaseObj.fuel_distance_based_no_car_to_work_distance = null
        databaseObj.fuel_distance_based_no_car_to_fuel_period_distance = null
      } else {
        databaseObj.fuel_distance_based_car_to_work_number_days_week = null
        databaseObj.fuel_distance_based_car_to_work_distance_home_work = null
        databaseObj.fuel_distance_based_car_to_work_distance_weekend = null
      }
    }

    if (databaseObj.tolls_daily === 'true') {
      databaseObj.tolls_no_daily_value = null
      databaseObj.tolls_no_daily_period = null
    } else {
      databaseObj.tolls_daily_expense = null
      databaseObj.tolls_daily_number_days = null
    }

    return databaseObj
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

  // when the database has not standard distance, get the standard one
  // for respective country. Used for backward compatibility
  function distanceStandardUnitFromDatabase (distanceStandardUnit) {
    if (distanceStandardUnit) {
      return distanceStandardUnit
    } else {
      return commonsModule.getStandard('distance', countryInfo)
    }
  }

  // when the database has not standard fuel efficiency, get the standard one
  // for respective country. Used for backward compatibility
  function fuelEfficiencyStandardFromDatabase (distanceStandardUnit) {
    if (distanceStandardUnit) {
      return distanceStandardUnit
    } else {
      return commonsModule.getStandard('fuelEfficiency', countryInfo)
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

  // recursively loops through nested object and applys parse function
  function parseObjectProperties (obj, parse) {
    for (var k in obj) {
      if (typeof obj[k] === 'object' && obj[k] !== null) {
        parseObjectProperties(obj[k], parse)
      } else if (obj.hasOwnProperty(k)) {
        parse(obj, k)
      }
    }
  }

  // converts properties from string to number when applicale
  function sanitizeObject (mainObj) {
    parseObjectProperties(mainObj, function (obj, k) {
      obj[k] = (!isNaN(obj[k]) && typeof obj[k] === 'string') ? parseFloat(obj[k]) : obj[k]
    })
  }

  // detects if a variable is defined and different from zero
  function isDef (num) {
    return isFinite(num) && num !== 0
  }

  /* === Public methods to be returned === */

  // own module, since it may have been defined erlier by children modules
  thisModule.initialize = initialize
  thisModule.createUserDataCleanObjectFromForm = createUserDataCleanObjectFromForm
  thisModule.createUserDataObjectFromDatabase = createUserDataObjectFromDatabase
  thisModule.createDatabaseObjectFromForm = createDatabaseObjectFromForm

  return thisModule
})(autocosts.convertDataModule || {})

// check for node
if (typeof window === 'undefined') {
  module.exports = autocosts.convertDataModule
}
