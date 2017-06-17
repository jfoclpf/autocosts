#!/bin/bash

rm -fr build/
mkdir build/

mkdir build/form/
mkdir build/print_results/
mkdir build/validateForm/
mkdir build/css/
mkdir build/css/images/
mkdir build/js/

cp ../css/flags.css build/css/
cp ../css/main.css build/css/
cp ../images/flags24.png build/css/images/

cp ../js/coreFunctions.js build/js/
cp ../js/conversionFunctions.js build/js/
cp ../js/get_data.js build/js/
cp ../js/formFunctions.js build/js/
cp ../js/jquery/jquery.min.js build/js/

cp APP_specific_js/* build/js/

php -f index.php



