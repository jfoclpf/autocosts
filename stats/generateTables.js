/*File which generates the statistics tables on a HTML file
that will be shown in the right column of the main page*/

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

var REL; //release shall be 'work' or 'prod', it's 'work' by default
var tableArg; //normally shall be 'src' or 'build'; 

if(process.argv.length == 2){    
    REL = "work";
    tableArg = "build";
}
else if (process.argv.length == 3){
    REL = process.argv[2];
    tableArg = "build";        
}
else if (process.argv.length == 4){
    REL = process.argv[2];
    tableArg = process.argv[3];
}
else if (process.argv.length > 4){
    console.log("Just one or two arguments are accepted \n");
    process.exit();
}

//check that release was correctly chose
if (REL!=="work" && REL!=="prod"){
    console.log("release 'work' or 'prod' must be chosen \n");
    process.exit();
}        
console.log("chosen '" + REL + "'");

//check if tables was correctly chose
var TABLES_DIR = HOME_DIR + tableArg + "/" +"views/partials" + "/";    
if (!fs.existsSync(TABLES_DIR) || (tableArg!=="src" && tableArg!=="build")){
    console.log("second argument must be 'src' or 'build'");
    throw "TABLES_DIR '" + TABLES_DIR + "' doesn't exist";
}
console.log("Generating the tables on: " + TABLES_DIR);
//process.exit();

