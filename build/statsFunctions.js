
const path = require('path')
const commons = require(path.join(__dirname, '..', 'commons'))
const fileNames = commons.getFileNames()

const transferData = require(fileNames.project['transferData.js'])
const conversions = require(fileNames.project['conversions.js'])
const calculator = require(fileNames.project['calculator.js'])
calculator.initialize()
transferData.initialize()

// statistics outlier removal constants
var statsConstants = {
  MIN_TIME_TO_FILL_FORM: 90, // minimum time to fill form shall be 90 seconds, before which is considered spam-bot

  // speed
  MAX_AVERAGE_SPEED: 120, // applies both for mph and km/h
  // fuel
  MAX_EUR_PER_LITRE_FUEL: 10,
  MAX_FUEL_EFF_L100KM: 50,
  // maximum distances
  MAX_KM_DRIVEN_BETWEEN_HOME_AND_WORK: 250,
  MAX_KM_DRIVEN_WEEKEND: 500,
  MAX_KM_DRIVEN_PER_MONTH: 10000,
  // depreciation
  MAX_CAR_AGE_MONTHS: 600,
  MAX_EUR_CAR_VALUE: 100000,

  MAX_EUR_MONTHLY: {
    depreciation: 800,
    insurance: 900,
    credit: 150,
    inspection: 250,
    roadTaxes: 250,
    fuel: 950,
    maintenance: 250,
    repairsImprovements: 250,
    parking: 250,
    tolls: 250,
    fines: 150,
    washing: 150
  },

  MIN_EUR_MONTHLY: {
    INSURANCE: 3,
    TAXES: 3,
    MAINTENANCE: 3
  },

  MAX_EUR_INCOME_PER_HOUR: 500,
  MAX_HOURS_DRIVE_PER_YEAR: 20 * 365
}

//* **************************************************************************************
// this functions calculates the avearge of the averages of the same user inputs for a corresponding country
function calculateStatisticsForADefinedCountry (userIds, countryData, countryObj, fx) {
//    userIds     => is a matrix with 2 columns, the 1st column has a unique user ID (uuid_client), the 2nd column has always the same country
//    countryData => is a matrix with everything for the specific country
//    countryObj  => is a country object whose average is being calculated
//    fx          => is the currency conversion object
// userIds.length is smaller than countryData.length, because some users fill in more than one time

  // object to be output as result
  var averageCalculatedData

  if (userIds.length !== 0 && countryData.length !== 0) {
    // array with unique users, having one element per different user
    var temp_i = [] // eslint-disable-line camelcase
    // array having the several inputs from the same user
    var temp_j = [] // eslint-disable-line camelcase

    for (var i = 0; i < userIds.length; i++) {
      for (var j = 0, n = 0; j < countryData.length; j++) {
        if (countryData[j].uuid_client === userIds[i].uuid_client) {
          // checks if the entry is ok
          // and if it is an input spam/bot
          // (the time to fill the form for the first input mus be greater than a time value)
          // console.log("(i,j)=("+i+","+j+")"); console.log(countryData[j]);console.log(countryObj);

          let wasEnoughTimeFillingTheForm = countryData[j].time_to_fill_form > statsConstants.MIN_TIME_TO_FILL_FORM

          if (isUserDataEntryOk(countryData[j], countryObj) &&
                       /* just checks if was enough time, on the first calculation from the same user */
                       ((n === 0 && wasEnoughTimeFillingTheForm) || n > 0)
          ) {
            let userData = transferData.createUserDataObjectFromDatabase(countryData[j])
            let calculatedData = calculator.calculateCosts(userData, countryObj)
            // console.log("(i,j)=("+i+","+j+")");console.log(countryObj);console.log(calculatedData);

            // checks if the calculatedData is an outlier
            if (isCalculatedDataOk(calculatedData, countryObj, fx)) {
              // console.log("i:"+i+"; j:"+j+"; n:"+n+"; time_to_fill_form:"+countryData[j].time_to_fill_form);
              temp_j.push(calculatedData)
              n++
            }
          }
        }
      }

      if (temp_j.length) {
        temp_i.push(getAverageCosts(temp_j))
      }
      temp_j = [] // eslint-disable-line camelcase
    }

    // if the array with the average results is empty
    if (temp_i.length === 0) {
      averageCalculatedData = calculator.CreateCalculatedDataObj()
      averageCalculatedData.validUsers = 0
    } else {
      averageCalculatedData = getAverageCosts(temp_i)
      averageCalculatedData.validUsers = temp_i.length
    }
  } else {
    averageCalculatedData = calculator.CreateCalculatedDataObj()
    averageCalculatedData.validUsers = 0
  }

  // console.log(output);
  averageCalculatedData.countryCode = countryObj.code
  return averageCalculatedData
}

