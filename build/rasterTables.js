/*PhantomJS script (NOT a NODE script, but PhantomJS script)
which converts table costs HTML files into correspondent table costs jpg images*/

var fs = require('fs');

//PhantomJS can't know exactly the directory of this file, 
//since the directories are always relative to directory where it is called (root directory)
//console.log(fs.workingDirectory);
//console.log(fs.absolute("."));
//phantom.exit(0);

var BIN_DIR     = fs.absolute("bin/");
console.log("BIN_DIR: " + BIN_DIR);
var TABLES_DIR  = fs.absolute("bin/tables/");
console.log("The tables HTML files with .hbs extension MUST already be in: " + TABLES_DIR);

var css_file = fs.absolute(BIN_DIR + "css/") + "tables.css";
console.log("The CSS main file is in: " + css_file);

// Get a list all files in directory
var list = fs.list(TABLES_DIR);
// Cycle through the list and creates array of pages
//console.log(list);

function render_pages(){
    var pages=[], content, img_fname;
    for(var x = 0, n = 0; x < list.length; x++){
      // Note: If you didn't end path with a slash, you need to do so here.
        var file_name = list[x];
        var file_path = TABLES_DIR + file_name;
        //it must be a file with the format of XX.html
        if(fs.isFile(file_path) && (file_name.split("."))[1]=="html" ){
            //console.log("Creating page");

            pages[n] = require('webpage').create();
            pages[n].settings.localToRemoteUrlAccessEnabled = true;

            content = fs.read(TABLES_DIR + file_name);
            if(n==1)console.log("\n\n\n\n"+content+"\n\n\n\n");
            pages[n].content = content;

            img_fname = (file_name.split("."))[0]+".jpg";
            console.log('Rendering file ' + file_name + ' to ' + img_fname);
            pages[n].render(TABLES_DIR + img_fname, {format: 'jpeg', quality: '100'});
            pages[n].close();

            n++;
        }
    }
    if (n==0){
        console.log("Error: no HTML files processed in folder " + TABLES_DIR);
    }
}

render_pages();
phantom.exit();


