/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

// TRANSFER DATA MODULE
// from user form or database to calculator core function
// see our module template: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#modules
// This file is used both by the browser and by node/commonsJS, the latter being called by getAvgFromDB.js

/* eslint prefer-const: "off" */
/* eslint no-var: "off" */

// check for node
if (!autocosts && typeof window === 'undefined') { // eslint-disable-line
  var autocosts = {}
}

autocosts.convertDataModule = (function (thisModule) {
  var commonsModule

  var consoleError

  function initialize () {
    loadModuleDependencies()
    if (typeof window === 'undefined') { // nodeJS
      consoleError = require('debug')('convertData')
    } else { // browser
      consoleError = console.error
    }
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
    var f = userForm.elements // main user form document variable

    // see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#userdata-class
    var userData = {
      countryCode: commonsModule.getCountryCode(),
      currency: commonsModule.getCurrency(),

      depreciation: {
        dateOfAcquisition: {
          month: f.acquisitionMonth.value,
          year: f.acquisitionYear.value,
          valueOfTheVehicle: f.commercialValueAtAcquisition.value
        },
        dateOfUserInput: {
          month: (new Date()).getMonth() + 1, // current month (from today 1-12)
          year: (new Date()).getFullYear(), // current year (today)
          valueOfTheVehicle: f.commercialValueAtNow.value
        }
      },

      insurance: {
        amountPerPeriod: f.insuranceValue.value,
        period: getTimePeriod(getSelectedValueOnFormRadioButton(f.insurancePaymentPeriod))
      },

      credit: {
        creditBool: getSelectedValueOnFormRadioButton(f.AutoCreditRadioBtn),
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
        typeOfCalculation: getSelectedValueOnFormRadioButton(f.radio_fuel_euros), // type string: "money" or "distance"
        currencyBased: {
          amountPerPeriod: f.fuel_currency_value.value,
          period: getTimePeriod(f.fuel_currency_time_period.value) // type string: "month", "twoMonths",  "trimester", "semester", "year"
        },
        distanceBased: {
          considerCarToJob: getSelectedValueOnFormRadioButton(f.car_job_form2), // boolean
          carToJob: {
            daysPerWeek: f.car_to_work_number_days_week.value,
            distanceBetweenHomeAndJob: f.car_to_work_distance_home_work.value,
            distanceDuringWeekends: f.car_to_work_distance_weekend.value,
            distanceStandardUnit: commonsModule.getStandard('distance') // standard distance for current country: "km", "mil" or "mil(10km)"
          },
          noCarToJob: {
            distancePerPeriod: f.no_car_to_work_distance.value,
            period: getTimePeriod(f.no_car_to_work_time_period.value), // type string: "month", "twoMonths",  "trimester", "semester", "year"
            distanceStandardUnit: f.distance_standard_onfuel.value // type string: "km", "mil" or "mil(10km)"
          },
          fuelEfficiency: f.fuel_efficiency.value, // fuel efficiency of the vehicle
          fuelEfficiencyStandard: f.fuel_efficiency_standard_onfuel.value, // type string; "ltr/100km", "mpg(US)", etc.
          fuelPrice: f.fuel_price.value, // type number; currency per unit of volume standard. Ex: 1.4, that is 1.4 EUR / ltr
          fuelPriceVolumeStandard: commonsModule.getStandard('fuelPriceVolume') // type string: 'ltr', 'gal(UK)', 'gal(US)'
        }
      },

      maintenance: {
        amountPerYear: f.maintenance.value
      },

      repairsImprovements: {
        amountPerYear: f.repairsImprovements.value
      },

      parking: {
        amountPerMonth: f.parking.value
      },

      tolls: {
        calculationBasedOnDay: getSelectedValueOnFormRadioButton(f.tolls_daily_radioBtn), // true or false
        yesBasedOnDay: {
          amountPerDay: f.daily_expense_tolls.value,
          daysPerMonth: f.number_days_tolls.value
        },
        noBasedOnDay: {
          amountPerPeriod: f.no_daily_tolls_value.value,
          period: getTimePeriod(f.tolls_period_select.value) // type string: "month", "twoMonths",  "trimester", "semester", "year"
        }
      },

      fines: {
        amountPerPeriod: f.tickets_value.value,
        period: getTimePeriod(f.tickets_period_select.value) // type string: "month", "twoMonths",  "trimester", "semester", "year"
      },

      washing: {
        amountPerPeriod: f.washing_value.value,
        period: getTimePeriod(f.washing_period_select.value) // type string: "month", "twoMonths",  "trimester", "semester", "year"
      },

      // Form Part 3
      publicTransports: {
        numberOfPeopleInFamily: f.household_number_people.value,
        monthlyPassCost: f.public_transportation_month_expense.value,
        taxi: {
          costPerUnitDistance: autocosts.serverInfo.translatedStrings.taxi_price_per_dist, // type number, ex: 0.5, that is [currency]/km
          distanceStandardUnit: commonsModule.getStandard('distance') // type string: "km", "mi", "mil(10km)"
        }
      },

      income: {
        incomePeriod: getSelectedValueOnFormRadioButton(f.radio_income), // type string: "month", "twoMonths",  "trimester", "semester", "year"
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
        isActivated: getSelectedValueOnFormRadioButton(f.radio_work_time),
        monthsPerYear: f.time_month_per_year.value,
        hoursPerWeek: f.time_hours_per_week.value
      },

      distance: {
        considerCarToJob: getSelectedValueOnFormRadioButton(f.drive_to_work), // type boolean
        carToJob: {
          daysPerWeek: f.drive_to_work_days_per_week.value,
          distanceBetweenHomeAndJob: f.dist_home_job.value,
          distanceDuringWeekends: f.journey_weekend.value,
          distanceStandardUnit: commonsModule.getStandard('distance')
        },
        noCarToJob: {
          distancePerPeriod: f.km_per_month.value,
          period: getTimePeriod(f.period_km.value), // type string: "month", "twoMonths",  "trimester", "semester", "year"
          distanceStandardUnit: f.distance_standard_ondistance.value
        }
      },

      timeSpentInDriving: {
        carToJob: {
          minutesBetweenHomeAndJob: f.time_home_job.value,
          minutesDuringWeekend: f.time_weekend.value
        },
        noCarToJob: {
          minutesPerDay: f.min_drive_per_day.value,
          daysPerMonth: f.days_drive_per_month.value
        }
      }
    }

    // converts properties from string to number or boolean when applicale
    convertTypeofUserDataObject(userData)

    autocosts.main.formData = userData
    return userData
  }

  // creates an Object from an entry of the database
  // to be passed into the calculator core function
  // countryObj has country standards (currency, distance standard, etc.)
  function createUserDataObjectFromDatabase (dbObject, countryInfo) {
    if (!countryInfo) {
      throw Error('countryInfo has no information')
    }

    // see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#userdata-class
    var userData = {
      countryCode: dbObject.country,
      currency: countryInfo.currency,

      depreciation: {
        dateOfAcquisition: {
          month: dbObject.acquisition_month,
          year: dbObject.acquisition_year,
          valueOfTheVehicle: dbObject.commercial_value_at_acquisition
        },
        dateOfUserInput: {
          month: (new Date(dbObject.insertion_date)).getMonth() + 1, // month when the user made calculation (from today 1-12)
          year: (new Date(dbObject.insertion_date)).getFullYear(), // year when the user made calculation
          valueOfTheVehicle: dbObject.commercial_value_at_now
        }
      },

      insurance: {
        amountPerPeriod: dbObject.insurance_value,
        period: getTimePeriod(dbObject.insure_type)
      },

      credit: {
        creditBool: dbObject.credit,
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
          period: getTimePeriod(dbObject.fuel_currency_based_periodicity)
        },
        distanceBased: {
          considerCarToJob: dbObject.fuel_distance_based_car_to_work,
          carToJob: {
            daysPerWeek: dbObject.fuel_distance_based_car_to_work_number_days_week,
            distanceBetweenHomeAndJob: dbObject.fuel_distance_based_car_to_work_distance_home_work,
            distanceDuringWeekends: dbObject.fuel_distance_based_car_to_work_distance_weekend,
            distanceStandardUnit: commonsModule.getStandard('distance',
              {
                standard: dbObject.fuel_distance_based_car_to_distance_standard_unit,
                countryInfo: countryInfo
              })
          },
          noCarToJob: {
            distancePerPeriod: dbObject.fuel_distance_based_no_car_to_work_distance,
            period: getTimePeriod(dbObject.fuel_distance_based_no_car_to_fuel_period_distance),
            distanceStandardUnit: commonsModule.getStandard('distance',
              {
                standard: dbObject.fuel_distance_based_no_car_to_distance_standard_unit,
                countryInfo: countryInfo
              })
          },
          fuelEfficiency: dbObject.fuel_distance_based_fuel_efficiency,
          fuelEfficiencyStandard: commonsModule.getStandard('fuelEfficiency',
            {
              standard: dbObject.fuel_distance_based_fuel_efficiency_standard,
              countryInfo: countryInfo
            }),
          fuelPrice: dbObject.fuel_distance_based_fuel_price,
          fuelPriceVolumeStandard: commonsModule.getStandard('fuelPriceVolume',
            {
              standard: dbObject.fuel_distance_based_fuel_price_volume_standard,
              countryInfo: countryInfo
            })
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
        calculationBasedOnDay: dbObject.tolls_daily, // true or false
        yesBasedOnDay: {
          amountPerDay: dbObject.tolls_daily_expense,
          daysPerMonth: dbObject.tolls_daily_number_days
        },
        noBasedOnDay: {
          amountPerPeriod: dbObject.tolls_no_daily_value,
          period: getTimePeriod(dbObject.tolls_no_daily_period)
        }
      },

      fines: {
        amountPerPeriod: dbObject.tickets_value,
        period: getTimePeriod(dbObject.tickets_periodicity)
      },

      washing: {
        amountPerPeriod: dbObject.washing_value,
        period: getTimePeriod(dbObject.washing_periodicity)
      },

      // Form Part 3
      publicTransports: {
        numberOfPeopleInFamily: dbObject.household_number_people,
        monthlyPassCost: dbObject.public_transportation_month_expense,
        taxi: {
          costPerUnitDistance: undefined, // no needed when obtained from database
          distanceStandardUnit: undefined // no needed when obtained from database
        }
      },

      income: {
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
        isActivated: dbObject.work_time,
        monthsPerYear: dbObject.work_time_month_per_year,
        hoursPerWeek: dbObject.work_time_hours_per_week
      },

      distance: {
        considerCarToJob: dbObject.distance_drive_to_work, // true or false
        carToJob: {
          daysPerWeek: dbObject.distance_days_per_week,
          distanceBetweenHomeAndJob: dbObject.distance_home_job,
          distanceDuringWeekends: dbObject.distance_journey_weekend,
          distanceStandardUnit: commonsModule.getStandard('distance',
            {
              standard: dbObject.distance_cartojob_standard_unit,
              countryInfo: countryInfo
            })
        },
        noCarToJob: {
          distancePerPeriod: dbObject.distance_per_month,
          period: getTimePeriod(dbObject.distance_period),
          distanceStandardUnit: commonsModule.getStandard('distance',
            {
              standard: dbObject.distance_nocartojob_standard_unit,
              countryInfo: countryInfo
            })
        }
      },

      timeSpentInDriving: {
        carToJob: {
          minutesBetweenHomeAndJob: dbObject.time_spent_home_job,
          minutesDuringWeekend: dbObject.time_spent_weekend
        },
        noCarToJob: {
          minutesPerDay: dbObject.time_spent_min_drive_per_day,
          daysPerMonth: dbObject.time_spent_days_drive_per_month
        }
      }
    }

    // converts properties from string to number or boolean when applicale
    convertTypeofUserDataObject(userData)

    return userData
  }

  // to be used by test script test/validateClient.js, particularly by JSDOM object
  // to populate the web form (in jsdom) with user input data got from DB or a file
  function createFormObjectFromDatabase (dbObject, countryInfo) {
    var userData = createUserDataObjectFromDatabase(dbObject, countryInfo)
    var f = {}

    // Form Part 1
    // depreciation
    f.acquisitionMonth = userData.depreciation.dateOfAcquisition.month
    f.acquisitionYear = userData.depreciation.dateOfAcquisition.year
    f.commercialValueAtAcquisition = userData.depreciation.dateOfAcquisition.valueOfTheVehicle
    f.commercialValueAtNow = userData.depreciation.dateOfUserInput.valueOfTheVehicle

    // insurance
    f.insuranceValue = userData.insurance.period
    f.insurancePaymentPeriod = userData.insurance.amountPerPeriod

    // credit
    f.AutoCreditRadioBtn = userData.credit.creditBool
    f.borrowedAmount = userData.credit.yesCredit.borrowedAmount
    f.numberInstallments = userData.credit.yesCredit.numberInstallments
    f.amountInstallment = userData.credit.yesCredit.amountInstallment
    f.residualValue = userData.credit.yesCredit.residualValue

    // inspection
    f.averageInspectionCost = userData.inspection.numberOfInspections
    f.numberInspections = userData.inspection.averageInspectionCost

    // roadTaxes
    f.roadTaxes = userData.roadTaxes.amountPerYear

    // Form Part 2
    // fuel
    f.radio_fuel_euros = userData.fuel.typeOfCalculation
    f.fuel_currency_value = userData.fuel.currencyBased.amountPerPeriod
    f.fuel_currency_time_period = userData.fuel.currencyBased.period
    f.car_job_form2 = userData.fuel.distanceBased.considerCarToJob
    f.car_to_work_number_days_week = userData.fuel.distanceBased.carToJob.daysPerWeek
    f.car_to_work_distance_home_work = userData.fuel.distanceBased.carToJob.distanceBetweenHomeAndJob
    f.car_to_work_distance_weekend = userData.fuel.distanceBased.carToJob.distanceDuringWeekends
    f.no_car_to_work_distance = userData.fuel.distanceBased.noCarToJob.distancePerPeriod
    f.no_car_to_work_time_period = userData.fuel.distanceBased.noCarToJob.period
    f.distance_standard_onfuel = userData.fuel.distanceBased.noCarToJob.distanceStandardUnit
    f.fuel_efficiency = userData.fuel.distanceBased.fuelEfficiency
    f.fuel_efficiency_standard_onfuel = userData.fuel.distanceBased.fuelEfficiencyStandard
    f.fuel_price = userData.fuel.distanceBased.fuelPrice

    // maintenance
    f.maintenance = userData.maintenance.amountPerYear

    // repairsImprovements
    f.repairsImprovements = userData.repairsImprovements.amountPerYear

    // parking
    f.parking = userData.parking.amountPerMonth

    // tolls
    f.tolls_daily_radioBtn = userData.tolls.calculationBasedOnDay
    f.daily_expense_tolls = userData.tolls.noBasedOnDay.amountPerPeriod
    f.number_days_tolls = userData.tolls.noBasedOnDay.period
    f.no_daily_tolls_value = userData.tolls.yesBasedOnDay.amountPerDay
    f.tolls_period_select = userData.tolls.yesBasedOnDay.daysPerMonth

    // fines
    f.tickets_value = userData.fines.amountPerPeriod
    f.tickets_period_select = userData.fines.period

    // washing
    f.washing_value = userData.washing.amountPerPeriod
    f.washing_period_select = userData.washing.period

    // Form Part 3
    // publicTransports
    f.household_number_people = userData.publicTransports.numberOfPeopleInFamily
    f.public_transportation_month_expense = userData.publicTransports.monthlyPassCost

    // income
    f.radio_income = userData.income.incomePeriod
    f.income_per_year = userData.income.year.amount
    f.income_per_month = userData.income.month.amountPerMonth
    f.income_months_per_year = userData.income.month.monthsPerYear
    f.income_per_week = userData.income.week.amountPerWeek
    f.income_weeks_per_year = userData.income.week.weeksPerYear
    f.income_per_hour = userData.income.hour.amountPerHour
    f.income_hours_per_week = userData.income.hour.hoursPerWeek
    f.income_hour_weeks_per_year = userData.income.hour.weeksPerYear

    // workingTime
    f.radio_work_time = userData.workingTime.isActivated
    f.time_month_per_year = userData.workingTime.monthsPerYear
    f.time_hours_per_week = userData.workingTime.hoursPerWeek

    // distance
    f.drive_to_work = userData.distance.considerCarToJob
    f.drive_to_work_days_per_week = userData.distance.carToJob.daysPerWeek
    f.dist_home_job = userData.distance.carToJob.distanceBetweenHomeAndJob
    f.journey_weekend = userData.distance.carToJob.distanceDuringWeekends
    f.km_per_month = userData.distance.noCarToJob.distancePerPeriod
    f.period_km = userData.distance.noCarToJob.period
    f.distance_standard_ondistance = userData.distance.noCarToJob.distanceStandardUnit

    // timeSpentInDriving:
    f.time_home_job = userData.timeSpentInDriving.carToJob.minutesBetweenHomeAndJob
    f.time_weekend = userData.timeSpentInDriving.carToJob.minutesDuringWeekend
    f.min_drive_per_day = userData.timeSpentInDriving.noCarToJob.minutesPerDay
    f.days_drive_per_month = userData.timeSpentInDriving.noCarToJob.daysPerMonth

    return f
  }

  function createDatabaseObjectFromForm (DOMform) {
    var databaseObj = {}

    var form = createUserDataObjectFromForm(DOMform)

    // Do not add or remove fields in databaseObj unless you change the fields in the database.
    // The fields on both must map with each other exactly!

    // get current time to know how much time the user took to fill the form
    databaseObj.time_to_fill_form = autocosts.userInfo.timeCounter.getCurrentTimeInSeconds()
    databaseObj.uuid_client = autocosts.userInfo.uniqueUserId // get a user unique generated ID
    databaseObj.country = commonsModule.getCountryCode()
    // current date equivalent to mySql NOW() function
    databaseObj.insertion_date = new Date().toISOString().slice(0, 19).replace('T', ' ')

    // depreciation
    databaseObj.acquisition_month = form.depreciation.dateOfAcquisition.month
    databaseObj.acquisition_year = form.depreciation.dateOfAcquisition.year
    databaseObj.commercial_value_at_acquisition = form.depreciation.dateOfAcquisition.valueOfTheVehicle
    databaseObj.commercial_value_at_now = form.depreciation.dateOfUserInput.valueOfTheVehicle

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
    databaseObj.time_spent_home_job = form.timeSpentInDriving.carToJob.minutesBetweenHomeAndJob
    databaseObj.time_spent_weekend = form.timeSpentInDriving.carToJob.minutesDuringWeekend
    databaseObj.time_spent_min_drive_per_day = form.timeSpentInDriving.noCarToJob.minutesPerDay
    databaseObj.time_spent_days_drive_per_month = form.timeSpentInDriving.noCarToJob.daysPerMonth

    // converts all true to 'true' and false to 'false' to store in database,
    // because database fields are strings (it was created like that initially)
    for (var key in databaseObj) {
      if (typeof databaseObj[key] === 'boolean' || typeof databaseObj[key] === 'number') {
        databaseObj[key] = JSON.stringify(databaseObj[key])
      } else if (!databaseObj[key]) {
        databaseObj[key] = ''
      }
    }

    autocosts.main.databaseObj = databaseObj
    return databaseObj
  }

  // converts properties of Object from string to number or to boolean when applicable
  // html form and database store numbers and booleans as strings
  function convertTypeofUserDataObject (userData) {
    // applies callback function to every property of object
    parseObjectProperties(userData, function (obj, k) {
      if (typeof obj[k] === 'string') {
        if (!isNaN(obj[k]) && obj[k] !== '') {
          obj[k] = parseFloat(obj[k])
        } else if (obj[k] === 'true' || obj[k] === 'false') {
          obj[k] = JSON.parse(obj[k]) // convert to boolean
        } else if (obj[k] === '') {
          obj[k] = undefined
        }
      }
    })

    // recursively loops through nested object and applys parse function
    function parseObjectProperties (obj, parse) {
      for (var k in obj) {
        if (typeof obj[k] === 'object' && obj[k] !== null) {
          parseObjectProperties(obj[k], parse)
        } else if (obj.hasOwnProperty(k)) { // eslint-disable-line no-prototype-builtins
          parse(obj, k)
        }
      }
    }
  }

  // get selected option from radio/select buttons on the HTML form
  function getSelectedValueOnFormRadioButton (radioObj) {
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

  // this function allows broader defintion inputs from user form and
  // backward compatibility from user old inputs on database for time periods
  // for example if timePeriod is either 'month', 1, '1', 'monthly', 'mensal' or 'mês' => 'month'
  function getTimePeriod (timePeriod) {
    var timePeriodsObj = {
      hour: ['hourly'],
      week: ['weekly'],
      month: [1, 'monthly', 'mensal', 'mês'],
      twoMonths: [2, 'two_months', 'two months', '2 months', 'bimestral', 'bimestre'],
      trimester: [3, 'trimesterly', 'quarterly', 'trimestral'],
      semester: [4, 'semesterly', 'semestral', 'half&#8209;yearly', 'halfyearly'],
      year: [5, 'yearly', 'anual', 'ano']
    }

    var val = !isNaN(timePeriod) ? parseInt(timePeriod, 10) : timePeriod
    for (var key in timePeriodsObj) {
      if (key === val || timePeriodsObj[key].indexOf(val) !== -1) {
        return key
      }
    }

    return null
  }

  // backward compatibility from database
  function getFuelTypeOfCalculationFromDatabase (typeOfCalculation) {
    switch (typeOfCalculation) {
      case 'distance':
      case 'km': /* old version support */
        return 'distance'
      case 'money':
      case 'currency': /* old version support */
      case 'euros': /* old version support */
        return 'money'
      default:
        consoleError('Invalid typeOfCalculation: ' + typeOfCalculation)
        return null
    }
  }

  /* === Public methods to be returned === */

  // own module, since it may have been defined erlier by children modules
  thisModule.initialize = initialize
  thisModule.createUserDataObjectFromForm = createUserDataObjectFromForm
  thisModule.createUserDataObjectFromDatabase = createUserDataObjectFromDatabase
  thisModule.createFormObjectFromDatabase = createFormObjectFromDatabase
  thisModule.createDatabaseObjectFromForm = createDatabaseObjectFromForm

  return thisModule
})(autocosts.convertDataModule || {})

// check for node
if (typeof window === 'undefined') {
  module.exports = autocosts.convertDataModule
}