// Gets the average of array of Objects
// calculatedDataArray is an array of objects following the structure:
// https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function#output
// this function should be able to feed itself, that is, the returned object must be valid as a function parameter
function getAverageCosts (calculatedDataArray) {
  var i, key, financialEffortCounter, drivingDistanceCounter, timeSpentInDrivingCounter

  var length = calculatedDataArray.length

  if (length <= 0) {
    return null
  }
  // from here length must be >=1

  // object to be returned by this function
  var averageCalculatedData = calculator.CreateCalculatedDataObj()

  // If the length is greater than 1, finds the average of variables whose function is linear, such as Costs
  // Costs are linear functions because they are of the type f(x,y,z)=a*x+b*y+c*z, and therefore
  // the average of the functions is equal to the function of the averages, that is
  // (f(x1,y1,z1) + f(x2,y2,z2))/2 = f((x1+x2))/2,(y1+y2))/2,(z1+z2))/2 and therefore
  // we just sum all the entries of the array, and divide by the number of items (length of the array)

  // the sum of all items, for dividing afterwards by its length, to get the average
  var calculatedSum = calculator.CreateCalculatedDataObj()

  // initialize cost items to zero, for the sum to be made
  for (key of Object.keys(calculatedSum.costs.perMonth.items)) {
    calculatedSum.costs.perMonth.items[key] = 0
  }
  calculatedSum.costs.perMonth.standingCosts = 0
  calculatedSum.costs.perMonth.runningCosts = 0
  calculatedSum.costs.perMonth.total = 0
  calculatedSum.costs.totalPerYear = 0

  // calculates the sums, such that it can compute averages, dividing by the number of items (length)
  for (i = 0, financialEffortCounter = 0, drivingDistanceCounter = 0, timeSpentInDrivingCounter = 0;
    i < length;
    i++) {
    for (key of Object.keys(calculatedDataArray[i].costs.perMonth.items)) {
      calculatedSum.costs.perMonth.items[key] += calculatedDataArray[i].costs.perMonth.items[key]
    }

    calculatedSum.costs.perMonth.standingCosts += calculatedDataArray[i].costs.perMonth.standingCosts
    calculatedSum.costs.perMonth.runningCosts += calculatedDataArray[i].costs.perMonth.runningCosts
    calculatedSum.costs.perMonth.total += calculatedDataArray[i].costs.perMonth.total
    calculatedSum.costs.totalPerYear += calculatedDataArray[i].costs.totalPerYear

    // some calculatedData have no financial effort info, because they are optional
    if (calculatedDataArray[i].financialEffort.calculated) {
      // for the first time puts variables to zero
      if (financialEffortCounter === 0) {
        for (key of Object.keys(calculatedSum.financialEffort.income)) {
          calculatedSum.financialEffort.income[key] = 0
        }
      }

      // filters out outliers by aver_income_per_hour, it should be a number x: 0<x<Inf
      let averageIncomePerHour = calculatedDataArray[i].financialEffort.income.averagePerHour
      if (!isNaN(averageIncomePerHour) && averageIncomePerHour > 0 && isFinite(averageIncomePerHour)) {
        for (key of Object.keys(calculatedDataArray[i].financialEffort.income)) {
          calculatedSum.financialEffort.income[key] += calculatedDataArray[i].financialEffort.income[key]
        }

        financialEffortCounter++
      }
    }

    // Driving Distance may, in some cases, not be calculated (form part 3 is optional)
    if (calculatedDataArray[i].drivingDistance.calculated) {
      if (drivingDistanceCounter === 0) {
        calculatedSum.drivingDistance.perMonth = 0
        calculatedSum.drivingDistance.perYear = 0
      }

      calculatedSum.drivingDistance.perMonth += calculatedDataArray[i].drivingDistance.perMonth
      calculatedSum.drivingDistance.perYear += calculatedDataArray[i].drivingDistance.perYear

      drivingDistanceCounter++
    }

    // Time spent in Driving may, in some cases, not be calculated (form part 3 is optional)
    if (calculatedDataArray[i].timeSpentInDriving.calculated) {
      if (timeSpentInDrivingCounter === 0) {
        calculatedSum.timeSpentInDriving.hoursPerYear = 0
      }

      calculatedSum.timeSpentInDriving.hoursPerYear += calculatedDataArray[i].timeSpentInDriving.hoursPerYear

      timeSpentInDrivingCounter++
    }
  }// for

  /***********************************************************************************************************/
  // Now, it has the sums in calculatedSum, it can calculate averages by divinding by respective length/counters

  for (key of Object.keys(averageCalculatedData.costs.perMonth.items)) {
    averageCalculatedData.costs.perMonth.items[key] = calculatedSum.costs.perMonth.items[key] / length
  }

  averageCalculatedData.costs.perMonth.standingCosts = calculatedSum.costs.perMonth.standingCosts / length
  averageCalculatedData.costs.perMonth.runningCosts = calculatedSum.costs.perMonth.runningCosts / length
  averageCalculatedData.costs.perMonth.total = calculatedSum.costs.perMonth.total / length
  averageCalculatedData.costs.totalPerYear = calculatedSum.costs.totalPerYear / length

  // financial effort, if available
  if (financialEffortCounter > 0) {
    averageCalculatedData.financialEffort.calculated = true

    for (key of Object.keys(averageCalculatedData.financialEffort.income)) {
      averageCalculatedData.financialEffort.income[key] = calculatedSum.financialEffort.income[key] / financialEffortCounter
    }

    // some variables have no linear calculation formulas, i.e.,
    // the average of the functions is different from the fuction of the averages, and as such
    // the functions/operations must be performed, after having the averages of linear variables
    averageCalculatedData.financialEffort.workingHoursPerYearToAffordCar =
            averageCalculatedData.costs.totalPerYear / averageCalculatedData.financialEffort.income.averagePerHour

    averageCalculatedData.financialEffort.daysForCarToBePaid =
            averageCalculatedData.costs.totalPerYear / averageCalculatedData.financialEffort.income.perYear * 365.25

    averageCalculatedData.financialEffort.workingMonthsPerYearToAffordCar =
            averageCalculatedData.costs.totalPerYear / averageCalculatedData.financialEffort.income.perYear * 12
  }

  if (drivingDistanceCounter > 0) {
    averageCalculatedData.drivingDistance.calculated = true
    averageCalculatedData.drivingDistance.perMonth = calculatedSum.drivingDistance.perMonth / drivingDistanceCounter
    averageCalculatedData.drivingDistance.perYear = calculatedSum.drivingDistance.perYear / drivingDistanceCounter

    averageCalculatedData.costs.perUnitDistance.runningCosts =
            averageCalculatedData.costs.perMonth.runningCosts * 12 / averageCalculatedData.drivingDistance.perYear

    averageCalculatedData.costs.perUnitDistance.totalCosts = averageCalculatedData.costs.totalPerYear / averageCalculatedData.drivingDistance.perYear
  }

  if (timeSpentInDrivingCounter > 0 && drivingDistanceCounter > 0) {
    averageCalculatedData.timeSpentInDriving.calculated = true
    averageCalculatedData.timeSpentInDriving.hoursPerYear = calculatedSum.timeSpentInDriving.hoursPerYear / timeSpentInDrivingCounter
    averageCalculatedData.speeds.averageKineticSpeed = averageCalculatedData.drivingDistance.perYear / averageCalculatedData.timeSpentInDriving.hoursPerYear
  }

  if (financialEffortCounter > 0 && timeSpentInDrivingCounter > 0 && drivingDistanceCounter > 0) {
    averageCalculatedData.speeds.averageConsumerSpeed = averageCalculatedData.drivingDistance.perYear /
            (averageCalculatedData.timeSpentInDriving.hoursPerYear + averageCalculatedData.financialEffort.workingHoursPerYearToAffordCar)
  }

  return averageCalculatedData
}

