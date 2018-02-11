/*Common information that will be used by other scripts and code*/

//Default Country when any possible method to get country isn't available
const defaultCountry = "UK"; //when no other method finds the country of user, use this by default

module.exports = {

    init: function(){
        _init();
    },

    getSettings: function(){
        return SETTINGS;
    },

    getRelease: function(){
        if(!RELEASE || typeof RELEASE === 'undefined'){
            _init();
        }
        return RELEASE;
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

    getUniqueArray: function(Arr){
        return _getUniqueArray(Arr);
    },

    getKeyByValue: function(object, value){
        return _getKeyByValue(object, value);
    },

    getCClistOnStr: function(available_CT){
        return getCClistOnStr(available_CT);
    },

    getNoServErrMsg: function(serviceObj){
        return _getNoServErrMsg(serviceObj);
    },
    
    getDataBaseErrMsg: function(scriptName, serviceObj){
        return _getDataBaseErrMsg(scriptName, serviceObj);
    }

};

/***************************************************************************************************/
/***************************************************************************************************/
/***************************************************************************************************/

//Global variables*/
var RELEASE; //release, "work" or "prod"
var ROOT_DIR; //root directory of the project
var SWITCHES, DIRECTORIES, SETTINGS, FILENAMES;
var optionDefinitions; //for the commandLineArgs

//initialization
function _init(){

    const commandLineArgs = require('command-line-args');
    const path    = require('path');
    const fs      = require('fs');

    /*GLOBAL switches, false by default*/
    /*these values are defined by the command line arguments*/
    SWITCHES = {
        "https": false,           /*true for https when requested, only set to true when SSL is available*/
        "cdn": false,             /*Content Delivery Network*/
        "uber": false,            /*uses UBER API to give car user comparisions with UBER costs*/
        "social": false,          /*Social media pulgins*/
        "googleCharts": false,    /*Google Charts*/
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
        { name: 'All', alias: 'A', type: Boolean }
    ];

    //populates optionDefinitions of commandLineArgs according to SWITCHES
    for (var service in SWITCHES){
        optionDefinitions.push({name:service, type: Boolean});
    }

    //get set options from command line arguments
    const options = commandLineArgs(optionDefinitions);
    //this "option" object is just filled with the options that were inserted in the command line

    //check if --help was selected
    if(options.help){
        console.log(getArgvHelpMsg());
        process.exit();
    }
    //console.log(options);

    var release = options.release;
    //check that release was correctly chosen
    if (release !== "work" && release !== "prod"){
        release = "work";
    }
    console.log("Release: '" + release + "'");
    RELEASE = release; //set Global variable

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

    setDIRECTORIES();
    setFILENAMES();

    SETTINGS = {
        "release"  : RELEASE,
        "switches" : SWITCHES,
        "cdn": { //a CDN provider might be: https://app.keycdn.com/zones
            "enabled"  : SWITCHES.cdn,
            "name"     : "Content Delivery Network",
            "file"     : FILENAMES.server.credentials.cdn,
            "filePath" : FILENAMES.server.credentialsFullPath.cdn,
            "propName" : "url",
            "propType" : "string",
            "url"      : ""
        },
        "uber": {
            "enabled"  : SWITCHES.uber,
            "name"     : "UBER",
            "file"     : FILENAMES.server.credentials.uber,
            "filePath" : FILENAMES.server.credentialsFullPath.uber,            
            "propName" : "token",
            "propType" : "string",
            "token"    : ""
        },
        "googleCaptcha" : {
            "enabled"   : SWITCHES.googleCaptcha,
            "name"      : "Google Captcha V2",
            "file"      : FILENAMES.server.credentials.googleCaptcha,
            "filePath"  : FILENAMES.server.credentialsFullPath.googleCaptcha,            
            "propName"  : "secretKey",
            "propType"  : "string",
            "secretKey" : ""
        },
        "googleAnalytics": {
            "enabled"    : SWITCHES.googleAnalytics,
            "name"       : "Google Analytics",
            "file"       : FILENAMES.server.credentials.googleAnalytics,
            "filePath"   : FILENAMES.server.credentialsFullPath.googleAnalytics,            
            "propName"   : "trackingId",
            "propType"   : "string",
            "trackingId" : ""
        },
        "dataBase" : {
            "enabled"     : SWITCHES.dataBase,
            "name"        : "Database",
            "file"        : FILENAMES.server.credentials.dataBase,
            "filePath"    : FILENAMES.server.credentialsFullPath.dataBase,            
            "propName"    : "credentials",
            "propType"    : "object",
            "credentials" : {}
        },
        "defaultCountry" : defaultCountry
    };

    //fills missing information, for each service corresponding property: "url", "token", "secretKey", etc.
    //gets the information from corresponding file
    for (service in SETTINGS){
        var serviceObj = SETTINGS[service];
        if(typeof serviceObj.enabled !== 'undefined' && serviceObj.enabled){
            var dataObj = getServiceCredentialsFromFile(serviceObj.name);
            if (serviceObj.propType === 'string'){
                serviceObj[serviceObj.propName] = dataObj[serviceObj.propName];
            }
            else if(serviceObj.propType === 'object'){
                 serviceObj[serviceObj.propName] = Object.assign({}, dataObj); //clone object
            }
            else{
                throw "Error getting service information from " + serviceObj.name;
            }
        }
    }

    //console.log(SETTINGS);
}


function setDIRECTORIES(){

    if(typeof ROOT_DIR === 'undefined'){
        setROOT_DIR();
    }

    /*Always leave the traling slash at the end on each directory*/
    /*this directory structure was based on Node/JS most common practises,
    namely see: docs/nodeJS-directory-structure.md */

    //Source directory - the directory where the source code is stored
    var srcDir       = ROOT_DIR + "src" + "/";

    //Bin directory - the directory to where the source code is deployed after running the bash script ./build.sh
    var binDir       = ROOT_DIR + "bin" + "/";

    //Build directory - the directory to where the building scripts are stored
    var buildDir     = ROOT_DIR + "build" + "/";    
    
    //The directory where the countries information is originally stored
    var countriesDir = srcDir  + "countries" + "/";

    //The directory where the tables HTML.hbs and JPEG files
    //are to be stored right after being generated
    var tablesDir = binDir + "tables" + "/";

    //credentials directory where json credential files are stored for each service
    var credentialsDir = ROOT_DIR + "credentials/"

    //directory with respect to src/ dir, where the client JS browser files will be stored
    var clientDir = 'client/';

    DIRECTORIES = {
        "server" : {
            "root"              : ROOT_DIR,
            "src"               : srcDir,
            "bin"               : binDir,
            "build"             : buildDir,
            "countries"         : countriesDir,
            "tables"            : tablesDir,
            "credentials"       : credentialsDir,
        },
        "client" : {
            "client"            : clientDir
        }
    };

}


function setFILENAMES(){

    if(!RELEASE){
        _init();
    }
    
    if(isEmptyOrInvalidObj(DIRECTORIES)){
        
        setDIRECTORIES();
    }

    //Default file names for JSON files with credentials for each external service
    FILENAMES = {
        "server" : {
            "credentials" : {
                "cdn"             : "cdn.json",
                "uber"            : "uber.json",
                "googleCaptcha"   : "googleCaptcha.json",
                "googleAnalytics" : "googleAnalytics.json",
                "dataBase"        : "dataBase.json"
            },
            "credentialsFullPath" : {
                "cdn"             : "",
                "uber"            : "",
                "googleCaptcha"   : "",
                "googleAnalytics" : "",
                "dataBase"        : ""
            },        
            "countriesListFile" : DIRECTORIES.server.countries + "list.json",
            "statsFunctions.js" : DIRECTORIES.server.build + "statsFunctions.js"
        },
        "client": {
            "conversionFunctions.js" : DIRECTORIES.server.src + 'client/conversionFunctions.js',
            "coreFunctions.js"       : DIRECTORIES.server.src + 'client/core/coreFunctions.js',
            "getData.js"             : DIRECTORIES.server.src + 'client/getData.js'
        }
    };  
    
    //fills credentialsFullPath subObject
    var credentialsDir = DIRECTORIES.server.credentials + RELEASE + "/";
    for (file in FILENAMES.server.credentials){
        FILENAMES.server.credentialsFullPath[file] = credentialsDir + FILENAMES.server.credentials[file];    
    }
    
    //console.log(FILENAMES);    
}

//get parent directory of project directory tree
//tries to get according to engine, NodeJS or PhantomJS
function setROOT_DIR(){

    var root_dir;

    if ((typeof process !== 'undefined') &&
        (process.release.name.search(/node|io.js/) !== -1)){//node

        var path = require('path');
        //the root directory of the project is where this file is stored
        root_dir = path.resolve(__dirname, '.') + "/";
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

//gets the correspondent service credentials are stored in directories
// keys/prod or keys/work, the latter being the release test version
function getServiceCredentialsFromFile(serviceName){

    if(!RELEASE || isEmptyOrInvalidObj(SETTINGS)){
        _init();
    }

    if(isEmptyOrInvalidObj(DIRECTORIES)){
        setDIRECTORIES();
    }

    //get the service Object
    var serviceObj, serviceObjI;
    for (serviceI in SETTINGS){
        serviceObjI = SETTINGS[serviceI];
        if(typeof serviceObjI.enabled !== 'undefined' && typeof serviceObjI.name !== 'undefined'){
            if(serviceObjI.name == serviceName){
                serviceObj =  Object.assign({}, serviceObjI); //clones object
            }
        }
    }

    if (isEmptyOrInvalidObj(serviceObj)){
        throw "Service object in settings object is empty when trying to get credentials from file on service " + serviceName;
    }

    //credentials directory where json credential files are stored
    var credentialsDir = DIRECTORIES.server.credentials;

    //check if the switch for this service is enabled
    if(!serviceObj.enabled){
        if (serviceObj.prop){//when property of object is requested, but switch is disabled
            return "";
        }
        else{//empty object
            return {};
        }
    }

    //from here the switch is enabled

    const path = require('path');
    const fs   = require('fs');

    if (typeof serviceObj.name !== 'string' || typeof serviceObj.file !== 'string'){
        throw "Error calling function getServiceCredentialsFromFile(serviceName)";
    }

    if (typeof RELEASE !== 'undefined'){

        var fileName = credentialsDir + RELEASE + '/' + serviceObj.file;
        if (!fs.existsSync(fileName)){
            throw _getNoServErrMsg(serviceObj);
        }

        return JSON.parse(fs.readFileSync(fileName));

    }
    else{
        var thisScriptFileName = path.basename(__filename);
        throw "'RELEASE', the internal variable of module " + thisScriptFileName + " " +
              "are not yet defined\n";
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

    var fnArr = (process.mainModule.filename).split('/');
    var filename = fnArr[fnArr.length -1];

    var messg = "\n\n" +
        "Usage: node " + filename + " [options]\n" +
        "Ex:    node " + filename + " -r prod --uber --data_base\n" +
        "\n" +
        "Options: \n" +
        "-r, --release              'work' for tests or 'prod' for production\n" +
        "                           API credentials being in keys/work/ or keys/prod/ \n" +
        "    --https                Enables protocol https when available\n" +
        "    --cdn                  Enables Content Delivery Network\n" +
        "    --uber                 Enables UBER API\n" +
        "    --social               Enables social media plugin\n" +
        "    --googleCharts         Enables Google Charts for report\n" +
        "    --googleCaptcha        Enables Google Captcha V2 anti-bot for calculation button\n" +
        "    --googleAnalytics      Enables Google Analytics\n" +
        "    --dataBase             Enables a mysql Database\n" +
        "    --print                Enables option to print, on the final report\n" +
        "    --pdf                  Enables option to download pdf repor on final report\n" +
        "\n" +
        "-A  --all                  Enables all the previous options\n";

    return messg;
}

function _getNoServErrMsg(serviceObj){

    var messg = "\nConsidering you enabled the " + serviceObj.name + " services and you're using the release '" + RELEASE + "', " +
                "you have to either:\n" +
                "  - create the file " + serviceObj.filePath + " with the " +
                serviceObj.name + " credentials, or\n" +
                "  - disable the " + serviceObj.name + " service.\n";

    return messg;
}

function _getDataBaseErrMsg(scriptName, serviceObj){
    var messg = "\nThis building script " + scriptName + " needs the Database credentials to run, therefore:\n" + 
                "- enable the Database option (--dataBase) and provide also its credentials on " + serviceObj.filePath + ", or\n" +
                "- do not run this particular building script file while building.\n";
    
    return messg;
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