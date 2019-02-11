/* PhantomJS script (NOT a NODE script, but PhantomJS script)
which converts table costs HTML files into correspondent table costs jpg images */

/* global phantom */

var fs = require('fs')
var system = require('system')
var args = system.args

/*
  args[1] => the full path of the html file to be rasterized
  args[2] => the full path of the jpg file to where the rendered html file will be saved
*/

if (args.length !== 3) {
  console.log('ERROR: Bad length of arguments')
  phantom.exit(1)// exit with error
}

if (!fs.exists(args[1]) || args[1].split('.').pop() !== 'htm') { // eslint-disable-line
  console.log('args[1]: ' + args[1])
  console.log('ERROR: args[1] must be an existing htm file')
  phantom.exit(1)
}

if (args[2].split('.').pop() !== 'jpg') {
  console.log('args[2]: ' + args[2])
  console.log('ERROR: args[2] must have jpg extension')
  phantom.exit(1)
}

var htmlFileToBeRendered = args[1]
var jpgRenderedFile = args[2]

var page = require('webpage').create()
page.settings.localToRemoteUrlAccessEnabled = true

/* //for debug, triggered when the html file  gets css external files
page.onResourceRequested = function(requestData, request) {
    console.log('::loading', requestData['url']);
};
*/

page.onLoadFinished = function () {
  // console.log('Rendering file ' + htmlFileToBeRendered + ' to ' + jpgRenderedFile);
  page.render(jpgRenderedFile, { format: 'jpeg', quality: '100' })
  page.close()
  phantom.exit()
}

var content = fs.read(htmlFileToBeRendered)
page.content = content
