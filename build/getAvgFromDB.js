/*Node script which populates the costs statistical DB tables for each country*/

console.log("\nRunning script " + __filename + "\n");

const USE_MONEY_API = true;

//includes
const fs           = require('fs');
const path         = require("path");
const async        = require('async'); //module to allow to execute the queries in series
const mysql        = require('mysql'); //module to get info from DB
const isOnline     = require('is-online');
const commons      = require(path.join(__dirname, '..', 'commons'));
const request      = require('request'); //to make HTTP requests
const flatten      = require('flat');
const sqlFormatter = require("sql-formatter");
const colors       = require('colors');

var fx = USE_MONEY_API ? require("money") : null; //currency conversion API; needs to be "var" because it will change

commons.init();
//Main directories got from commons
const directories = commons.getDirectories();
const ROOT_DIR = directories.server.root;
const SRC_DIR  = directories.server.src;

const settings  = commons.getSettings();
const fileNames = commons.getFileNames();

//own project modules
const statsFunctions = require(fileNames.build.statsFunctions);
const calculator     = require(fileNames.project["calculator.js"]);

const DB_INFO = settings.dataBase.credentials;

//checks for internet connection
isOnline().then(function(online) {

    if(!online){
        console.log("There is no Internet Connection");
        process.exit();
    }

    var AVG_DB_TEMPLATE; //Database for Average template

    // Template of the DBs (monthly costs statistics and monthly costs normalized) that will be created
    // and into which the averages from the users will be stored, with a row of said DB for each country
    (function(){
        AVG_DB_TEMPLATE = {
            'countryCode':             "text",
            'dateOfCalculation':       "date",
            'currency':                "text",
            'currencyConversionToEUR': "float",
            'totalUsers':              "int(11)",
            'validUsers':              "int(11)",
            'globalTotalUsers':        "int(11)"
        };

        let objectWithCalculatedAverages = flatten(calculator.CreateCalculatedDataObj(), {delimiter:"_"});
        delete objectWithCalculatedAverages.countryCode;
        
        //the last properties named "calculated" in the object chain are booleans
        for (let averageItem of Object.keys(objectWithCalculatedAverages)) {
            if(averageItem.endsWith("_calculated")){
                objectWithCalculatedAverages[averageItem] = "boolean";
            }
            else{
                objectWithCalculatedAverages[averageItem] = "float";
            }
        }

        AVG_DB_TEMPLATE = Object.assign(AVG_DB_TEMPLATE, objectWithCalculatedAverages); //concatenates objects
        //console.log(AVG_DB_TEMPLATE); process.exit();
    }());


    //detect for null or empty object
    if(!DB_INFO || Object.keys(DB_INFO).length === 0){
        throw commons.getDataBaseErrMsg(__filename, settings.dataBase);
    }
    console.log(DB_INFO);

    //database variable
    var db;

    var countries = [];       //array of objects with countries information
    var unique_users = [];    //array of objects having unique_users IDs and respective countries
    var AllUserInputDb = [];  //array of objects with all the data from the inputs users DB
    var queryInsert;          //SQL string to where all the average costs will be inserted

    if(USE_MONEY_API){
        var queryInsertNorm;      //SQL string to where all the average Normalized costs will be inserted (all costs in EUR)
    }

    //method that forces several methods to run synchronously
    async.series([

        /*=========================================================================*/
        //Load money API for the currency conversion
        //see: http://openexchangerates.github.io/money.js/
        //and: https://openexchangerates.org/account/app-ids
        function(callback) {
            if(!USE_MONEY_API){
                callback(); return;
            }

            console.log("\nLoad exchange rates via API on openexchangerates.org");

            let MoneyApiId = settings.money.ApiId;
            let API_url = 'https://openexchangerates.org/api/latest.json?app_id=' + MoneyApiId;
            //HTTP Header request
            let options = {
                url: API_url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            request(options, function(error, response, body){
                if (!error && typeof fx !== "undefined" && fx.rates ) {
                    let result = JSON.parse(body);
                    fx.rates = result.rates;
                    fx.base = result.base;
                } else {
                    throw "Error loading money API";
                    process.exit();
                }

                callback();
            });
        },

        /*=========================================================================*/
        //creates DB connection and connects
        function(callback) {

            db = mysql.createConnection(DB_INFO);
            console.log('\nGetting the set of different countries from ' +
                        'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.country_specs);

            db.connect(function(err){
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    process.exit();
                }

                console.log('User ' + DB_INFO.user +
                            ' connected successfully to DB ' + DB_INFO.database +
                            ' at ' + DB_INFO.host);
                //console.log(DB_INFO);
                callback();
            });
        },

        /*=========================================================================*/
        //Get the set of different countries and set them in array countries[]
        function(callback) {
            //console.log("DB login data: "); console.log(DB_INFO);

            db.query('SELECT * FROM ' + DB_INFO.db_tables.country_specs, function(err, results, fields) {
                if (err) {
                    console.error(err);
                    process.exit();
                }

                //Check that a user was found
                for (var i=0; i<results.length; i++){
                    if (results[i].Country){
                        countries.push(results[i]);
                    }
                }
                //console.log(countries);
                //countries[i]: {Country: 'UK', currency: 'GBP', distance_std: 2, fuel_efficiency_std: 3, fuel_price_volume_std: 1 }
                callback();
            });
        },

        /*=========================================================================*/
        //Get users unique ID
        function(callback) {
            console.log('\nGetting users unique IDs from ' +
                        'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.users_insertions);

            db.query('SELECT DISTINCT uuid_client, country FROM ' + DB_INFO.db_tables.users_insertions,
                function(err, results, fields) {
                    if (err){
                        console.error(err);
                        process.exit();
                    }

                    for (var i=0; i<results.length; i++){
                        unique_users.push(results[i]);
                    }
                    //console.log(unique_users);
                    callback();
                }
            );
        },

        /*=========================================================================*/
        //Get all data from users input DB
        function(callback) {
            console.log('\nGetting all user insertion data from ' +
                        'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.users_insertions);

            db.query('SELECT * FROM ' + DB_INFO.db_tables.users_insertions, function(err, results, fields) {
                if (err){
                    console.error(err);
                    process.exit();
                }

                for (var i=0; i<results.length; i++){
                    AllUserInputDb.push(results[i]);
                }
                //console.log(AllUserInputDb);
                callback();
            });
        },

        /*=========================================================================*/
        //Calculates statistical average costs for each country and builds SQL query
        function(callback) {
            console.log('\nCalculating data and building DB insertion data for ' +
                        'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_statistics);

            //string with current date DD/MM/YYYY
            let date = new Date();
            let dateString = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString();

            //queries header
            queryInsert     = "INSERT INTO " + DB_INFO.db_tables.monthly_costs_statistics + " ";

            if(USE_MONEY_API){
                queryInsertNorm = "INSERT INTO " + DB_INFO.db_tables.monthly_costs_normalized + " ";
            }

            /*builds sql query Header based on AVG_DB_TEMPLATE*/
            let queriesHeader = sqlStringFromArray(Object.keys(AVG_DB_TEMPLATE), false); //false removes quotes from strings
            //console.log(queriesHeader); process.exit();

            queryInsert += queriesHeader + "VALUES ";

            if(USE_MONEY_API){
                queryInsertNorm += queriesHeader + "VALUES ";
            }

            //builds the query to insert all the vaules for each country
            //sql query:... VALUES (PT, value1, value2,...),(BR, value1, value2,...),etc.
            for (let i = 0; i < countries.length; i++){

                let countryCode = countries[i].Country;
                let currency = countries[i].currency;

                process.stdout.write(countryCode + " ");

                let countryUsers = []; //array with unique users for selected countries[i]
                let countryData  = [];  //array with everything for selected countries[i]

                //creates an array of unique users for the selected country
                for (let j=0; j<unique_users.length; j++){
                    if (unique_users[j].country === countryCode){
                        countryUsers.push(unique_users[j]);
                    }
                }

                //creates an array with all the inputs for the selected country
                for (let j=0; j<AllUserInputDb.length; j++){
                    if (AllUserInputDb[j].country == countryCode){
                        countryData.push(AllUserInputDb[j]);
                    }
                }

                let countryObject = {
                    code: countryCode,
                    currency: currency,
                    distance_std: countries[i].distance_std,
                    fuel_efficiency_std: countries[i].fuel_efficiency_std,
                    fuel_price_volume_std: countries[i].fuel_price_volume_std
                };

                let statisticsResults = statsFunctions.calculateStatisticsForADefinedCountry(countryUsers,
                                                                                             countryData,
                                                                                             countryObject,
                                                                                             USE_MONEY_API ? fx : null);
                //console.log(JSON.stringify(statisticsResults, null, 4));

                let flattenStatisticsResults = flatten(statisticsResults, {delimiter:"_"});
                delete flattenStatisticsResults.countryCode;
                delete flattenStatisticsResults.validUsers;
                //console.log(flattenStatisticsResults); //process.exit();

                //add computed data to countries array of objects
                countries[i].validUsers = statisticsResults.validUsers;
                countries[i].totalUsers = countryUsers.length;
                countries[i].totalCosts = statisticsResults.costs.perMonth.total;
                
                //currency conversion to EUR
                let currencyConversionToEUR = USE_MONEY_API ? fx(1).from('EUR').to(currency) : null;
                //console.log(currencyConversionToEUR);

                //builds sql query for respective country, check var AVG_DB_TEMPLATE
                let queryInsertCountryArray = [
                    countryCode,
                    dateString,
                    currency,
                    currencyConversionToEUR,
                    countries[i].totalUsers,
                    countries[i].validUsers,
                    unique_users.length
                ];

                queryInsertCountryArray = queryInsertCountryArray.concat(Object.values(flattenStatisticsResults));

                queryInsert += sqlStringFromArray(queryInsertCountryArray);
                //console.log("\n\n\n\n",sqlFormatter.format(queryInsert), "\n\n"); //process.exit();

                //sql query for table for the normalized costs (all costs in EUR), check var AVG_DB_TEMPLATE
                if(USE_MONEY_API){

                    let flattenNormalizedStatisticsResults = Object.assign({}, flattenStatisticsResults); //clone object

                    //converts all costs to EUR, the costs are in object costs, which after being flattened every property starts with "costs_"
                    for (let costItem of Object.keys(flattenNormalizedStatisticsResults)){
                        if (costItem.startsWith("costs_") &&
                            costItem in flattenStatisticsResults &&
                            isFinite(flattenStatisticsResults[costItem])) {

                            flattenNormalizedStatisticsResults[costItem] = fx(flattenStatisticsResults[costItem]).from(currency).to('EUR');
                        }
                    }

                    let queryInsertNormCountryArray = [
                        countryCode,
                        dateString,
                        'EUR',
                        currencyConversionToEUR,
                        countries[i].totalUsers,
                        countries[i].validUsers,
                        unique_users.length
                    ];

                    queryInsertNormCountryArray = queryInsertNormCountryArray.concat(Object.values(flattenNormalizedStatisticsResults));

                    queryInsertNorm += sqlStringFromArray(queryInsertNormCountryArray);
                }

                if (i !== countries.length-1){//doesn't add "," on the last set of values
                    queryInsert += ", ";

                    if(USE_MONEY_API){
                        queryInsertNorm += ", ";
                    }
                }
                //console.log(countryCode);
            }
            //console.log(sqlFormatter.format(queryInsert)); process.exit();

            consoleLogTheFinalAverages(countries);

            callback();
        },

        /*=========================================================================*/
        //Deletes table completely: monthly_costs_statistics
        function(callback) {
            console.log("\nDeleting table from DB");

            //deletes table completely
            db.query('DROP TABLE IF EXISTS ' + DB_INFO.db_tables.monthly_costs_statistics, function(err, results, fields) {
                if (err){
                    console.log(err);
                    process.exit();
                }

                console.error('Previous table deleted from ' + 'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_statistics);
                callback();
            });
        },

        /*=========================================================================*/
        //Deletes table completely: monthly_costs_normalized
        function(callback) {
            if(!USE_MONEY_API){
                callback(); return;
            }

            console.log("\nDeleting table from DB");

            //deletes table completely
            db.query('DROP TABLE IF EXISTS ' + DB_INFO.db_tables.monthly_costs_normalized, function(err, results, fields) {
                if (err){
                    console.log(err);
                    process.exit();
                }

                console.error('Previous table deleted from ' + 'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_normalized);
                callback();
            });
        },

        /*=========================================================================*/
        //Creates new table: monthly_costs_statistics
        function(callback) {
            console.log("\nCreating new table into DB");

            let createTableQuery = "CREATE TABLE IF NOT EXISTS " + DB_INFO.db_tables.monthly_costs_statistics + " ";

            let arrayOfEntries = [];
            for(let key of Object.keys(AVG_DB_TEMPLATE)){
                arrayOfEntries.push(key + " " + AVG_DB_TEMPLATE[key]);
            }

            createTableQuery += sqlStringFromArray(arrayOfEntries, false);
            //console.log(sqlFormatter.format(createTableQuery)); process.exit();

            db.query(createTableQuery, function(err, results, fields) {
                if (err){
                    console.error(err);
                    process.exit();
                }

                console.error('Table created in ' + 'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_statistics);
                callback();
            });
        },

        /*=========================================================================*/
        //Creates new table: monthly_costs_normalized
        //where the costs are all converted to EUR
        function(callback) {
            if(!USE_MONEY_API){
                callback(); return;
            }

            console.log("\nCreating new table into DB");

            let createTableQuery = "CREATE TABLE IF NOT EXISTS " + DB_INFO.db_tables.monthly_costs_normalized;

            let arrayOfEntries = [];
            for(let key of Object.keys(AVG_DB_TEMPLATE)){
                arrayOfEntries.push(key + " " + AVG_DB_TEMPLATE[key]);
            }

            createTableQuery += sqlStringFromArray(arrayOfEntries, false);
            //console.log(sqlFormatter.format(createTableQuery)); process.exit();

            db.query(createTableQuery, function(err, results, fields) {
                if (err){
                    console.error(err);
                    process.exit();
                }

                console.error('Table created in ' + 'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_normalized);
                callback();
            });
        },

        /*=========================================================================*/
        //insert table monthly_costs_statistics into DB
        function(callback) {
            console.log("\nInserting new calculated data into DB");

            db.query(queryInsert, function(err, results, fields) {
                if (err){
                    console.error(("\n\n SQL ERROR: " + err.sqlMessage + "\n\n").red.bold);
                    console.error(sqlFormatter.format(err.sql));
                    process.exit();
                }

                console.log('All new data successfully added into ' +
                            'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_statistics);
                callback();
            });
        },

        /*=========================================================================*/
        //insert table monthly_costs_normalized into DB
        function(callback) {
            if(!USE_MONEY_API){
                callback(); return;
            }

            console.log("\nInserting new calculated data into DB");

            db.query(queryInsertNorm, function(err, results, fields) {
                if (err){
                    console.error(("\n\n SQL ERROR: " + err.sqlMessage + "\n\n").red.bold);
                    console.error(sqlFormatter.format(err.sql));
                    process.exit();
                }

                console.log('All new data successfully added into ' +
                            'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_normalized);
                callback();
            });
        },

        /*=========================================================================*/
        //finishes DB connection
        function(callback) {
            db.end();
            callback();
        }
    ]);
}).catch(function(err){
    console.log(err);
    process.exit();
});


//from an array ["a", "b", undefined, true, 3, false] returns string "('a', 'b', NULL, 1, 3, 0)"
function sqlStringFromArray(inputArray, addQuotesInStringsBool=true){

    var str = "(";

    var length = inputArray.length;
    for (let i=0; i<length; i++){
        let item = inputArray[i];
        let isStr = typeof item === "string" && addQuotesInStringsBool;

        //sanitize for sql string
        if(typeof item === "undefined" ||
           typeof item === "number" && !isFinite(item)){
            item = 'NULL';
            isStr = false;
        }

        str += (isStr ? "'" : "") + item + (isStr ? "'" : "");
        str += (i !== length-1 ? ", " : ") " );
    }

    return str;
}


//prints in the shell a sorted list of the computed countries
function consoleLogTheFinalAverages(countries){

    countries.sort(function(a, b) {//sorts the array by the valid users field
        return parseFloat(b.valid_users) - parseFloat(a.valid_users);
    });

    var total_valid_users = 0;
    var total_users = 0;

    for (let i=0; i<countries.length; i++) {
        total_valid_users += countries[i].validUsers;
        total_users += countries[i].totalUsers;        
    }

    console.log("\nTotal users: " + total_users);
    console.log("Total valid users: " + total_valid_users);

    console.log("\nCountry | Monthly costs | Valid users | Total users | Valid ratio | % of total valid users");
    for (let i=0; i<countries.length; i++) {
        
        let totalCostsStr = !isNaN(countries[i].totalCosts) ? countries[i].totalCosts.toFixed(0) : "";
        
        console.log("\n" + ("        " + countries[i].Country).slice(-5) + "  " +
            " | " + ("          " + totalCostsStr).slice(-9) + " " + countries[i].currency +
            " | " + ("            " + countries[i].validUsers).slice(-11) +
            " | " + ("            " + countries[i].totalUsers).slice(-11) +
            " | " + ("            " + (countries[i].validUsers/countries[i].totalUsers*100).toFixed(1) + "%").slice(-11) +
            " | " + ("               " + (countries[i].validUsers/total_valid_users*100).toFixed(1) + "%").slice(-14));
    }

    console.log("\nData calculated and DB query built");
}

