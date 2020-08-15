
const path = require('path')
const commons = require(path.join(__dirname, '..', 'commons'))
const fileNames = commons.getFileNames()

const convertData = require(fileNames.project['convertData.js'])
const validateData = require(fileNames.project['validateData.js'])
const conversions = require(fileNames.project['conversions.js'])
const calculator = require(fileNames.project['calculator.js'])
convertData.initialize()
validateData.initialize()
calculator.initialize()

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
function calculateStatisticsForADefinedCountry (userIds, countryData, countryInfo, fx) {
//    userIds     => is a matrix with 2 columns, the 1st column has a unique user ID (uuid_client), the 2nd column has always the same country
//    countryData => is a matrix with everything for the specific country
//    countryInfo => object with country code, currency, standard distance, etc.
//    fx          => is the currency conversion object
// userIds.length is smaller than countryData.length, because some users fill in more than one time

  // object to be output as result
  var averageCalculatedData
  var numberOfUsers = userIds.length

  if (numberOfUsers !== 0 && countryData.length !== 0) {
    // array with unique users, having one element per different user
    var temp_i = [] // eslint-disable-line camelcase
    // array having the several inputs from the same user
    var temp_j = [] // eslint-disable-line camelcase

    var Bar = commons.getProgressBar(numberOfUsers)
    for (var i = 0; i < numberOfUsers; i++) {
      Bar.tick(1, { info: `${countryInfo.code} ${i + 1}/${numberOfUsers}` })
      for (var j = 0, n = 0; j < countryData.length; j++) {
        if (countryData[j].uuid_client && (countryData[j].uuid_client === userIds[i].uuid_client)) {
          // checks if the entry is ok
          // and if it is an input spam/bot
          // (the time to fill the form for the first input mus be greater than a time value)
          // console.log("(i,j)=("+i+","+j+")"); console.log(countryData[j]);console.log(countryInfo);

          /* check if relevant information is on database user entry */
          let isUserDataEntryOk = countryData[j].time_to_fill_form && countryData[j].country

          /* checks if was enough time, on the first calculation from the same user */
          const wasEnoughTimeFillingTheForm = parseFloat(countryData[j].time_to_fill_form) > statsConstants.MIN_TIME_TO_FILL_FORM
          isUserDataEntryOk = isUserDataEntryOk && ((n === 0 && wasEnoughTimeFillingTheForm) || n > 0)

          if (isUserDataEntryOk) {
            const userData = convertData.createUserDataObjectFromDatabase(countryData[j], countryInfo)
            validateData.setUserData(userData)
            isUserDataEntryOk = validateData.isUserDataFormPart1_Ok() && validateData.isUserDataFormPart2_Ok()

            if (isUserDataEntryOk) {
              const calculatedData = calculator.calculateCosts(userData)
              // console.log("(i,j)=("+i+","+j+")");console.log(countryInfo);console.log(calculatedData);

              // checks if the calculatedData is an outlier
              if (isCalculatedDataOk(calculatedData, userData, fx)) {
                // console.log("i:"+i+"; j:"+j+"; n:"+n+"; time_to_fill_form:"+countryData[j].time_to_fill_form);
                temp_j.push(calculatedData)
                n++
              }
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
  averageCalculatedData.countryCode = countryInfo.code
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
      const averageIncomePerHour = calculatedDataArray[i].financialEffort.income.averagePerHour
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

// *************************************************************************************************
// analyses the database entry and the computed calculatedData to check if user represents an outlier
function isCalculatedDataOk (calculatedData, userData, fx) {
  // userData before calculation
  if (userData.fuel.typeOfCalculation === 'distance') {
    const fuelDistanceBased = userData.fuel.distanceBased

    if (conversions.convertFuelEfficiencyToL100km(
      fuelDistanceBased.fuelEfficiency,
      fuelDistanceBased.fuelEfficiencyStandard) >
      statsConstants.MAX_FUEL_EFF_L100KM) {
      return false
    }

    if (userData.fuel.distanceBased.considerCarToJob) {
      if (conversions.convertDistanceToKm(
        fuelDistanceBased.carToJob.distanceBetweenHomeAndJob,
        fuelDistanceBased.carToJob.distanceStandardUnit) >
        statsConstants.MAX_KM_DRIVEN_BETWEEN_HOME_AND_WORK) {
        return false
      }

      if (conversions.convertDistanceToKm(
        fuelDistanceBased.carToJob.distanceDuringWeekends,
        fuelDistanceBased.carToJob.distanceStandardUnit) >
          statsConstants.MAX_KM_DRIVEN_WEEKEND) {
        return false
      }
    }
  }

  // calculatedData
  if (!calculatedData) {
    return false
  }

  if (calculatedData.details.ageOfCarInMonths > statsConstants.MAX_CAR_AGE_MONTHS) {
    return false
  }

  var monthlyCosts = calculatedData.costs.perMonth.items
  var currency = userData.currency

  for (const monthlyItem in monthlyCosts) {
    if (!isFinite(monthlyCosts[monthlyItem])) {
      return false
    }
  }

  // depreciation must be positive, because classic vehicles are outliers
  if (monthlyCosts.depreciation < 0) {
    return false
  }

  // kinetic speed and virtual/consumer speed
  if (calculatedData.drivingDistance.calculated && calculatedData.timeSpentInDriving.calculated) {
    const kineticSpeed = calculatedData.speeds.averageKineticSpeed

    if (!isFinite(kineticSpeed)) {
      return false
    }

    if (kineticSpeed > statsConstants.MAX_AVERAGE_SPEED) {
      return false
    }

    if (calculatedData.financialEffort.calculated) {
      const consumerSpeed = calculatedData.speeds.averageConsumerSpeed

      if (!isFinite(consumerSpeed) || consumerSpeed <= 0) {
        return false
      }
    }
  }

  // distance per month
  if (calculatedData.driving_distance_calculated) {
    var distancePerMonthKm = conversions.convertDistanceToKm(
      calculatedData.distance_per_month,
      calculatedData.drivingDistance.standardUnit)
    if (distancePerMonthKm > statsConstants.MAX_KM_DRIVEN_PER_MONTH) {
      return false
    }
  }

  if (calculatedData.drivingDistance.calculated && calculatedData.financialEffort.calculated) {
    if (currency === 'EUR' && calculatedData.financialEffort.income.averagePerHour > statsConstants.MAX_EUR_INCOME_PER_HOUR) {
      return false
    }
  }

  if (calculatedData.timeSpentInDriving.calculated) {
    if (calculatedData.timeSpentInDriving.hoursPerYear > statsConstants.MAX_HOURS_DRIVE_PER_YEAR) {
      return false
    }
  }

  // maximum allowed monthly costs per type
  if (currency === 'EUR') {
    for (const monthlyItem in monthlyCosts) {
      if (monthlyCosts[monthlyItem] < 0 || monthlyCosts[monthlyItem] > statsConstants.MAX_EUR_MONTHLY[monthlyItem]) {
        return false
      }
    }
  } else if (fx) {
    for (const monthlyItem in monthlyCosts) {
      if (monthlyCosts[monthlyItem] < 0 ||
        fx(monthlyCosts[monthlyItem]).from(currency).to('EUR') > statsConstants.MAX_EUR_MONTHLY[monthlyItem]) {
        /* if */
        return false
      }
    }
  }

  return true
}

// node module exports
module.exports = {
  calculateStatisticsForADefinedCountry: calculateStatisticsForADefinedCountry,
  statsConstants: statsConstants
}
