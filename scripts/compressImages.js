/*node script to compress and optimize all the images, namely JPG and PNG images, for the web page.
Optimal compression settings were defined by Google from the Page Speed Insights documentation */

const im      = require('imagemagick');
const path    = require('path'); 
const fs      = require('fs');
const commons = require('../commons.js');
const walk    = require('walk');

//Root directory of the main project
var ROOT_DIR = path.resolve(__dirname, '../')  + "/";
//Main directories got from commons
var Dirs = commons.getDirs(ROOT_DIR);

var BUILD_DIR = Dirs.BUILD_DIR;
console.log("BUILD_DIR: ", BUILD_DIR);

compressImages();

//end of script
/*###############################################################################
################################################################################*/

async function compressImages(){
    await compressJPG();
    compressPNG();
}

function compressJPG(){
    
    return new Promise(function(resolve){
    
        //gets all jpg files in builddir

        //BUILD_DIR has a trailing slash, removes it for the walker function    
        var walker = walk.walk(path.dirname(BUILD_DIR+"."));    

        walker.on("file", function (root, fileStats, next) {

            var filename = root + "/" + fileStats.name;        

            if(filename.includes(".jpg")){

                console.log(filename.replace(ROOT_DIR, ""));

                var params = [ filename,
                               '-sampling-factor', '4:2:0',
                               '-strip', '-quality', '85', 
                               '-interlace', 'Plane', 
                               '-colorspace', 'RGB',
                               filename + '.min'];

                im.convert(params, function(err, stdout){
                        if (err) throw err;
                        fs.unlinkSync(filename);
                        fs.renameSync(filename + '.min', filename);4
                        next();
                    });
            }
            else{
                next();
            }
        });

        walker.on("errors", function (root, nodeStatsArray, next) {
            console.log("There was an error with" + nodeStatsArray.name);        
            next();
        });

        walker.on("end", function () {
            console.log("\nAll JPG files compressed\n");
            resolve();
        });
    });
}


function compressPNG(){

    //gets all png files in builddir 
    
    //BUILD_DIR has a trailing slash, removes it for the walker function    
    var walker = walk.walk(path.dirname(BUILD_DIR+"."));    
    
    walker.on("file", function (root, fileStats, next) {
                        
        var filename = root + "/" + fileStats.name;        
        
        if(filename.includes(".png")){

            console.log(filename.replace(ROOT_DIR, ""));

            var params = [ filename,
                           '-strip',
                           filename + '.min'];

            im.convert(params, function(err, stdout){
                    if (err) throw err;
                    fs.unlinkSync(filename);
                    fs.renameSync(filename + '.min', filename);
                    next();
                });
        }
        else{
            next();
        }        
    });
    
    walker.on("errors", function (root, nodeStatsArray, next) {
        console.log("There was an error with" + nodeStatsArray.name);        
        next();
    });

    walker.on("end", function () {
        console.log("\nAll PNG files compressed\n");
    });      
}





