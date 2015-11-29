//includes
var fs = require('fs');
eval(fs.readFileSync('../js/conversionFunctions.js')+'');
eval(fs.readFileSync('../js/coreFunctions.js')+'');
eval(fs.readFileSync('../js/get_data.js')+'');
eval(fs.readFileSync('./statsFunctions.js')+'');

//module to allow to execute the queries in series
var async      = require('async');
//module to get info from DB
var mysql      = require('mysql');

var login_UserInputDB = {
  host     : 'localhost',
  user     : 'jfolpf_dev',
  password : '124devAC%',
  database : 'jfolpf_autocosts_test'
};

//database variable
var db; 

//array that will be created from availabe countries in DB
var countries = [];
var unique_users = [];
var AllUserInputDb = [];

//method that forces several methods to run synchronously
async.series([
    //task 1 - get the set of different countries and set them in array countries[]
    function(callback) {
        db = mysql.createConnection(login_UserInputDB);
        db.connect();
        //console.log("point 1");
        db.query('SELECT DISTINCT country, country FROM users_insertions', function(err, results, fields) {
            if (err) return callback(err);
            
            //Check that a user was found
            for (var i=0; i<results.length; i++){
                if (results[i].country){
                    countries.push(results[i].country);
                }
            }
            //console.log(countries);
            db.end();        
            callback();
        });
    },
    //task 2 - get users unique ID
    function(callback) {        
        db = mysql.createConnection(login_UserInputDB);
        db.connect();
        //console.log("begin task 2");
        db.query('SELECT DISTINCT uuid_client, country FROM users_insertions', function(err, results, fields) {
            console.log("error task 2: " + err);
            if (err) return callback(err);
            for (var i=0; i<results.length; i++){
                unique_users.push(results[i]);
            }
            //console.log(unique_users);
            db.end();
            callback();
        });
    },
    //task 3 - get all data from users input DB
    function(callback) {        
        db = mysql.createConnection(login_UserInputDB);
        db.connect();
        //console.log("begin task 3");
        db.query('SELECT * FROM users_insertions', function(err, results, fields) {
            console.log("error task 3: " + err);
            if (err) return callback(err);
            console.log("point 4");
            for (var i=0; i<results.length; i++){
                AllUserInputDb.push(results[i]);
            }
            //console.log(AllUserInputDb);
            db.end();
            callback();
        });
    },
    //task 4 - calculate avarages
    function(callback) {
            console.log("begin task 4");
            var country_users = [];
            var country_data  = [];

            for (var i=0; i<1; i++){ //countries.length
	        for (var j=0; j<unique_users.length; j++){                
                    if (unique_users[j].country==countries[i])
                        country_users.push(unique_users[j]);
                }
                //console.log(country_users);
	        for (var j=0; j<AllUserInputDb.length; j++){                
                    if (AllUserInputDb[j].country==countries[i])
                        country_data.push(AllUserInputDb[j]);
                }
                //console.log(country_data);

		var country_object = {
				code: countries[i],
				currency: 'EUR',
				distance_std: 1,
				fuel_efficiency_std: 1,
				fuel_price_volume_std: 1							
                };

                var stats_results = CalculateStatistics(country_users, country_data, country_object);
                console.log("Total costs: " + stats_results.totCos);
            }
            console.log("point 5");
            callback();
    }
]);




