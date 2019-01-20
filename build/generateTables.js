/*
 File which generates the statistics tables. For each country it generates a html file and a jpg file located at bin/tables
 It uses the PhantomJS script 'build/rasterTables.js' to rasterize these tables into JPEG files
 It does it by using a handlebars statistics table template located at bin/tables/template.hbs. 
 With this template it renders for each country two html files, one html temporary file which is used to rasterize the public 
 permament JPG file accessible via tables/XX.jpg, and another permanent html file that is publicly accessible via tables/XX.html
*/

console.log("\nRunning script " + __filename + "\n");

//includes
const fs           = require('fs');
const path         = require("path");
const async        = require('async');        //module to allow to execute the queries in series
const mysql        = require('mysql');        //module to get info from DB
const sortObj      = require('sort-object');  //to sort JS objects
const isOnline     = require('is-online');
const handlebars   = require('handlebars');   //see why here: https://stackoverflow.com/a/30032819/1243247
const colors       = require('colors');
const childProcess = require('child_process');

const commons  = require(path.join(__dirname, '..', 'commons'));
colors.setTheme(commons.getConsoleColors());

//checks for internet connection
isOnline().then(function(online) {

    if(!online){
        console.log("ERROR: no Internet connection".red.bold);
        process.exit(1); //exit with error
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
    delete availableCountries.XX;

    //function for formating numbers which come from DB
    var fixNmbr = function(i,n){
        var float_num = parseFloat(i);
        return float_num.toFixed(n);
    };

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

    var numberOfCountries = Object.keys(availableCountries).length,
        count = 0, count2 = 0;

    //for each country creates a corresponding stats html file
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

                if (count === 0){
                    process.stdout.write("\n");
                }

                var fileNameOfTemplate = path.join(directories.src.tables, "template.hbs");
                var templateRawData = fs.readFileSync(fileNameOfTemplate, 'utf8');

                //to convert long numbers to decimal, ex: 1.2222222 to "1.2"
                var toFixed = function(num, n) {
                    if(num && !isNaN(num)){
                        return num.toFixed(n);
                    }
                    else{
                        return "";
                    }
                };                

                handlebars.registerHelper('toFixed', toFixed);

                var hbsTemplate = handlebars.compile(templateRawData);

                var data = {
                    "countryCode" : CCfile, 
                    "countryName": countryName,
                    "availableCountries": availableCountries,
                    "fileNames": fileNames,
                    "statsData": statsData,
                    "words": words,
                    "domain": domainsCountries[CCfile]
                };

                var dataHtml = Object.assign({}, data); //clone object
                var dataJpg = Object.assign({}, data); //clone object

                //check tables/template.hbs
                dataHtml.isHtmlPage = true;
                dataJpg.isJpgImage = true;

                var resultForHtmlPage = hbsTemplate(dataHtml);
                var resultForJpgImage = hbsTemplate(dataJpg);
                
                var htmlPermanentFilePath = path.join(directories.bin.tables, CCfile + ".htm"); 
                var htmlFilePathToRenderInJpg = path.join(directories.bin.tables, CCfile + "jpg.htm");

                fs.writeFile(htmlPermanentFilePath, resultForHtmlPage, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    process.stdout.write(CCfile.info + " ");
                    count2++;

                    if(count2 === numberOfCountries){
                        console.log("\nCreated permanent tables statistical HTML files!\n".info);
                    }
                });//fs.writeFile  
                
                fs.writeFile(htmlFilePathToRenderInJpg, resultForJpgImage, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    process.stdout.write(CCfile.verbose + " ");
                    count++;

                    if(count === numberOfCountries){
                        console.log("\nCreated temporary HTML files to be rasterized!\n".verbose);

                        //Runs PhantomJS script to raster the tables,
                        //only after the HTML generation tables was completed
                        rasterTables(directories, availableCountries);
                    }
                });//fs.writeFile                                                              

            });//db.query

        })(CC);//anonymous function

    }//for (var CC in availableCountries)

    db.end();

}).catch(function(err){
    console.log(err);
    process.exit(1);
});

//Runs PhantomJS script to raster the tables, only after the HTML.hbs generation was completed
function rasterTables(directories, availableCountries){

    console.log("Rasterizing JPG tables using phantomjs");

    const phantomjs = require('phantomjs-prebuilt'); //to use './rasterTables.js'
    console.log("phantomjs path: " + (phantomjs.path) + "\n");

    const rootDir = commons.getROOT_DIR();

    var count = 0,
        numberOfCountries = Object.keys(availableCountries).length;

    for (var CC in availableCountries){

        let htmlTempFilePath = path.join(directories.bin.tables, CC + "jpg.htm");
        let imageFilePath = path.join(directories.bin.tables, CC + ".jpg");

        if(!path.isAbsolute(htmlTempFilePath) || !path.isAbsolute(imageFilePath)){
            console.log(htmlTempFilePath, imageFilePath, ":: either of these paths is not an absolute path");
            process.exit(1); //exit with error
        }

        let childArgs = [
            path.join(__dirname, 'rasterTables.js'),
            htmlTempFilePath,
            imageFilePath
        ];

        (function(CC2, childArgs2){
            childProcess.execFile(phantomjs.path, childArgs, function(err, stdout, stderr) {
                if (err){
                    throw err;
                    console.log("Try rebuilding phantomjs module with: " + "npm rebuild phantomjs-prebuilt".red);
                }
                
                //console.log((path.relative(rootDir, childArgs2[1]) + " => " + path.relative(rootDir, childArgs2[2])).verbose);

                //delete jpg.html file because it was temporary and merely to render jpg file
                fs.unlink(childArgs2[1], function(err){
                    if (err) {
                        throw err;
                        process.exit(1);
                    }
                    
                    count++;
                    process.stdout.write(CC2 + (numberOfCountries !== count ? " " : "\n"));                    
                });
            });
        })(CC, childArgs);

    }
}

