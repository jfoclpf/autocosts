/*Common information that will be used by other scripts and code*/

//Default Country when any possible method to get country isn't available
var defaultCountry = "UK"; //when no other method finds the country of user, use this by default
var defaultPortWork = 3027;  //default HTTP Port where the app listens - test version
var defaultPortProd = 3028;  //default HTTP Port where the app listens - prod version

module.exports = {

    init: function(eventEmitter){
        EVENTEMITTER = eventEmitter;
        _init();
    },
    
    getROOT_DIR: function(){
        if(!ROOT_DIR || typeof ROOT_DIR === 'undefined'){
            setROOT_DIR();
        }
        return ROOT_DIR;
    },

    getSettings: function(){
        if(isEmptyOrInvalidObj(SETTINGS)){
            _init();
        }        
        return SETTINGS;
    },

    getRelease: function(){
        if(!RELEASE || typeof RELEASE === 'undefined'){
            _init();
        }
        return RELEASE;
    },
    
    setRelease: function(release){
        //check that release was correctly chosen
        if (release !== "work" && release !== "prod"){
            throw "Error on function setRelease(release) in commons.js; 'work' or 'prod' must be selected";
        }
        RELEASE = release;
    },

    getDirectories : function(){
        if(isEmptyOrInvalidObj(DIRECTORIES)){
            setDIRECTORIES();
        }
        return DIRECTORIES;
    },

    getFileNames : function(){
        if(isEmptyOrInvalidObj(FILENAMES)){
            setFILENAMES();
        }
        return FILENAMES;
    },

    getDomainsObject: function(domainsCountries){
        return _getDomainsObject(domainsCountries);
    },
    
    getUniqueArray: function(Arr){
        return _getUniqueArray(Arr);
    },

    getKeyByValue: function(object, value){
        return _getKeyByValue(object, value);
    },

    getCClistOnStr: function(available_CT){
        return getCClistOnStr(available_CT);
    },
    
    getDataBaseErrMsg: function(scriptName, serviceObj){
        return _getDataBaseErrMsg(scriptName, serviceObj);
    }
};

/***************************************************************************************************/
/***************************************************************************************************/
/***************************************************************************************************/


var RELEASE; //release, "work" or "prod"
var ROOT_DIR; //root directory of the project
var SWITCHES, DIRECTORIES, SETTINGS, FILENAMES, EVENTEMITTER;
var optionDefinitions; //for the commandLineArgs

