/*Building script*/

const commandLineArgs = require('command-line-args');
const {execSync}      = require('child_process');
const colors          = require('colors/safe'); //does not alter string prototype
const fs              = require('fs');
const fse             = require('fs-extra');
const path            = require('path');
const walk            = require('walk');
const jshint          = require('jshint').JSHINT;
const prettyjson      = require('prettyjson');
const async           = require('async');          //module to allow to execute the queries in series
const concat          = require('concat-files');   //concatenation file tool

const commons   = require(path.join(__dirname, 'commons'));

//basic command line settings
//the order is important, since when several options are present, the order is mantained
optionDefinitions = [
    /*With these options it may run just locally*/
    { name: 'copy',         alias: 'c', type: Boolean },
    { name: 'checkJS',      alias: 'e', type: Boolean },
    { name: 'compressImgs', alias: 'i', type: Boolean },
    { name: 'minify',       alias: 'm', type: Boolean },
    
    /*With these options it needs internet connection to a server's Database*/    
    { name: 'release',      alias: 'r', type: String },
    { name: 'specDB',       alias: 's', type: Boolean },
    { name: 'refreshDB',    alias: 'd', type: Boolean },
    { name: 'genTables',    alias: 't', type: Boolean },
    
    /*###*/
    { name: 'help',         alias: 'h', type: Boolean },
    { name: 'All',          alias: 'A', type: Boolean },
    { name: 'run',                      type: Boolean }
    
];

//get set options from command line arguments
var options = commandLineArgs(optionDefinitions);
//this "option" object is just filled with the options that were inserted in the command line
//console.log(options);

//check if --help was selected
if(options.help){
    console.log(getArgvHelpMsg());
    process.exit();
}

//if --All was selected select all
if(options.All){
    options.copy         = true;
    options.checkJS      = true;
    options.compressImgs = true;
    options.minify       = true;
    options.specDB       = true;
    options.refreshDB    = true;
    options.genTables    = true;
}

var release = options.release;
//check that release was correctly chosen
if (release !== "work" && release !== "prod"){
    release = "work";
}

console.log("Release: '" + release + "'");
RELEASE = release; //set Global variable

commons.setRelease(RELEASE);
//these calls must be called after setRelease()
var directories = commons.getDirectories();
var filenames   = commons.getFileNames();

var ROOT_DIR    = directories.server.root;
var BIN_DIR     = directories.server.bin;
var SRC_DIR     = directories.server.src;
var BUILD_DIR   = directories.server.build;

//makes sure the build.js script is called from this own directory
//(problems regarding the PhantomJS script which messes with relative paths)
var runDir = process.cwd(); //directory from where the script is called
var diffDir = path.relative(runDir, ROOT_DIR);
if(diffDir !== '' && diffDir !== '.'){
    console.log("You must call this builiding script from within the directory where this file is located: " + ROOT_DIR);
    console.log("Do first " + colors.blue("cd " + path.relative(runDir, ROOT_DIR) ) + " and then call this script again.");
    process.exit();
}

//method that forces several methods to run synchronously
async.series([

    //copy new version from src/ to bin/
    function(callback){
        if(options.copy){
            copy();
            concatCSSFiles(callback);
        }
        else{
            callback();
        }
    },

    //Creates DB with countries' specifcations
    function(callback){
        if(options.specDB){
            specDB();
        }
        callback();
    },

    //Refreshes statistical costs DB
    function(callback){
        if(options.refreshDB){
            refreshDB();
        }
        callback();
    },

    //Generates statistical tables
    function(callback){
        if(options.genTables){
            genTables();
        }
        callback();
    }, 

    //Check JS syntax errors
    function(callback){
        if(options.checkJS){
            checkJS(callback); 
        }
        else{
            callback();
        }        
    },  

    //Minify code
    function(callback){
        if(options.minify){
            minify();
        }
        callback();
    },  

    //compress images
    function(callback){
        if(options.compressImgs){
            compressImgs();
        }
        callback();
    }, 
    
    function(callback){
        //only shows this final message if the bin/index.js is not run
        if(!options.run){
            console.log(getFinalRunMsg());
        }
        callback();
    },
    
    function(callback){
        if(options.run){
            //when option run is selected, at least makes a new copy from src/ to bin/ if not enabled
            if(!options.copy){
                copy();
                concatCSSFiles(callback);
            }                        
            runApp();
        }        
    }
    
]);//async.series
    
