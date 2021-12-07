/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/
/* File with Javascript functions that check weather the form parts are correctly inserted */

// VALIDATE DATA MODULE
// see our module template: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#modules

/* eslint prefer-const: "off" */
/* eslint no-var: "off" */

// check for node
if (!autocosts && typeof window === 'undefined') { // eslint-disable-line
  var autocosts = {}
}

autocosts.validateDataModule = (function () {
  var calculatorModule

  var userData, consoleError

  function initialize () {
    loadModuleDependencies()
    if (typeof window === 'undefined') { // nodeJS
      consoleError = require('debug')('validateData')
    } else { // browser
      consoleError = console.error
    }
  }

  function loadModuleDependencies () {
    if (typeof window === 'undefined') { // node
      calculatorModule = require('./core/calculator')
    } else { // browser
      calculatorModule = autocosts.calculatorModule
    }
  }

  function setUserData (userDataLocal) {
    userData = userDataLocal
  }

  function isUserData () {
    if (!isObjectDefined(userData)) {
      throw Error('userData not defined')
    }
  }

  function isUserDataFormOk () { // eslint-disable-line
    isUserData()

    if (!isUserDataFormPart1_Ok()) {
      consoleError('Form Part 1 not Ok')
      return false
    }

    if (!isUserDataFormPart2_Ok()) {
      consoleError('Form Part 2 not Ok')
      return false
    }

    if (!isUserDataFormPart3_Ok()) {
      consoleError('Form Part 3 not Ok')
      return false
    }

    return true
  }

  function isUserDataFormPart1_Ok () { // eslint-disable-line camelcase
    isUserData()

    if (!isDepreciationOk()) {
      consoleError('Depreciation not Ok')
      return false
    }

    if (!isInsuranceOk()) {
      consoleError('Insurance not Ok')
      return false
    }

    if (!isCarFinanceOk()) {
      consoleError('CarFinance not Ok')
      return false
    }

    if (!isTaxesOk()) {
      consoleError('Taxes not Ok')
      return false
    }

    return true
  }

  function isUserDataFormPart2_Ok () { // eslint-disable-line camelcase
    isUserData()

    if (!isFuelOk()) {
      consoleError('Fuel not Ok')
      return false
    }

    if (!isMaintenanceOk()) {
      consoleError('Maintenance not Ok')
      return false
    }

    if (!isRepairsOk()) {
      consoleError('Repairs not Ok')
      return false
    }

    if (!isParkingOk()) {
      consoleError('Parking not Ok')
      return false
    }

    if (!isTollsOk()) {
      consoleError('Tolls not Ok')
      return false
    }

    if (!isFinesOk()) {
      consoleError('Fines not Ok')
      return false
    }

    if (!isWashingOk()) {
      consoleError('Washing not Ok')
      return false
    }

    return true
  }

  function isUserDataFormPart3_Ok () { // eslint-disable-line camelcase
    isUserData()

    if (!isPublicTransportOk()) {
      console.warn('PublicTransport not Ok')
      return false
    }

    if (!isIncomeOk()) {
      console.warn('Income not Ok')
      return false
    }

    if (!isWorkingTimeOk()) {
      console.warn('WorkingTime not Ok')
      return false
    }

    if (!isDistanceOk()) {
      console.warn('Distance not Ok')
      return false
    }

    if (!isTimeSpentInDrivingOk()) {
      console.warn('TimeSpentInDriving not Ok')
      return false
    }

    return true
  }

  /* *** CHECK FORM PART 1 ***** */
  /* check if data from form 1 (standing costs) is correctly filled */

  function isDepreciationOk () {
    if (!isObjectDefined(userData.depreciation)) {
      return false
    }

    var minCarYear = 1910 /* the year of the first produced car */

    /* depreciation */
    var acquisitionMonth = userData.depreciation.dateOfAcquisition.month
    var acquisitionYear = userData.depreciation.dateOfAcquisition.year
    var monthOfUserInput = userData.depreciation.dateOfUserInput.month
    var yearOfUserInput = userData.depreciation.dateOfUserInput.year

    if (!isInteger(acquisitionMonth) || acquisitionMonth > 12 || acquisitionMonth <= 0) {
      return false
    }
    if (!isInteger(monthOfUserInput) || monthOfUserInput > 12 || monthOfUserInput <= 0) {
      return false
    }
    if (!isInteger(acquisitionYear) || !isInteger(yearOfUserInput) || acquisitionYear < minCarYear) {
      return false
    }
    if (!isNumber(userData.depreciation.dateOfAcquisition.valueOfTheVehicle)) {
      return false
    }
    if (!isNumber(userData.depreciation.dateOfUserInput.valueOfTheVehicle)) {
      return false
    }

    var carAcquisitionDate = new Date(acquisitionYear, acquisitionMonth - 1)
    var dateOfUserInput = new Date(yearOfUserInput, monthOfUserInput - 1)

    var carNumberOfMonths = calculatorModule.differenceBetweenDates(carAcquisitionDate, dateOfUserInput)

    // carNumberOfMonths may be zero which is falsy, but acceptable
    if (carNumberOfMonths === null || carNumberOfMonths <= 0) {
      return false
    }

    return true
  }

  function isInsuranceOk () {
    if (!isObjectDefined(userData.insurance)) {
      return false
    }

    if (!isTimePeriodOk(userData.insurance.period)) {
      return false
    }

    if (!isNonNegativeNumber(userData.insurance.amountPerPeriod)) {
      return false
    }

    return true
  }

  function isCarFinanceOk () {
    if (!isObjectDefined(userData.credit)) {
      return false
    }

    if (typeof userData.credit.creditBool !== 'boolean') {
      return false
    }

    if (userData.credit.creditBool) {
      if (!isPositiveNumber(userData.credit.yesCredit.borrowedAmount)) {
        return false
      }
      if (!isInteger(userData.credit.yesCredit.numberInstallments) || userData.credit.yesCredit.numberInstallments < 0) {
        return false
      }
      if (!isPositiveNumber(userData.credit.yesCredit.amountInstallment)) {
        return false
      }
      if (!isNonNegativeNumber(userData.credit.yesCredit.residualValue)) {
        return false
      }
    }

    return true
  }

  function isInspectionOk () { // eslint-disable-line no-unused-vars
    if (!isObjectDefined(userData.inspection)) {
      return false
    }

    var numberOfInspections = userData.inspection.numberOfInspections

    if (!isInteger(numberOfInspections) || numberOfInspections < 0) {
      return false
    }

    if (numberOfInspections !== 0 && !isNonNegativeNumber(userData.inspection.averageInspectionCost)) {
      return false
    }

    return true
  }

  function isTaxesOk () {
    if (!isObjectDefined(userData.roadTaxes)) {
      return false
    }

    if (!isNonNegativeNumber(userData.roadTaxes.amountPerYear)) {
      return false
    }

    return true
  }

  /* *** CHECK FORM PART 2 ***** */
  /* check if data from form 2 (running costs) is correctly filled */
  function isFuelOk () {
    if (!isObjectDefined(userData.fuel)) {
      return false
    }

    var fuel = userData.fuel

    if (!fuel.typeOfCalculation || typeof fuel.typeOfCalculation !== 'string') {
      return false
    }

    switch (fuel.typeOfCalculation) {
      case 'distance': /* fuel calculations made considering distance travelled by month */
        if (!isPositiveNumber(fuel.distanceBased.fuelEfficiency)) {
          return false
        }
        if (!isPositiveNumber(fuel.distanceBased.fuelPrice)) {
          return false
        }
        if (typeof fuel.distanceBased.fuelEfficiencyStandard !== 'string' || !fuel.distanceBased.fuelEfficiencyStandard) {
          return false
        }

        if (typeof fuel.distanceBased.considerCarToJob !== 'boolean') {
          return false
        }

        if (fuel.distanceBased.considerCarToJob) {
        /* make calculation considering the user takes his car to job on a daily basis */
          var daysPerWeek = fuel.distanceBased.carToJob.daysPerWeek
          if (!isInteger(daysPerWeek) || daysPerWeek <= 0 || daysPerWeek > 7) {
            return false
          }

          if (!isPositiveNumber(fuel.distanceBased.carToJob.distanceBetweenHomeAndJob)) {
            return false
          }
          if (!isNonNegativeNumber(fuel.distanceBased.carToJob.distanceDuringWeekends)) {
            return false
          }
        } else {
          if (!isPositiveNumber(fuel.distanceBased.noCarToJob.distancePerPeriod)) {
            return false
          }
          if (!isTimePeriodOk(fuel.distanceBased.noCarToJob.period)) {
            return false
          }
          if (!isDistanceStandardOk(fuel.distanceBased.noCarToJob.distanceStandardUnit)) {
            return false
          }
        }
        break

      case 'money': /* fuel costs based on data input money per period of time */
        if (!isNonNegativeNumber(fuel.currencyBased.amountPerPeriod)) {
          return false
        }
        if (!isTimePeriodOk(fuel.currencyBased.period)) {
          return false
        }
        break

      default:
        return false
    }

    return true
  }

  function isMaintenanceOk () {
    if (!isObjectDefined(userData.maintenance)) {
      return false
    }

    if (!isNonNegativeNumber(userData.maintenance.amountPerYear)) {
      return false
    }

    return true
  }

  function isRepairsOk () {
    if (!isObjectDefined(userData.repairsImprovements)) {
      return false
    }

    if (!isNonNegativeNumber(userData.repairsImprovements.amountPerYear)) {
      return false
    }

    return true
  }

  function isParkingOk () {
    if (!isObjectDefined(userData.parking)) {
      return false
    }

    if (!isNonNegativeNumber(userData.parking.amountPerMonth)) {
      return false
    }

    return true
  }

  function isTollsOk () {
    if (!isObjectDefined(userData.tolls)) {
      return false
    }

    var tolls = userData.tolls

    if (typeof tolls.calculationBasedOnDay !== 'boolean') {
      return false
    }

    /* if tolls costs are calculated on a daily basis */
    if (tolls.calculationBasedOnDay) {
      if (!isNonNegativeNumber(tolls.yesBasedOnDay.amountPerDay)) {
        return false
      }
      var tollsDaysPerMonth = tolls.yesBasedOnDay.daysPerMonth
      if (!isInteger(tollsDaysPerMonth) || tollsDaysPerMonth < 0 || tollsDaysPerMonth > 31) {
        return false
      }
    } else {
      if (!isNonNegativeNumber(tolls.noBasedOnDay.amountPerPeriod)) {
        return false
      }
      if (!isTimePeriodOk(tolls.noBasedOnDay.period)) {
        return false
      }
    }

    return true
  }

  function isFinesOk () {
    if (!isObjectDefined(userData.fines)) {
      return false
    }

    if (!isNonNegativeNumber(userData.fines.amountPerPeriod)) {
      return false
    }
    if (!isTimePeriodOk(userData.fines.period)) {
      return false
    }

    return true
  }

  function isWashingOk () {
    if (!isObjectDefined(userData.washing)) {
      return false
    }

    if (!isNonNegativeNumber(userData.washing.amountPerPeriod)) {
      return false
    }
    if (!isTimePeriodOk(userData.washing.period)) {
      return false
    }

    return true
  }

  /* *** CHECK FORM PART 3 ***** */

  function isPublicTransportOk () {
    if (!isObjectDefined(userData.publicTransports)) {
      return false
    }

    var numberOfPeopleInFamily = userData.publicTransports.numberOfPeopleInFamily
    var monthlyPassCost = userData.publicTransports.monthlyPassCost

    if (!isInteger(numberOfPeopleInFamily) || numberOfPeopleInFamily <= 0) {
      return false
    }

    if (!isNonNegativeNumber(monthlyPassCost)) {
      return false
    }

    return true
  }

  function isIncomeOk () {
    if (!isObjectDefined(userData.income)) {
      return false
    }

    var income = userData.income

    var maxNumberOfWeeksPerYear = 52 // roughly 356.25/7=52,178
    var maxNumberOfHoursPerWeek = 168 // 7 days times 24 hours
    var maxNumberOfIncomeMonthsPerYear = 14 // in some countries, workers get 14 months per year of salary

    if (!isTimePeriodOk(income.incomePeriod)) {
      return false
    }

    switch (income.incomePeriod) {
      case 'year':
        if (!isPositiveNumber(income.year.amount)) {
          return false
        }
        break
      case 'month':
        if (!isPositiveNumber(income.month.amountPerMonth)) {
          return false
        }
        if (!isPositiveNumber(income.month.monthsPerYear) ||
          income.month.monthsPerYear > maxNumberOfIncomeMonthsPerYear) {
          return false
        }
        break
      case 'week':
        if (!isPositiveNumber(income.week.amountPerWeek)) {
          return false
        }
        if (!isPositiveNumber(income.week.weeksPerYear) ||
          income.week.weeksPerYear > maxNumberOfWeeksPerYear) {
          return false
        }
        break
      case 'hour':
        if (!isPositiveNumber(income.hour.amountPerHour)) {
          return false
        }
        if (!isPositiveNumber(income.hour.hoursPerWeek) ||
          income.hour.hoursPerWeek > maxNumberOfHoursPerWeek) {
          return false
        }
        if (!isPositiveNumber(income.hour.weeksPerYear) ||
          income.hour.weeksPerYear > maxNumberOfWeeksPerYear) {
          return false
        }
        break
      default:
        return false
    }

    return true
  }

  function isWorkingTimeOk () {
    if (!isObjectDefined(userData.workingTime)) {
      return false
    }

    var workingTime = userData.workingTime

    var minHoursPerWeek = 1
    var maxHoursPerWeek = 168
    var minMonthsPerYear = 1
    var maxMonthsPerYear = 12

    if (typeof workingTime.isActivated !== 'string') {
      return false
    }

    // working time just makes sense when we have information about income
    if (workingTime.isActivated && isIncomeOk()) {
      if (!isNumber(workingTime.hoursPerWeek) ||
        workingTime.hoursPerWeek < minHoursPerWeek || workingTime.hoursPerWeek > maxHoursPerWeek) {
        return false
      }

      if (!isInteger(workingTime.monthsPerYear) ||
        workingTime.monthsPerYear < minMonthsPerYear ||
        workingTime.monthsPerYear > maxMonthsPerYear) {
        return false
      }
    }

    return true
  }

  function isDistanceOk () {
    if (!isObjectDefined(userData.distance)) {
      return false
    }

    var distance = userData.distance

    var fuelTypeOfCalculation = userData.fuel.typeOfCalculation

    if (typeof fuelTypeOfCalculation !== 'string') {
      return false
    }

    // If user sets "currency" on Fuel section on Form Part 2, the calculator needs anyway to know the distance traveled,
    // and thus it will ask the distance travelled by the user here on Form Part 3
    if (fuelTypeOfCalculation === 'money') {
      if (typeof distance.considerCarToJob !== 'string') {
        return false
      }

      if (distance.considerCarToJob) {
        if (!isNumber(distance.carToJob.daysPerWeek) || distance.carToJob.daysPerWeek <= 0 || distance.carToJob.daysPerWeek > 7) {
          return false
        }
        if (!isPositiveNumber(distance.carToJob.distanceBetweenHomeAndJob)) {
          return false
        }
        if (!isNonNegativeNumber(distance.carToJob.distanceDuringWeekends)) {
          return false
        }
      } else {
        /* noCarToJob */
        if (!isNonNegativeNumber(distance.noCarToJob.distancePerPeriod)) {
          return false
        }
        if (!isTimePeriodOk(distance.noCarToJob.period)) {
          return false
        }
        if (!isDistanceStandardOk(distance.noCarToJob.distanceStandardUnit)) {
          return false
        }
      }
    }

    return true
  }

  function isTimeSpentInDrivingOk () {
    if (!isObjectDefined(userData.timeSpentInDriving)) {
      return false
    }

    var timeSpentInDriving = userData.timeSpentInDriving

    var distanceBasedOnDrivingToJob

    var fuelTypeOfCalculation = userData.fuel.typeOfCalculation
    if (fuelTypeOfCalculation === 'distance') {
      // check now Distance Section in Form Part 2
      distanceBasedOnDrivingToJob = userData.fuel.distanceBased.considerCarToJob
    } else if (fuelTypeOfCalculation === 'money') {
      // check now Distance Section in Form Part 3
      distanceBasedOnDrivingToJob = userData.distance.considerCarToJob
    } else {
      return false
    }

    if (typeof distanceBasedOnDrivingToJob !== 'boolean') {
      return false
    }

    if (distanceBasedOnDrivingToJob) {
      if (!isPositiveNumber(timeSpentInDriving.carToJob.minutesBetweenHomeAndJob)) {
        return false
      }
      if (!isNonNegativeNumber(timeSpentInDriving.carToJob.minutesDuringWeekend)) {
        return false
      }
    } else {
      if (!isPositiveNumber(timeSpentInDriving.noCarToJob.minutesPerDay)) {
        return false
      }
      var daysDrivePerMonth = timeSpentInDriving.noCarToJob.daysPerMonth
      if (!isInteger(daysDrivePerMonth) || daysDrivePerMonth <= 0 || daysDrivePerMonth > 31) {
        return false
      }
    }

    return true
  }

  function isTimePeriodOk (timePeriod) {
    // see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#time-periods
    var timePeriods = ['hour', 'week', 'month', 'twoMonths', 'trimester', 'semester', 'year']

    // check if is in array
    return (typeof timePeriod === 'string') && (timePeriods.indexOf(timePeriod) > -1)
  }

  function isDistanceStandardOk (timePeriod) {
    // see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#distance
    var distanceStandards = ['km', 'mi', 'mil(10km)']

    // check if is in array
    return (typeof timePeriod === 'string') && (distanceStandards.indexOf(timePeriod) > -1)
  }

  // check if number is integer
  function isInteger (n) {
    return isNumber(n) && (n === parseInt(n, 10))
  }

  // check if number is valid and greater or equal zero
  function isNonNegativeNumber (n) {
    return isNumber(n) && n >= 0
  }

  // check if number is valid and positive
  function isPositiveNumber (n) {
    return isNumber(n) && n > 0
  }

  // this function is very important and checks if number is a FINITE VALID NUMBER
  // no variable coercions, no bullshit, no string, no "1", no true, no NaN, no null, no 1/0, n must be a finite valid number
  // USE THIS FUNCTION, see https://stackoverflow.com/a/8526029/1243247
  function isNumber (n) {
    return typeof n === 'number' && !isNaN(n) && isFinite(n)
  }

  // check if object exists, is defined and is different from {}
  // https://stackoverflow.com/a/55765589/1243247
  function isObjectDefined (Obj) {
    if (Obj === null || typeof Obj !== 'object' || Object.prototype.toString.call(Obj) === '[object Array]') {
      return false
    } else {
      for (var prop in Obj) {
        if (Obj.hasOwnProperty(prop)) { // eslint-disable-line no-prototype-builtins
          return true
        }
      }
      return JSON.stringify(Obj) !== JSON.stringify({})
    }
  }

  return {
    initialize: initialize,
    setUserData: setUserData,
    isUserDataFormPart1_Ok: isUserDataFormPart1_Ok,
    isUserDataFormPart2_Ok: isUserDataFormPart2_Ok,
    isUserDataFormPart3_Ok: isUserDataFormPart3_Ok
  }
})()

// check for node
if (typeof window === 'undefined') {
  module.exports = autocosts.validateDataModule
}