//* *********************************************************************
//* *********************************************************************
// checks whether the database entry is valid
function isUserDataEntryOk (dbEntry, countryObj) {
  if (!dbEntry.time_to_fill_form || !dbEntry.uuid_client || !dbEntry.country) {
    return false
  }

  var today = new Date()
  var acquisitionDate = new Date(dbEntry.acquisition_year, dbEntry.acquisition_month - 1)
  var ageOfCarInMonths = calculator.differenceBetweenDates(acquisitionDate, today)

  if (dbEntry.acquisition_year && dbEntry.acquisition_month) {
    if (isNaN(ageOfCarInMonths) || ageOfCarInMonths <= 0 ||
      ageOfCarInMonths > statsConstants.MAX_CAR_AGE_MONTHS) {
      return false
    }
  } else {
    return false
  }

  // depreciation must be positive
  if ((isNaN(dbEntry.commercial_value_at_acquisition) || isNaN(dbEntry.commercial_value_at_now)) ||
        (Number(dbEntry.commercial_value_at_acquisition) < Number(dbEntry.commercial_value_at_now))) {
    return false
  }

  // insurance
  if (!dbEntry.insure_type || isNaN(dbEntry.insurance_value)) {
    return false
  }

  // credit
  if (dbEntry.credit === 'true' && (isNaN(dbEntry.credit_number_installments) ||
                                     isNaN(dbEntry.credit_amount_installment) ||
                                     isNaN(dbEntry.credit_residual_value) ||
                                     isNaN(dbEntry.credit_borrowed_amount))) {
    return false
  }

  // inspection
  if (isNaN(dbEntry.inspection_number_inspections) || isNaN(dbEntry.inspection_average_inspection_cost)) {
    return false
  }

  // car taxes
  if (isNaN(dbEntry.vehicle_excise_tax)) {
    return false
  }

  // fuel & distance
  switch (dbEntry.fuel_calculation) {
    case 'km'/* old versions support */:
    case 'distance':

      if (isNaN(dbEntry.fuel_distance_based_fuel_efficiency) || isNaN(dbEntry.fuel_distance_based_fuel_price)) {
        return false
      }

      // remove outliers
      if (conversions.convertFuelEfficiencyToL100km(dbEntry.fuel_distance_based_fuel_efficiency, countryObj.fuel_efficiency_std) >
                statsConstants.MAX_FUEL_EFF_L100KM) {
        return false
      }

      switch (dbEntry.fuel_distance_based_car_to_work) {
        case 'true':

          if (isNaN(dbEntry.fuel_distance_based_car_to_work_distance_home_work) ||
                       isNaN(dbEntry.fuel_distance_based_car_to_work_distance_weekend) ||
                       isNaN(dbEntry.fuel_distance_based_car_to_work_number_days_week)) {
            return false
          }

          // remove outliers
          if (conversions.convertDistanceToKm(dbEntry.fuel_distance_based_car_to_work_distance_home_work, countryObj.distance_std) >
                        statsConstants.MAX_KM_DRIVEN_BETWEEN_HOME_AND_WORK) {
            return false
          }

          if (conversions.convertDistanceToKm(dbEntry.fuel_distance_based_car_to_work_distance_weekend, countryObj.distance_std) >
                        statsConstants.MAX_KM_DRIVEN_WEEKEND) {
            return false
          }

          break

        case 'false':

          if (isNaN(dbEntry.fuel_distance_based_no_car_to_work_distance)) {
            return false
          }

          break

        default:
          return false
      }

      break

    case 'money':
    case 'euros'/* old versions support */:

      if (isNaN(dbEntry.fuel_currency_based_currency_value)) {
        return false
      }

      switch (dbEntry.distance_drive_to_work) {
        case 'true':
          if (isNaN(dbEntry.distance_days_per_week) || isNaN(dbEntry.distance_home_job) || isNaN(dbEntry.distance_journey_weekend)) {
            return false
          }

          break

        case 'false':
          if (isNaN(dbEntry.distance_per_month)) {
            return false
          }

          break

        default:
          return false
      }

      break

    default:
      return false
  }

  // maintenance
  if (isNaN(dbEntry.maintenance)) {
    return false
  }

  // repairs and improvements
  if (isNaN(dbEntry.repairs)) {
    return false
  }

  // parking
  if (isNaN(dbEntry.parking)) {
    return false
  }

  // tolls
  switch (dbEntry.tolls_daily) {
    case 'false':
      if (isNaN(dbEntry.tolls_no_daily_value)) {
        return false
      }
      break
    case 'true':
      if (isNaN(dbEntry.tolls_daily_expense) || isNaN(dbEntry.tolls_daily_number_days)) {
        return false
      }
      break
    default:
      return false
  }

  // fines
  if (isNaN(dbEntry.tickets_value)) {
    return false
  }

  // washing
  if (isNaN(dbEntry.washing_value)) {
    return false
  }

  // hours
  if (dbEntry.distance_drive_to_work === 'true' || dbEntry.fuel_distance_based_car_to_work === 'true') {
    if (isNaN(dbEntry.time_spent_home_job) || isNaN(dbEntry.time_spent_weekend)) {
      return false
    }
  } else {
    if (isNaN(dbEntry.time_spent_min_drive_per_day) || isNaN(dbEntry.time_spent_days_drive_per_month)) {
      return false
    }
  }

  return true
}

