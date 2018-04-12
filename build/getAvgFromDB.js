/*Node script which populates the average DB tables for each country*/

console.log("\nRunning script " + __filename + "\n");

//includes
const fs       = require('fs');
const path     = require("path");
const async    = require('async'); //module to allow to execute the queries in series
const mysql    = require('mysql'); //module to get info from DB
const isOnline = require('is-online');
const commons  = require(path.join(__dirname, '..', 'commons'));
const request  = require('request'); //to make HTTP requests
var   fx       = require("money"); //currency conversion API; needs to be "var" because it will change

commons.init();
//Main directories got from commons
var directories = commons.getDirectories();
var ROOT_DIR = directories.server.root;
var SRC_DIR  = directories.server.src;

var settings  = commons.getSettings();
var fileNames = commons.getFileNames();

//checks for internet connection
isOnline().then(function(online) {
    
    if(!online){
        console.log("There is no Internet Connection");
        process.exit();
    }
    
    eval(fs.readFileSync(fileNames.src["conversionFunctions.js"])+'');
    eval(fs.readFileSync(fileNames.src["coreFunctions.js"])+'');
    eval(fs.readFileSync(fileNames.src["getData.js"])+'');
    eval(fs.readFileSync(fileNames.server["statsFunctions.js"])+'');

    var DB_INFO = settings.dataBase.credentials;
    //detect for null or empty object
    if(!DB_INFO || Object.keys(DB_INFO).length === 0){
        throw commons.getDataBaseErrMsg(__filename, settings.dataBase);
    }
    //console.log(DB_INFO);

    //database variable
    var db;

    var countries = [];       //array of objects with countries information
    var unique_users = [];    //array of objects having unique_users IDs and respective countries
    var AllUserInputDb = [];  //array of objects with all the data from the inputs users DB
    var queryInsert;          //SQL string to where all the average costs will be inserted
    var queryInsertNorm;      //SQL string to where all the average Normalized costs will be inserted (all costs in EUR)    

    //string with the date DD/MM/YYYY
    var d = new Date();
    var date_string = d.getFullYear().toString()+"-"+(d.getMonth()+1).toString()+"-"+d.getDate().toString();
    //console.log(date_string);

    //method that forces several methods to run synchronously
    async.series([

        //Load money API for the currency conversion
        //see: http://openexchangerates.github.io/money.js/
        //and: https://openexchangerates.org/account/app-ids
        function(callback) {
            console.log("Load exchange rates via API on openexchangerates.org");
            var API_url = 'https://openexchangerates.org/api/latest.json?app_id='+API_ID;
            //HTTP Header request
            var options = {
                url: API_url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };
            
            request(options, function(error, response, body){
                if (!error && typeof fx !== "undefined" && fx.rates ) {
                    var result = JSON.parse(body);
                    fx.rates = result.rates;
                    fx.base = result.base;
                } else {
                    throw "Error loading money API";
                }                               
                                
                callback();
            });
        },
        
        //creates DB connection and connects
        function(callback) {

            db = mysql.createConnection(DB_INFO);
            console.log('\nGetting the set of different countries from ' +
                        'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.country_specs);

            db.connect(function(err){
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
                console.log('User ' + DB_INFO.user + 
                            ' connected successfully to DB ' + DB_INFO.database + 
                            ' at ' + DB_INFO.host);
                //console.log(DB_INFO);
                callback();
            });            
        },
        
        //Get the set of different countries and set them in array countries[]
        function(callback) {
            //console.log("DB login data: "); console.log(DB_INFO);

            db.query('SELECT * FROM ' + DB_INFO.db_tables.country_specs, function(err, results, fields) {
                if (err) {console.log(err); throw err;}
                //Check that a user was found
                for (var i=0; i<results.length; i++){
                    if (results[i].Country){
                        countries.push(results[i]);
                    }
                }
                //console.log(countries);
                callback();
            });
        },

        //Get users unique ID
        function(callback) {
            console.log('\nGetting users unique IDs from ' +
                        'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.users_insertions);

            db.query('SELECT DISTINCT uuid_client, country FROM ' + DB_INFO.db_tables.users_insertions, 
                function(err, results, fields) {
                    if (err) return callback(err);
                    for (var i=0; i<results.length; i++){
                        unique_users.push(results[i]);
                    }
                    //console.log(unique_users);
                    callback();
                }
            );
        },

        //Get all data from users input DB
        function(callback) {
            console.log('\nGetting all user insertion data from ' +
                        'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.users_insertions);

            db.query('SELECT * FROM ' + DB_INFO.db_tables.users_insertions, function(err, results, fields) {
                if (err) return callback(err);

                for (var i=0; i<results.length; i++){
                    AllUserInputDb.push(results[i]);
                }
                //console.log(AllUserInputDb);
                callback();
            });
        },

        //Calculates statistical average costs for each country and builds SQL query
        function(callback) {
            console.log('\nCalculating data and building DB insertion data for ' + 
                        'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_statistics);
            var country_users = []; //array with unique users for one specific country
            var country_data  = []; //array where all data for one specific country is inserted

            //queries header
            queryInsert     = "INSERT INTO " + DB_INFO.db_tables.monthly_costs_statistics + " ";
            queryInsertNorm = "INSERT INTO " + DB_INFO.db_tables.monthly_costs_normalized + " ";
            
            var queriesHeader = "(\
                country,\
                Date_of_calculation,\
                Currency,\
                CurrToEUR,\
                \
                Depreciation,\
                Insurance,\
                Loan_interests,\
                Inspection,\
                Car_tax,\
                Maintenance,\
                Fuel,\
                Repairs,\
                Parking,\
                Tolls,\
                Fines,\
                Washing,\
                \
                standing_costs,\
                running_costs,\
                total_costs,\
                \
                running_costs_dist,\
                total_costs_dist,\
                \
                kinetic_speed,\
                virtual_speed,\
                \
                total_costs_year,\
                \
                valid_users,\
                total_users,\
                global_total_users)\
                \
                VALUES ";
            
            queryInsert     += queriesHeader;
            queryInsertNorm += queriesHeader;

            //builds the query to insert all the vaules for each country
            //sql query:... VALUES (PT, value1, value2,...),(BR, value1, value2,...),etc.
            for (var i = 0; i < countries.length; i++){
                process.stdout.write(countries[i].Country + " ");

                country_users = []; //array with unique_users for selected countries[i]
                country_data  = []; //array with everything for selected countries[i]

                for (var j=0; j<unique_users.length; j++){
                    if (unique_users[j].country==countries[i].Country)
                        country_users.push(unique_users[j]);
                }
                //if(true) {console.log("country_users:");console.log(country_users);}

                for (j=0; j<AllUserInputDb.length; j++){
                    if (AllUserInputDb[j].country==countries[i].Country)
                        country_data.push(AllUserInputDb[j]);
                }
                //if(true) {console.log("country_data:");console.log(country_data);}

                var country_object = {
                    code: countries[i].Country,
                    currency: countries[i].currency,
                    distance_std: countries[i].distance_std,
                    fuel_efficiency_std: countries[i].fuel_efficiency_std,
                    fuel_price_volume_std: countries[i].fuel_price_volume_std
                };
                //if(true) {console.log("country_object:");console.log(country_object);}

                var stats_results = CalculateStatistics(country_users, country_data, country_object);

                //add computed data to countries array of objects
                countries[i].valid_users = stats_results.users_counter;
                countries[i].total_users = country_users.length;
                countries[i].total_costs = stats_results.totCos.toFixed(1);
                
                //currency conversion to EUR
                var curr = countries[i].currency;
                var currToEUR = fx(1).from('EUR').to(curr);
                //console.log(currToEUR);

                queryInsert += " ('" + 
                    countries[i].Country          + "', '" +
                    date_string                   + "', '" +
                    curr                          + "', '" +
                    currToEUR                     + "', '" +
                    stats_results.dep             + "', '" +                                                    
                    stats_results.ins             + "', '" +
                    stats_results.cred            + "', '" +
                    stats_results.insp            + "', '" +
                    stats_results.carTax          + "', '" +
                    stats_results.maint           + "', '" +
                    stats_results.fuel            + "', '" +
                    stats_results.rep             + "', '" +
                    stats_results.park            + "', '" +
                    stats_results.tolls           + "', '" +
                    stats_results.fines           + "', '" +
                    stats_results.wash            + "', '" +
                    stats_results.standCos        + "', '" +
                    stats_results.runnCos         + "', '" +
                    stats_results.totCos          + "', '" +
                    stats_results.runCostsProDist + "', '" +
                    stats_results.totCostsProDist + "', '" +
                    stats_results.kinetic_speed   + "', '" +
                    stats_results.virtual_speed   + "', '" +
                    ((stats_results.totCostsPerYear/100).
                        toFixed(0))*100           + "', '" +
                    countries[i].valid_users      + "', '" +
                    countries[i].total_users      + "', '" +
                    unique_users.length + 
                    "' )";
                
                
                //sql query for table for the normalized costs (all costs in EUR)
                queryInsertNorm += " ('" + 
                    countries[i].Country                                   + "', '" +
                    date_string                                            + "', '" +
                    ('EUR')                                                + "', '" +
                    currToEUR                                              + "', '" +
                    fx(stats_results.dep).from(curr).to('EUR')             + "', '" + 
                    fx(stats_results.ins).from(curr).to('EUR')             + "', '" +
                    fx(stats_results.cred).from(curr).to('EUR')            + "', '" +
                    fx(stats_results.insp).from(curr).to('EUR')            + "', '" +
                    fx(stats_results.carTax).from(curr).to('EUR')          + "', '" +
                    fx(stats_results.maint).from(curr).to('EUR')           + "', '" +
                    fx(stats_results.fuel).from(curr).to('EUR')            + "', '" +
                    fx(stats_results.rep).from(curr).to('EUR')             + "', '" +
                    fx(stats_results.park).from(curr).to('EUR')            + "', '" +
                    fx(stats_results.tolls).from(curr).to('EUR')           + "', '" +
                    fx(stats_results.fines).from(curr).to('EUR')           + "', '" +
                    fx(stats_results.wash).from(curr).to('EUR')            + "', '" +
                    fx(stats_results.standCos).from(curr).to('EUR')        + "', '" +
                    fx(stats_results.runnCos).from(curr).to('EUR')         + "', '" +
                    fx(stats_results.totCos).from(curr).to('EUR')          + "', '" +
                    fx(stats_results.runCostsProDist).from(curr).to('EUR') + "', '" +
                    fx(stats_results.totCostsProDist).from(curr).to('EUR') + "', '" +
                    fx(stats_results.kinetic_speed).from(curr).to('EUR')   + "', '" +
                    fx(stats_results.virtual_speed).from(curr).to('EUR')   + "', '" +
                    fx(stats_results.totCostsPerYear).from(curr).to('EUR') + "', '" +
                    countries[i].valid_users                               + "', '" +
                    countries[i].total_users                               + "', '" +
                    unique_users.length + 
                    "' )";
                
                if (i!=countries.length-1){//doesn't add "," on the last set of values
                    queryInsert     += ", ";
                    queryInsertNorm += ", ";
                }
                //console.log(countries[i].Country);
            }
            //console.log(queryInsert.replace(/\s\s+/g, ' ').replace(/(\)\,\s)/g, `),\n`));

            //console.log(countries);
            //prints in the shell a sorted list of the computed countries
            countries.sort(function(a, b) {//sorts the array by the valid users field
                return parseFloat(b.valid_users) - parseFloat(a.valid_users);
            });
            var total_valid_users=0;
            var total_users=0;
            for (i=0; i<countries.length; i++) {
                total_valid_users += countries[i].valid_users;
                total_users += countries[i].total_users;
            }
            console.log("\nTotal users: " + total_users);
            console.log("Total valid users: " + total_valid_users);

            console.log("\nCountry | Total costs | Valid users | Total users | Valid ratio | % of total valid users");
            for (i=0; i<countries.length; i++) {
                console.log("\n" + ("        " + countries[i].Country).slice(-5) + "  " +
                    " | " + ("        " + countries[i].total_costs).slice(-7) + " " + countries[i].currency +
                    " | " + ("            " + countries[i].valid_users).slice(-11) +
                    " | " + ("            " + countries[i].total_users).slice(-11) +
                    " | " + ("            " + (countries[i].valid_users/countries[i].total_users*100).toFixed(1) + "%").slice(-11) +
                    " | " + ("               " + (countries[i].valid_users/total_valid_users*100).toFixed(1) + "%").slice(-14));
            }
            console.log("\nData calculated and DB query built");
            callback();
        },

        //Deletes table completely: monthly_costs_statistics
        function(callback) {
            console.log("\nDeleting table from DB");

            //deletes table completely
            db.query('DROP TABLE IF EXISTS ' + DB_INFO.db_tables.monthly_costs_statistics, function(err, results, fields) {
                if (err){console.log(err); return callback(err);}                
                console.error('Previous table deleted from ' +
                              'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_statistics);
                callback();
            });
        },
        
        //Deletes table completely: monthly_costs_normalized
        function(callback) {
            console.log("\nDeleting table from DB");

            //deletes table completely
            db.query('DROP TABLE IF EXISTS ' + DB_INFO.db_tables.monthly_costs_normalized, function(err, results, fields) {
                if (err){console.log(err); return callback(err);}                
                console.error('Previous table deleted from ' +
                              'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_normalized);
                callback();
            });
        },        
        
        //Creates new table: monthly_costs_statistics
        function(callback) {
            console.log("\nCreating new table into DB");

            var createTableQuery = "CREATE TABLE IF NOT EXISTS " + DB_INFO.db_tables.monthly_costs_statistics + " (\
                country              text,\
                Date_of_calculation  date,\
                Currency             text,\
                CurrToEUR            float,\
                \
                Depreciation         float,\
                Insurance            float,\
                Loan_interests       float,\
                Inspection           float,\
                Car_tax              float,\
                Maintenance          float,\
                Fuel                 float,\
                Repairs              float,\
                Parking              float,\
                Tolls                float,\
                Fines                float,\
                Washing              float,\
                \
                standing_costs       float,\
                running_costs        float,\
                total_costs          float,\
                \
                running_costs_dist   float,\
                total_costs_dist     float,\
                \
                kinetic_speed        float,\
                virtual_speed        float,\
                \
                total_costs_year     float,\
                \
                valid_users          int(11),\
                total_users          int(11),\
                global_total_users   int(11))";
            
            db.query(createTableQuery, function(err, results, fields) {
                if (err){console.log(err); return callback(err);}
                console.error('Table created in ' +
                              'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_statistics);
                callback();
            });
        },   
        
        //Creates new table: monthly_costs_normalized
        //where the costs are all converted to EUR
        function(callback) {
            console.log("\nCreating new table into DB");

            var createTableQuery = "CREATE TABLE IF NOT EXISTS " + DB_INFO.db_tables.monthly_costs_normalized + " (\
                country              text,\
                Date_of_calculation  date,\
                Currency             text,\
                CurrToEUR            float,\
                \
                Depreciation         float,\
                Insurance            float,\
                Loan_interests       float,\
                Inspection           float,\
                Car_tax              float,\
                Maintenance          float,\
                Fuel                 float,\
                Repairs              float,\
                Parking              float,\
                Tolls                float,\
                Fines                float,\
                Washing              float,\
                \
                standing_costs       float,\
                running_costs        float,\
                total_costs          float,\
                \
                running_costs_dist   float,\
                total_costs_dist     float,\
                \
                kinetic_speed        float,\
                virtual_speed        float,\
                \
                total_costs_year     float,\
                \
                valid_users          int(11),\
                total_users          int(11),\
                global_total_users   int(11))";
            
            db.query(createTableQuery, function(err, results, fields) {
                if (err){console.log(err); return callback(err);}
                console.error('Table created in ' +
                              'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_normalized);
                callback();
            });
        },        

        //insert table monthly_costs_statistics into DB
        function(callback) {
            console.log("\nInserting new calculated data into DB");

            db.query(queryInsert, function(err, results, fields) {
                if (err){
                    console.log(err); 
                    return callback(err);
                }
                console.log('All new data successfully added into ' +
                            'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_statistics + '\n\n');
                
                callback();
            });
        },

        //insert table monthly_costs_normalized into DB
        function(callback) {
            console.log("\nInserting new calculated data into DB");

            db.query(queryInsertNorm, function(err, results, fields) {
                if (err){
                    console.log(err); 
                    return callback(err);
                }
                console.log('All new data successfully added into ' +
                            'DB table ' + DB_INFO.database + '->' + DB_INFO.db_tables.monthly_costs_normalized + '\n\n');
                
                callback();
            });
        },        
        
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
    