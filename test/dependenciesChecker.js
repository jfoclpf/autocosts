/* Depcheck is a tool for analyzing the dependencies in a project to see:
 how each dependency is used, which dependencies are useless,
 and which dependencies are missing from package.json */

console.log('Checking NPM dependencies...')

const depcheck = require('depcheck')
const path = require('path')
const fs = require('fs')
const colors = require('colors')

const commons = require(path.join(__dirname, '..', 'commons'))
commons.setRelease('test')

const directories = commons.getDirectories()
const packageJsonFile = path.join(directories.server.root, 'package.json')

const options = {
  ignorePatterns: [
    // files matching these patterns will be ignored
    'build/rasterTables.js',
    'bin/*'
  ],
  ignoreMatches: [] // ignore these npm dependencies
}

const rawdata = fs.readFileSync(packageJsonFile, 'utf8')

// we want to ignore npm dependencies which are needed to the client side,
// and which depcheck cannot detect its usage because "require()" nor "import" are not used in client side
let npmFilesToImport
try {
  npmFilesToImport = JSON.parse(rawdata).npmFilesToImport
} catch (err) {
  console.error(err)
  console.error(colors.red('\n package.json has syntax errors\n'))
  console.error(rawdata)
  process.exit(1)
}

for (const npmPackage in npmFilesToImport) {
  options.ignoreMatches.push(npmPackage)
}

depcheck(directories.server.root, options)
  .then((unused) => {
    if (unused.dependencies.length || unused.devDependencies.length ||
        !commons.isEmptyObject(unused.missing) ||
        !commons.isEmptyObject(unused.invalidFiles) ||
        !commons.isEmptyObject(unused.invalidDirs)
    ) {
      console.error('Some dependencies issues found:')
      console.error('unused dependencies: ', unused.dependencies)
      console.error('unused devDependencies: ', unused.devDependencies)
      console.error('missing dependencies (dependencies missing in `package.json`): ', unused.missing)
      console.error('invalidFiles (files that cannot access or parse): ', unused.invalidFiles)
      console.error('invalidDirs (directories that cannot access): ', unused.invalidDirs)

      process.exitCode = 1
    } else {
      console.log('NPM Dependencies checked OK\n'.green)
      process.exitCode = 0
    }
  })