//initialization
function _init(){
    
    //these const npm modules are local and not global to avoid errors with PhantomJS, 
    //since both NodeJS and PhantomJS load this commons.js module
    const commandLineArgs = require('command-line-args');
    const isOnline = require('is-online');
    const path     = require('path');
    const fs       = require('fs');

    /*GLOBAL switches, false by default*/
    /*these values are defined by the command line arguments*/
    SWITCHES = {
        "https": false,           /*true for https when requested, only set to true when SSL is available*/
        "cdn": false,             /*Content Delivery Network*/
        "uber": false,            /*uses UBER API to give car user comparisions with UBER costs*/
        "social": false,          /*Social media pulgins*/
        "disableCharts": false,   /*Disable Charts on result*/
        "googleCaptcha": false,   /*Google Captcha to avoid spam-bots*/
        "googleAnalytics": false, /*Google Analytics*/
        "dataBase": false,        /*Inserts user input data into a DataBase*/
        "print": false,           /*Print result option, at the end*/
        "pdf": false              /*Download PDF report option*/
    };

    //basic command line settings
    optionDefinitions = [
        { name: 'help', alias: 'h', type: Boolean },
        { name: 'release', alias: 'r', type: String },
        { name: 'port', alias: 'p', type: Number }
    ];

    //populates optionDefinitions of commandLineArgs according to SWITCHES
    for (var service in SWITCHES){
        optionDefinitions.push({name:service, type: Boolean});
    }

    //get set options from command line arguments
    var options = commandLineArgs(optionDefinitions);
    //this "option" object is just filled with the options that were inserted in the command line
    //console.log(options);
    
    var release = options.release;
    //check that release was correctly chosen
    if (release !== "work" && release !== "prod"){
        release = "work";
    }
    console.log("Release: '" + release + "'");
    RELEASE = release; //set Global variable
    
    //shows NODE_ENV
    if(process.env.NODE_ENV){
        console.log("NODE_ENV: ", process.env.NODE_ENV);
    }        
        
    //after the RELEASE is known, the directories and files can be obtained and set
    setDIRECTORIES();
    setFILENAMES();    
        
    //check if --help was selected
    if(options.help){
        console.log(getArgvHelpMsg());
        process.exit();
    }        
    
    //set HTTP port
    var HTTPport;
    if(options.port){
        HTTPport = options.port;
    }
    else{
        if (release === "prod"){
            HTTPport = defaultPortProd;
        }
        else if (release === "work"){
            HTTPport = defaultPortWork;
        }
        else{
            throw "Error setting port";
        }
    }
    
    //set SWITCHES according to commandLineArgs input options
    if (options.All){
        for (var opt in SWITCHES){
            SWITCHES[opt] = true;
        }
    }
    else{
        for (var opt in options){
            if (opt !== 'release'){
                SWITCHES[opt] = options[opt];
            }
        }
    }
    
    //checks for internet connection in case of "uber", "cdn", "social", "googleCaptcha" or "googleAnalytics" 
    //options are selected. These options require Internet and thus disables them
    var demandingInternet = ["uber", "cdn", "social", "googleCaptcha", "googleAnalytics"];
    var isAny = false;
    for (var i=0; i<demandingInternet.length; i++){
        isAny = isAny || SWITCHES[demandingInternet[i]]
    }
    if(isAny){
        //check for Internet connection
        isOnline().then(function(online) {
            if(!online){
                if(SWITCHES.cdn){
                    setCdnOrLocalFiles(false); //set Local files with "false"
                }
                
                process.stdout.write("\nThere is no Internet connection. Services disabled:");
                for (var i=0; i<demandingInternet.length; i++){
                    if(SWITCHES[demandingInternet[i]]){
                        SWITCHES[demandingInternet[i]] = false;
                        process.stdout.write(" " + demandingInternet[i]);
                    }
                }
                process.stdout.write(".\n");
                
                EVENTEMITTER.emit('settingsChanged');
            }
        });
    }
    
    
    SETTINGS = {
        "release"  : RELEASE,
        "switches" : SWITCHES,
        "HTTPport" : HTTPport,
        "cdn": { //a CDN provider might be: https://app.keycdn.com/zones
            "enabled"  : SWITCHES.cdn,
            "name"     : "cdn",
            "propName" : "url",
            "propType" : "string",
            "url"      : ""
        },
        "uber": {
            "enabled"  : SWITCHES.uber,
            "name"     : "uber",            
            "propName" : "token",
            "propType" : "string",
            "token"    : ""
        },
        "googleCaptcha" : {
            "enabled"   : SWITCHES.googleCaptcha,
            "name"      : "googleCaptcha",            
            "propName"  : "secretKey",
            "propType"  : "string",
            "secretKey" : ""
        },
        "googleAnalytics": {
            "enabled"    : SWITCHES.googleAnalytics,
            "name"       : "googleAnalytics",           
            "propName"   : "trackingId",
            "propType"   : "string",
            "trackingId" : ""
        },
        "dataBase" : {
            "enabled"     : SWITCHES.dataBase,
            "name"        : "dataBase",            
            "propName"    : "credentials",
            "propType"    : "object",
            "credentials" : {}
        },
        "money" : {
            "enabled"     : SWITCHES.dataBase, //this switch is linked with switch of dataBase
            "name"        : "money",            
            "propName"    : "ApiId",
            "propType"    : "string",
            "ApiId"       : ""
        },        
        "defaultCountry" : defaultCountry
    };

    //reads data from JSON file with credentials for each service (in directory credentials/)
    var credentialsFileName;
    if (RELEASE === 'prod'){
        credentialsFileName = FILENAMES.server.credentialsFullPath.prod; 
    }
    else{
        credentialsFileName = FILENAMES.server.credentialsFullPath.work;
    }
    console.log(credentialsFileName);
    
    //fills missing information, for each service corresponding property: "url", "token", "secretKey", etc.
    //gets the information from the credentials JSON file    
    for (service in SETTINGS){
        var serviceObj = SETTINGS[service];
        if(typeof serviceObj.enabled !== 'undefined' && serviceObj.enabled){                                           
            
            if (!fs.existsSync(credentialsFileName)){
                throw _getNoServiceErrMsg(serviceObj, credentialsFileName);  
            }
            var credentialsData = JSON.parse(fs.readFileSync(credentialsFileName));
            
            if (serviceObj.propType === 'string'){                
                var dataStr = credentialsData[serviceObj.name][serviceObj.propName];
                //check if string is valid (no just whitespaces or asterisks)
                if(!isValidCredentialString(dataStr)){
                    throw _getNoServiceErrMsg(serviceObj, credentialsFileName);
                }
                serviceObj[serviceObj.propName] = dataStr;
            }
            else if(serviceObj.propType === 'object'){//if service data is an object (normally applies to dataBase)
                var dataObj = credentialsData[serviceObj.name];
                if(!isValidCredentialString(dataObj)){
                    throw _getNoServiceErrMsg(serviceObj, credentialsFileName);
                }                
                serviceObj[serviceObj.propName] = Object.assign({}, dataObj); //clone object
            }
            else{
                throw "Error getting service information from " + serviceObj.name;
            }
        }
    }
    
    //set FILENAMES URIs for JS known files according to Local files or CDN
    //if cdn option is enabled, select CDN version, otherwise Local files
    setCdnOrLocalFiles(SWITCHES.cdn);
    
    const debug = require('debug')('app:commons');
    debug("SETTINGS", SETTINGS);
    debug("DIRECTORIES", DIRECTORIES);    
    debug("FILENAMES", FILENAMES);
}


