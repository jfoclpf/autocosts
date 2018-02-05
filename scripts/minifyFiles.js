/* NodeJS script that minifies files stored in the BUILD folder
replacing their content with the minfied version

It also concatenates somes files, for better bandwith performance*/

//node/npm includes
const fs       = require('fs');
const path     = require("path");
const commons  = require('../commons.js');
const childProcess = require('child_process');
const walk     = require('walk');        

//minification tools
const UglifyJS   = require("uglify-js");
const uglifycss  = require('uglifycss');
const minifyHTML = require('html-minifier').minify;
const jsonminify = require("jsonminify");

//concatenation file tool
const concat = require('concat-files');

//Root directory of the main project
var ROOT_DIR = path.resolve(__dirname, '../')  + "/";
//Main directories got from commons
var Dirs = commons.getDirs(ROOT_DIR);
var BUILD_DIR = Dirs.BUILD_DIR;

console.log('\n## Minifying and concatenating files'); 

processFiles();

console.log("\n");

//end of script
/*###############################################################################
################################################################################*/

//minifies all js files on the client side, namely on the build/client/ directory,
//i.e., these are JS files that will be sent from the server to the client

function processFiles(){
    processJSfiles();
}


function processJSfiles(){

    console.log('\n   Minifying JS files in build/client/');

    var walker = walk.walk(BUILD_DIR + 'client');    
    walker.on("file", function (root, fileStats, next) {
                        
        var filename = root + "/" + fileStats.name;        
        
        if(filename.includes(".js") && !filename.includes("vfs_fonts.js")){
            
            console.log(filename.replace(ROOT_DIR, ''));
            var code = fs.readFileSync(filename, 'utf-8');            
            
            //file 'Globals.js.hbs' because is a JS file rendered by handlebars
            //needs a special treatment upon minification
            var result;
            if (!filename.includes('Globals.js.hbs')){
                result = UglifyJS.minify(code);
            }
            else{        
                var options = { output: {  beautify: false, quote_style: 1}};        
                result = UglifyJS.minify(code, options);
            }    

            if (result.error){
                console.log('\nERROR minifying JS file ', filename, result.error, '\n');
            }
            else{                
                fs.writeFileSync(filename, result.code, 'utf8');
            }
          
        }
        
        next();
        
    });
    
    walker.on("errors", function (root, nodeStatsArray, next) {
        console.log("There was an error with" + nodeStatsArray.name);        
        next();
    });

    walker.on("end", function () {
        console.log("\nAll JS files compressed\n");
        processCSSfiles();
    });    
    
}

//minifies all css files on the client side, namely on the build/css/ directory,
//i.e., these are CSS files that will be sent from the server to the client
function processCSSfiles(){
    minifyCSSFiles();    
}

function minifyCSSFiles(){

    console.log('\n   Minifying CSS files in build/css/\n');
        
    var walker = walk.walk(BUILD_DIR + 'css');//dir to walk into    
   
    walker.on("file", function (root, fileStats, next) {
                        
        var filename = root + "/" + fileStats.name;  
        
        if(filename.includes(".css")){        

            console.log(filename.replace(ROOT_DIR, ''));

            var code = fs.readFileSync(filename, 'utf-8');
            var result = uglifycss.processString(code);

            if (!result){
                console.log('ERROR minifying CSS file ', filename, '\n');       
            }
            else{    
                fs.writeFileSync(filename, result, 'utf8');
            }
        }
        
        next();

    });
    
    walker.on("errors", function (root, nodeStatsArray, next) {
        console.log("There was an error with" + nodeStatsArray.name);
        next();
    });

    walker.on("end", function () {
        console.log("\nAll CSS files compressed\n");
        concatCSSFiles();        
    });     

}

