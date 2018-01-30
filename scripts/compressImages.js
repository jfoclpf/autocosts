/*Script to compress and optimize for the web page,
all the images, namely JPG and PNG images */

const im      = require('imagemagick');
const path    = require('path'); 
const fs      = require('fs');
const commons = require('../commons.js');

//Root directory of the main project
var ROOT_DIR = path.resolve(__dirname, '../')  + "/";
//Main directories got from commons
var Dirs = commons.getDirs(ROOT_DIR);

var BUILD_DIR = Dirs.BUILD_DIR;
console.log("BUILD_DIR: ", BUILD_DIR);

//gets all jpg files in builddir 
commons.find(BUILD_DIR, ".jpg", function(filename){
    
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
            fs.renameSync(filename + '.min', filename);
        });
});


//gets all png files in builddir 
commons.find(BUILD_DIR, ".png", function(filename){
    
    console.log(filename.replace(ROOT_DIR, ""));
    
    var params = [ filename,
                   '-strip',
                   filename + '.min'];
            
    im.convert(params, function(err, stdout){
            if (err) throw err;
            fs.unlinkSync(filename);
            fs.renameSync(filename + '.min', filename);
        });
});







