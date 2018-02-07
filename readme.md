Automobile costs calculator
=========

This calculator allows users to find the true cost of owning a car. It will normally give them a good estimate of what they really need to spend on car ownership. As car payments and expenses come due throughout the year, it's often difficult to really get a good understanding of total spending on a car. By default, these values are calculated on a monthly basis. 

This calculator is and shall be completely anonymous, as it doesn't request nor permanently store, any name, email, cookies, IP address nor any other personal information.

## Website
https://autocosts.info<br>
Playground: https://autocosts.info/XX 

### The list of available countries
https://autocustos.info/list

The translations are in corresponding `json` files, namely in the folder `src/countries/`.<br>
The list of available countries is from the file `src/countries/list.json`

### The registered associated domains
https://autocosts.info/domains


## How to install

Clone it, install it and build it<br>
`git clone https://github.com/jfoclpf/autocosts.git`<br>
`cd autocosts/ && npm install`


The directory that corresponds to the website public HTML is `bin/`. This directory is built upon installation. For more information run `./build.sh -h`. The directories structure tries to respect the <a href="https://github.com/jfoclpf/autocosts/blob/master/docs/nodeJS-directory-structure.md">directory structure for JavaScript/Node Projects</a>.

## How does it work?

Autocosts uses `nodejs`, `expressjs` and `handlebars` to supply a server application that renders a car costs calculator as a webpage loaded by any common browser. 

The project is optimized for a web-based version, and for an APP developped in Apache Cordova. The `XX` stands for the 2-letter ISO country code, and not for the language, since for example United Kingdom and Australia have the same language but different realities concerning the taxes, the terms applied to automobile costs and the units for fuel efficiency. The translations/language files apply therefore only to the selected country. Additional countries are very welcomed.

The project already considers all the units and fuel efficiency cases, different in many countries. The variations for fuel efficiency are `l/100km`, `km/l`, `mpg(US)`, `mpg(imp)` and for distance are `km`, `miles` and `mil` (Nordic mile=10km). More information can be found in the directory `src/countries/`.

For more information regarding how the costs are calculated, you can check the `src/client/core/coreFunctions.js` which is based on the <a href="https://en.wikipedia.org/wiki/Car_costs">12 items that form the car costs</a> for any given country. Namely they are:

* Standing costs
  * Depreciation
  *	Car taxes
  *	Insurance
  *	Inspection
  *	Car finance
* Running costs
  *	Fuel
  *	Maintenance
  *	Repairs and Improvements
  *	Parking
  *	Tolls
  *	Fines
  * Car washes

### Aditional services
Autocosts supports the following additional services, which can be turned off or on, in the file `commons.js`

```
/*GLOBAL switches, change accordingly*/
const SWITCHES = {
    "uber": true,        /*uses UBER API to give car user comparisions with UBER costs*/
    "social": true,      /*Social media pulgins*/
    "g_charts": true,    /*Google Charts*/
    "g_captcha": true,   /*Google Captcha to avoid spam-bots*/
    "g_analytics": true, /*Google Analytics*/
    "data_base": true,   /*Inserts user input data into a DataBase*/
    "print": true,       /*Print result option, at the end*/
    "pdf": true          /*Download PDF report option*/
};    
```

### Database

Autocosts also supports code such that the user inputs might be stored into a `mysql` database. The credentials for said databse should be stored in `keys/prod/db_credentials.json` or `keys/work/db_credentials.json`, the latter being the test version.

This file `db_credentials.json` should look like:

```
{
    "host"      : "*****",
    "user"      : "*****",
    "password"  : "*****",
    "database"  : "*****",
    "db_tables" : {
        "country_specs"    : "country_specs" ,
        "users_insertions" : "users_insertions",
        "monthly_costs_statistics" : "monthly_costs_statistics"
  }
}
```

With the data from said database, it is also possible to make several statisitcal analysis, namely the average costs for each country, said statistical analysis having outlier removal techniques, such that such outliers do not distort the average.

### Uber

Autocosts uses the UBER API, such that at the final repport, the user calculations can be compared with the equivalents costs if the user would use just UBER.

The uber secret token file `uber_token.json` should be stored in `keys/prods/` or `keys/work/`, the latter being the test version. This file `uber_token.json` should be like:

```
{
    "token": "********************************************"
}
```

### Google Charts

Autocosts uses Google Charts to render the final charts, with several analysys. We plan to move to <a href=http://www.chartjs.org/>chartjs.org</a> as it is free, open source and can be used offline.

### Google Analytics

You can add your Google Analytics credentials. The file `google_analytics.json` should be stored in `keys/prods/` or `keys/work/`, the latter being the test version. This file `google_analytics.json` should be like:

```
{
    "tracking-id": "UA-*******-*"
}
```

### Google Captcha v2

Autocosts support the Google Captcha v2 API to avoid spam bots from poluting the database. The captcha secret key file `recaptcha_key.json` should be stored in `keys/prods/` or `keys/work/`, the latter being the test version. This file `recaptcha_key.json` should be like:

```
{  
    "secretKey" : "*************************************"
}
```

### PDF

Autocosts also allow the final report to be printed into a PDF report. It makes use of `pdfmake` npm package.

## Android APP<br>

The <a href="https://play.google.com/store/apps/details?id=info.autocosts">Android APP can be found in Play Store</a>. It uses <a href="https://cordova.apache.org/">Apache Cordova</a> to convert JavaScript built code into APP built files (for example APK files in Android)

## Contributions
* Use four spaces for indentations
* Always comment the code in English
* Respect the folders structure

## License<br>
GNU GPLv3<br>
http://www.gnu.org/licenses/gpl-3.0.en.html <br>
http://choosealicense.com/licenses/gpl-3.0/
