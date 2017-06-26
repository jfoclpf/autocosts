#!/bin/bash

export PATH=$PATH:/usr/local/android-sdk
export PATH=$PATH:/usr/local/android-sdk/tools
export PATH=$PATH:/usr/local/android-sdk/tools/bin
export PATH=$PATH:/usr/local/android-sdk/platform-tools
export PATH=$PATH:/usr/local/android-sdk/build-tools
export JAVA_HOME=/usr/lib/jvm/jdk1.8.0_131/
export ANDROID_HOME=/usr/local/android-sdk/

cd "${0%/*}"

cd ..

cp -f css/flags.css app/autocosts/www/css/
cp -f css/main.css app/autocosts/www/css/
cp -f images/flags24.png app/autocosts/www/css/images/
cp -f js/coreFunctions.js app/autocosts/www/js/
cp -f js/conversionFunctions.js app/autocosts/www/js/
cp -f js/get_data.js app/autocosts/www/js/
cp -f js/formFunctions.js app/autocosts/www/js/
cp -f favicon.ico app/autocosts/www/

cd app/

cp -f APP_specific_js/* autocosts/www/js/
cp -f APP_specific.css autocosts/www/css/

php -f index.php HTML

chmod -R 777 autocosts/www/