//copy files from src/ to bin/
function copy(){
    console.log("\n" + colors.blue.bold("## Making a clean copy from src/ to bin/") + " \n");
    
    //deletes fully the directory and creates empty one
    fse.removeSync(BIN_DIR); // equivalent in Unix to "rm -rf"  
    fs.mkdirSync(BIN_DIR);  
    
    fse.copySync(SRC_DIR, BIN_DIR);
    
    console.log("Copy node modules to bin/");            
    
    //copy jquery file
    var jqueryDir = path.dirname(require.resolve('jquery'));
    fse.copySync(path.join(jqueryDir, 'jquery.min.js'), 
                 path.join(BIN_DIR, 'client', 'jquery', 'jquery.min.js'));
    
    //copy pdfmake files
    var pdfmakeBuildDir = path.resolve(path.dirname(require.resolve('pdfmake')), '..', 'build');    
    
    fse.copySync(path.join(pdfmakeBuildDir, 'pdfmake.min.js'),
                 path.join(BIN_DIR, 'client', 'pdf', 'pdfmake.min.js'));
    fse.copySync(path.join(pdfmakeBuildDir, 'vfs_fonts.js'),
                 path.join(BIN_DIR, 'client', 'pdf', 'vfs_fonts.js'));    
    fse.copySync(path.join(pdfmakeBuildDir, 'pdfmake.min.js.map'), 
                 path.join(BIN_DIR, 'public', 'pdfmake.min.js.map'));
    
    //copy chartjs file
    var chartjsDistDir = path.resolve(path.dirname(require.resolve('chart.js')), '..', 'dist');        
    fse.copySync(path.join(chartjsDistDir, 'Chart.min.js'), 
                 path.join(BIN_DIR, 'client', 'chart', 'chartjs.min.js'));
}

//concatenate some CSS files
function concatCSSFiles(mainCallback){  
    
    //CSS files to be concatenated, 
    //the ones which are needed for initial main page loading
    var files1Arr = [
        'style.css', 'responsive.css', 'fonts.css'
    ];
    //name given to the merged file
    var files1MergedName = 'merged_init.css';

    //CSS files to be concatenated, 
    //the ones which are deferred from initial loading
    var files2Arr = [
        'results.css'
    ];       
    //name given to the merged file
    var files2MergedName = 'merged_deferred.css';    
    
    /*************************************************************/
    
    var CSS_DIR = directories.bin.css;      
    
    //joins the CSS dir
    var files1ArrFullPath = [];
    for(let i=0; i<files1Arr.length; i++){
        files1ArrFullPath[i] = path.join(CSS_DIR, files1Arr[i]);
    }
    var files2ArrFullPath = [];
    for(let i=0; i<files2Arr.length; i++){
        files2ArrFullPath[i] = path.join(CSS_DIR, files2Arr[i]);
    }               

    //concatenating files
    async.series([        
        function(callback){
            concat(files1ArrFullPath, path.join(CSS_DIR, files1MergedName),
                function(err) {
                    if (err) {throw err};
                    
                    //builds console.log msg
                    let consoleMsg = 'Concatenation done on ' + files1MergedName + ' from: ';
                    for(let i=0; i<files1Arr.length; i++){
                        consoleMsg += files1Arr[i] + ', ';
                    }                 
                    console.log(consoleMsg);
                
                    callback();
                }
            );
        },    
        function(callback){
            concat(files2ArrFullPath, path.join(CSS_DIR, files2MergedName),
                function(err) {
                    if (err) {throw err};
                
                    //builds console.log msg
                    let consoleMsg = 'Concatenation done on ' + files2MergedName + ' from: ';
                    for(let i=0; i<files2Arr.length; i++){
                        consoleMsg += files2Arr[i] + ', ';
                    }                 
                    console.log(consoleMsg);                    
                
                    callback();
                }
            );
        },
        function(){
            mainCallback();
        }
    ]);//async.series
}

function checkJS(callback){
    console.log("\n" + colors.blue.bold("## Checking for JS syntax errors in src/") + " \n");    
            
    JShintOpt = {
        "-W041": true,
        "multistr": true,
        "asi": true,
        "expr": true,
        "evil": true,
        "funcscope": false,
        "esversion": 6
    };

    var walker = walk.walk(directories.server.src);
    
    console.log("Checking JS files syntax in "+ directories.server.src + "\n");
    
    walker.on("file", function (root, fileStats, next) {

        var filename = path.join(root, fileStats.name);              

        //gets file extension and avoids exceptions
        if(getFileExtension(filename) == 'js' && 
           !filename.includes("vfs_fonts")    && 
           !filename.includes("js_timer.js")  &&
           !filename.includes("jAlert.js")    ){

            var code = fs.readFileSync(filename, 'utf-8'); 

            jshint(code, JShintOpt, {});

            if (jshint.errors.length == 0){ //no warnings
                console.log(colors.green(filename.replace(ROOT_DIR, '')));
            }
            else{
                console.log(colors.red.bold(filename.replace(ROOT_DIR, '')));
                console.log(prettyjson.render(jshint.errors));
            }            
        }

        next();
    });

    walker.on("end", function () {
        console.log("\nAll JS files checked\n");
        callback();
    });

}