//concatenate some CSS files
function concatCSSFiles(){    
     
    //creates directory if it doesn't exist
    if (!fs.existsSync(BUILD_DIR + 'css/merged-min/')){
        fs.mkdirSync(BUILD_DIR + 'css/merged-min/');
    }    
    
    //CSS files to be concatenated, 
    //the ones which are needed for initial main page loading
    var files1Arr = [
        BUILD_DIR + 'css/main.css',
        BUILD_DIR + 'css/central.css',
        BUILD_DIR + 'css/form.css',
        BUILD_DIR + 'css/left.css',
        BUILD_DIR + 'css/right.css',
        BUILD_DIR + 'css/header.css',
        BUILD_DIR + 'css/flags.css',
        BUILD_DIR + 'css/mobile.css'
    ];

    //CSS files to be concatenated, 
    //the ones which are deferred from initial loading
    var files2Arr = [
        BUILD_DIR + 'css/jAlert.css',
        BUILD_DIR + 'css/results.css'

    ];

    //concatenating files
    concat(files1Arr, BUILD_DIR + 'css/merged-min/merged1.css.hbs',
        function(err) {
            if (err) throw err
            console.log('merged1.css.hbs concatenation done\n');
        }
    );
    concat(files2Arr, BUILD_DIR + 'css/merged-min/merged2.css',
        function(err) {
            if (err) throw err
            console.log('merged2.css concatenation done\n');
            processHTMLfiles();
        }
    );
}

//minifies all html handlebars templates .hbs files on the client side, 
//namely on the build/views/ directory,
//i.e., these are handlebars .hbs files that will be rendered as HTML files 
//and then sent from the server to the client/browser
function processHTMLfiles(){
    
    console.log('\n   Minifying HTML .hbs files in build/views/\n');
    
    var walker = walk.walk(BUILD_DIR + 'views');//dir to walk into
    walker.on("file", function (root, fileStats, next) {
                        
        var filename = root + "/" + fileStats.name;  
        
        if(filename.includes(".hbs") && !filename.includes("sitemap.hbs")){  

            console.log(filename.replace(ROOT_DIR, ''));

            var code = fs.readFileSync(filename, 'utf-8');

            var result = minifyHTML(code, {
                ignoreCustomFragments: [/{{[{]?(.*?)[}]?}}/, //ignore fragments from handlebars 
                                        /<%[\s\S]*?%>/,      //ignore default fragments
                                        /<\?[\s\S]*?\?>/ ],  //ignore default fragments
                collapseWhitespace :   true, //collapse white space that contributes to text nodes in a document tree
                removeComments :       true, //strip HTML comments
                removeOptionalTags :   true, //remove optional tags http://perfectionkills.com/experimenting-with-html-minifier/#remove_optional_tags
                caseSensitive :        true  //treat attributes in case sensitive manner (useful for custom HTML tags)
            });

            if (!result){
                console.log('ERROR minifying .hbs file ', filename, '\n');       
            }
            else{
                fs.writeFileSync(filename, result, 'utf8');
            }
            
        }
        
        next();

    });
    
    walker.on("errors", function (root, nodeStatsArray, next) {
        console.log("There was an error with" + nodeStatsArray.name);
        next();
    });

    walker.on("end", function () {
        console.log("\nAll html/hbs files compressed\n");
        processJSONfiles();
    });     
}

//minifies all json files on the client side, namely on the build/countries/ directory,
function processJSONfiles(){
    
    console.log('\n   Minifying JSON files in build/countries/\n');

    var walker = walk.walk(BUILD_DIR + 'countries');//dir to walk into
    walker.on("file", function (root, fileStats, next) {
                        
        var filename = root + "/" + fileStats.name;  
        
        if(filename.includes(".json")){  

            console.log(filename.replace(ROOT_DIR, ''));

            var code = fs.readFileSync(filename, 'utf-8');
            var result = jsonminify(code);

            if (!result){
                console.log('ERROR minifying JSON file ', filename, '\n');       
            }
            else{    
                fs.writeFileSync(filename, result, 'utf8');
            }
        }
        
        next();

    });
    
    walker.on("errors", function (root, nodeStatsArray, next) {
        console.log("There was an error with" + nodeStatsArray.name);
        next();
    });

    walker.on("end", function () {
        console.log("\nAll JSON files compressed\n");
    });     
}



