var fs = require('fs');
var path = fs.absolute("./tables/");
console.log("The tables HTML files are in: " + path);
var css_file = fs.absolute("../css/") + "main.css";
console.log("The CSS main file is in: " + css_file);

// Get a list all files in directory
var list = fs.list(path);
// Cycle through the list and creates array of pages

function render_pages(){
    var pages=[], content, img_fname;
    for(var x = 0, n = 0; x < list.length; x++){
      // Note: If you didn't end path with a slash, you need to do so here.
        var file_name = list[x];
        var file_full_path = path + file_name;
        
        //it must be a file with the format of XX.html
        if(fs.isFile(file_full_path) && ((file_name.split("."))[0]).length==2 && (file_name.split("."))[1]=="html" ){
            //console.log("Creating page from "+file_name);
           
            pages[n] = require('webpage').create();
            pages[n].settings.localToRemoteUrlAccessEnabled = true;

            content = '';
            content += '<html><head>';
            content += '<link rel="stylesheet" href="file://'+ css_file + '" type="text/css" media="screen">';
            content += '</head><body>';
            content += fs.read(path + file_name);
            content += '</body></html>';
            pages[n].content = content;
            
            img_fname = (file_name.split("."))[0]+".jpg";
            console.log('Rendering file ' + file_name + ' to ' + img_fname);
            pages[n].render(path + img_fname, {format: 'jpeg', quality: '100'});
            pages[n].close();
            
            n++;
        }
    }
}

//upload CSS file for caching
var page_css = require('webpage').create();
var content_css = '<html><head><link rel="stylesheet" href="file://'+ css_file + '" type="text/css" media="screen"></head><body></body></html>';
page_css.content = content_css;
page_css.onLoadFinished = function(status) {
  console.log('CSS status file: ' + status);
  render_pages();
  phantom.exit();
};
