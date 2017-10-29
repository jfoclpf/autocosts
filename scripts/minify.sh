#!/bin/bash

cd ../build/

echo "Minifying files in the build/ folder"

#finds every *.js file and minifies it, replacing the file with the minified version
find . -name *.js -exec echo {} \; -exec minifyjs -m -i {} -o {}.min \; -exec rm {} \; -exec mv {}.min {} \;


