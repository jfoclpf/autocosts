/*File which generates the statistics tables on a HTML file
that will be shown in the right column of the main page*/
/*It call also the PhantomJS script 'rasterTables.js' that rasters these tables into JPEG files*/

console.log("\nRunning script " + __filename + "\n");

//includes
const fs       = require('fs');
const path     = require("path");
const async    = require('async'); //module to allow to execute the queries in series
const mysql    = require('mysql'); //module to get info from DB
const sortObj  = require('sort-object'); //to sort JS objects
const isOnline = require('is-online');
const commons  = require('../commons.js');
const childProcess = require('child_process');
const phantomjs = require('phantomjs-prebuilt'); //to use './rasterTables.js'
const binPath = phantomjs.path;

commons.init();
//Main directories got from commons
var directories       = commons.getDirectories();
var ROOT_DIR          = directories.server.root;
var SRC_DIR           = directories.server.src;
var COUNTRIES_DIR     = directories.src.countries; //directory, from where the countries information will be obtained
var TABLES_DIR        = directories.bin.tables;    //directory in which the HTML tables will be generated

var fileNames         = commons.getFileNames();
var COUNTRY_LIST_FILE = fileNames.server.countriesListFile;

var settings = commons.getSettings();

//checks for internet connection
isOnline().then(function(online) {
    
    if(!online){
        console.log("Error: no Internet connection");
        process.exit();
    }
    
    var DB_INFO = settings.dataBase.credentials;
    //detect for null or empty object
    if(!DB_INFO || Object.keys(DB_INFO).length === 0){
        throw commons.getDataBaseErrMsg(__filename, settings.dataBase);
    }    
    //console.log(DB_INFO);

    //getting country information from 
    console.log("Get Countries info from: " + COUNTRY_LIST_FILE);
    var country_list = JSON.parse(fs.readFileSync(COUNTRY_LIST_FILE, 'utf8'));
    var availableCountries = country_list.availableCountries;
    var languagesCountries = country_list.languagesCountries;
    var domains_CT = country_list.domains_CT;

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
        console.log('User ' + DB_INFO.user + 
                    ' connected successfully to DB ' + DB_INFO.database + 
                    ' at ' + DB_INFO.host);
    });

    console.log("Creating tables on ", TABLES_DIR);
    
    //get number of countries
    var nbrOfCountries = Object.keys(availableCountries).length, 
        count=0;
    
    //for each country creates a corresponding file
    for (var CC in availableCountries) {                
        
        (function (CCfile){                        
         
            var country_name = availableCountries[CCfile];
            var WORDS = JSON.parse(fs.readFileSync(COUNTRIES_DIR + CCfile + ".json", 'utf8'));
            var currSymb = WORDS['curr_symbol']; //currency symbol
            var stdDist = WORDS['std_dist']; //standard distance 
        
            //the file name to which the HTML table will be saved
            var fileName = TABLES_DIR + CCfile + ".hbs"; //something like .../PT.hbs

            db.query("SELECT * FROM " + DB_INFO.db_tables.monthly_costs_statistics + 
                " WHERE country='" + (CCfile!=="XX"?CCfile:"UK") + "'", 
                function(err, results, fields) {
                var res = results[0];
                
                if (err) {
                    console.log(err); 
                    throw err;
                }
                
                if (count==0){
                    process.stdout.write("\n");
                }
                                
                //the content of the file
                var content = '<table id="tbl_statistics">\n' +
                    '\t<tr class="tr-title">\n' +
                    '\t\t<td id="td-top-title" colspan="2" class="center td-title">\n';

                if (CCfile == "TR") {
                     content +='\t\t\t<b><span>' + WORDS['country_name'] + '</span><span class="stat_title"> ' + WORDS['statistic_title'] + '</span></b>';
                }
                else{
                     content +='\t\t\t<b><span>' + WORDS['statistic_title'] + '</span><span class="stat_title"> ' + WORDS['country_name'] + '</span></b>';
                }
                
                content +='<br>\n' + 
                        '\t\t\t<span>' + WORDS['average_costs_per_type'] + '</span>\n' +
                        '\t\t</td>\n' +
                        '\t</tr>\n';

                content += '\t\t<tr class="tr-sub-title">\n' + 
                        '\t\t<td colspan="2" class="center"><span>' + WORDS['fixed_costs'] + '</span></td>\n' + 
                    '\t</tr>\n' +                                            
                    '\t<tr>\n\t\t<td style="width:50%"><span>' + WORDS['depreciation_st'] + '</span></td>\n\t\t<td style="width:25%"><span> ' + currSymb + ' </span><span id="txt_depr" class="value-field">' + fixNmbr(res["Depreciation"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>' + WORDS['insurance_st']     + '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_ins" class="value-field">'    + fixNmbr(res["Insurance"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>' + WORDS['credit_interests'] + '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_cred" class="value-field">'   + fixNmbr(res["Loan_interests"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>' + WORDS['inspection_short'] + '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_insp" class="value-field">'   + fixNmbr(res["Inspection"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>' + WORDS['road_taxes_short'] + '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_tax" class="value-field">'    + fixNmbr(res["Car_tax"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>50% ' + WORDS['maintenance'] +  '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_maint1" class="value-field">' + fixNmbr(res["Maintenance"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr class="tr-result">\n' +
                       '\t\t<td><span>' + WORDS['word_total_cap'] + '<br>' + WORDS['fixed_costs'] + '</span></td>\n' +
                       '\t\t<td><span> ' + currSymb + ' </span><span id="txt_standing_costs" class="value-field">' + fixNmbr(res["standing_costs"],0) + '</span></td>\n' +
                    '\t</tr>\n' +
                    '\t<tr class="tr-sub-title">\n' + 
                        '\t\t<td colspan="2" class="center"><span>' + WORDS['running_costs'] + '</span></td>\n' + 
                    '\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>' + WORDS['fuel'] +             '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_fuel" class="value-field">'   + fixNmbr(res["Fuel"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>50% ' + WORDS['maintenance'] +  '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_maint2" class="value-field">' + fixNmbr(res["Maintenance"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>' + WORDS['rep_st'] +           '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_rep" class="value-field">'    + fixNmbr(res["Repairs"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>' + WORDS['parking'] +          '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_park" class="value-field">'   + fixNmbr(res["Parking"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>' + WORDS['tolls'] +            '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_tolls" class="value-field">'  + fixNmbr(res["Tolls"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>' + WORDS['fines'] +            '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_fines" class="value-field">'  + fixNmbr(res["Fines"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr>\n\t\t<td><span>' + WORDS['washing_st'] +       '</span></td>\n\t\t<td><span> ' + currSymb + ' </span><span id="txt_wash" class="value-field">'   + fixNmbr(res["Washing"],1) + '</span></td>\n\t</tr>\n' +
                    '\t<tr class="tr-result">\n' +
                       '\t\t<td><span>' + WORDS['word_total_cap'] + '<br>' + WORDS['running_costs'] + '</span></td>\n' +
                       '\t\t<td><span> ' + currSymb + ' </span><span id="txt_running_costs" class="value-field">' + fixNmbr(res["running_costs"],0) + '</span></td>\n' +
                    '\t</tr>\n' +
                    '\t<tr>\n' + 
                        '\t\t<td colspan="2"></td>\n' + 
                    '\t</tr>\n' +
                    '\t<tr class="main_total">\n' +
                       '\t\t<td><span>' + WORDS['word_total_cap'] + '</span></td>\n' +
                       '\t\t<td><span> ' + currSymb + ' </span><span id="txt_total_overal" class="value-field">' + fixNmbr(res["total_costs"],0) + '</span></td>\n' +
                    '\t</tr>\n' +
                    '\t<tr>\n' +
                       '\t\t<td><span>' + WORDS['run_cp_dist'] + '</span></td>\n' +
                       '\t\t<td><span> ' + currSymb + '</span><span id="txt_running_costs_dist" class="value-field">' + fixNmbr(res["running_costs_dist"],2) + '</span><span>/' + stdDist + '</span></td>\n' +
                    '\t</tr>\n' +
                    '\t<tr>\n' +
                       '\t\t<td><span>' + WORDS['total_cp_dist'] + '</span></td>\n' +
                       '\t\t<td><span> ' + currSymb + '</span><span id="txt_total_costs_p_unit" class="value-field">' + fixNmbr(res["total_costs_dist"],2) + '</span><span>/' + stdDist + '</span></td>\n' +
                    '\t</tr>\n' +
                    '\t<tr>\n' +
                       '\t\t<td><span>' + WORDS['kinetic_speed_title'] + '</span></td>\n' +
                       '\t\t<td><span id="txt_kinetic_speed" class="value-field"></span>' + fixNmbr(res["kinetic_speed"],0) + '<span> ' + stdDist + '/h</span></td>\n' +
                    '\t</tr>\n' +
                    '\t<tr>\n' +
                       '\t\t<td><span>\n\t\t\t<a target="_blank" href="' + consumer_speed_url + '">\n\t\t\t\t' + WORDS['virtual_speed_title'] + '\n\t\t\t</a></span></td>\n' +
                        '\t\t<td><span id="txt_virtual_speed" class="value-field">' + fixNmbr(res["virtual_speed"],0) + '</span><span> ' + stdDist + '/h</span></td>\n' +
                    '\t</tr>\n' +
                    '\t<tr>\n' +
                        '\t\t<td id="table-td-bottom-left"><span>' + WORDS['total_costs_per_year'] + '</span></td>\n' +
                        '\t\t<td id="table-td-bottom-right">' + currSymb + ' <span id="txt_total_costs_year" class="value-field">' + fixNmbr(res["total_costs_year"],0) + '</span></td>\n' +
                    '\t</tr>\n' +
                    '</table>\n' +
                    '<div id="tbl_statistics_footer">\n</div>\n';
                
                fs.writeFile(fileName, content, 'utf8', function (err) {
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

    console.log(binPath, childArgs[0]);
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (err){throw err;}
        console.log(stdout);
    });
}