function setDIRECTORIES(){

    const debug = require('debug')('app:commons');
    const path = require('path');
    
    if(typeof ROOT_DIR === 'undefined'){
        setROOT_DIR();
    }

    /*Always leave the traling slash at the end on each directory*/
    /*this directory structure was based on Node/JS most common practises,
    namely see: docs/nodeJS-directory-structure.md */

    //Source directory - the directory where the source code is stored
    var srcDir       = path.join(ROOT_DIR, "src");

    //Bin directory - the directory to where the source code is deployed after running the bash script ./build.sh
    var binDir       = path.join(ROOT_DIR, "bin");

    //Build directory - the directory to where the building scripts are stored
    var buildDir     = path.join(ROOT_DIR, "build");    
    
    //credentials directory where json credential files are stored for each service
    var credentialsDir = path.join(ROOT_DIR, "credentials");

    var serverDirs = {
        "root"              : ROOT_DIR,
        "src"               : srcDir,
        "bin"               : binDir,
        "build"             : buildDir,
        "credentials"       : credentialsDir
    };    

    /*#################################*/
    
    //these paths are relative, and they refer to the paths which are seen by the browser        
    var clientDirs = {
        "client"   : "client", //directory with respect to src/ dir, where the client JS browser files will be stored
        "css"      : "css",    //directory with respect to src/ dir, where the CSS  files will be stored
        "tables"   : "tables"  //where the JPG tables with car costs for each country
    };
    
    /*#################################*/
    
    //these paths are relative and refer to the project's code parent folder, 
    //i.e., the parent directory of these paths is either src/ or bin/  
    var projectDirs = {
        "countries" : "countries",
        "css"       : "css",      
        "tables"    : "tables",
        "images"    : "images",
        "public"    : "public",
        "views"     : "views",
        "client"    : "client",
        "server"    : "server"
    };

    var srcProjectDirs = {};
    var binProjectDirs = {};
    
    for (var prop in projectDirs){
        srcProjectDirs[prop] = path.join(srcDir, projectDirs[prop]);
        binProjectDirs[prop] = path.join(binDir, projectDirs[prop]);
    }
    
    DIRECTORIES = {
        //these paths are absolute
        "server"  : serverDirs,     //these paths are absolute
        "src"     : srcProjectDirs, //these paths are absolute
        "bin"     : binProjectDirs, //these paths are absolute
        "client"  : clientDirs,     //these paths are relative (as seen by the browser)       
        "project" : projectDirs     //these paths are relative (as seen by either src/ or bin/)
    };    
}

