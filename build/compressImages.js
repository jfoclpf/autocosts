/*node script to compress and optimize all the images, namely JPG and PNG images, for the web page.
Optimal compression settings were defined by Google from the Page Speed Insights documentation */

console.log("\nRunning script " + __filename + "\n");

const im      = require('imagemagick');
const path    = require('path'); 
const fs      = require('fs');
const commons = require(path.join(__dirname, '..', 'commons'));
const walk    = require('walk');
const colors  = require('colors');

//Main directories got from commons
var directories = commons.getDirectories();

var ROOT_DIR = directories.server.root;
var BIN_DIR  = directories.server.bin;
console.log("BIN_DIR: ", BIN_DIR);

//from require('colors');
colors.setTheme(commons.getConsoleColors());

compressImages();

//end of script
/*###############################################################################
################################################################################*/

async function compressImages(){
    await compressJPG();
    compressPNG();
}

function compressJPG(){
    
    console.log(('\n## Compressing JPG files \n').mainOptionStep);
    
    return new Promise(function(resolve){
    
        //gets all jpg files in builddir

        //BIN_DIR has a trailing slash, removes it for the walker function    
        var walker = walk.walk(BIN_DIR);    

        walker.on("file", function (root, fileStats, next) {

            var filename = path.join(root, fileStats.name);        

            if(filename.includes(".jpg")){

                console.log((filename.replace(ROOT_DIR, "")).verbose);

                var params = [ filename,
                               '-sampling-factor', '4:2:0',
                               '-strip', '-quality', '85', 
                               '-interlace', 'Plane', 
                               '-colorspace', 'RGB',
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
            console.log(("There was an error with" + nodeStatsArray.name).error); 
            next();
        });

        walker.on("end", function () {
            console.log("\nAll JPG files compressed\n");
            resolve();
        });
    });
}


function compressPNG(){
    
    console.log(('\n## Compressing PNG files \n').mainOptionStep);

    //gets all png files in builddir 
    
    //BIN_DIR has a trailing slash, removes it for the walker function
    var walker = walk.walk(BIN_DIR);    
    
    walker.on("file", function (root, fileStats, next) {
                        
        var filename = path.join(root, fileStats.name);        
        
        if(filename.includes(".png")){

            console.log((filename.replace(ROOT_DIR, "")).verbose);

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
        console.log(("There was an error with" + nodeStatsArray.name).error); 
        next();
    });

    walker.on("end", function () {
        console.log("\nAll PNG files compressed\n");
    });      
}





