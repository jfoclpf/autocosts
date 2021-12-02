// uses selenyum webdriver to validate front-end
// see https://www.selenium.dev/selenium/docs/api/javascript/index.html

/* jslint esversion: 8 */

const path = require('path')
const async = require('async')
const { Builder, By, /* Key , */ until } = require('selenium-webdriver')

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')

let driver // webdriver from selenium
const settings = commons.getSettings()
const directories = commons.getDirectories()

console.log('Running script ' + path.relative(directories.server.root, __filename))
console.log('Validating User Front-end with selenyum webdriver...')

// http server that is run locally on localhost, to serve the website's files
const testServer = require('./testServer')

async.series([startsHttpServer, validateFrontend],
  // done after execution of above funcitons
  function (err, results) {
    testServer.closeServer()
    if (err) {
      console.error(Error(err))
      process.exitCode = 1
    } else {
      console.log('Frontend test ran OK'.green)
      process.exitCode = 0
    }
  }
)

// they are all strings because the input type is text in front end
const userDataForTest = {
  countryCode: 'US',
  currency: 'USD',
  depreciation: {
    dateOfAcquisition: {
      month: 5,
      year: 2001,
      valueOfTheVehicle: 25000
    },
    dateOfUserInput: {
      month: 2,
      year: 2020,
      valueOfTheVehicle: 5000
    }
  },
  insurance: {
    amountPerPeriod: 200,
    period: 'month'
  },
  credit: {
    creditBool: true,
    yesCredit: {
      borrowedAmount: 15000,
      numberInstallments: 48,
      amountInstallment: 350,
      residualValue: 0
    }
  },
  inspection: {
    averageInspectionCost: 120,
    numberOfInspections: 15
  },
  roadTaxes: {
    amountPerYear: 120
  },
  // Form Part 2
  fuel: {
    typeOfCalculation: 'distance', // type string: "money" or "distance"
    currencyBased: {
      amountPerPeriod: 5000,
      period: 'semester' // type string: "month", "twoMonths",  "trimester", "semester", "year"
    },
    distanceBased: {
      considerCarToJob: true, // boolean
      carToJob: {
        daysPerWeek: 5,
        distanceBetweenHomeAndJob: 15,
        distanceDuringWeekends: 30,
        distanceStandardUnit: 'mi' // standard distance for current country: "km", "mil" or "mil(10km)"
      },
      noCarToJob: {
        distancePerPeriod: null,
        period: null, // type string: "month", "twoMonths",  "trimester", "semester", "year"
        distanceStandardUnit: null // type string: "km", "mil" or "mil(10km)"
      },
      fuelEfficiency: 25, // fuel efficiency of the vehicle
      fuelEfficiencyStandard: 'mpg(US)', // type string; "ltr/100km", "mpg(US)", etc.
      fuelPrice: 2.5, // type number; currency per unit of volume standard. Ex: 1.4, that is 1.4 EUR / ltr
      fuelPriceVolumeStandard: 'gal(US)' // type string: 'ltr', 'gal(UK)', 'gal(US)'
    }
  },
  maintenance: {
    amountPerYear: 700
  },
  repairsImprovements: {
    amountPerYear: 200
  },
  parking: {
    amountPerMonth: 14
  },
  tolls: {
    calculationBasedOnDay: true, // true or false
    yesBasedOnDay: {
      amountPerDay: 2.5,
      daysPerMonth: 22
    },
    noBasedOnDay: {
      amountPerPeriod: null,
      period: null // type string: "month", "twoMonths",  "trimester", "semester", "year"
    }
  },
  fines: {
    amountPerPeriod: 40,
    period: 'year' // type string: "month", "twoMonths",  "trimester", "semester", "year"
  },
  washing: {
    amountPerPeriod: 110,
    period: 'year' // type string: "month", "twoMonths",  "trimester", "semester", "year"
  }
}

