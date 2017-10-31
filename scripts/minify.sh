#!/bin/bash

cd ../build/

echo "Minifying files in the build/ folder"

echo "Minifying JS files"
#finds every *.js file and minifies it, replacing the file with the minified version
find .  -type f \( -iname "*.js" ! -iname "jquery*" ! -iname "vfs_fonts*" ! -iname "pdfmake*" \) \
        -exec echo {} \; \
        -exec minifyjs -m -i {} -o {}.min \; -exec rm {} \; -exec mv {}.min {} \; \

echo "Minifying CSS files"
find . -type f -name *.css \
       -exec echo {} \; \
       -exec minify --output {}.min {} \; -exec rm {} \; -exec mv {}.min {} \; \
       
echo "Minifying HTML files"
find . -type f -name *.html \
       -exec echo {} \; \
       -exec html-minifier --remove-comments --collapse-whitespace -o {}.min {} \; \
       -exec rm {} \; -exec mv {}.min {} \; \

       



