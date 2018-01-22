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
    }
    
}