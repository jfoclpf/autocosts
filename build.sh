#!/bin/bash
set -e

#checks for JS errors
printf "\n  Checking for JS errors in src/ \n\n"
cd scripts/
./jshint.sh
cd ../

#make clean copy from src/ to build/ 
cd build/
printf "\n  Making a clean copy in build/ \n"
rm -R -f *
cd ..
cp -R src/* build/

#generating HTML statistical tables
cd stats/
printf "\n  Extracts stat info from prod and create html tables \n\n"
php -f generate_tables.php prod
cd ..

cd build/
#minification of js files
printf "\n  Minifying JS files in build/ \n\n"
find js/ -type f \
    -name *.js ! -name "*.min.*" ! -name "vfs_fonts*" \
    -exec echo {} \; \
    -exec minify -o {}.min {} \; \
    -exec rm {} \; \
    -exec mv {}.min {} \;

#minification of CSS files
printf "\n  Minifying CSS files in build/ \n\n"
find css/ -type f \
    -name *.css ! -name "*.min.*" \
    -exec echo {} \; \
    -exec minify -o {}.min {} \; \
    -exec rm {} \; \
    -exec mv {}.min {} \;

#minification of html files
printf "\n  Minifying HTML files in build/ \n\n"
find . -name "*.html" \
    -type f \
    -exec echo {} \;  \
    -exec html-minifier --collapse-whitespace --remove-comments --remove-optional-tags -o {}.min {} \; \
    -exec rm {} \; \
    -exec mv {}.min {} \;

#minification of json files
printf "\n  Minifying JSON files in build/ \n\n"
cd countries/

for i in *.json; do
    [ -f "$i" ] || break
    echo $i;
    json-minify $i > $i.min;
    rm $i;
    mv $i.min $i;
done




