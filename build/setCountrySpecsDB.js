/*script that populates a country DB with specs for each country*/

console.log("Populating the 'countries specs DB' with information from the countries files");
console.log("\nRunning script " + __filename + "\n");

//includes
const fs       = require('fs');
const path     = require("path");
const async    = require('async'); //module to allow to execute the queries in series
const mysql    = require('mysql'); //module to get info from DB
const sortObj  = require('sort-object'); //to sort JS objects
const isOnline = require('is-online');
const commons  = require('../commons.js');

commons.init();
//Main directories got from commons
var directories       = commons.getDirectories();
var ROOT_DIR          = directories.server.root;
var SRC_DIR           = directories.server.src;
var COUNTRIES_DIR     = directories.src.countries; 

var fileNames         = commons.getFileNames();
var COUNTRY_LIST_FILE = fileNames.server.countriesListFile;

var settings = commons.getSettings();

//checks for internet connection
isOnline().then(online => {
    
    if(!online){
        console.log("There is no Internet Connection");
        process.exit();
    }
    
    var DB_INFO = settings.dataBase.credentials;
    //detect for null or empty object
    if(!DB_INFO || Object.keys(DB_INFO).length === 0){
        throw commons.getDataBaseErrMsg(__filename, settings.dataBase);
    }
    console.log(DB_INFO);

    //getting country information from 
    console.log("Get Countries info from: " + COUNTRY_LIST_FILE);
    var country_list = JSON.parse(fs.readFileSync(COUNTRY_LIST_FILE, 'utf8'));
    var availableCountries = country_list.availableCountries;
    var languagesCountries = country_list.languagesCountries;
    var domains_CT = country_list.domains_CT;
    var WORDS;

    //sorts array of countries
    availableCountries = sortObj(availableCountries);
    delete availableCountries["XX"];

    //process.exit();

    //database variable
    var db;

    async.series([

        //delete table before populate it
        function(callback) {
            console.log("Deleting DB table " + DB_INFO.database + '->' + DB_INFO.db_tables.country_specs +
                        " " + "before populating it with country specs");

            db = mysql.createConnection(DB_INFO);

            db.connect(function(err){
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
                console.log('User ' + DB_INFO.user + 
                            ' connected successfully to DB ' + DB_INFO.database + 
                            ' at ' + DB_INFO.host);
            });

            db.query('DELETE FROM ' + DB_INFO.db_tables.country_specs, function(err, results, fields) {
                if (err) {console.log(err); throw err;}
                //console.log(countries);            
                console.log("Previous data deleted from table");
                callback();
            });
        },

        function(callback) {

            var queryInsert;
            for (var key in availableCountries){                        

                WORDS = JSON.parse(fs.readFileSync(COUNTRIES_DIR + key + ".json", 'utf8'));
                queryInsert = "INSERT INTO " + DB_INFO.db_tables.country_specs + " ( \
                    Country, \
                    currency, \
                    distance_std, \
                    fuel_efficiency_std, \
                    fuel_price_volume_std \
                    ) \
                      \
                    VALUES ( \
                    '" + key + "', \
                    '" + WORDS['curr_code'] + "', \
                    " + WORDS['distance_std_option'] + ", \
                    " + WORDS['fuel_efficiency_std_option'] + ", \
                    " + WORDS['fuel_price_volume_std'] + " \
                    )";


                var size = Object.keys(availableCountries).length;
                var i=0;
                db.query(queryInsert ,
                    (function(key2){
                        return function(err, results, fields) {
                            if (err) {console.log(err); throw err;}                
                            process.stdout.write(key2 + " ");
                            i++;
                            //last callback
                            if (i == size){
                                process.stdout.write("\n" + "Countries specs inserted into respective DB\n\n");
                                db.end();
                                callback();
                            }
                        };
                    })(key));
            }            

        }
    ]);
}).catch(function(err){
    console.log(err);
    process.exit();
});
