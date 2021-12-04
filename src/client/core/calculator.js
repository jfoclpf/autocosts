/** ************* CALCULATOR JS FUNCTIONS *************************/
//= ==========================================================
// see also: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function

// CALCULATOR MODULE
// see our module template: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#modules
// This file is used both by the browser and by node/commonsJS, the latter being called by getAvgFromDB.js

/* eslint prefer-const: "off" */
/* eslint no-var: "off" */

// check for node.js
if (!autocosts && typeof window === 'undefined') { // eslint-disable-line
  var autocosts = {}
}

autocosts.calculatorModule = (function (thisModule) {
  var conversionsModule

  var inputData // input data object, obtained from user HTML form or from database entry
  var calculatedData // output object

  var consoleError

  var consts = {
    numberOfDaysInAYear: 365.25,
    numberOfDaysInAWeek: 7,
    numberOfMonthsInAYear: 12,
    numberOfWeeksInAYear: 365.25 / 7,
    numberOfWeeksInAMonth: 365.25 / 12 / 7
  }

  // says if some calculated results are likely to be valid
  var isLikelyToBeValidConst = {
    financialEffortPercentage: {
      min: 2,
      max: 110
    }
  }

  var errMsgDataCountry = 'inputData or calculatedData not defined. Initializtion functions not run'

  function initialize () {
    loadModuleDependencies()
    if (typeof window === 'undefined') { // nodeJS
      consoleError = require('debug')('calculator')
    } else { // browser
      consoleError = console.error
    }
  }

  function loadModuleDependencies () {
    if (typeof window === 'undefined') { // node
      conversionsModule = require('./conversions')
    } else { // browser
      conversionsModule = autocosts.calculatorModule.conversionsModule
    }
  }

  // private method, to be called by calculateCosts()
  function initializeCalculatedData () {
    if (!isObjectDefined(inputData)) {
      throw Error(errMsgDataCountry)
    }

    // object to be returned by the function calculateCosts
    // for the object full structure see: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function#output
    calculatedData = CreateCalculatedDataObj() // calculatedData is global to this module
    initializeCalculatedDataObj()
  }

  // Object Constructor for the Results, where the calculated averages are stored
  // see: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#calculateddata-class
  // because it is a constructor, first letter is capital
  function CreateCalculatedDataObj () {
    var u; u = undefined

    return {
      countryCode: u,
      currency: u,

      costs: {
        totalPerYear: u,
        totalEver: u,

        perMonth: {
          items: {
            depreciation: u,
            insurance: u,
            credit: u,
            inspection: u,
            roadTaxes: u,
            fuel: u,
            maintenance: u,
            repairsImprovements: u,
            parking: u,
            tolls: u,
            fines: u,
            washing: u
          },
          standingCosts: u,
          runningCosts: u,
          total: u
        },

        perUnitDistance: { // "km", "mile", etc.
          runningCosts: u,
          totalCosts: u
        }
      },

      speeds: {
        averageKineticSpeed: u,
        averageConsumerSpeed: u // see for more details
        // https://en.wikipedia.org/wiki/Effects_of_the_car_on_societies#Private_or_internal_costs
      },

      publicTransports: {
        calculated: false, // boolean whether the public transports info was calculated
        toBeDisplayed: u, // boolean whether makes sense to display public transports
        totalCostsOfStandardPublicTransports: u, // total costs of public transports in the city with monthly pass
        furtherPublicTransports: { // further alternative public transports (train, outside residence city, etc.),
          display: false, // boolean for further alternative public transports
          totalCosts: u // costs set to these further public transports
        },
        taxi: {
          totalCosts: u, // usage of taxi as an alternative to car
          costPerUnitDistance: u, // average price of taxi per unit distance
          possibleDistanceDoneByTaxi: u // km/miles/etc. that could be done by taxi with amount of this.taxiCosts
        },
        totalAlternativeCostsWhenUserHasNoCar: u, // total alternative costs by not having a car
        ratios: {
          ptCostsOverCarCosts: u, // public transports over car costs ratio

          // ratio (costs of public transports)/(car costs) under which it shows public transports as alternative
          showPt: u,

          // ratio (costs of public transports)/(car costs) under which shows other alternatives,
          // with further public transports (intercity trains for example)
          showFurtherPt: u
        }
      },

      financialEffort: {
        calculated: false, // boolean whether the public transports info was calculated
        isLikelyToBeValid: false, // says if this result is likely to be valid
        income: {
          calculated: false,
          averagePerHour: u,
          averagePerWeek: u,
          averagePerMonth: u,
          perYear: u
        },
        workingTime: {
          calculated: false,
          hoursPerWeek: u, // hours of work per week
          weeksPerYear: u, // weeks of work per year
          monthsPerYear: u, // months of work per year
          hoursPerMonth: u, // average total working hours per month
          hoursPerYear: u // average total working hours per year
        },
        totalCarCostsPerYear: u, // total costs per year
        workingHoursPerYearToAffordCar: u, // hours per year to afford the car
        workingMonthsPerYearToAffordCar: u, // months per year to afford the car
        daysForCarToBePaid: u, // number of days till the car is paid
        financialEffortPercentage: u // percentage of income that car costs represent
      },

      drivingDistance: {
        calculated: false, // boolean
        perWeek: u, // average distance driven per month
        perMonth: u, // total distance driven per month
        perYear: u, // total distance driven per year
        betweenHomeAndJob: u, // distance between home and job (one-way)
        duringEachWeekend: u // distance the user drives during weekend
      },

      timeSpentInDriving: {
        calculated: false, // boolean
        minutesBetweenHomeAndJob: u, // time (in minutes) driven between home and job
        minutesInEachWeekend: u, // time (in minutes) driven during weekends
        minutesPerWeek: u, // time (in minutes) driven per week
        minutesPerDay: u, // time (in minutes) driven per day
        daysPerMonth: u, // number of days driven per month
        hoursPerMonth: u, // number of hours driven per month
        hoursPerYear: u // number of hours driven per year
      },

      externalCosts: {
        calculated: false, // boolean
        handbookOfeExternalCostsURL: u,
        pollution: u,
        greenhouseGases: u,
        noise: u,
        fatalities: u,
        congestion: u,
        infrastructure: u,
        total: u
      },

      details: {
        numberOfDaysPerWeekUserDrivesToJob: u, // number of days per week, the user drives to job
        ageOfCarInMonths: u,
        credit: {
          numberOfMonthlyInstalments: u,
          totalPaidInInterests: u
        }
      },

      // see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#standards
      // standard units applicable to the whole object
      standardUnits: {
        speed: u, // type string: km/h, mi/h, mil(10km)/h
        distance: u, // type string: km, mi, mil(10km)
        fuelEfficiency: u, // type string: L/100km, km/L, etc.
        fuelPriceVolume: u // type string: ltr, gal(UK) or gal(US)
      }
    }
  }

  // calculatedData and inputData are global to this module
  function initializeCalculatedDataObj () {
    if (!isObjectDefined(calculatedData) || !isObjectDefined(inputData)) {
      throw Error(errMsgDataCountry)
    }

    calculatedData.countryCode = inputData.countryCode
    calculatedData.currency = inputData.currency

    // decide what Standard Distance Unit to use according to user input
    if (inputData.fuel.typeOfCalculation === 'distance') {
      checkBoolean(inputData.fuel.distanceBased.considerCarToJob)
      if (inputData.fuel.distanceBased.considerCarToJob) {
        calculatedData.standardUnits.distance = inputData.fuel.distanceBased.carToJob.distanceStandardUnit
      } else {
        calculatedData.standardUnits.distance = inputData.fuel.distanceBased.noCarToJob.distanceStandardUnit
      }
    } else if (inputData.fuel.typeOfCalculation === 'money') {
      /* gets distance from section distance when available */
      if (typeof inputData.distance.considerCarToJob === 'boolean') {
        if (inputData.distance.considerCarToJob) {
          calculatedData.standardUnits.distance = inputData.distance.carToJob.distanceStandardUnit
        } else {
          calculatedData.standardUnits.distance = inputData.distance.noCarToJob.distanceStandardUnit
        }
      } else {
        calculatedData.standardUnits.distance = null
      }
    } else {
      throw Error('invalid fuel.typeOfCalculation: ' + inputData.fuel.typeOfCalculation)
    }

    if (calculatedData.standardUnits.distance) {
      calculatedData.standardUnits.distance = conversionsModule.mapUnit('distance', calculatedData.standardUnits.distance)

      // standard speed
      calculatedData.standardUnits.speed = calculatedData.standardUnits.distance + '/h'
    }

    // standard fuelEfficiency: type string: L/100km, km/L, etc
    calculatedData.standardUnits.fuelEfficiency = conversionsModule.mapUnit('fuelEfficiency',
      inputData.fuel.distanceBased.fuelEfficiencyStandard)

    // standard fuelPriceVolume: type string: ltr, gal(UK) or gal(US)
    calculatedData.standardUnits.fuelPriceVolume = conversionsModule.mapUnit('fuelPriceVolume',
      inputData.fuel.distanceBased.fuelPriceVolumeStandard)
  }

  // return the difference in months between two dates dateTo-dateFrom
  // if dateFrom is after dateTo returns null
  function differenceBetweenDates (dateFrom, dateTo) {
    var numberOfMonths = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
    if (numberOfMonths > 0) {
      return numberOfMonths
    } else if (numberOfMonths === 0) {
      /* to avoid divisions by zero in the depreciation,
      allowing user to use the calculator on the month he bought the car */
      return 1
    } else {
      return null
    }
  }

  function calculateMonthlyDepreciation (depreciation, ageInMonths) {
    return (depreciation.dateOfAcquisition.valueOfTheVehicle - depreciation.dateOfUserInput.valueOfTheVehicle) / ageInMonths
  }

  function calculateInsuranceMonthlyValue (insurance) {
    return getMonthlyAmount(insurance.amountPerPeriod, insurance.period)
  }

  function calculateInterestsMonthlyValue (credit, ageInMonths) {
    var monthlyCost
    var totalInterests
    var numberOfMonthlyInstalments

    if (typeof credit.creditBool !== 'boolean') {
      throw (Error('Error calculating credit'))
    }

    if (credit.creditBool) { // if there was credit
      numberOfMonthlyInstalments = parseInt(credit.yesCredit.numberInstallments, 10)
      var amountInstallment = credit.yesCredit.amountInstallment
      var residualValue = credit.yesCredit.residualValue
      var borrowedAmount = credit.yesCredit.borrowedAmount

      totalInterests = (numberOfMonthlyInstalments * amountInstallment + residualValue) - borrowedAmount

      if (totalInterests < 0) {
        totalInterests = 0
      }

      if (ageInMonths >= numberOfMonthlyInstalments) {
        monthlyCost = totalInterests / ageInMonths
      } else {
        monthlyCost = totalInterests / numberOfMonthlyInstalments
      }
    } else {
      monthlyCost = 0
    }

    return {
      monthlyCost: monthlyCost,
      numberOfMonthlyInstalments: numberOfMonthlyInstalments,
      totalInterests: totalInterests
    }
  }

  function calculateMonthlyInspection (inspection, ageInMonths) {
    if (parseInt(inspection.numberOfInspections, 10) > 0) {
      return (parseInt(inspection.numberOfInspections, 10) * inspection.averageInspectionCost) / ageInMonths
    } else {
      return 0
    }
  }

  function calculateMonthlyTaxes (roadTaxes) {
    return roadTaxes.amountPerYear / 12
  }

  function calculateMonthlyFuel (fuel) {
    var monthlyCost, // monthly fuel costs in standard currency
      distancePerMonth // distance per month in standard unit

    var errMsg = 'Error calculating fuel'

    // the result shall be: "money", "distanceNoCarToJob" or "distanceCarToJob"
    var typeOfCalculation = function () {
      switch (fuel.typeOfCalculation) {
        case 'distance':
          if (typeof fuel.distanceBased.considerCarToJob !== 'boolean') {
            throw Error(errMsg + 'fuel.distanceBased.considerCarToJob is not a boolean')
          }
          checkBoolean(fuel.distanceBased.considerCarToJob)
          if (fuel.distanceBased.considerCarToJob) {
            return 'distanceCarToJob'
          } else {
            return 'distanceNoCarToJob'
          }
          break // eslint-disable-line no-unreachable
        case 'money':
          return 'money'
        default:
          throw Error(errMsg + ' - Invalid fuel.typeOfCalculation: ' + fuel.typeOfCalculation)
      }
    }

    var getMonthlyCost = function () {
      var fuelEffL100km,
        fuelPriceOnCurrPerLitre,
        distancePerMonthInKms,
        selectedDistancePerMonth,
        distanceBetweenHomeAndJob,
        distanceDuringWeekends,
        daysPerWeekUserDrivesToJob

      // the result shall be: "money", "distanceNoCarToJob" or "distanceCarToJob"
      switch (typeOfCalculation()) {
        case 'distanceNoCarToJob':
          fuelEffL100km = conversionsModule
            .convertFuelEfficiencyToL100km(fuel.distanceBased.fuelEfficiency, fuel.distanceBased.fuelEfficiencyStandard)

          fuelPriceOnCurrPerLitre = conversionsModule
            .convertFuelPriceToLitre(fuel.distanceBased.fuelPrice, fuel.distanceBased.fuelPriceVolumeStandard)

          selectedDistancePerMonth = getMonthlyAmount(fuel.distanceBased.noCarToJob.distancePerPeriod, fuel.distanceBased.noCarToJob.period)

          // converts distance unit to kilometres
          distancePerMonthInKms = conversionsModule
            .convertDistanceToKm(selectedDistancePerMonth, fuel.distanceBased.noCarToJob.distanceStandardUnit)

          monthlyCost = fuelEffL100km * distancePerMonthInKms * fuelPriceOnCurrPerLitre / 100

          // always set the "distance per month" in the standard default unit defined for the country standard
          distancePerMonth = conversionsModule
            .convertDistanceFromKm(distancePerMonthInKms, calculatedData.standardUnits.distance)

          break

        case 'distanceCarToJob':

          distanceBetweenHomeAndJob = fuel.distanceBased.carToJob.distanceBetweenHomeAndJob
          distanceDuringWeekends = fuel.distanceBased.carToJob.distanceDuringWeekends
          daysPerWeekUserDrivesToJob = parseInt(fuel.distanceBased.carToJob.daysPerWeek, 10)

          fuelEffL100km = conversionsModule
            .convertFuelEfficiencyToL100km(fuel.distanceBased.fuelEfficiency, fuel.distanceBased.fuelEfficiencyStandard)

          fuelPriceOnCurrPerLitre = conversionsModule
            .convertFuelPriceToLitre(fuel.distanceBased.fuelPrice, fuel.distanceBased.fuelPriceVolumeStandard)

          // if for example miles were the default must convert input to kilometres
          var distanceHomeToJobInKms = conversionsModule.convertDistanceToKm(distanceBetweenHomeAndJob,
            fuel.distanceBased.carToJob.distanceStandardUnit)
          var distanceOnWeekendsInKms = conversionsModule.convertDistanceToKm(distanceDuringWeekends,
            fuel.distanceBased.carToJob.distanceStandardUnit)

          distancePerMonthInKms = (2 * distanceHomeToJobInKms * daysPerWeekUserDrivesToJob + distanceOnWeekendsInKms) *
            consts.numberOfWeeksInAMonth

          monthlyCost = fuelEffL100km * distancePerMonthInKms * fuelPriceOnCurrPerLitre / 100

          // always set the distance per month in the standard default unit defined for the country
          distancePerMonth = conversionsModule
            .convertDistanceFromKm(distancePerMonthInKms, calculatedData.standardUnits.distance)

          calculatedData.details.numberOfDaysPerWeekUserDrivesToJob = daysPerWeekUserDrivesToJob

          break

        case 'money':

          monthlyCost = getMonthlyAmount(fuel.currencyBased.amountPerPeriod, fuel.currencyBased.period)
          distancePerMonth = null

          break

        default:
          throw Error(errMsg + ' - Invalid result from typeOfCalculation(): ' + typeOfCalculation())
      }

      return monthlyCost
    }

    // always return the distance per month in the standard default unit defined for the country
    var getDistancePerMonth = function () {
      getMonthlyCost()
      return distancePerMonth
    }

    return {
      typeOfCalculation: typeOfCalculation,
      getMonthlyCost: getMonthlyCost,
      getDistancePerMonth: getDistancePerMonth
    }
  }

  function calculateMonthlyMaintenance (maintenance) {
    return maintenance.amountPerYear / 12
  }

  function calculateMonthlyRepairsAndImprovements (repairsImprovements) {
    return repairsImprovements.amountPerYear / 12
  }

  function calculateMonthlyParking (parking) {
    return parking.amountPerMonth
  }

  function calculateMonthlyTolls (tolls) {
    var errMsg = 'Error calculating tolls'

    if (typeof tolls.calculationBasedOnDay !== 'boolean') {
      throw (Error(errMsg))
    }

    checkBoolean(tolls.calculationBasedOnDay)
    if (!tolls.calculationBasedOnDay) { // calculation not done by day
      return getMonthlyAmount(tolls.noBasedOnDay.amountPerPeriod, tolls.noBasedOnDay.period)
    } else {
      return tolls.yesBasedOnDay.amountPerDay * tolls.yesBasedOnDay.daysPerMonth
    }
  }

  function calculateMonthlyFines (fines) {
    return getMonthlyAmount(fines.amountPerPeriod, fines.period)
  }

  function calculateMonthlyWashing (washing) {
    return getMonthlyAmount(washing.amountPerPeriod, washing.period)
  }

  function calculateMonthlyCosts (costs, details) {
    // 'costs' and 'details' are assigned by reference and makes reference to calculatedData.costs and calculatedData.details
    // no other methods and properties of calculatedData are touched

    var dateOfAcquisition = new Date(inputData.depreciation.dateOfAcquisition.year, inputData.depreciation.dateOfAcquisition.month - 1)
    var dateOfUserInput = new Date(inputData.depreciation.dateOfUserInput.year, inputData.depreciation.dateOfUserInput.month - 1)
    var ageInMonths = differenceBetweenDates(dateOfAcquisition, dateOfUserInput)

    if (ageInMonths === null || ageInMonths <= 0) {
      console.log(inputData.depreciation)
      throw Error('Age of vehicle invalid: ' + ageInMonths)
    }

    var monthlyCosts = costs.perMonth.items

    monthlyCosts.depreciation = calculateMonthlyDepreciation(inputData.depreciation, ageInMonths)
    monthlyCosts.insurance = calculateInsuranceMonthlyValue(inputData.insurance)
    monthlyCosts.credit = calculateInterestsMonthlyValue(inputData.credit, ageInMonths).monthlyCost
    monthlyCosts.inspection = calculateMonthlyInspection(inputData.inspection, ageInMonths)
    monthlyCosts.roadTaxes = calculateMonthlyTaxes(inputData.roadTaxes)
    monthlyCosts.fuel = calculateMonthlyFuel(inputData.fuel).getMonthlyCost()
    monthlyCosts.maintenance = calculateMonthlyMaintenance(inputData.maintenance)
    monthlyCosts.repairsImprovements = calculateMonthlyRepairsAndImprovements(inputData.repairsImprovements)
    monthlyCosts.parking = calculateMonthlyParking(inputData.parking)
    monthlyCosts.tolls = calculateMonthlyTolls(inputData.tolls)
    monthlyCosts.fines = calculateMonthlyFines(inputData.fines)
    monthlyCosts.washing = calculateMonthlyWashing(inputData.washing)

    // total standing costs
    var totalStandingCostsPerMonth = monthlyCosts.insurance + monthlyCosts.depreciation + monthlyCosts.credit +
                                         monthlyCosts.inspection + 0.5 * monthlyCosts.maintenance + monthlyCosts.roadTaxes

    // total running costs
    var totalRunningCostsPerMonth = monthlyCosts.fuel + 0.5 * monthlyCosts.maintenance +
                                        monthlyCosts.repairsImprovements + monthlyCosts.parking +
                                        monthlyCosts.tolls + monthlyCosts.fines + monthlyCosts.washing

    // totals
    var totalCostsPerMonth = monthlyCosts.insurance + monthlyCosts.fuel + monthlyCosts.depreciation +
                                 monthlyCosts.credit + monthlyCosts.inspection + monthlyCosts.maintenance +
                                 monthlyCosts.repairsImprovements + monthlyCosts.roadTaxes + monthlyCosts.parking +
                                 monthlyCosts.tolls + monthlyCosts.fines + monthlyCosts.washing

    var totalCostsPerYear = totalCostsPerMonth * 12

    var totalCostsEver = totalCostsPerMonth * ageInMonths

    // details and costs are references
    details.ageOfCarInMonths = ageInMonths
    var creditObj = calculateInterestsMonthlyValue(inputData.credit, ageInMonths)
    details.credit.numberOfMonthlyInstalments = creditObj.numberOfMonthlyInstalments
    details.credit.totalPaidInInterests = creditObj.totalInterests

    costs.perMonth.items = monthlyCosts
    costs.perMonth.standingCosts = totalStandingCostsPerMonth
    costs.perMonth.runningCosts = totalRunningCostsPerMonth
    costs.perMonth.total = totalCostsPerMonth
    costs.totalPerYear = totalCostsPerYear
    costs.totalEver = totalCostsEver

    // because NaN+1+2+3=NaN this also checks if any cost itme is a valid number
    if (areAllNumbers(totalStandingCostsPerMonth, totalRunningCostsPerMonth, totalCostsPerMonth, totalCostsPerYear, totalCostsEver)) {
      return true
    } else {
      return false
    }
  }

  function calculatePublicTransports (publicTransports, inputPublicTransports, totalCarCostsPerMonth) {
    // 'publicTransports' is assigned by reference and refers to calculatedData.publicTransports
    // 'inputPublicTransports' is assigned by reference and makes reference to inputData.publicTransports

    // This function calculates the public transports costs as an alternative to car usage
    // that is, how much of public transports could be used with the same amount
    // of money that the user spends totally with automobile

    var errMsg = 'Error calculating Public Transports'

    if (!publicTransports || !inputPublicTransports || !isNumber(totalCarCostsPerMonth)) {
      consoleErrorPairs('publicTransports', publicTransports,
        'inputPublicTransports', inputPublicTransports,
        'totalCarCostsPerMonth', totalCarCostsPerMonth)
      throw Error(errMsg)
    }

    /* ratios */
    // ratio (costs of public transports)/(car costs), under which it shows public transports as an alternative
    publicTransports.ratios.showPt = 0.9
    // ratio of (costs of public transports)/(car costs), under which shows further public transports (intercity trains for example)
    publicTransports.ratios.showFurtherPt = 0.6

    var costOfEachMonthlyPass = inputPublicTransports.monthlyPassCost
    var numberOfPeopleInFamily = inputPublicTransports.numberOfPeopleInFamily

    if (!areAllNumbersGreaterThanZero(costOfEachMonthlyPass, inputPublicTransports.taxi.costPerUnitDistance) ||
      !isInteger(numberOfPeopleInFamily)) {
      /* if */
      publicTransports.calculated = false
      return
    }

    var totalCostsOfStandardPt = costOfEachMonthlyPass * numberOfPeopleInFamily
    publicTransports.totalCostsOfStandardPublicTransports = totalCostsOfStandardPt

    var taxiDistancePerUnitCurrency = 1 / inputPublicTransports.taxi.costPerUnitDistance
    taxiDistancePerUnitCurrency = conversionsModule.convertDistanceFromTo(taxiDistancePerUnitCurrency,
      inputPublicTransports.taxi.distanceStandardUnit, calculatedData.standardUnits.distance)

    publicTransports.taxi.costPerUnitDistance = 1 / taxiDistancePerUnitCurrency

    // boolean function that says if public transports alternatives are calculated
    publicTransports.toBeDisplayed =
      (totalCostsOfStandardPt < publicTransports.ratios.showPt * totalCarCostsPerMonth) && (costOfEachMonthlyPass > 0)

    if (publicTransports.toBeDisplayed) {
      var taxiTotalCostsPerMonth

      publicTransports.totalAlternativeCostsWhenUserHasNoCar = totalCostsOfStandardPt

      publicTransports.ratios.ptCostsOverCarCosts = totalCostsOfStandardPt / totalCarCostsPerMonth

      // in case further public transports are not shown, further shows just taxi
      if (publicTransports.ratios.ptCostsOverCarCosts > publicTransports.ratios.showFurtherPt) {
        publicTransports.furtherPublicTransports.display = false

        taxiTotalCostsPerMonth = totalCarCostsPerMonth - totalCostsOfStandardPt

        publicTransports.totalAlternativeCostsWhenUserHasNoCar += taxiTotalCostsPerMonth
      } else {
        // in case further public transports are shown,
        // half of the remainder goes to taxi and other half goes to further public transports

        publicTransports.furtherPublicTransports.display = true

        taxiTotalCostsPerMonth = totalCarCostsPerMonth * (1 - publicTransports.ratios.ptCostsOverCarCosts) / 2

        // amount allocated to further Public Transports, besides monthly pass and taxi
        publicTransports.furtherPublicTransports.totalCosts =
          totalCarCostsPerMonth * (1 - publicTransports.ratios.ptCostsOverCarCosts) / 2

        publicTransports.totalAlternativeCostsWhenUserHasNoCar +=
          taxiTotalCostsPerMonth + publicTransports.furtherPublicTransports.totalCosts
      }

      publicTransports.taxi.totalCosts = taxiTotalCostsPerMonth
      publicTransports.taxi.possibleDistanceDoneByTaxi = taxiTotalCostsPerMonth / publicTransports.taxi.costPerUnitDistance

      publicTransports.calculated = true
    } else {
      publicTransports.calculated = false
    }
  }

  function calculateFinancialEffort (financialEffort, inputIncome, inputWorkingTime, totalCostsPerYear) {
    // 'financialEffort' is assigned by reference and makes reference to calculatedData.financialEffort
    // 'inputIncome' and 'inputWorkingTime' are assigned by reference and make reference to inputData.income and inputData.inputData
    // no other methods and properties of calculatedData or inputData are touched

    var errMsg = 'Error calculating Financial Effort'

    if (!financialEffort || !inputIncome || !inputWorkingTime || !isNumber(totalCostsPerYear)) {
      consoleErrorPairs('financialEffort', financialEffort,
        'inputIncome', inputIncome,
        'inputWorkingTime', inputWorkingTime,
        'totalCostsPerYear', totalCostsPerYear)
      throw Error(errMsg)
    }

    financialEffort.totalCarCostsPerYear = totalCostsPerYear

    // Income and financial effort
    var incomePeriod = inputIncome.incomePeriod
    switch (incomePeriod) {
      case 'year':
        financialEffort.income.perYear = inputIncome.year.amount * 1
        break
      case 'month':
        financialEffort.income.perYear = inputIncome.month.amountPerMonth * inputIncome.month.monthsPerYear
        break
      case 'week':
        financialEffort.income.perYear = inputIncome.week.amountPerWeek * inputIncome.week.weeksPerYear
        break
      case 'hour':
        financialEffort.workingTime.hoursPerWeek = inputIncome.hour.hoursPerWeek
        financialEffort.workingTime.weeksPerYear = inputIncome.hour.weeksPerYear
        financialEffort.income.perYear =
          inputIncome.hour.amountPerHour * financialEffort.workingTime.hoursPerWeek * financialEffort.workingTime.weeksPerYear
        break

      default:
      // if income period is not valid, return the function immediately
        financialEffort.calculated = financialEffort.income.calculated = false
        return
    }

    // this function also works with one parameter, must be a valid number > 0
    if (areAllNumbersGreaterThanZero(financialEffort.income.perYear)) {
      financialEffort.income.averagePerMonth = financialEffort.income.perYear / 12
      financialEffort.income.averagePerWeek = financialEffort.income.perYear / consts.numberOfWeeksInAYear

      financialEffort.workingMonthsPerYearToAffordCar = totalCostsPerYear / financialEffort.income.perYear * 12

      financialEffort.daysForCarToBePaid =
        totalCostsPerYear / financialEffort.income.perYear * consts.numberOfDaysInAYear

      financialEffort.financialEffortPercentage = totalCostsPerYear / financialEffort.income.perYear * 100

      financialEffort.income.calculated = true
    } else {
      financialEffort.income.calculated = false
    }

    // Working Time
    // uses input Data section "income", as the income was selected per hour
    if (incomePeriod === 'hour') {
      if (areAllNumbersGreaterThanZero(financialEffort.workingTime.hoursPerWeek, financialEffort.workingTime.weeksPerYear)) {
        financialEffort.workingTime.hoursPerYear = financialEffort.workingTime.hoursPerWeek * financialEffort.workingTime.weeksPerYear

        financialEffort.workingTime.hoursPerMonth = financialEffort.workingTime.hoursPerYear / 12

        financialEffort.workingTime.calculated = true
      } else {
        financialEffort.workingTime.calculated = false
      }
    } else if (incomePeriod === 'week' || incomePeriod === 'month' || incomePeriod === 'year') {
      // uses input data section "working time"

      if (typeof inputWorkingTime.isActivated !== 'boolean') {
        consoleError(Error(errMsg))
        return
      }

      if (inputWorkingTime.isActivated) {
        financialEffort.workingTime.hoursPerWeek = inputWorkingTime.hoursPerWeek
        financialEffort.workingTime.monthsPerYear = inputWorkingTime.monthsPerYear
      } else {
        // if user doesn't input, use standard values
        financialEffort.workingTime.hoursPerWeek = 36
        financialEffort.workingTime.monthsPerYear = 11
      }

      if (areAllNumbersGreaterThanZero(financialEffort.workingTime.hoursPerWeek, financialEffort.workingTime.monthsPerYear)) {
        financialEffort.workingTime.hoursPerYear =
          consts.numberOfWeeksInAMonth * financialEffort.workingTime.monthsPerYear * financialEffort.workingTime.hoursPerWeek

        financialEffort.workingTime.hoursPerMonth = financialEffort.workingTime.hoursPerYear / 12

        financialEffort.workingTime.calculated = true
      } else {
        financialEffort.workingTime.calculated = false
      }
    } else {
      financialEffort.calculated = financialEffort.workingTime.calculated = false
      return
    }

    // find average income per hour
    financialEffort.calculated = financialEffort.income.calculated && financialEffort.workingTime.calculated

    if (financialEffort.calculated) {
      financialEffort.income.averagePerHour = financialEffort.income.perYear / financialEffort.workingTime.hoursPerYear
      financialEffort.workingHoursPerYearToAffordCar = totalCostsPerYear / financialEffort.income.averagePerHour
    }

    if (financialEffort.income.calculated &&
      financialEffort.financialEffortPercentage >= isLikelyToBeValidConst.financialEffortPercentage.min &&
      financialEffort.financialEffortPercentage <= isLikelyToBeValidConst.financialEffortPercentage.max) {
      /* if */
      financialEffort.isLikelyToBeValid = true
    } else {
      financialEffort.isLikelyToBeValid = false
    }

    // doesn't need to return because financialEffort is a referece to calculatedData.financialEffort
    // and calculatedData is global in this module
  }

  function calculateDrivingDistance (drivingDistance, details, inputFuel, inputDistance) {
    // 'drivingDistance' and 'details' are assigned by reference and refer to calculatedData.drivingDistance and calculatedData.inputFuel
    // 'inputDistance' and 'inputFuel' are assigned by reference and refer to inputData.inputDistance and inputData.details

    var errMsg = 'Error calculating Driving Distance'

    if (!drivingDistance || !details || !inputFuel || !inputDistance) {
      consoleErrorPairs('drivingDistance', drivingDistance,
        'details', details,
        'inputFuel', inputFuel,
        'inputDistance', inputDistance)
      throw Error(errMsg)
    }

    // always set the distances in the standard default unit defined for the country
    var distancePerWeek, // distance driven per week
      distancePerMonth, // distance driven per month
      distancePerYear, // distance driven per year
      distanceBetweenHomeAndJob, // distance between home and job (one-way)
      distanceDuringEachWeekend, // distance the user drives during weekend
      daysPerWeekUserDrivesToJob

    // the result shall be: "money", "distanceNoCarToJob" or "distanceCarToJob"
    var fuelTypeOfCalculation = calculateMonthlyFuel(inputFuel).typeOfCalculation()

    // if fuel calculation with distance was NOT chosen in form part 2, gets distance from form part 3
    if (fuelTypeOfCalculation === 'money') {
      if (typeof inputDistance.considerCarToJob !== 'boolean') {
        drivingDistance.calculated = false
        return
      }

      if (inputDistance.considerCarToJob) {
        daysPerWeekUserDrivesToJob = inputDistance.carToJob.daysPerWeek
        distanceBetweenHomeAndJob = inputDistance.carToJob.distanceBetweenHomeAndJob
        distanceDuringEachWeekend = inputDistance.carToJob.distanceDuringWeekends

        if (isInteger(daysPerWeekUserDrivesToJob) && areAllNumbers(distanceBetweenHomeAndJob, distanceDuringEachWeekend)) {
          /* if */
          distanceBetweenHomeAndJob = conversionsModule.convertDistanceFromTo(distanceBetweenHomeAndJob,
            inputDistance.carToJob.distanceStandardUnit, calculatedData.standardUnits.distance)

          distanceDuringEachWeekend = conversionsModule.convertDistanceFromTo(distanceDuringEachWeekend,
            inputDistance.carToJob.distanceStandardUnit, calculatedData.standardUnits.distance)

          distancePerWeek = 2 * distanceBetweenHomeAndJob * daysPerWeekUserDrivesToJob + distanceDuringEachWeekend
          distancePerMonth = consts.numberOfWeeksInAMonth * distancePerWeek
          distancePerYear = distancePerMonth * 12

          details.numberOfDaysPerWeekUserDrivesToJob = daysPerWeekUserDrivesToJob
        } else {
          drivingDistance.calculated = false
          return
        }
      } else { // considerCarToJob is false
        if (isNumber(inputDistance.noCarToJob.distancePerPeriod)) {
          distancePerMonth = getMonthlyAmount(inputDistance.noCarToJob.distancePerPeriod, inputDistance.noCarToJob.period)

          distancePerMonth = conversionsModule.convertDistanceFromTo(distancePerMonth,
            inputDistance.noCarToJob.distanceStandardUnit, calculatedData.standardUnits.distance)

          distancePerYear = distancePerMonth * 12
          distancePerWeek = distancePerMonth / consts.numberOfWeeksInAMonth
        } else {
          drivingDistance.calculated = false
          return
        }
      }
    } else if (fuelTypeOfCalculation === 'distanceCarToJob' || fuelTypeOfCalculation === 'distanceNoCarToJob') {
      // gets distance information from form part 2, in fuel section

      // distancePerMonth comes already in calculatedData.standardUnits.distance
      distancePerMonth = calculateMonthlyFuel(inputFuel).getDistancePerMonth()

      if (isNumber(distancePerMonth)) {
        distancePerWeek = distancePerMonth / consts.numberOfWeeksInAMonth
        distancePerYear = distancePerMonth * 12
      } else {
        drivingDistance.calculated = false
        return
      }
    } else {
      throw Error(errMsg)
    }

    drivingDistance.calculated = true

    // always in the standard default unit defined for the country standards
    drivingDistance.perWeek = distancePerWeek
    drivingDistance.perMonth = distancePerMonth
    drivingDistance.perYear = distancePerYear
    drivingDistance.betweenHomeAndJob = distanceBetweenHomeAndJob
    drivingDistance.duringEachWeekend = distanceDuringEachWeekend

    // doesn't need to return because drivingDistance is a referece to calculatedData.drivingDistance
    // and calculatedData is global in this module
  }

  function calculateTimeSpentInDriving (timeSpentInDriving, details, inputFuel, inputDistance, inputTimeSpentInDriving) {
    // 'timeSpentInDriving' is assigned by reference and makes reference to calculatedData.timeSpentInDriving
    // 'details' is assigned by reference and makes reference to calculatedData.details
    // inputFuel, inputDistance and inputTimeSpentInDriving make reference to
    // inputData.inputFuel inputData.inputDistance and inputData.inputTimeSpentInDriving

    var errMsg = 'Error calculating Time Spent In Driving'

    if (!timeSpentInDriving || !details || !inputFuel || !inputDistance || !inputTimeSpentInDriving) {
      consoleErrorPairs('timeSpentInDriving', timeSpentInDriving,
        'details', details,
        'inputFuel', inputFuel,
        'inputDistance', inputDistance,
        'inputTimeSpentInDriving', inputTimeSpentInDriving)
      throw Error(errMsg)
    }

    var minutesBetweenHomeAndJob, // time (in minutes) driven between home and job
      minutesInEachWeekend, // time (in minutes) driven during weekends
      minutesPerWeek, // time (in minutes) driven per week
      minutesPerDay, // time (in minutes) driven per day
      daysPerMonth, // number of days driven per month
      hoursPerMonth, // number of hours driven per month
      hoursPerYear, // number of hours driven per year
      daysPerWeekUserDrivesToJob,
      fuelTypeOfCalculation

    // the result shall be: "money", "distanceNoCarToJob" or "distanceCarToJob"
    fuelTypeOfCalculation = calculateMonthlyFuel(inputFuel).typeOfCalculation()

    // When user refers that "takes car to job", either in Fuel section (form part 2) or in Distance section (part 3).
    // In this situation, the form displays "option 1" in "Time Spent in Driving" section
    if (fuelTypeOfCalculation === 'distanceCarToJob' || inputDistance.considerCarToJob) {
      minutesBetweenHomeAndJob = inputTimeSpentInDriving.carToJob.minutesBetweenHomeAndJob
      minutesInEachWeekend = inputTimeSpentInDriving.carToJob.minutesDuringWeekend
      daysPerWeekUserDrivesToJob = parseInt(details.numberOfDaysPerWeekUserDrivesToJob, 10)

      if (areAllNumbersGreaterThanZero(minutesBetweenHomeAndJob, minutesInEachWeekend) &&
        isNumber(daysPerWeekUserDrivesToJob)) {
        /* if */
        minutesPerWeek = 2 * minutesBetweenHomeAndJob * daysPerWeekUserDrivesToJob + minutesInEachWeekend
        hoursPerMonth = consts.numberOfWeeksInAMonth * minutesPerWeek / 60
        minutesPerDay = minutesPerWeek / 7
        daysPerMonth = consts.numberOfWeeksInAMonth * ((minutesInEachWeekend > 0 ? 2 : 0) + daysPerWeekUserDrivesToJob)
        hoursPerYear = hoursPerMonth * 12
      } else {
        timeSpentInDriving.calculated = false
        return
      }
    } else {
      minutesPerDay = inputTimeSpentInDriving.noCarToJob.minutesPerDay
      daysPerMonth = inputTimeSpentInDriving.noCarToJob.daysPerMonth

      if (areAllNumbersGreaterThanZero(minutesPerDay, daysPerMonth)) {
        hoursPerMonth = minutesPerDay * daysPerMonth / 60
        minutesPerWeek = hoursPerMonth / consts.numberOfWeeksInAMonth * 60
        hoursPerYear = hoursPerMonth * 12
      } else {
        timeSpentInDriving.calculated = false
        return
      }
    }

    // sets object
    timeSpentInDriving.calculated = true

    timeSpentInDriving.minutesBetweenHomeAndJob = minutesBetweenHomeAndJob
    timeSpentInDriving.minutesInEachWeekend = minutesInEachWeekend
    timeSpentInDriving.minutesPerWeek = minutesPerWeek
    timeSpentInDriving.minutesPerDay = minutesPerDay
    timeSpentInDriving.daysPerMonth = daysPerMonth
    timeSpentInDriving.hoursPerMonth = hoursPerMonth
    timeSpentInDriving.hoursPerYear = hoursPerYear

    // doesn't need to return because timeSpentInDriving is a referece to calculatedData.timeSpentInDriving
    // and calculatedData is global in this module
  }

  function calculateSpeeds (speeds, financialEffort, drivingDistance, timeSpentInDriving) {
    // speeds, financialEffort, drivingDistance and timeSpentInDriving are assigned by reference and make reference to
    // calculatedData.speeds, calculatedData.financialEffort, calculatedData.drivingDistance and calculatedData.timeSpentInDriving

    var errMsg = 'Error calculating Speeds'

    if (!speeds || !financialEffort || !drivingDistance || !timeSpentInDriving) {
      consoleErrorPairs('speeds', speeds,
        'financialEffort', financialEffort,
        'drivingDistance', drivingDistance,
        'timeSpentInDriving', timeSpentInDriving)
      throw Error(errMsg)
    }

    /* For more details on the Consumer Speed concept, check:
        https://en.wikipedia.org/wiki/Effects_of_the_car_on_societies#Private_or_internal_costs */
    var averageKineticSpeed,
      averageConsumerSpeed

    if (drivingDistance.calculated && timeSpentInDriving.calculated) {
      averageKineticSpeed = drivingDistance.perYear / timeSpentInDriving.hoursPerYear

      // Virtual/Consumer Speed calculated if info of Financial Effort is available
      if (financialEffort.calculated) {
        averageConsumerSpeed =
          drivingDistance.perYear / (timeSpentInDriving.hoursPerYear + financialEffort.workingHoursPerYearToAffordCar)
      }
    }

    // set object
    speeds.averageKineticSpeed = averageKineticSpeed
    speeds.averageConsumerSpeed = averageConsumerSpeed

    // doesn't need to return because speeds is a referece to calculatedData.speeds
    // and calculatedData is global in this module
  }

  function calculateExternalCosts (externalCosts, drivingDistance) {
    var errMsg = 'Error calculating External Costs'

    if (!externalCosts) {
      throw Error(errMsg)
    }

    if (!isNumber(drivingDistance.perMonth)) {
      externalCosts.calculated = false
      return
    }

    // by month, source: https://ec.europa.eu/transport/themes/sustainable/doc/2008_costs_handbook.pdf
    externalCosts.handbookOfeExternalCostsURL = 'http://ec.europa.eu/transport/themes/sustainable/doc/2008_costs_handbook.pdf'
    externalCosts.pollution = 0.005 // pollutants in €/km
    externalCosts.greenhouseGases = 0.007 // greenhouse gases in €/km
    externalCosts.noise = 0.004 // noise in €/km
    externalCosts.fatalities = 0.03 // traffic fatalities in €/km
    externalCosts.congestion = 0.1 // congestion in €/km
    externalCosts.infrastructure = 0.001 // infrastructures in €/km

    // converts distance unit to kilometres
    var distancePerMonthInKms = conversionsModule.convertDistanceToKm(drivingDistance.perMonth, calculatedData.standardUnits.distance)

    externalCosts.totalPerMonth = (externalCosts.pollution + externalCosts.greenhouseGases + externalCosts.noise +
            externalCosts.fatalities + externalCosts.congestion + externalCosts.infrastructure) * distancePerMonthInKms

    externalCosts.calculated = true
  }

  // gets uber object to compare uber costs with private car costs
  function calculateUberCosts (uberObj) {
    /* uberObj is an object with four properties:
        cost_per_distance, cost_per_minute, currency_code, distance_unit
    */

    // inputData is a global object, obtained from user HTML form or from database entry
    if (!inputData) {
      throw Error(errMsgDataCountry)
    }

    var uberNotCalculated = { calculated: false }

    // if public transporst information was not obtained from user
    if (!(calculatedData.publicTransports.calculated)) {
      return uberNotCalculated
    }

    // if distance information not available or zero
    if (!isDef(calculatedData.drivingDistance.perMonth)) {
      return uberNotCalculated
    }

    // checks if uberObj is an object
    if (!isObjectDefined(uberObj)) {
      return uberNotCalculated
    }

    // checks if the uber currency is the same as the user's
    if ((uberObj.currency_code).toUpperCase() !== (inputData.currency).toUpperCase()) {
      return uberNotCalculated
    }

    /* convert uber costs per uber unit distance TO uber costs per unit standard distance */
    var uberStandardDistanceUnit = conversionsModule.mapUnit('distance', (uberObj.distance_unit).toLowerCase())
    var uberCostPerUnitDistance = parseFloat(uberObj.cost_per_distance)
    var distancePerUberCostUnitCurrency = 1 / uberCostPerUnitDistance
    distancePerUberCostUnitCurrency = conversionsModule.convertDistanceFromTo(distancePerUberCostUnitCurrency,
      uberStandardDistanceUnit, calculatedData.standardUnits.distance)
    uberCostPerUnitDistance = 1 / distancePerUberCostUnitCurrency

    var totalUberCosts,
      publicTransportsCostsCombinedWithUber,
      distanceDoneWithUber,
      resultType // 1 or 2

    var uberCostPerMinute = parseFloat(uberObj.cost_per_minute)

    var drivingDistancePerMonth = calculatedData.drivingDistance.perMonth
    var minutesDrivenPerMonth = calculatedData.timeSpentInDriving.hoursPerMonth * 60
    var totalCarCostsPerMonth = calculatedData.costs.perMonth.total

    // total costs of uber for the same distance and time as the ones driven using private car
    // Total equivalent Uber Costs
    var uberCostsByFullyReplacingCarWithUber =
      uberCostPerUnitDistance * drivingDistancePerMonth + uberCostPerMinute * minutesDrivenPerMonth

    // 1st case, in which driver can replace every journey by uber
    // the remianing amount of money is used to further public transports
    if (uberCostsByFullyReplacingCarWithUber < totalCarCostsPerMonth) {
      resultType = 1

      publicTransportsCostsCombinedWithUber = totalCarCostsPerMonth - uberCostsByFullyReplacingCarWithUber
      totalUberCosts = uberCostsByFullyReplacingCarWithUber
      distanceDoneWithUber = drivingDistancePerMonth
    } else {
      // 2nd case, where replacing every distance (km, mile, etc.) with uber is more expensive
      // tries to combine uber with public transports less expensive per unit-distance

      resultType = 2

      // if public transports (with monthly pass) are not an option
      if (!calculatedData.publicTransports.toBeDisplayed) {
        return uberNotCalculated
      }

      // in this case, monthly passes for whole family
      publicTransportsCostsCombinedWithUber = calculatedData.publicTransports.totalCostsOfStandardPublicTransports

      // amount that is left to uber after public transports (monthly passes) are paid
      totalUberCosts = totalCarCostsPerMonth - publicTransportsCostsCombinedWithUber
      if (totalUberCosts < 0) {
        return uberNotCalculated
      }

      // how much distance (km or miles) can be done by uber with totalUberCosts amount of money
      var averageSpeedInDistancePerMinutes = calculatedData.speeds.averageKineticSpeed / 60 // convert, for ex. km/h to km/minute
      // the following formula results from solving and finding "distanceDoneWithUber" in the following equation:
      // totalUberCosts =  uberCostPerUnitDistance * distanceDoneWithUber + uberCostPerMinute * timeInMinutes
      // where: timeInMinutes = distanceDoneWithUber/ averageSpeedInDistancePerMinutes
      distanceDoneWithUber = totalUberCosts / (uberCostPerUnitDistance + uberCostPerMinute / averageSpeedInDistancePerMinutes)

      if (!isNumber(distanceDoneWithUber) || distanceDoneWithUber < 0) {
        return uberNotCalculated
      }
    }

    // object to be returned
    var uber = {
      calculated: true,
      resultType: resultType, // result type: 1 or 2
      uberCosts: {
        perUnitDistance: uberCostPerUnitDistance,
        perMinute: uberCostPerMinute,
        byFullyReplacingCarWithUber: uberCostsByFullyReplacingCarWithUber,
        total: totalUberCosts
      },
      publicTransportsCostsCombinedWithUber: publicTransportsCostsCombinedWithUber,
      uberStandardDistanceUnit: uberStandardDistanceUnit,
      distanceDoneWithUber: distanceDoneWithUber
    }

    calculatedData.uber = uber

    return uber
  }

  // ***************************** MAIN FUNCTION ************************
  function calculateCosts (inputDataObj) {
    // inputData is the raw input data, normally from user form, but also from a databse
    // calculateCosts returns the object "output"
    inputData = inputDataObj

    // the Order on which these functions are called is Important!
    // since they use data calculated from the previous function
    initializeCalculatedData()

    // calculates and verifies
    if (!calculateMonthlyCosts(calculatedData.costs, // object passed by reference
      calculatedData.details)) { // object passed by reference
      return null
    }

    if (inputData.publicTransports) {
      calculatePublicTransports(calculatedData.publicTransports, // object passed by reference
        inputData.publicTransports, // object passed by reference
        calculatedData.costs.perMonth.total) // value
    }

    if (inputData.income && inputData.workingTime) {
      calculateFinancialEffort(calculatedData.financialEffort, // object passed by reference (to be changed)
        inputData.income, // object passed by reference (read-only)
        inputData.workingTime, // object passed by reference (read-only)
        calculatedData.costs.totalPerYear) // value
    }

    if (inputData.distance) {
      calculateDrivingDistance(calculatedData.drivingDistance, // object passed by reference (to be changed)
        calculatedData.details, // object passed by reference (to be changed)
        inputData.fuel, // object passed by reference (read-only)
        inputData.distance) // object passed by reference (read-only)
    }

    if (inputData.distance) {
      calculateTimeSpentInDriving(calculatedData.timeSpentInDriving, // object passed by reference (to be changed)
        calculatedData.details, // object passed by reference (to be changed)
        inputData.fuel, // object passed by reference (read-only)
        inputData.distance, // object passed by reference (read-only)
        inputData.timeSpentInDriving) // object passed by reference (read-only)
    }

    calculateSpeeds(calculatedData.speeds, // object passed by reference (to be changed)
      calculatedData.financialEffort, // object passed by reference (read-only)
      calculatedData.drivingDistance, // object passed by reference (read-only)
      calculatedData.timeSpentInDriving) // object passed by reference (read-only)

    calculateExternalCosts(calculatedData.externalCosts, // object passed by reference (to be changed)
      calculatedData.drivingDistance) // object

    if (calculatedData.drivingDistance.perMonth) {
      // running costs per unit dist.
      calculatedData.costs.perUnitDistance.runningCosts = calculatedData.costs.perMonth.runningCosts /
                                                                calculatedData.drivingDistance.perMonth
      // total costs per unit dist.
      calculatedData.costs.perUnitDistance.totalCosts = calculatedData.costs.perMonth.total /
                                                              calculatedData.drivingDistance.perMonth
    }

    return calculatedData
  }

  /* ********************** AUXILIARY PRIVATE FUNCTIONS ****************************/

  function getMonthlyAmount (amountPerPeriod, period) {
    if (!isNumber(amountPerPeriod)) {
      throw Error('cost is not type number: ' + amountPerPeriod)
    }

    switch (period) {
      case 'month':
        return amountPerPeriod
      case 'twoMonths':
        return amountPerPeriod / 2
      case 'trimester':
        return amountPerPeriod / 3
      case 'semester':
        return amountPerPeriod / 6
      case 'year':
        return amountPerPeriod / 12
      default:
        throw Error('Error getting monthly cost')
    }
  }

  // this function is very important and checks if number is a finite valid number
  // no variable coercions, no bullshit, no string, no "1", no true, no NaN, no null, no 1/0, n must be a finite valid number
  // USE THIS FUNCTION, see https://stackoverflow.com/a/8526029/1243247
  function isNumber (n) {
    return typeof n === 'number' && !isNaN(n) && isFinite(n)
  }

  // check if all the input arguments are numbers; areAllNumbers(1,0,-1) => true, but areAllNumbers(1,1/0,-1) => false
  function areAllNumbers () {
    if (arguments.length === 0) {
      return false
    }

    for (var i = 0; i < arguments.length; i++) {
      if (!isNumber(arguments[i])) {
        return false
      }
    }
    return true
  }

  // check if all the input arguments are numbers greater than 0;
  // areAllNumbersGreaterThanZero(1, 0, 1) => false, but areAllNumbersGreaterThanZero(1, 0.1, 2) => true
  function areAllNumbersGreaterThanZero () {
    if (arguments.length === 0) {
      return false
    }

    for (var i = 0; i < arguments.length; i++) {
      if (!isNumber(arguments[i]) || arguments[i] <= 0) {
        return false
      }
    }
    return true
  }

  // check if number is integer
  function isInteger (n) {
    return isNumber(n) && (n === parseInt(n, 10))
  }

  // detects if a variable is defined and different from zero
  function isDef (variable) {
    return typeof variable !== 'undefined' && variable !== 0
  }

  function checkBoolean (variable) {
    if (typeof variable !== 'boolean') {
      throw Error('variable ' + variable + ' is not a boolean but a ' + typeof variable)
    }
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

  function consoleErrorPairs () {
    consoleError(''); consoleError('')
    for (var i = 0; i < arguments.length; i = i + 2) {
      if (typeof arguments[i + 1] === 'object') {
        consoleError('\'' + arguments[i] + '\'' + ' Object is:')
        consoleError(arguments[i + 1])
      } else {
        consoleError(arguments[i] + ': ' + arguments[i + 1])
      }
      consoleError('')
    }
  }

  /* === Public methods to be returned === */

  // thisModule, since this is a parent module and it may have been defined erlier by a children module
  thisModule.initialize = initialize

  thisModule.CreateCalculatedDataObj = CreateCalculatedDataObj
  thisModule.differenceBetweenDates = differenceBetweenDates
  thisModule.calculateCosts = calculateCosts
  thisModule.calculateUberCosts = calculateUberCosts

  return thisModule
})(autocosts.calculatorModule || {})

// check for node.js
if (typeof window === 'undefined') {
  module.exports = autocosts.calculatorModule
}
