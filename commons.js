/*Common information that will be used by other scripts and code*/
/* Change accordingly */

module.exports = {
    
    //Root directory of the main project
    //command to get ROOT_DIR might vary according to the applica 
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

        //The directory where the tables HTML.hbs and JPEG files are stored 
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
    
    find: function(startPath, filter, callback){
        _find(startPath, filter, callback);
    },
    
    getRelease: function(process){
        return _getRelease(process);
    }
 
}

/***************************************************************************************************/
/***************************************************************************************************/
/***************************************************************************************************/

const path    = require('path'); 
const fs      = require('fs');

/*to find all files in "startPath" folder and all its sub folders*/
/*filter may be for example ".html" */
function _find(startPath, filter, callback){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            _find(filename,filter,callback); //recurse
        }
        else if (filename.indexOf(filter)>=0) {            
            if (typeof callback === "function"){                
                callback(filename);
            }
        }
    }
}

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
