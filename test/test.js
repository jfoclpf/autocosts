/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/*
  This script inserts thousands of user inputs stored on test/users_insertions.json into the core calculator function
  and checks JS files syntax using jshint, and checks also standard rules using standardJS
  on all the .js files stored in directory /src
*/

const path = require('path')
// this should be here on the beginning to set global environments
const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')
const directories = commons.getDirectories()

// no need here to set release to test because it was done with "commons.setRelease('test')"
commons.runNodeScriptSync(path.join(directories.server.root, 'test/validateCalculator.js'))
commons.runNodeScriptSync(path.join(directories.server.root, 'test/validateJs.js'))
commons.runNodeScriptSync(path.join(directories.server.root, 'test/validateHtml.js'))
commons.runNodeScriptSync(path.join(directories.server.root, 'test/validateHtmlW3C.js'))
commons.runNodeScriptSync(path.join(directories.server.root, 'test/validateCss.js'))
commons.runNodeScriptSync(path.join(directories.server.root, 'test/testApi.js'))
commons.runNodeScriptSync(path.join(directories.server.root, 'test/googleLighthouse.js'))
commons.runNodeScriptSync(path.join(directories.server.root, 'build.js'), ['-cimst'])

console.log('All tests ran OK'.green)
process.exitCode = 0 // exit with success
