// uses selenyum webdriver to validate front-end
// https://www.selenium.dev/selenium/docs/api/javascript/index.html

/* jslint esversion: 8 */

const fs = require('fs')
const path = require('path')
const async = require('async')
const extractZip = require('extract-zip')

const { Builder, By, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')
// const edge = require('selenium-webdriver/edge')

const NumberOfTestedUserInputs = 5
const DataArray = [] // array of objects, each with userData and respective caluclatedData

// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')
const settings = commons.getSettings()
const fileNames = commons.getFileNames()
const directories = commons.getDirectories()

const supportedBrowsers = ['firefox', 'chrome', 'edge']

const browserForTest = settings.commandLineArgsObject.browserForTest
if (!supportedBrowsers.includes(browserForTest)) {
  console.error('Wrong browser for testing: ' + browserForTest.red)
  console.error(`Supported browsers are ${supportedBrowsers.join(', ')}`)
  process.exit(1)
}
console.log('\n', `Testing with ${browserForTest} engine`.cyan, '\n')

console.log('Running script ' + path.relative(directories.server.root, __filename))
console.log('Validating User Front-end with selenyum webdriver...')

// http server that is run locally on localhost, to serve the website's files
const testServer = require('./testServer')

const convertData = require(fileNames.project['convertData.js'])
const validateData = require(fileNames.project['validateData.js'])
const calculator = require(fileNames.project['calculator.js'])
convertData.initialize()
validateData.initialize()
calculator.initialize()

// file which is zip compressed on the repo, and it's used for testing the core calculator
const userInsertionsZipFile = path.join(__dirname, 'users_insertions.json.zip')
const userInsertionsFile = path.join(__dirname, 'users_insertions.json')

async.series([
  extractZipWithUserInsertions,
  startsHttpServer,
  validateFrontend
],
// done after execution of above funcitons
function (err, results) {
  gracefulShutdown()
  if (err) {
    console.error(Error(err))
    process.exitCode = 1
  } else {
    console.log('\nFrontend test ran OK\n')
    process.exitCode = 0
  }
})

function validateFrontend (callback) {
  const info = function (info) {
    process.stdout.write(info.padEnd(150) + '\x1b[0G')
  }

  const promisesArray = DataArray.map(data =>
    new Promise((resolve, reject) => {
      validateUserData(data, resolve, reject)
    })
  )

  Promise.all(promisesArray)
    .then((driverArray) => {
      console.log(`All frontend ${driverArray.length} tests run with success`.green)

      // closing drivers, only when all drivers are finished
      driverArray.forEach(driver => {
        (async (_driver) => {
          try {
            await _driver.sleep(1000)
            await _driver.quit()
          } catch (err) {
            // does nothing, no problem if error happens on quiting
            // it may happen with chrome
          }
        })(driver)
      })
      callback()
    })
    .catch(err => {
      console.error(err)
      callback(Error(err))
    })

  async function validateUserData (data, resolve, reject) {
    const userDataForTest = data.userData
    const calculatedData = data.calculatedData

    const url = `http://localhost:${settings.HTTPport}/${userDataForTest.countryCode}`

    const screen = {
      width: 1920,
      height: 1080
    }

    let driver
    switch (browserForTest) {
      case 'firefox':
        driver = await new Builder()
          .forBrowser('firefox')
          .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
          .build()
        break
      case 'chrome':
        driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(new chrome.Options().headless().windowSize(screen))
          .build()
        break
      default:
        throw Error('Wrong browser: ' + browserForTest)
    }

    try {
      await driver.get(url)

      // click Main [Calculate button] on entry page
      await driver.wait(until.elementLocated(By.id('calculateButton')), 10000)
      const eleMainButton = await driver.findElement(By.id('calculateButton'))
      await driver.wait(until.elementIsVisible(eleMainButton), 10000)
      await eleMainButton.click()

      // depreciation
      const d = userDataForTest.depreciation
      await setElementValue('acquisitionMonth', d.dateOfAcquisition.month)
      await setElementValue('acquisitionYear', d.dateOfAcquisition.year)
      await setElementValue('commercialValueAtAcquisition', d.dateOfAcquisition.valueOfTheVehicle)
      await setElementValue('commercialValueAtNow', d.dateOfUserInput.valueOfTheVehicle)

      await clickVisibleOrangeBtn()

      // insurance
      const insurance = userDataForTest.insurance
      await setElementValue('insuranceValue', insurance.amountPerPeriod)
      const insurancePeriodBtn = await driver.findElement(
        By.css(`input[name="insurancePaymentPeriod"][value="${insurance.period}"]`)
      )
      await insurancePeriodBtn.click()

      await clickVisibleOrangeBtn()

      // credit
      const credit = userDataForTest.credit
      if (credit.creditBool) {
        await clickButtonById('cred_auto_true')
        const yesCredit = credit.yesCredit
        await setElementValue('borrowedAmount', yesCredit.borrowedAmount)
        await setElementValue('numberInstallments', yesCredit.numberInstallments)
        await setElementValue('amountInstallment', yesCredit.amountInstallment)
        await setElementValue('residualValue', yesCredit.residualValue)
      }

      await clickVisibleOrangeBtn()

      // inspection
      const inspection = userDataForTest.inspection
      await setElementValue('numberInspections', inspection.numberOfInspections)
      if (inspection.numberOfInspections > 0) {
        await setElementValue('averageInspectionCost', inspection.averageInspectionCost)
      }

      await clickVisibleOrangeBtn()

      // road taxes
      const roadTaxes = userDataForTest.roadTaxes
      await setElementValue('roadTaxes', roadTaxes.amountPerYear)

      await clickVisibleOrangeBtn()

      // fuel
      const fuel = userDataForTest.fuel
      if (fuel.typeOfCalculation === 'money') {
        await clickButtonById('radio_fuel_euros')

        await setElementValue('fuel_currency_value', fuel.currencyBased.amountPerPeriod)
        await setElementValue('fuel_currency_time_period', fuel.currencyBased.period, 'select')
      } else if (fuel.typeOfCalculation === 'distance') {
        await clickButtonById('radio_fuel_km')
        const distanceBased = fuel.distanceBased

        if (fuel.distanceBased.considerCarToJob) {
          await clickButtonById('car_job_form2_yes')
          const carToJob = distanceBased.carToJob

          await setElementValue('car_to_work_number_days_week', carToJob.daysPerWeek)
          await setElementValue('car_to_work_distance_home_work', carToJob.distanceBetweenHomeAndJob)
          await setElementValue('car_to_work_distance_weekend', carToJob.distanceDuringWeekends)
        } else {
          await clickButtonById('car_job_form2_no')
          const noCarToJob = distanceBased.noCarToJob

          await setElementValue('no_car_to_work_distance', noCarToJob.distancePerPeriod)
          await setElementValue('distance_standard_onfuel', noCarToJob.distanceStandardUnit, 'select')
          await setElementValue('no_car_to_work_time_period', noCarToJob.period, 'select')
        }

        await setElementValue('fuel_efficiency', distanceBased.fuelEfficiency)
        await setElementValue('fuel_efficiency_standard_onfuel', distanceBased.fuelEfficiencyStandard, 'select')
        await setElementValue('fuel_price', distanceBased.fuelPrice)
      } else {
        throw Error('Invalid option in fuel: ' + fuel.typeOfCalculation)
      }

      await clickVisibleOrangeBtn()

      // maintenance
      const maintenance = userDataForTest.maintenance
      await setElementValue('maintenance', maintenance.amountPerYear)

      await clickVisibleOrangeBtn()

      // repairs and improvements
      const repairsImprovements = userDataForTest.repairsImprovements
      await setElementValue('repairs', repairsImprovements.amountPerYear)

      await clickVisibleOrangeBtn()

      // parking
      const parking = userDataForTest.parking
      await setElementValue('parking', parking.amountPerMonth)

      await clickVisibleOrangeBtn()

      // tolls
      const tolls = userDataForTest.tolls
      if (tolls.calculationBasedOnDay) {
        await clickButtonById('tolls_daily_true')

        const yesBasedOnDay = tolls.yesBasedOnDay
        await setElementValue('daily_expense_tolls', yesBasedOnDay.amountPerDay)
        await setElementValue('number_days_tolls', yesBasedOnDay.daysPerMonth)
      } else {
        await clickButtonById('tolls_daily_false')

        const noBasedOnDay = tolls.noBasedOnDay
        await setElementValue('no_daily_tolls_value', noBasedOnDay.amountPerPeriod)
        await setElementValue('tolls_period_select', noBasedOnDay.period, 'select')
      }

      await clickVisibleOrangeBtn()

      // fines
      const fines = userDataForTest.fines
      await setElementValue('tickets_value', fines.amountPerPeriod)
      await setElementValue('tickets_period_select', fines.period, 'select')

      await clickVisibleOrangeBtn()

      // washing
      const washing = userDataForTest.washing
      await setElementValue('washing_value', washing.amountPerPeriod)
      await setElementValue('washing_period_select', washing.period, 'select')

      await clickVisibleOrangeBtn()

      await clickButtonById('calculate_costs_btn')

      // now results are shown, confirm results
      // compare total costs with core calculator module
      await driver.wait(until.elementLocated(By.className('periodic_costs_total_costs')), 5000)
      const eleTotalCosts = await driver.findElement(By.className('periodic_costs_total_costs'))
      const totalCosts = Number(
        (await eleTotalCosts.getText())
          .replace(/[^0-9.-]+/g, '') // remove currency symbols
      )

      // in browser results, the float is toFixed(2), we do now the same to compare
      const calculatedCostsPerMonth = Number(calculatedData.costs.perMonth.total.toFixed(2))

      if (totalCosts !== calculatedCostsPerMonth) {
        throw Error(
          `Total costs don't match: ${totalCosts} differs from ${calculatedCostsPerMonth}`
        )
      }

      resolve(driver)
    } catch (err) {
      console.error(err)
      console.dir(data, { depth: null, colors: true })
      await driver.quit()
      reject(Error(err))
    }

    function clickButtonById (id) {
      return new Promise((resolve, reject) => {
        (async () => {
          info(`/${userDataForTest.countryCode} click on #${id}`)
          try {
            const btn = await driver.findElement(By.id(id))
            await driver.executeScript('arguments[0].scrollIntoView(true);', btn)
            await driver.sleep(500)
            await btn.click()
            resolve()
          } catch (err) {
            console.error(err, '\nElement with id: ' + id)
            reject(Error(err))
          }
        })()
      })
    }

    function setElementValue (id, value, eleType) {
      return new Promise((resolve, reject) => {
        (async () => {
          info(`/${userDataForTest.countryCode} set #${id} with ${value}`)
          try {
            await driver.wait(until.elementLocated(By.id(id)), 5000)
            const ele = await driver.findElement(By.id(id))
            await driver.wait(until.elementIsVisible(ele), 5000)
            if (!eleType || eleType === 'input') {
              await ele.clear()
              await ele.sendKeys('value', value)
            } else if (eleType === 'select') {
              const option = await driver.findElement(
                By.css(`#${id}>option[value='${value}']`)
              )
              await option.click()
            }
            resolve(ele)
          } catch (err) {
            console.error(err, `\nElement with id: ${id} and value: ${value}`)
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
          info(`/${userDataForTest.countryCode} click orange button`)
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
  }
}

// unzip JSON file with user insertions to test Frontend with browser
function extractZipWithUserInsertions (callback) {
  const countrySpecs = {}

  const _countrySpecs = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'country_specs.json'), 'utf8'),
    commons.parseJsonProperty
  )

  // build a more code friendly Object
  for (const item of Object.keys(_countrySpecs)) {
    countrySpecs[_countrySpecs[item].Country] = _countrySpecs[item]
  }

  try {
    (async () => {
      console.log(
        'Extracting ' + path.relative(directories.server.root, userInsertionsZipFile)
      )
      await extractZip(userInsertionsZipFile, { dir: __dirname })

      console.log(
        'Reading JSON ' + path.relative(directories.server.root, userInsertionsFile)
      )
      // here the file was unzip successfully, the zip extractor removes the extension .zip
      const usersInput = JSON.parse(
        fs.readFileSync(userInsertionsFile, 'utf8'),
        commons.parseJsonProperty
      ).filter(el =>
        el.country && (
          // select only countries with English language, easier to debug the frontend
          el.country === 'AU' ||
          el.country === 'US' ||
          el.country === 'CA' ||
          el.country === 'IE'
        )
      )
      console.log(`Extracted ${usersInput.length} user inputs`)

      console.log(`Randomly picking up ${NumberOfTestedUserInputs} of those`)
      // selects few random user inputs
      const selectedInputs = []
      for (let i = 0; i < NumberOfTestedUserInputs; i++) {
        selectedInputs.push(
          usersInput[Math.floor(Math.random() * usersInput.length)]
        )
      }

      // override insertion date for the date of today
      // because the calculator on the browser always considers the insertion date as today
      // important for the calculation of depreciation
      selectedInputs.forEach(userInput => {
        userInput.insertion_date = new Date().toISOString().slice(0, 10) // today
      })

      for (let i = 0; i < selectedInputs.length; i++) {
        let countryInfo, userData, calculatedData

        try {
          const CC = selectedInputs[i].country // ISO Country Code

          if (CC) {
            countryInfo = {
              code: CC,
              currency: countrySpecs[CC].currency,
              distance_std: countrySpecs[CC].distance_std,
              fuel_efficiency_std: countrySpecs[CC].fuel_efficiency_std,
              fuel_price_volume_std: countrySpecs[CC].fuel_price_volume_std
            }

            userData = convertData.createUserDataObjectFromDatabase(selectedInputs[i], countryInfo)
            validateData.setUserData(userData)
            const isUserDataEntryOk = validateData.isUserDataFormPart1_Ok() && validateData.isUserDataFormPart2_Ok()

            if (isUserDataEntryOk) {
              calculatedData = calculator.calculateCosts(userData)
              DataArray.push({
                userData: userData,
                calculatedData: calculatedData
              })
            }
          }
        } catch (error) {
          console.error('\n\nError on i:' + i, '\n',
            '\n\ncountryObject: ', countryInfo,
            '\n\nselectedInputs: ', selectedInputs[i],
            '\n\nuserData: ', JSON.stringify(userData, undefined, 2),
            '\n\ncalculatedData: ', JSON.stringify(calculatedData, undefined, 2))

          callback(Error(error))
        }
      }
      callback()
    })()
  } catch (errOnUnzip) {
    callback(Error('Error unziping file ' + userInsertionsZipFile + '. ' + errOnUnzip.message))
  }
}

// starts http server on localhost on test default port
function startsHttpServer (callback) {
  console.log('Building a clean copy and minifying html')
  commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-c'], 'ignore')
  console.log('Clean copy built')

  console.log('Starting server')
  testServer.startsServerForTests(
    function () {
      callback()
      console.log('Webserver for frontend tests (autocosts) started with success')
    }, function (err) {
      callback(Error(err))
    })
}

// gracefully exiting upon CTRL-C or when the program finishes with success
process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
function gracefulShutdown (signal) {
  if (signal) {
    console.log(`Received signal ${signal}`)
  }
  console.log('Closing http server')
  testServer.closeServer()

  // deleted unzipped file with user insertions, for storage saving
  if (fs.existsSync(userInsertionsFile)) {
    console.log('deleting ' + path.relative(directories.server.root, userInsertionsFile))
    fs.unlinkSync(userInsertionsFile)
  }
}