// checks if the computed calculatedData was OK and is not an outlier
// for the typeof "calculatedData" see: https://github.com/jfoclpf/autocosts/wiki/Calculate-Costs-core-function#output
function isCalculatedDataOk (calculatedData, countryObj, fx) {
  if (!calculatedData) {
    return false
  }

  var monthlyCosts = calculatedData.costs.perMonth.items
  var currency = countryObj.currency

  for (let monthlyItem in monthlyCosts) {
    if (!isFinite(monthlyCosts[monthlyItem])) {
      return false
    }
  }

  // kinetic speed and virtual/consumer speed
  if (calculatedData.drivingDistance.calculated && calculatedData.timeSpentInDriving.calculated) {
    let kineticSpeed = calculatedData.speeds.averageKineticSpeed

    if (!isFinite(kineticSpeed)) {
      return false
    }

    if (kineticSpeed > statsConstants.MAX_AVERAGE_SPEED) {
      return false
    }

    if (calculatedData.financialEffort.calculated) {
      let consumerSpeed = calculatedData.speeds.averageConsumerSpeed

      if (!isFinite(consumerSpeed) || consumerSpeed <= 0) {
        return false
      }
    }
  }

  // distance per month
  if (calculatedData.driving_distance_calculated) {
    var distancePerMonthKm = conversions.convertDistanceToKm(calculatedData.distance_per_month, countryObj.distance_std)
    if (distancePerMonthKm > statsConstants.MAX_KM_DRIVEN_PER_MONTH) {
      return false
    }
  }

  if (calculatedData.drivingDistance.calculated && calculatedData.financialEffort.calculated) {
    if (countryObj.currency === 'EUR' && calculatedData.financialEffort.income.averagePerHour > statsConstants.MAX_EUR_INCOME_PER_HOUR) {
      return false
    }
  }

  if (calculatedData.timeSpentInDriving.calculated) {
    if (calculatedData.timeSpentInDriving.hoursPerYear > statsConstants.MAX_HOURS_DRIVE_PER_YEAR) {
      return false
    }
  }

  if (currency === 'EUR') {
    for (let monthlyItem in monthlyCosts) {
      if (monthlyCosts[monthlyItem] > statsConstants.MAX_EUR_MONTHLY[monthlyItem]) {
        return false
      }
    }
  } else if (fx) {
    for (let monthlyItem in monthlyCosts) {
      if (fx(monthlyCosts[monthlyItem]).from(currency).to('EUR') > statsConstants.MAX_EUR_MONTHLY[monthlyItem]) {
        return false
      }
    }
  }

  return true
}

// node module exports
module.exports = {
  calculateStatisticsForADefinedCountry: calculateStatisticsForADefinedCountry,
  isUserDataEntryOk: isUserDataEntryOk,
  statsConstants: statsConstants
}
