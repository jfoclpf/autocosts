/*script that populates a country DB with specs for each country*/

console.log("Populating the 'countries specs DB' with information from the countries files");

//includes
const fs       = require('fs');
const path     = require("path");
const async    = require('async'); //module to allow to execute the queries in series
const mysql    = require('mysql'); //module to get info from DB
const sortObj  = require('sort-object'); //to sort JS objects
const isOnline = require('is-online');

var HOME_DIR      = path.resolve(__dirname, '..') + "/";
var SRC_DIR       = HOME_DIR + "src" + "/";
var COUNTRIES_DIR = SRC_DIR  + "countries" + "/"; 
var COUNTRY_LIST_FILE = COUNTRIES_DIR + "list.json";

//checks for internet connection
isOnline().then(online => {
    
    if(!online){
        console.log("There is no Internet Connection");
        process.exit();
    }

    var REL; //release shall be 'work' or 'prod', it's 'work' by default
    if(process.argv.length == 2){    
        REL = "work";
    }
    else if (process.argv.length > 3){
        console.log("Just one argument is accepted \n");
        process.exit();
    }
    else{
        if (process.argv[2]!="work" && process.argv[2]!="prod"){
            console.log("work or prod must be chosen \n");
            process.exit();
        }
        REL = process.argv[2];
    }
    console.log("chosen '" + REL + "'");

    //include credentials object
    var DB_INFO = JSON.parse(fs.readFileSync(HOME_DIR + 'keys/' + REL + '/db_credentials.json'));
    console.log(DB_INFO);

    //getting country information from 
    console.log("Get Countries info from: " + COUNTRY_LIST_FILE);
    var country_list = JSON.parse(fs.readFileSync(COUNTRY_LIST_FILE, 'utf8'));
    var available_CT = country_list.available_CT;
    var languages_CT = country_list.languages_CT;
    var domains_CT = country_list.domains_CT;
    var WORDS;

    //sorts array of countries
    available_CT = sortObj(available_CT);
    delete available_CT["XX"];

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
            for (var key in available_CT){                        

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


                var size = Object.keys(available_CT).length;
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
});

