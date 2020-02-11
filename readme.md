autocosts &ndash; car costs calculator
=========
[![Build Status][travis_img]][travis_url] [![GitHub][github_img]][github_url] [![npm][npm_img]][npm_url] [![npm module downloads][npm_module_downloads_img]][npm_module_downloads_url] [![js-standard-style][js-standard-style_img]][js-standard-style_url] [![Dependency Status][dependency status_img]][dependency status_url]

[travis_img]: https://travis-ci.org/jfoclpf/autocosts.svg?branch=master
[travis_url]: https://travis-ci.org/jfoclpf/autocosts

[github_img]: https://img.shields.io/github/release/jfoclpf/autocosts.svg
[github_url]: https://github.com/jfoclpf/autocosts

[npm_img]: https://img.shields.io/npm/v/autocosts.svg?colorB=0E7FBF
[npm_url]: https://www.npmjs.com/package/autocosts

[npm_module_downloads_img]: https://img.shields.io/npm/dt/autocosts.svg
[npm_module_downloads_url]: https://www.npmjs.com/package/autocosts

[js-standard-style_img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[js-standard-style_url]: https://standardjs.com/

[dependency status_img]: https://david-dm.org/jfoclpf/autocosts.svg
[dependency status_url]: https://david-dm.org/jfoclpf/autocosts

This calculator allows users to find the true cost of owning a car. It will normally give them a good estimate of what they really need to spend on car ownership. As car payments and expenses come due throughout the year, it's often difficult to really get a good understanding of total spending on a car. This calculator also provides to the user, optionally, the car's full Financial Effort considering the user's income, further providing also optionally the equivalent public transport costs (bus, train, UBER, etc.), considering the user doesn't own a car.

<img src="/src/img/screenshot.png">

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

### Aditional services
Autocosts supports the following additional services, which can be enabled or disabled (default).
After building with `node build.js`, run `node bin/index.js -h` for more information.

### Database

Autocosts also supports code such that the user inputs might be stored into a `mysql` database. With the data from said database, it is also possible to make several statisitcal analysis, namely the average costs for each country, said statistical analysis having outlier removal techniques, such that such outliers do not distort the average.

### Uber

Autocosts may use the UBER API, such that at the final repport, the user calculations can be compared with the equivalents costs if the user would use just UBER or combined with public transports.

### Charts

Autocosts uses <a href=http://www.chartjs.org/>chartjs.org</a> as it is free, open source and can be used offline.

### PDF

Autocosts also allows the final report to be printed into a PDF report. It makes use of `pdfmake` npm package.

### Credentials file

The credentials for the above services are in the JSON files stored in [`credentials/`](/credentials/)

## Android APP<br>

The <a href="https://play.google.com/store/apps/details?id=info.autocosts">Android APP can be found in Play Store</a>. It uses <a href="https://cordova.apache.org/">Apache Cordova</a> to convert JavaScript built code into APP built files (for example APK files in Android)

## License

<a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3</a>

## Privacy

This calculator is and shall always be completely anonymous, as it doesn't request nor permanently store, any name, email, cookies, IP address nor any other personal information.
