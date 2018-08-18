/*Node script which populates the costs statistical DB tables for each country*/

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
    
    eval(fs.readFileSync(fileNames.src["conversionFunctions.js"]).toString());
    eval(fs.readFileSync(fileNames.src["coreFunctions.js"]).toString());
    eval(fs.readFileSync(fileNames.src["getData.js"]).toString());
    eval(fs.readFileSync(fileNames.server["statsFunctions.js"]).toString());
    
    //**************************************************************************************************
    //                            Database for Average template
    // Template of the DBs (monthly_costs_statistics and monthly_costs_normalized) that will be created 
    // and into which the averages from the users will be stored, with a row of said DB for each country                                                          
    var AVG_DB_TEMPLATE = [        
        [ "country",               "text" ],
        [ "Date_of_calculation",   "date" ],
        [ "Currency",              "text" ],
        [ "CurrToEUR",            "float" ],
        /*Monthly costs elems. will come here, see statsFunctions.js*/
        [ "standing_costs",       "float" ],
        [ "running_costs",        "float" ],
        [ "total_costs",          "float" ],
        /*Financial Effort elms. will come here, see statsFunctions.js*/
        [ "running_costs_dist",   "float" ],  
        [ "total_costs_dist",     "float" ],
        [ "kinetic_speed",        "float" ],
        [ "virtual_speed",        "float" ],
        [ "valid_users",        "int(11)" ],
        [ "total_users",        "int(11)" ],
        [ "global_total_users", "int(11)" ]
    ];

    //inserts monthly costs elements into array, after "CurrToEUR"
    var keys = Object.keys(new MonthlyCostsObj()); //template with Object, see statFunctions.js
    var monthly_costs_length = keys.length;
    for (let i = monthly_costs_length-1; i >= 0; i--){        
        AVG_DB_TEMPLATE.splice(4, 0, [keys[i], "float"]);
    }
        
    //inserts financial effort elements into array, after "total_costs"
    keys = Object.keys(new FinEffortObj()); //template with Object, see statFunctions.js
    for (let i = keys.length-1; i>=0; i--){        
        AVG_DB_TEMPLATE.splice(7 + monthly_costs_length, 0, [keys[i], "float"]);
    }
    
    //console.log(AVG_DB_TEMPLATE);
    /*********************************************************************************************/
    
    var DB_INFO    = settings.dataBase.credentials;
    var MoneyApiId = settings.money.ApiId;
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
            console.log("\nLoad exchange rates via API on openexchangerates.org");
            var API_url = 'https://openexchangerates.org/api/latest.json?app_id=' + MoneyApiId;
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
            
            /*builds sql query Header based on AVG_DB_TEMPLATE*/
            var queriesHeader = "(";
            for (let i=0; i<AVG_DB_TEMPLATE.length; i++){
                queriesHeader += AVG_DB_TEMPLATE[i][0] + (i != AVG_DB_TEMPLATE.length-1 ? ", " : ") ");    
            }            
            
            queriesHeader += "VALUES ";
            
            queryInsert     += queriesHeader;
            queryInsertNorm += queriesHeader;

            //builds the query to insert all the vaules for each country
            //sql query:... VALUES (PT, value1, value2,...),(BR, value1, value2,...),etc.
            for (let i = 0; i < countries.length; i++){
                process.stdout.write(countries[i].Country + " ");

                country_users = []; //array with unique_users for selected countries[i]
                country_data  = []; //array with everything for selected countries[i]

                //creates an array of unique users for the selected country
                for (let j=0; j<unique_users.length; j++){
                    if (unique_users[j].country == countries[i].Country){
                        country_users.push(unique_users[j]);
                    }
                }
                //if(true) {console.log("country_users:");console.log(country_users);}

                //creates an array with all the inputs for the selected country
                for (let j=0; j<AllUserInputDb.length; j++){
                    if (AllUserInputDb[j].country == countries[i].Country){
                        country_data.push(AllUserInputDb[j]);
                    }
                }
                //if(true) {console.log("country_data:");console.log(country_data);}

                let country_object = {
                    code: countries[i].Country,
                    currency: countries[i].currency,
                    distance_std: countries[i].distance_std,
                    fuel_efficiency_std: countries[i].fuel_efficiency_std,
                    fuel_price_volume_std: countries[i].fuel_price_volume_std
                };
                //if(true) {console.log("country_object:");console.log(country_object);}

                let stats_results = calculateStatistics(country_users, country_data, country_object);

                //add computed data to countries array of objects
                countries[i].valid_users = stats_results.users_counter;
                countries[i].total_users = country_users.length;
                countries[i].total_costs = stats_results.totCostsPerMonth.toFixed(1);
                
                //currency conversion to EUR
                let curr = countries[i].currency;
                let currToEUR = fx(1).from('EUR').to(curr);
                //console.log(currToEUR);

                /**********************************************************************/
                //builds sql query for respective country, check var AVG_DB_TEMPLATE
                let queryInsertCountry =                                       " ('"  + 
                    countries[i].Country                                     + "', '" +
                    date_string                                              + "', '" +
                    curr                                                     + "', '" +
                    currToEUR                                                + "', '";
                
                for (let key of Object.keys(stats_results.monthly_costs)){
                    queryInsertCountry += stats_results.monthly_costs[key]   + "', '";
                }
                
                queryInsertCountry += 
                    stats_results.standCos                                   + "', '" +
                    stats_results.runnCos                                    + "', '" +
                    stats_results.totCostsPerMonth                           + "', '";
                
                for (let key of Object.keys(stats_results.fin_effort)){
                    queryInsertCountry += stats_results.fin_effort[key]      + "', '";
                }
                
                queryInsertCountry += 
                    stats_results.runCostsPerDist                            + "', '" +
                    stats_results.totCostsPerDist                            + "', '" +               
                    stats_results.kinetic_speed                              + "', '" +
                    stats_results.virtual_speed                              + "', '" +
                    countries[i].valid_users                                 + "', '" +
                    countries[i].total_users                                 + "', '" +
                    unique_users.length + 
                    "' )";
                
                //console.log(queryInsertCountry, "\n\n");
                queryInsert += queryInsertCountry;
                /**************************************************************/
                
                
                /**************************************************************/
                //sql query for table for the normalized costs (all costs in EUR), check var AVG_DB_TEMPLATE
                let queryInsertNormCountry =                                    " ('"   + 
                    countries[i].Country                                       + "', '" +
                    date_string                                                + "', '" +
                    ('EUR')                                                    + "', '" +
                    currToEUR                                                  + "', '";  
                
                for (let key of Object.keys(stats_results.monthly_costs)){
                    queryInsertNormCountry += 
                        fx(stats_results.monthly_costs[key]).from(curr).to('EUR') + "', '";
                }
                
                queryInsertNormCountry += 
                    fx(stats_results.standCos).from(curr).to('EUR')            + "', '" +
                    fx(stats_results.runnCos).from(curr).to('EUR')             + "', '" +
                    fx(stats_results.totCostsPerMonth).from(curr).to('EUR')    + "', '";                    
                
                let fe = stats_results.fin_effort;
                queryInsertNormCountry += 
                    fx(fe.aver_income_per_hour).from(curr).to('EUR')           + "', '" +
                    fx(fe.aver_income_per_month).from(curr).to('EUR')          + "', '" +
                    fx(fe.income_per_year).from(curr).to('EUR')                + "', '" +
                    fx(fe.total_costs_year).from(curr).to('EUR')               + "', '" +
                    fe.hours_per_year_to_afford_car                            + "', '" +
                    fe.days_car_paid                                           + "', '" +
                    fe.month_per_year_to_afford_car                            + "', '";
                
                queryInsertNormCountry +=                    
                    fx(stats_results.runCostsPerDist).from(curr).to('EUR')     + "', '" +
                    fx(stats_results.totCostsPerDist).from(curr).to('EUR')     + "', '" +
                    stats_results.kinetic_speed                                + "', '" +
                    stats_results.virtual_speed                                + "', '" +
                    countries[i].valid_users                                   + "', '" +
                    countries[i].total_users                                   + "', '" +
                    unique_users.length + 
                    "' )";      
                
                queryInsertNorm += queryInsertNormCountry;
                /**************************************************************/
                
                if (i != countries.length-1){//doesn't add "," on the last set of values
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
            var total_valid_users = 0;
            var total_users = 0;
            for (let i=0; i<countries.length; i++) {
                total_valid_users += countries[i].valid_users;
                total_users += countries[i].total_users;
            }
            console.log("\nTotal users: " + total_users);
            console.log("Total valid users: " + total_valid_users);

            console.log("\nCountry | Total costs | Valid users | Total users | Valid ratio | % of total valid users");
            for (let i=0; i<countries.length; i++) {
                console.log("\n" + ("        " + countries[i].Country).slice(-5) + "  " +
                    " | " + ("        " + countries[i].total_costs).slice(-7) + " " + countries[i].currency +
                    " | " + ("            " + countries[i].valid_users).slice(-11) +
                    " | " + ("            " + countries[i].total_users).slice(-11) +
                    " | " + ("            " + 
                             (countries[i].valid_users/countries[i].total_users*100).toFixed(1) + "%").slice(-11) +
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
            
            var createTableQuery = "CREATE TABLE IF NOT EXISTS " + DB_INFO.db_tables.monthly_costs_statistics; 
            
            createTableQuery += " (";
            
            for (let i=0; i<AVG_DB_TEMPLATE.length; i++){
                createTableQuery += AVG_DB_TEMPLATE[i][0] + " " + AVG_DB_TEMPLATE[i][1];
                createTableQuery += (i != AVG_DB_TEMPLATE.length-1 ? ", " : ") "); 
            }
            
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

            var createTableQuery = "CREATE TABLE IF NOT EXISTS " + DB_INFO.db_tables.monthly_costs_normalized;

            createTableQuery += " (";
            
            for (let i=0; i<AVG_DB_TEMPLATE.length; i++){
                createTableQuery += AVG_DB_TEMPLATE[i][0] + " " + AVG_DB_TEMPLATE[i][1];
                createTableQuery += (i != AVG_DB_TEMPLATE.length-1 ? ", " : ") "); 
            }
            
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
    