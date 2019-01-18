/*File which generates the statistics tables on a HTML file
that will be shown in the right column of the main page*/
/*It calls also the PhantomJS script 'rasterTables.js' that rasters these tables into JPEG files*/


console.log("\nRunning script " + __filename + "\n");

//includes
const fs         = require('fs');
const path       = require("path");
const async      = require('async');        //module to allow to execute the queries in series
const mysql      = require('mysql');        //module to get info from DB
const sortObj    = require('sort-object');  //to sort JS objects
const isOnline   = require('is-online');
const handlebars = require('handlebars');   //see why here: https://stackoverflow.com/a/30032819/1243247
const colors     = require('colors');

const commons  = require(path.join(__dirname, '..', 'commons'));
const childProcess = require('child_process');

//checks for internet connection
isOnline().then(function(online) {
    
    if(!online){
        console.log("ERROR: no Internet connection".red.bold);
        process.exit();
    }
    
    commons.init();
    //Main directories got from commons
    const directories   = commons.getDirectories();
    const fileNames     = commons.getFileNames();

    var settings = commons.getSettings();    
    
    var DB_INFO = settings.dataBase.credentials;
    //detect for null or empty object
    if(!DB_INFO || Object.keys(DB_INFO).length === 0){
        throw commons.getDataBaseErrMsg(__filename, settings.dataBase);
    }    
    //console.log(DB_INFO);

    //getting country information from 
    console.log("Get Countries info from: " + fileNames.project.countriesListFile);
    var countriesInfo = JSON.parse(fs.readFileSync(fileNames.project.countriesListFile, 'utf8'));
    
    var availableCountries = countriesInfo.availableCountries;
    var languagesCountries = countriesInfo.languagesCountries;
    var domainsCountries = countriesInfo.domainsCountries;

    //sorts array of countries
    availableCountries = sortObj(availableCountries);

    //function for formating numbers which come from DB
    var fixNmbr = function(i,n){
        var float_num = parseFloat(i);    
        return float_num.toFixed(n);
    };
    
    var consumer_speed_url = "http://en.wikipedia.org/wiki/Effects_of_the_car_on_societies#Kinetic_speed_vs._consumer_speed";    
    db = mysql.createConnection(DB_INFO);

    db.connect(function(err){
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log("\n" + 'User ' + DB_INFO.user + 
                    ' connected successfully to DB ' + DB_INFO.database + 
                    ' at ' + DB_INFO.host + "\n");
    });

    console.log("Creating tables on ", directories.bin.tables);
    
    //get number of countries
    var nbrOfCountries = Object.keys(availableCountries).length, 
        count=0;
    
    //for each country creates a corresponding file
    for (var CC in availableCountries) {                
        
        (function (CCfile){                        
         
            var countryName = availableCountries[CCfile];
            var words = JSON.parse(fs.readFileSync(path.join(directories.src.countries, CCfile + ".json"), 'utf8'));        

            db.query("SELECT * FROM " + DB_INFO.db_tables.monthly_costs_statistics + 
                " WHERE countryCode='" + (CCfile!=="XX"?CCfile:"UK") + "'", 
                function(err, results, fields) {                                
                
                var statsData = results[0];
                //console.log(statsData);
                
                if (err) {
                    console.log(err); 
                    throw err;
                }
                
                if (count==0){
                    process.stdout.write("\n");
                }
                                
                var fileNameOfTemplate = path.join(directories.src.tables, "template.hbs");
                var templateRawData = fs.readFileSync(fileNameOfTemplate, 'utf8');

                //to convert long numbers to decimal, ex: 1.2222222 to "1.2"
                handlebars.registerHelper('toFixed', function(num, n) {
                    if(num && !isNaN(num)){
                        return num.toFixed(n);
                    }
                    else{                        
                        return "";
                    }
                });
                
                var hbsTemplate = handlebars.compile(templateRawData);

                var data = {
                    "countryName": countryName, 
                    "statsData": statsData, 
                    "words": words,
                    "domain": domainsCountries[CCfile]
                };
                                
                var result = hbsTemplate(data);                
                
                //the file name to which the HTML table will be saved
                let fileNameToSave = path.join(directories.bin.tables, CCfile + ".html"); //something like .../PT.hbs                
                
                fs.writeFile(fileNameToSave, result, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    process.stdout.write(CCfile + " ");
                    count++;
                    
                    if(count==nbrOfCountries){
                        console.log("\nCreated countries statistical tables HTML files!\n");                        
                        
                        //Runs PhantomJS script to raster the tables, 
                            //only after the HTML.hbs generation was completed
                        rasterTables();
                    }
                });//fs.writeFile
            
            });//db.query           
            
        })(CC);//anonymous function    
        
    }//for (var CC in availableCountries)
    
    db.end();        
    
}).catch(function(err){
    console.log(err);
    process.exit();
});

//Runs PhantomJS script to raster the tables, only after the HTML.hbs generation was completed
function rasterTables(){
    
    console.log("\nRastering tables!\n");
    
    var childArgs = [
        path.join(__dirname, 'rasterTables.js')
    ];

    const phantomjs = require('phantomjs-prebuilt'); //to use './rasterTables.js'

    console.log("running bin command: " + (phantomjs.path + " " + childArgs[0]).green + "\n");       
    
    childProcess.execFile(phantomjs.path, childArgs, function(err, stdout, stderr) {
        if (err){
            throw err;
            console.log("Try rebuilding phantomjs module with: " + "npm rebuild phantomjs-prebuilt".red);     
        }
        
        console.log(stdout);    
    });
}

