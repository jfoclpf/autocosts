const path = require('path')

console.log('\nValidating main API')

const autocosts = require(path.join('..', 'api'))

// see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#userdata-class
const userDataTest1 = {
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
      amountPerPeriod: null,
      period: null // type string: "month", "twoMonths",  "trimester", "semester", "year"
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
      fuelEfficiencyStandard: 'mpg(US)', // type string; "L/100km", "mpg(US)", etc.
      fuelPrice: 2.5, // type number; currency per unit of volume standard. Ex: 1.4, that is 1.4 EUR / L
      fuelPriceVolumeStandard: 'gal(US)' // type string: 'L', 'gal(imp)', 'gal(US)'
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
  },

  // Form Part 3
  publicTransports: {
    numberOfPeopleInFamily: 4,
    monthlyPassCost: 50,
    taxi: {
      costPerUnitDistance: 0.5, // type number, ex: 0.5, that is [currency]/km
      distanceStandardUnit: 'mi' // type string: "km", "mi", "mil(10km)"
    }
  },

  income: {
    incomePeriod: 'year', // type string: "month", "twoMonths",  "trimester", "semester", "year"
    year: {
      amount: '80000'
    },
    month: {
      amountPerMonth: null,
      monthsPerYear: null
    },
    week: {
      amountPerWeek: null,
      weeksPerYear: null
    },
    hour: {
      amountPerHour: null,
      hoursPerWeek: null,
      weeksPerYear: null
    }
  },

  workingTime: {
    isActivated: true,
    monthsPerYear: 11,
    hoursPerWeek: 40
  },

  distance: {
    considerCarToJob: true, // type boolean
    carToJob: {
      daysPerWeek: 5,
      distanceBetweenHomeAndJob: 15,
      distanceDuringWeekends: 30,
      distanceStandardUnit: 'mi'
    },
    noCarToJob: {
      distancePerPeriod: null,
      period: null, // type string: "month", "twoMonths",  "trimester", "semester", "year"
      distanceStandardUnit: null
    }
  },

  timeSpentInDriving: {
    carToJob: {
      minutesBetweenHomeAndJob: 30,
      minutesDuringWeekend: 60
    },
    noCarToJob: {
      minutesPerDay: null,
      daysPerMonth: null
    }
  }
}

const userDataTest2 = {
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
      amountPerPeriod: null,
      period: null // type string: "month", "twoMonths",  "trimester", "semester", "year"
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
      fuelEfficiencyStandard: 'mpg(US)', // type string; "L/100km", "mpg(US)", etc.
      fuelPrice: 2.5, // type number; currency per unit of volume standard. Ex: 1.4, that is 1.4 EUR / L
      fuelPriceVolumeStandard: 'gal(US)' // type string: 'L', 'gal(imp)', 'gal(US)'
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

try {
  const results1 = autocosts.calculate(userDataTest1)
  const results2 = autocosts.calculate(userDataTest2)
  if (results1.costs.perMonth.total && results2.costs.perMonth.total) {
    console.log('Test on API run OK', '\n')
    process.exitCode = 0
  } else {
    console.error('An error occured')
    process.exitCode = 1
  }
} catch (err) {
  console.error('An error occured', err)
  process.exitCode = 1
}