//checks for internet connection
isOnline().then(online => {
    
    if(!online){
        throw "There is no Internet Connection";
        process.exit();
    }

    console.log("Generating statistics tables");    
    
    //include credentials object
    var DB_INFO = JSON.parse(fs.readFileSync(HOME_DIR + 'keys/' + REL + '/db_credentials.json'));
    console.log(DB_INFO);

    //getting country information from 
    console.log("Get Countries info from: " + COUNTRY_LIST_FILE);
    var country_list = JSON.parse(fs.readFileSync(COUNTRY_LIST_FILE, 'utf8'));
    var available_CT = country_list.available_CT;
    var languages_CT = country_list.languages_CT;
    var domains_CT = country_list.domains_CT;

    //sorts array of countries
    available_CT = sortObj(available_CT);

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

    console.log("Creating tables");
    
    //get number of countries
    var nbrOfCountries = Object.keys(available_CT).length, 
        count=0;
    
    //for each country creates a corresponding file
    for (var CC in available_CT) {                
        
        (function (CCfile){                        
         
            var country_name = available_CT[CCfile];
            var WORDS = JSON.parse(fs.readFileSync(COUNTRIES_DIR + CCfile + ".json", 'utf8'));
            var currSymb = WORDS['curr_symbol']; //currency symbol
            var stdDist = WORDS['std_dist']; //standard distance 
        
            //the file name to which the HTML table will be saved
            var fileName = TABLES_DIR + CCfile + "costs.hbs"; //something like .../PTcosts.hbs

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
                var content = '<table id="tbl_statistics">' +
                    '<tr class="tr-title">' +
                    '<td id="td-top-title" colspan="2" class="center td-title">';

                if (CCfile == "TR") {
                     content +='<b><span>' + WORDS['country_name'] + '</span><span class="stat_title"> ' + WORDS['statistic_title'] + '</span></b>';
                }
                else{
                     content +='<b><span>' + WORDS['statistic_title'] + '</span><span class="stat_title"> ' + WORDS['country_name'] + '</span></b>';
                }
                
                content +='<br><span>' + WORDS['average_costs_per_type'] + '</span>' +
                        + '</td>' +
                        + '</tr>';

                content += '<tr class="tr-sub-title"><td colspan="2" class="center"><span>' + WORDS['fixed_costs'] + '</span></td></tr>' +                                            
                    '<tr><td style="width:50%"><span>' + WORDS['depreciation_st'] + '</span></td> <td style="width:25%"><span> ' + currSymb + ' </span><span id="txt_depr" class="value-field">' + fixNmbr(res["Depreciation"],1) + '</span></td></tr>' +               
                    '<tr><td><span>' + WORDS['insurance_st']     + '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_ins" class="value-field">'    + fixNmbr(res["Insurance"],1) + '</span></td></tr>' +
                    '<tr><td><span>' + WORDS['credit_interests'] + '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_cred" class="value-field">'   + fixNmbr(res["Loan_interests"],1) + '</span></td></tr>' +
                    '<tr><td><span>' + WORDS['inspection_short'] + '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_insp" class="value-field">'   + fixNmbr(res["Inspection"],1) + '</span></td></tr>' +
                    '<tr><td><span>' + WORDS['road_taxes_short'] + '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_tax" class="value-field">'    + fixNmbr(res["Car_tax"],1) + '</span></td></tr>' +
                    '<tr><td><span>50% ' + WORDS['maintenance'] +  '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_maint1" class="value-field">' + fixNmbr(res["Maintenance"],1) + '</span></td></tr>' +
                    '<tr class="tr-result">' +
                       '<td><span>' + WORDS['word_total_cap'] + '<br>' + WORDS['fixed_costs'] + '</span></td>' +
                       '<td><span> ' + currSymb + ' </span><span id="txt_standing_costs" class="value-field">' + fixNmbr(res["standing_costs"],0) + '</span></td>' +
                    '</tr>' +
                    '<tr class="tr-sub-title"><td colspan="2" class="center"><span>' + WORDS['running_costs'] + '</span></td></tr>' +
                    '<tr><td><span>' + WORDS['fuel'] +             '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_fuel" class="value-field">'   + fixNmbr(res["Fuel"],1) + '</span></td></tr>' +
                    '<tr><td><span>50% ' + WORDS['maintenance'] +  '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_maint2" class="value-field">' + fixNmbr(res["Maintenance"],1) + '</span></td></tr>' +
                    '<tr><td><span>' + WORDS['rep_st'] +           '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_rep" class="value-field">'    + fixNmbr(res["Repairs"],1) + '</span></td></tr>' +
                    '<tr><td><span>' + WORDS['parking'] +          '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_park" class="value-field">'   + fixNmbr(res["Parking"],1) + '</span></td></tr>' +
                    '<tr><td><span>' + WORDS['tolls'] +            '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_tolls" class="value-field">'  + fixNmbr(res["Tolls"],1) + '</span></td></tr>' +
                    '<tr><td><span>' + WORDS['fines'] +            '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_fines" class="value-field">'  + fixNmbr(res["Fines"],1) + '</span></td></tr>' +
                    '<tr><td><span>' + WORDS['washing_st'] +       '</span></td> <td><span> ' + currSymb + ' </span><span id="txt_wash" class="value-field">'   + fixNmbr(res["Washing"],1) + '</span></td></tr>' +
                    '<tr class="tr-result">' +
                       '<td><span>' + WORDS['word_total_cap'] + '<br>' + WORDS['running_costs'] + '</span></td>' +
                       '<td><span> ' + currSymb + ' </span><span id="txt_running_costs" class="value-field">' + fixNmbr(res["running_costs"],0) + '</span></td>' +
                    '</tr>' +
                    '<tr><td colspan="2"></td></tr>' +
                    '<tr class="main_total">' +
                       '<td><span>' + WORDS['word_total_cap'] + '</span></td>' +
                       '<td><span> ' + currSymb + ' </span><span id="txt_total_overal" class="value-field">' + fixNmbr(res["total_costs"],0) + '</span></td>' +
                    '</tr>' +
                    '<tr>' +
                       '<td><span>' + WORDS['run_cp_dist'] + '</span></td>' +
                       '<td><span> ' + currSymb + '</span><span id="txt_running_costs_dist" class="value-field">' + fixNmbr(res["running_costs_dist"],2) + '</span><span>/' + stdDist + '</span></td>' +
                    '</tr>' +
                    '<tr>' +
                       '<td><span>' + WORDS['total_cp_dist'] + '</span></td>' +
                       '<td><span> ' + currSymb + '</span><span id="txt_total_costs_p_unit" class="value-field">' + fixNmbr(res["total_costs_dist"],2) + '</span><span>/' + stdDist + '</span></td>' +
                    '</tr>' +
                    '<tr>' +
                       '<td><span>' + WORDS['kinetic_speed_title'] + '</span></td>' +
                       '<td><span id="txt_kinetic_speed" class="value-field"></span>' + fixNmbr(res["kinetic_speed"],0) + '<span> ' + stdDist + '/h</span></td>' +
                    '</tr>' +
                    '<tr>' +
                       '<td><span><a target="_blank" href="' + consumer_speed_url + '">' + WORDS['virtual_speed_title'] + '</a></span></td>' +
                        '<td><span id="txt_virtual_speed" class="value-field">' + fixNmbr(res["virtual_speed"],0) + '</span><span> ' + stdDist + '/h</span></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td id="table-td-bottom-left"><span>' + WORDS['total_costs_per_year'] + '</span></td>' +
                        '<td id="table-td-bottom-right">' + currSymb + ' <span id="txt_total_costs_year" class="value-field">' + fixNmbr(res["total_costs_year"],0) + '</span></td>' +
                    '</tr>' +
                    '</table>' +
                    '<div id="tbl_statistics_footer"></div>';                
                
                fs.writeFile(fileName, content, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    process.stdout.write(CCfile + " ");
                    count++;
                    
                    if(count==nbrOfCountries){
                        console.log("\nCreated countries statistical tables HTML files!\n");
                    }
                });//fs.writeFile
            
            });//db.query           
            
        })(CC);//anonymous function    
        
    }//for (var CC in available_CT)
    
    db.end();        
    
});//isOnline

