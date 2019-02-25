This directory must have files whose names are `devCredentials.json`, `testCredentials.json` or `prodCredentials.json` according to the selected release. If you enable a service while running `node bin/index.js` the corresponding credential must be present in that JSON file. If you don't use the service the corresponding information in the JSON file will be ignored and therefore must not be present on the file. 

The credentials JSON file must obey the following structure:


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
