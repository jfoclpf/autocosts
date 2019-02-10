autocosts &ndash; car costs calculator 
=========
[![Build Status][travis_img]][travis_url] [![GitHub][github_img]][github_url] [![npm][npm_img]][npm_url]

[travis_img]: https://travis-ci.org/jfoclpf/autocosts.svg?branch=master
[travis_url]: https://travis-ci.org/jfoclpf/autocosts

[github_img]: https://img.shields.io/github/release/jfoclpf/autocosts.svg
[github_url]: https://github.com/jfoclpf/autocosts

[npm_img]: https://img.shields.io/npm/v/autocosts.svg?colorB=0E7FBF
[npm_url]: https://www.npmjs.com/package/autocosts



This calculator allows users to find the true cost of owning a car. It will normally give them a good estimate of what they really need to spend on car ownership. As car payments and expenses come due throughout the year, it's often difficult to really get a good understanding of total spending on a car. This calculator also provides to the user, optionally, the car's full Financial Effort considering the user's income, further providing also optionally the equivalent public transport costs (bus, train, UBER, etc.), considering the user doesn't own a car.

## Try it on your local machine
Install it and run it with the single command<br>
`npm i autocosts`

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
https://autocosts.info/stats


## How does it work?
Autocosts uses `nodejs`, `expressjs` and `handlebars` to supply a server application that renders a car costs calculator as a webpage loaded by any common browser. 

The project is optimized for a web-based version, and for an APP developped in Apache Cordova. The 2 last letters on the URI stands for the 2-letter ISO country code, and not for the language, since for example United Kingdom and Australia have the same language but different realities concerning the taxes, the terms applied to automobile costs and the units for fuel efficiency. The translations/language files apply therefore only to the selected country.

The project already considers all the units and fuel efficiency cases, different in many countries. The variations for fuel efficiency are `l/100km`, `km/l`, `mpg(US)`, `mpg(imp)` and for distance are `km`, `miles` and `mil` (Nordic mile=10km). More information can be found in the directory `src/countries/`.

For more information regarding how the costs are calculated, you can check the `src/client/core/coreFunctions.js` which is based on the <a href="https://en.wikipedia.org/wiki/Car_costs">12 items that form the car costs</a> for any given country. Namely they are:

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

### Aditional services
Autocosts supports the following additional services, which can be enabled or disabled (default), 
using the `node bin/index.js` command line options:

```
Usage: node index.js [options]
Ex:    node index.js -r prod --uber --dataBase

Options: 
-r, --release              'work' for tests or 'prod' for production
-p, --port                 HTTP port on which the application is listening (default:3027 for tests, and 3028 for production)
    --https                Enables protocol https when available
    --print                Enables the standard printing of final report
    --pdf                  Enables the downloading of a pdf final report (using pdfmake)
    --social               Enables social media plugin (js-socials)
    --disableCharts        Disables Charts on final report

    External API services, disabled by default
    API credentials must be in either credentials/workCredentials.json or credentials/prodCredentials.json according to release
    --cdn                  Enables Content Delivery Network
    --uber                 Enables UBER API
    --googleCaptcha        Enables Google Captcha V2 anti-bot for calculation button
    --googleAnalytics      Enables Google Analytics
    --dataBase             Enables a mysql Database
```

### Database

Autocosts also supports code such that the user inputs might be stored into a `mysql` database. With the data from said database, it is also possible to make several statisitcal analysis, namely the average costs for each country, said statistical analysis having outlier removal techniques, such that such outliers do not distort the average.

### Uber

Autocosts may use the UBER API, such that at the final repport, the user calculations can be compared with the equivalents costs if the user would use just UBER or combined with public transports.

### Charts

Autocosts uses <a href=http://www.chartjs.org/>chartjs.org</a> as it is free, open source and can be used offline.

### Google Analytics

You may also add your Google Analytics credentials.

### Google Captcha v2

Autocosts support the Google Captcha v2 API to avoid spam bots from poluting the database.

### PDF

Autocosts also allows the final report to be printed into a PDF report. It makes use of `pdfmake` npm package.

### Credentials file

The credentials for the above services are in the JSON file `workCredentials.json` or `prodCredentials.json` stored in the directory `credentials/`. If you enable a service while running `node bin/index.js` the corresponding credential must be present in that JSON file. If you don't use the service the corresponding information in the JSON file will be ignored. This JSON file must obey the following structure:

```
{
    "dataBase" : {
        "_comment"  : "SQL Database where to store all the Countries' specifications and users average costs",
        "host"      : "***********",
        "user"      : "***********",
        "password"  : "***********",
        "database"  : "***********",
        "port"      : "3306",
        "db_tables" : {
            "country_specs"    : "country_specs" ,
            "users_insertions" : "users_insertions",
            "monthly_costs_statistics" : "monthly_costs_statistics",
            "monthly_costs_normalized" : "monthly_costs_normalized"
      }
    },
    "money" : {
        "_comment"      : "Load money API for the currency conversion information (mandatory if dataBase is enabled)",
        "_getYourApiOn" : "https://openexchangerates.org/account/app-ids",
        "ApiId"         : "************************************"
    }, 
    "uber" : {
        "_comment"      : "UBER API to get uber prices for each region, as an alternative to car",
        "_getYourApiOn" : "https://auth.uber.com/login",
        "token"         : "*************************************"
    },
    "googleCaptcha" : {
        "_comment"           : "Google reCaptacha to avoid spam bots from polluting the database",
        "_getYourGCaptchaOn" : "https://www.google.com/recaptcha",
        "secretKey"          : "*******************************************"
    },
    "googleAnalytics" : {
        "_comment"   : "Google Analytics Tracking ID",
        "trackingId" : "UA-*********"
    },
    "cdn" : {
        "_comment" : "Content Delivery Network base URL in case such service is enabled",
        "url"      : "https://yourCDNdomain.com/"
    }       
}
```

## Android APP<br>

The <a href="https://play.google.com/store/apps/details?id=info.autocosts">Android APP can be found in Play Store</a>. It uses <a href="https://cordova.apache.org/">Apache Cordova</a> to convert JavaScript built code into APP built files (for example APK files in Android)

## License

<a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3</a>

## Privacy

This calculator is and shall always be completely anonymous, as it doesn't request nor permanently store, any name, email, cookies, IP address nor any other personal information.