function validateFrontend (callback) {
  const url = `http://localhost:${settings.HTTPport}/${userDataForTest.countryCode}`;

  (async function () {
    driver = await new Builder().forBrowser('firefox').build()
    try {
      await driver.get(url)

      // click Main [Calculate button] on entry page
      await clickButtonById('calculateButton')

      const d = userDataForTest.depreciation
      await setElementValue('acquisitionMonth', d.dateOfAcquisition.month)
      await setElementValue('acquisitionYear', d.dateOfAcquisition.year)
      await setElementValue('commercialValueAtAcquisition', d.dateOfAcquisition.valueOfTheVehicle)
      await setElementValue('commercialValueAtNow', d.dateOfUserInput.valueOfTheVehicle)

      await clickVisibleOrangeBtn()

      const insurance = userDataForTest.insurance
      await setElementValue('insuranceValue', insurance.amountPerPeriod)

      await clickVisibleOrangeBtn()

      await clickVisibleOrangeBtn()

      const inspection = userDataForTest.inspection
      await setElementValue('numberInspections', inspection.numberOfInspections)
      await setElementValue('averageInspectionCost', inspection.averageInspectionCost)

      await clickVisibleOrangeBtn()

      const roadTaxes = userDataForTest.roadTaxes
      await setElementValue('roadTaxes', roadTaxes.amountPerYear)

      await clickVisibleOrangeBtn()

      const fuel = userDataForTest.fuel
      if (fuel.typeOfCalculation === 'money') {
        await clickButtonById('radio_fuel_euros')
        await setElementValue('fuel_currency_value', fuel.currencyBased.amountPerPeriod)
        await setElementValue('fuel_currency_time_period', fuel.currencyBased.period, 'select')
      } else if (fuel.typeOfCalculation === 'distance') {
        await clickButtonById('radio_fuel_km')
        if (fuel.distanceBased.considerCarToJob) {
          await clickButtonById('car_job_form2_yes')
          const carToJob = fuel.distanceBased.carToJob
          await setElementValue('car_to_work_number_days_week', carToJob.daysPerWeek)
          await setElementValue('car_to_work_distance_home_work', carToJob.distanceBetweenHomeAndJob)
          await setElementValue('car_to_work_distance_weekend', carToJob.distanceDuringWeekends)
        } else {
          await clickButtonById('car_job_form2_no')
        }
      } else {
        throw Error('Invalid option in fuel: ' + fuel.typeOfCalculation)
      }

      callback()
    } catch (err) {
      console.error(err)
      callback(Error(err))
    } finally {
      // await driver.quit()
    }
  })()
}

function clickButtonById (id) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const btn = await driver.findElement(By.id(id))
        await btn.click()
        resolve()
      } catch (err) {
        console.error(err, '\nOn element with id: ' + id)
        reject(Error(err))
      }
    })()
  })
}

function setElementValue (id, value, eleType) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        driver.wait(until.elementLocated(By.id(id)), 5000)
        const ele = await driver.findElement(By.id(id))
        await driver.wait(until.elementIsVisible(ele), 5000)
        if (!eleType || eleType === 'input') {
          await ele.clear()
          await ele.sendKeys('value', value)
        } else if (eleType === 'select') {
          await ele.sendKeys(value)
        }
        resolve(ele)
      } catch (err) {
        console.error(err)
        reject(Error(err))
      }
    })()
  })
}

// check for all orange buttons and then wait 0.4 second for them to appear
// and then clicks the one that is displayed/appears
function clickVisibleOrangeBtn () {
  return new Promise((resolve, reject) => {
    (async () => {
      const btnsOrange = await driver.findElements(By.className('btn-orange'))

      const btnsOrangePromises = []

      btnsOrange.forEach(function (btnOrange) {
        btnsOrangePromises.push(
          new Promise((resolve, reject) => {
            (async function (_btnOrange, _resolve, _reject) {
              try {
                await driver.wait(until.elementIsVisible(_btnOrange), 400)
              } catch (e) {
              } finally {
                if (await _btnOrange.isDisplayed()) {
                  await _btnOrange.click()
                }
                _resolve()
              }
            })(btnOrange, resolve, reject)
          }))
      })

      Promise.all(btnsOrangePromises).then(() => {
        resolve()
      })
    })()
  })
}

// starts http server on localhost on test default port
function startsHttpServer (callback) {
  console.log('building a clean copy and minifying html')
  commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-c'], 'ignore')

  testServer.startsServerForTests(
    ['--database'], // we need this option to test url /worldstats
    function () {
      callback()
      console.log('Webserver for frontend tests (autocosts) started with success')
    }, function (err) {
      callback(Error(err))
    })
}
