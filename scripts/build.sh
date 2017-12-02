#!/bin/bash
set -e

cd ../build

#make clean copy 
rm -R -f *
cd ..
cp -R src/* build/

#deletes unecessary language php files
rm build/countries/??.php

cd scripts/
php -f createLangFiles.php

#minification of html and js files