function setFILENAMES(){

    const debug = require('debug')('app:commons');  
    const path = require('path');
    
    if(!RELEASE){
        _init();
    }
    
    if(isEmptyOrInvalidObj(DIRECTORIES)){        
        setDIRECTORIES();
    }

    //Default file names for JSON files with credentials for each external service
    FILENAMES = {
        //these paths are ABSOLUTE
        "build" : {
            "compressImages"    : path.join(DIRECTORIES.server.build, "compressImages.js"),   
            "generateTables"    : path.join(DIRECTORIES.server.build, "generateTables.js"),
            "getAvgFromDB"      : path.join(DIRECTORIES.server.build, "getAvgFromDB.js"),
            "minifyFiles"       : path.join(DIRECTORIES.server.build, "minifyFiles.js"),
            "rasterTables"      : path.join(DIRECTORIES.server.build, "rasterTables.js"),
            "setCountrySpecsDB" : path.join(DIRECTORIES.server.build, "setCountrySpecsDB.js"),
            "statsFunctions"    : path.join(DIRECTORIES.server.build, "statsFunctions.js")
        },
        "server" : {
            "credentials" : {
                "prod"          : "prodCredentials.json",
                "work"          : "workCredentials.json"
            },
            "credentialsFullPath" : {
                "prod"          : "",
                "work"          : ""
            },        
            "countriesListFile" : path.join(DIRECTORIES.src.countries, "list.json"),
            "statsFunctions.js" : path.join(DIRECTORIES.server.build, "statsFunctions.js")
        },
        "src": {
            "conversionFunctions.js" : path.join(DIRECTORIES.src.client, "conversionFunctions.js"),
            "coreFunctions.js"       : path.join(DIRECTORIES.src.client, "core", "coreFunctions.js"),
            "getData.js"             : path.join(DIRECTORIES.src.client, "getData.js")
        },
        //the LOCAL paths are RELATIVE to the main host as seen by the BROWSER, 
        //thus don't use node 'fs' nor 'path' functions, i.e., these are URI or part of URI
        "client" : {
            "jquery" : {
                "local" : path.join(DIRECTORIES.client.client, 'jquery', 'jquery.min.js'),
                "cdn"   : "https://code.jquery.com/jquery-latest.min.js",
                "uri"   : "" //it will be one of the above
            },
            "pdfmake" : {
                "local" : path.join(DIRECTORIES.client.client, 'pdf', 'pdfmake.min.js'),
                "cdn"   : "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.34/pdfmake.min.js",
                "uri"   : "" //it will be one of the above
            },
            "vfs_fonts" : {
                "local" : path.join(DIRECTORIES.client.client, 'pdf', 'vfs_fonts.js'),
                "cdn"   : "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.34/vfs_fonts.js",
                "uri"   : "" //it will be one of the above
            },
            "chartjs" : {
                "local" :  path.join(DIRECTORIES.client.client, 'chart', 'chartjs.min.js'),
                "cdn"   : "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js",
                "uri"   : "" //it will be one of the above
            },
            "uaparserjs" : {
                "local" :  path.join(DIRECTORIES.client.client, 'ua-parser.min.js'),
                "cdn"   : "https://cdn.jsdelivr.net/npm/ua-parser-js@0/dist/ua-parser.min.js",
                "uri"   : "" //it will be one of the above
            },                                    
            "jssocials"     : "https://cdnjs.cloudflare.com/ajax/libs/jsSocials/1.5.0/jssocials.min.js",
            "GrecaptchaAPI" : "https://www.google.com/recaptcha/api.js",
            "Ganalytics"    : "https://www.google-analytics.com/analytics.js"            
        }
    };  
    
    //fills credentialsFullPath subObject
    for (file in FILENAMES.server.credentials){
        FILENAMES.server.credentialsFullPath[file] = 
            path.join(DIRECTORIES.server.credentials, FILENAMES.server.credentials[file]);
    }     
}

//get parent directory of project directory tree
//tries to get according to engine, NodeJS or PhantomJS
function setROOT_DIR(){

    var root_dir;

    if ((typeof process !== 'undefined') &&
        (process.release.name.search(/node|io.js/) !== -1)){//node

        var path = require('path');
        //the root directory of the project is where this file is stored
        root_dir = path.resolve(__dirname, '.');
        console.log("Node is running. ROOT_DIR: " + root_dir);
    }
    else {//PhantomJS?
        try{
            var fs = require('fs');
            //considering the phantom is called from build/
            //it needs to go back to the parent directory to get the root directory of the project
            root_dir = fs.absolute("../");
            console.log("Phantom is running. ROOT_DIR: " + root_dir);
        }
        catch(err){
            throw "Engine not recognized, nor NodeJS nor PhantomJS";
        }
    }

    ROOT_DIR = root_dir;
}


