#!/bin/bash

#checks all the JS files of project with JShint

PATH=~/node/bin:$PATH

#gets php JS files with option XX on country
curl -o print_results.js -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://autocosts.work/js/print_results.js.php?country=XX
curl -o charts.js -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://autocosts.work/js/charts.js.php?country=XX
curl -o Globals.js -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://autocosts.work/js/Globals.js.php?country=XX
curl -o validateForm.js -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://autocosts.work/js/validateForm.js.php?country=XX

jshint --config /home4/jfolpf/my_scripts/cfg_jshint.json cfg_jshint.json print_results.js 
jshint --config /home4/jfolpf/my_scripts/cfg_jshint.json charts.js
jshint --config /home4/jfolpf/my_scripts/cfg_jshint.json Globals.js
jshint --config /home4/jfolpf/my_scripts/cfg_jshint.json validateForm.js

rm print_results.js
rm charts.js 
rm Globals.js
rm validateForm.js

#checks other normal JS files
cd ~/work
find . -type d \( -path ./db_stats/node_modules -o -path ./min -o -path ./js/jquery -o -path ./js/jAlert -o -path ./js/social -o -path ./result -o -path ./google \) -prune -o -not -path "./js/pdf/pdfmake.js" -name "*.js" -print0 | xargs -0 jshint --config /home4/jfolpf/my_scripts/cfg_jshint.json

echo "All files processed!"


