/*Common information that will be used by other scripts and code*/
/* Change accordingly */

module.exports = {
    
    //change accordingly
    getSettings: function(){    
        
        //SLS HTTPS
        //false for simple http always, 
        //true for https when requested, only set to true when SSL is available
        const IS_HTTPS = true; 
        
        //Content delivery network
        const IS_CDN = false; 
        //CDN configuration at https://app.keycdn.com/zones
        //CDN provider: https://app.keycdn.com/zones
        const CDN_URL_PROD = "https://cdn.autocosts.info"+"/"; //preserve the bar "/" at the end
        const CDN_URL_WORK = "http://cdn.autocosts.work"+"/";  //preserve the bar "/" at the end        
        
        /*GLOBAL switches, change accordingly*/
        const SWITCHES = {
            "uber": true,        /*uses UBER API to give car user comparisions with UBER costs*/
            "social": true,      /*Social media pulgins*/
            "g_charts": true,    /*Google Charts*/
            "g_captcha": true,   /*Google Captcha to avoid spam-bots*/
            "g_analytics": true, /*Google Analytics*/
            "data_base": true,   /*Inserts user input data into a DataBase*/
            "print": true,       /*Print result option, at the end*/
            "pdf": true          /*Download PDF report option*/
        };        
        
        //Default Country when any possible method to get country isn't available
        const DefaultCC = "UK"; //when no other method finds the country of user, use this by default 
                
        //don't change here
        var Obj = {
            "IS_HTTPS": IS_HTTPS,
            "CDN": {
                "IS_CDN": IS_CDN,
                "URL_PROD": CDN_URL_PROD,
                "URL_WORK": CDN_URL_WORK       
                },
            "DefaultCC": DefaultCC,
            "SWITCHES": SWITCHES
            };
        
        return Obj;
    },    
    
    //Root directory of the main project's root directory
    //command to get ROOT_DIR might vary according to the application (nodeJS or PhantomJS), therefore parsed here
    //change vars accordingly
    getDirs : function(ROOT_DIR){
        /*Always leave the traling slash at the end on each directory*/                

        //Source directory - the directory where the source code is stored
        var SRC_DIR       = ROOT_DIR + "src" + "/";       

        //Build directory - the directory to where the source code is deployed after running the bash script ./build.sh
        var BUILD_DIR       = ROOT_DIR + "build" + "/";

        //The directory where the countries information is originally stored
        var COUNTRIES_DIR = SRC_DIR  + "countries" + "/"; 

        //The JSON file where the meta-information about the countries is stored
        var COUNTRY_LIST_FILE = COUNTRIES_DIR + "list.json";

        //The directory where the tables HTML.hbs and JPEG files 
        //are to be stored right after being generated
        var TABLES_DIR = BUILD_DIR + "tables" + "/";

        var Dirs = {
            "ROOT_DIR": ROOT_DIR,
            "SRC_DIR": SRC_DIR,
            "BUILD_DIR": BUILD_DIR,
            "COUNTRIES_DIR": COUNTRIES_DIR,
            "COUNTRY_LIST_FILE": COUNTRY_LIST_FILE,
            "TABLES_DIR": TABLES_DIR
        };

        return Dirs;
    },
    
    getRelease: function(process){
        return _getRelease(process);
    },
    
    getUniqueArray: function(Arr){
        return _getUniqueArray(Arr);
    },
    
    getKeyByValue: function(object, value){
        return _getKeyByValue(object, value);
    },
    
    getCCListOnStr: function(available_CT){
        return getCCListOnStr(available_CT);
    }

};

/***************************************************************************************************/
/***************************************************************************************************/
/***************************************************************************************************/

const path    = require('path'); 
const fs      = require('fs');

/*function to be used in several scripts to get the release according to the argv of 
the command line, it shall be either 'work' (test version at autocosts.work) 
or 'prod', the production version that is filled in by autocosts.info */
function _getRelease(process){
    
    var REL;
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

    //check that release was correctly chose
    if (REL!=="work" && REL!=="prod"){
        console.log("release 'work' or 'prod' must be chosen \n");
        process.exit();
    }        
    console.log("Release: '" + REL + "'");
    
    return REL;
}

//gets Array with unique non-repeated values
//ex: [2,2,3,4,4] returns [2,3,4]
function _getUniqueArray(Arr){
    var newArr = (Object.values(Arr)).
        filter(function(x, i, a){ 
            return a.indexOf(x) == i
        });
    
    return newArr;
}

//get Key by Value, ex: var hash = {foo: 1, bar: 2}; getKeyByValue(hash, 2); => 'bar' 
function _getKeyByValue(object, value) {
    var key = Object.keys(object).
        find(function(key){ 
            return object[key] === value
        });
    
    return key;
}

//from the countries Object "available_CT" get a string of CC separated by commas
//for example: "PT, BR, US, UK, etc."
function getCCListOnStr(available_CT){
    var str = "";
    for (var CC in available_CT){
        str += CC + ", ";
    }
    //strip the last two character of the string, the last ", "
    str = str.slice(0, -2);
    return str;
}
