/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/* DATABASE MODULE */
/* Module with functions that are used to insert form user data into a database */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules */

/* global autocosts, $ */

autocosts.databaseModule = (function (thisModule, DOMform, serverInfo, userInfo) {
  var transferDataModule

  function initialize () {
    loadModuleDependencies()
  }

  function loadModuleDependencies () {
    transferDataModule = autocosts.transferDataModule
  }

  // function that is run when the user clicks the Run/Calculate button
  // and which submits the inserted data into the Database
  function submitResultsToDatabase () {
    var databaseObj = createObjToDB()
    databaseObj = sanityChecks(databaseObj)

    // get current time to know how much time the user took to fill the form
    databaseObj.time_to_fill_form = userInfo.timeCounter.getCurrentTimeInSeconds()

    // get a user unique generated ID
    databaseObj.client_uuid = userInfo.uniqueUserId

    databaseObj.country = serverInfo.selectedCountry // Country is a global variable

    autocosts.main.databaseObj = databaseObj
    submitDataToDB(databaseObj)
  }

  function createObjToDB () {
    var databaseObj = {}

    var form = transferDataModule.createUserDataObjectFromForm(DOMform)

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
    databaseObj.fuel_distance_based_fuel_efficiency = form.fuel.distanceBased.fuelEfficiency
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

    // time spent in driving
    databaseObj.time_spent_home_job = form.timeSpentInDriving.option1.minutesBetweenHomeAndJob
    databaseObj.time_spent_weekend = form.timeSpentInDriving.option1.minutesDuringWeekend
    databaseObj.time_spent_min_drive_per_day = form.timeSpentInDriving.option2.minutesPerDay
    databaseObj.time_spent_days_drive_per_month = form.timeSpentInDriving.option2.daysPerMonth

    return databaseObj
  }

  // function that is run by the previous submit_data function
  function sanityChecks (databaseObj) {
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
      databaseObj.fuel_distance_based_fuel_efficiency = null
      databaseObj.fuel_distance_based_fuel_price = null
      databaseObj.fuel_distance_based_car_to_work = null
      databaseObj.fuel_distance_based_car_to_work_number_days_week = null
      databaseObj.fuel_distance_based_car_to_work_distance_home_work = null
      databaseObj.fuel_distance_based_car_to_work_distance_weekend = null
      databaseObj.fuel_distance_based_no_car_to_work_distance = null
      databaseObj.fuel_distance_based_no_car_to_fuel_period_distance = null
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
        console.error('There was an error submitting the values into the database', error)
      }
    })
  }

  /* === Public methods to be returned === */

  // thisModule, since this is a parent module and it may have been defined erlier by a children module
  thisModule.initialize = initialize
  thisModule.submitResultsToDatabase = submitResultsToDatabase

  return thisModule
})(autocosts.databaseModule || {},
  document.costs_form,
  autocosts.serverInfo,
  autocosts.userInfo)
