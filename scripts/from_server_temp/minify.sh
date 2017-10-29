#!/bin/bash

if [ -z "$1" ]
then
  echo "Error. No input!"
  exit
fi

if [ $1 = "work" ] || [ $1 = "prod" ]
then
  echo "Aceptable answer"
else
  echo "Error in input"
  exit
fi

if [ $1 = "prod" ]
then
  dir="public_html"
fi

if [ $1 = "work" ]
then
  dir="work"
fi

PATH=~/node/bin:$PATH
PATH=~/composer/vendor/bin:$PATH
PATH=~/vendor/phantomjs/bin:$PATH

cd ~/$dir/
echo "Minifying files in /"
rm *.min 2> /dev/null
for f in *.js; do echo $f;  minifyjs $f > $f.min; rm $f; mv $f.min $f; echo 'Minification complete of '$f';'; done

cd ~/$dir/css
echo "Minifying files in /css"
for f in *.css; do minify -o $f $f; echo 'of '$f';'; done

cd ~/$dir/js
echo "Minifying files in /js"
rm *.min 2> /dev/null 
for f in *.js; do echo $f;  minifyjs $f > $f.min; rm $f; mv $f.min $f; echo 'Minification complete of '$f';'; done

cd ~/$dir/js/core
echo "Minifying files in /js/core"
rm *.min 2> /dev/null
for f in *.js; do echo $f; minifyjs $f > $f.min; rm $f; mv $f.min $f; echo 'Minification complete of '$f';'; done

cd ~/$dir/js/pdf
echo "Minifying files in /js/pdf"
rm *.min 2> /dev/null
minifyjs generatePDF.js > temp.min; rm generatePDF.js; mv temp.min generatePDF.js; echo 'Minification complete of generatePDF.js';

cd ~/$dir/js/jAlert
echo "Minifying files in /js/jAlert"
rm *.min 2> /dev/null
for f in *.js; do echo $f; minifyjs $f > $f.min; rm $f; mv $f.min $f; echo 'Minification complete of '$f';'; done

cd ~/$dir/google
echo "Minifying files in /google"
rm *.min 2> /dev/null
declare -a arr=("canvg.js" "rgbcolor.js" "g-recaptcha.js")
for f in "${arr[@]}"; do echo $f; minifyjs $f > $f.min; rm $f; mv $f.min $f; echo 'Minification complete of '$f';'; done

cd ~/$dir/db_stats
echo "Minifying files in /db_stats"
rm *.min 2> /dev/null
declare -a arr=("show_average_table.js" "statsFunctions.js")
for f in "${arr[@]}"; do minifyjs $f > $f.min; rm $f; mv $f.min $f; echo 'Minification complete of '$f';'; done

echo "Creating HTML stats tables"
cd ~/$dir/db_stats
php -f generate_tables.php
echo "Rasterizing HTML stats tables"
cd ~/$dir/db_stats
phantomjs raster_tables.js

echo "Minifying files in /db_stats/tables"
cd ~/$dir/db_stats/tables
rm *.min 2> /dev/null
for f in *.html; do html-minifier --collapse-whitespace -o $f.min $f; rm $f; mv $f.min $f; echo 'Minification complete of '$f';'; done

echo "All files processed!"