//-i compress [i]mages, jpg and png files in bin/ | with ImageMagick 
function compressImgs(){
    console.log("\n" + colors.blue.bold("## Compress images, jpg and png files") + " \n");
    execSync("node " + filenames.build.compressImages + " -r " + RELEASE, {stdio:'inherit'});
}

//-m  [m]inify js, json, css and html files in bin/ | with npm: minifier, html-minifier, uglifycss and json-minify 
function minify(){
    console.log("\n" + colors.blue.bold("## Minify and concatenate js, html/hbs, css and json files") + " \n");
    execSync("node " + filenames.build.minifyFiles + " -r " + RELEASE, {stdio:'inherit'});
}

/*With these options it needs internet connection to a server's Database*/

//-s  creates a Database with countries' [s]pecifcations  connection to a Database
function specDB(){
    console.log("\n" + colors.blue.bold("## Creates DB with countries' specifcations") + " \n");
    execSync("node " + filenames.build.setCountrySpecsDB + " --dataBase" + " -r " + RELEASE, {stdio:'inherit'});
}

//-d refreshes the statistical costs [d]atabase | connection to the countries' specifcations Database 
function refreshDB(){
    console.log("\n" + colors.blue.bold("## Refreshes statistical costs DB") + " \n");
    execSync("node " + filenames.build.getAvgFromDB + " --dataBase" + " -r " + RELEASE, {stdio:'inherit'});
}

//-t generate html and jpeg stats [t]ables in bin/ | based on the statistical costs Database 
function genTables(){    
    console.log("\n" + colors.blue.bold("## Generating statistical tables") + " \n");
    console.log("\n    Extracts stat info from prod and create html tables \n");
    execSync("node " + filenames.build.generateTables + " --dataBase" + " -r " + RELEASE, {stdio:'inherit'});
}


function getArgvHelpMsg(){

    var filename = path.basename(process.mainModule.filename);

    var messg = "\n" +
                "Exemple: \n" +
                "node " + filename + " -ceim \n" +
                "node " + filename + " -A -r prod \n" +
                "\n" +
                "#With these options it may run just locally\n" +
                "-c  --copy          makes a [c]lean copy from src/ to bin/               need to be done on the 1st time \n" +
                "-e  --checkJS       check for JS syntax [e]rrors in src/                 with npm jshint \n" +
                "-i  --compressImgs  compress [i]mages, jpg and png files in bin/         with ImageMagick \n" +                       
                "-m  --minify        [m]inify js, json, css and html files in bin/        with npm: minifier, html-minifier, uglifycss and json-minify \n" +
                "\n\n" +
                "#With these options it needs internet connection to a server's Database\n" +
                "-r  --release       selects Database [r]elease (-r work or -r prod)      Database credentials in directory keys/work/ or keys/prod/\n" +
                "-s  --specDB        creates a Database with countries' [s]pecifications  connection to a Database\n" +
                "-d  --refreshDB     refreshes the statistical costs [d]atabase           connection to the countries' specifcations Database \n" +
                "-t  --genTables     generate html and jpeg stats [t]ables in bin/        based on the statistical costs Database \n" +
                "\n" +
                "-A  --All           enables [a]ll previous options\n" +
                "    --run           runs built with default options, after building is complete\n" +
                "-h  --help          (this output) \n\n"; 

    return messg;
}


function getFinalRunMsg(){
    //built filename
    var filename = path.join(process.cwd(), 'bin', "index.js");
    
    var messg = "\nRun " + colors.green.bold("node " + filename) + " to start application with default options\n" + 
                "or " + colors.green.bold("node " + filename + " -h") + " for more information\n";          

    return messg;
}

function runApp(){

    //built filename
    var filename = path.join(process.cwd(), 'bin', "index.js");
    
    console.log("Building complete with " + colors.bold("--run") + " option enabled, therefore");
    console.log("starting application with default options using command: "); 
    console.log(colors.green.bold("node " + filename) + "\n");
    console.log("For other options stop server and run:");
    console.log(colors.green.bold("node " + filename + " -h\n"));
    
    execSync("node " + filename + " -r " + RELEASE, {stdio:'inherit'});
}

function getFileExtension(fileName){
    return fileName.split('.').pop();
}