//set FILENAMES URI for JS known files according to Local files or CDN
//if cdn option is enabled, select CDN version, otherwise local files
//true for CDN; false for Local files
function setCdnOrLocalFiles(isCDN){
    for (key in FILENAMES.client){
        var obj = FILENAMES.client[key];
        //it is a client filename with different values for cdn and local
        if (obj.local && obj.cdn){
            obj.uri = isCDN ? obj.cdn : obj.local;
        }
    }
    //ensures that CDN URL to be passed to client is blank in case cdn option is not enabled
    if (!isCDN){
        SETTINGS.cdn.url = "";
    }
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
function getCClistOnStr(available_CT){
    var str = "";
    for (var CC in available_CT){
        str += CC + ", ";
    }
    //strip the last two character of the string, the last ", "
    str = str.slice(0, -2);
    return str;
}

function getArgvHelpMsg(){

    const path = require('path');
    
    var filename = path.basename(process.mainModule.filename);
    
    //credentials Directory seen from Root directory
    var credDirRelativePath = path.relative(DIRECTORIES.server.root, DIRECTORIES.server.credentials);

    var messg = "\n\n" +
        "Usage: node " + filename + " [options]\n" +
        "Ex:    node " + filename + " -r prod --uber --dataBase\n" +
        "\n" +
        "Options: \n" +
        "-r, --release              'work' for tests or 'prod' for production\n" +
        "-p, --port                 HTTP port on which the application is listening " + 
                                    "(default:" + defaultPortWork + " for tests, and " + defaultPortProd + " for production)\n" +
        "    --https                Enables protocol https when available\n" +
        "    --print                Enables the standard printing of final report\n" +
        "    --pdf                  Enables the downloading of a pdf final report (using pdfmake)\n" +
        "    --social               Enables social media plugin (js-socials)\n" +
        "    --disableCharts        Disables Charts on final report\n" +        
        "\n" +
        "    External API services, disabled by default\n" +
        "    API credentials must be in either " + credDirRelativePath + "/workCredentials.json or " + credDirRelativePath + "/prodCredentials.json according to release\n" +        
        "    --cdn                  Enables Content Delivery Network\n" +
        "    --uber                 Enables UBER API\n" +
        "    --googleCaptcha        Enables Google Captcha V2 anti-bot for calculation button\n" +
        "    --googleAnalytics      Enables Google Analytics\n" +
        "    --dataBase             Enables a mysql Database\n" +
        "\n";
    
    return messg;
}

function _getNoServiceErrMsg(serviceObj, fileName){

    const colors = require('colors/safe'); //does not alter string prototype
    var messg = "\nConsidering you enabled the " + serviceObj.name + 
                " services and you're using the release '" + RELEASE + "', " +
                "you have to either:\n" +
                "  - insert within the file " + colors.green.bold(fileName) + " a valid " +
                colors.green.bold(serviceObj.name + " " + serviceObj.propName) + " (see readme.md), or\n" +
                "  - disable the " + serviceObj.name + " service.\n";

    return messg;
}

function _getDataBaseErrMsg(scriptName, serviceObj){
    var messg = "\nThis building script " + scriptName + " needs the Database credentials to run, therefore:\n" + 
                "- enable the Database option (--dataBase) and provide also its credentials on " + 
                serviceObj.filePath + ", or\n" +
                "- do not run this particular building script file while building.\n";
    
    return messg;
}

//returns an object with several different information about the domains
function _getDomainsObject(domainsCountries){

    var domainsObj = {};
    domainsObj.countries = domainsCountries; //Object that associates a Country Code (CC) with a domain
    domainsObj.uniqueArr = _getUniqueArray(domainsCountries); //Array with unique domain names
        
    var counts = {};
    var arr = Object.values(domainsCountries);
    for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    }        
    domainsObj.counts = counts;  //for every domain, count how many domain names
    
    return domainsObj;
}

//returns true when an object is empty = {} or invalid
function isEmptyOrInvalidObj(obj){
    return typeof obj === 'undefined' || !obj || isEmpty(obj);
}

//detects whether an Object is empty
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

//checks if a credential is valid
function isValidCredentialString(data){

    if (typeof data === 'string'){
        //check if string is valid (no just whitespaces or asterisks)
        return data && data.replace(/(\s|\*)/g, '').length;
    }    
    
    else if (typeof data === 'object'){                
        var flattenedObj = require('flat').flatten(data);
        for (var key in flattenedObj){
            var str = flattenedObj[key];
            //first character. When property of obj starts with '_' it's comment, thus ignore            
            if (key.charAt(0) !== "_"){ 
                if (!str || !str.replace(/(\s|\*)/g, '').length){
                    return false;
                }
            }
        }        
        return true;
    }
    
    else{
        return false;
    }
}

//extract hostname/domain from url
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}