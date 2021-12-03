autocosts &ndash; the fully free and open source Car Costs Calculator
=========
[![Node.js CI](https://github.com/jfoclpf/autocosts/actions/workflows/ubuntu.yml/badge.svg)](https://github.com/jfoclpf/autocosts/actions/workflows/ubuntu.yml)
[![Node.js CI](https://github.com/jfoclpf/autocosts/actions/workflows/macos.yml/badge.svg)](https://github.com/jfoclpf/autocosts/actions/workflows/macos.yml)
[![Node.js CI](https://github.com/jfoclpf/autocosts/actions/workflows/windows.yml/badge.svg)](https://github.com/jfoclpf/autocosts/actions/workflows/windows.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/jfoclpf/autocosts/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jfoclpf/autocosts?targetFile=package.json)
[![js-standard-style][js-standard-style_img]][js-standard-style_url]
[![npm][npm_img]][npm_url]
[![npm module downloads][npm_module_downloads_img]][npm_module_downloads_url]
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate?hosted_button_id=J7F3ALLQAFWEJ)

[npm_img]: https://img.shields.io/npm/v/autocosts.svg?colorB=0E7FBF
[npm_url]: https://www.npmjs.com/package/autocosts

[npm_module_downloads_img]: https://img.shields.io/npm/dt/autocosts.svg
[npm_module_downloads_url]: https://www.npmjs.com/package/autocosts

[js-standard-style_img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[js-standard-style_url]: https://standardjs.com/

This calculator allows users to find the true cost of owning a car in more than 30 countries. 

It will normally give them a good estimate of what they really need to spend on car ownership. As car payments and expenses come due throughout the year, it's often difficult to really get a good understanding of total spending on a car. This calculator also provides to the user, optionally, the car's full Financial Effort considering the user's income, further providing also optionally the equivalent public transport costs (bus, train, UBER, etc.), considering the user doesn't own a car.

![screenshot](https://github.com/jfoclpf/autocosts/raw/master/src/img/screenshot.png)

## Try it on your machine
1. Clone the project<br>
`git clone https://github.com/jfoclpf/autocosts.git`
2. Enter in the newly created directory and install dependencies<br>
`cd autocosts && npm i --production`
3. Start the server<br>
`npm start`

it will open a http local server which you can access through `http://localhost:3028`

## Website
https://autocosts.info

### Playground
https://autocosts.info/XX

### The list of available countries
https://autocosts.info/list

The translations are in corresponding `json` files, namely in the folder `src/countries/`.<br>
The list of available countries is from the file `src/countries/list.json`

### World statistics of Car Costs
https://autocosts.info/worldstats


## How does it work?
Autocosts uses `nodejs`, `expressjs` and `handlebarsjs` to supply a server application that renders a car costs calculator as a webpage loaded by any common browser.

The project is optimized for a web-based version, and for an APP developped in Apache Cordova. The 2 last letters on the URI stands for the 2-letter ISO country code, and not for the language, since for example United Kingdom and Australia have the same language but different realities concerning the taxes, the terms applied to automobile costs and the units for fuel efficiency. The translations/language files apply therefore only to the selected country.

The project already considers all the units and fuel efficiency cases, different in many countries. The variations for fuel efficiency are `l/100km`, `km/l`, `mpg(US)`, `mpg(imp)` and for distance are `km`, `miles` and `mil` (Nordic mile=10km). More information can be found in the directory [`src/countries/`](src/countries/).

For more information regarding how the costs are calculated, you can check the [`src/client/core/`](src/client/core/) which is based on the <a href="https://en.wikipedia.org/wiki/Car_costs">12 items that form the car costs</a> for any given country. Namely they are:

* Standing costs
  * Depreciation
  * Car taxes
  * Insurance
  * Inspection
  * Car finance
* Running costs
  * Fuel
  * Maintenance
  * Repairs and Improvements
  * Parking
  * Tolls
  * Fines
  * Car washes

For more information see [`contributing.md`](contributing.md)

### Aditional services
Autocosts supports the following additional services, which can be enabled or disabled (default).
After building with `node build.js`, run `node bin/server.js -h` for more information.

### Database

Autocosts also supports code such that the user inputs might be stored into a `mysql` database. With the data from said database, it is also possible to make several statisitcal analysis, namely the average costs for each country, said statistical analysis having outlier removal techniques, such that such outliers do not distort the average.

### Uber

Autocosts may use the UBER API, such that at the final repport, the user calculations can be compared with the equivalents costs if the user would use just UBER or combined with public transports.

### PDF

Autocosts also allows the final report to be printed into a PDF report. It makes use of `pdfmake` npm package.

### Credentials file

The credentials for the above services are in the JSON files stored in [`credentials/`](/credentials/)

## API

Install the api

`npm i autocosts`

Now use the autocosts api

```js
const autocosts = require('autocosts')

// see https://github.com/jfoclpf/autocosts/blob/master/contributing.md#standards
// for standard units and time periods

var userData = {
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

var results = autocosts.calculate(userData)
console.log(results)
```

The object `results` will be the following:

```json
{
  "countryCode": "US",
  "currency": "USD",
  "costs": {
    "totalPerYear": 6595.880952380952,
    "totalEver": 123672.76785714286,
    "perMonth": {
      "items": {
        "depreciation": 88.88888888888889,
        "insurance": 200,
        "credit": 8,
        "inspection": 8,
        "roadTaxes": 10,
        "fuel": 78.26785714285715,
        "maintenance": 58.333333333333336,
        "repairsImprovements": 16.666666666666668,
        "parking": 14,
        "tolls": 55,
        "fines": 3.3333333333333335,
        "washing": 9.166666666666666
      },
      "standingCosts": 344.0555555555556,
      "runningCosts": 205.60119047619048,
      "total": 549.656746031746
    },
    "perUnitDistance": {}
  },
  "standardUnits": {
    "speed": "mi/h",
    "distance": "mi",
    "fuelEfficiency": "mpg(US)",
    "fuelPriceVolume": "gal(US)"
  }
}

```

The financial effort of the user and alternative costs considering public transports, uber and taxis included, are also optionally calculated. See [the standard `userData` object](/contributing.md#userdata-class) for more information.


## Android APP

The <a href="https://play.google.com/store/apps/details?id=info.autocosts">Android APP can be found in Play Store</a>. It uses Apache Cordova to convert JavaScript built code into APP built files (for example APK files in Android)

## About

### Contributing, data structure, flowcharts and coding rules

See [contributing](https://github.com/jfoclpf/autocosts/blob/master/contributing.md) and the [wiki pages](https://github.com/jfoclpf/autocosts/wiki)

### License

<a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3</a>

### Privacy

This calculator is and shall always be completely anonymous, as it doesn't request nor permanently store, any name, email, cookies, IP address nor any other personal information.
