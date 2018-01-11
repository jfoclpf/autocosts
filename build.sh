#!/bin/bash
set -e

PATH=$(npm bin):$PATH

if [ $# -eq 0 ]
then
    printf "Missing options!\n"
    printf "(run $0 -h for help) \n\n"        
    exit 0
fi

#string with available options
optstring=':hcesrtim u: l:'

#if the -copy option is available execute it first
while getopts "$optstring" OPTION; 
do
    case $OPTION in

        c)                
            #make clean copy from src/ to build/ 
            if [ ! -d "build/" ]; then
                #if directory doesn't exist
                mkdir build/
            fi
            
            cd build/
            printf "\n## Making a clean copy from src/ to build/ \n\n"
            rm -R -f *
            cd ../
            cp -R src/* build/
            
            if [ -d "node_modules/" ]; then
                cp -R node_modules/ build/
            fi
            ;;

        h)
            printf "Usage: \n"
            printf "$0 -h \n"
            printf "$0 -etc \n"
            printf "$0 -c -m \n"
            printf "$0 -l prod -cesrtimu \n"
            printf "\n"
            printf "   -l     selects DB re[l]ease                              -l work or -l prod (work by default) \n"
            printf "\n"
            printf "   -c     makes [c]lean copy from src/ to build/            need to be done on the 1st time \n"
            printf "   -e     check for JS syntax [e]rrors in src/              with npm jshint \n"
            printf "   -s     creates DB with countries' [s]pecifcations        connection to DB \n"
            printf "   -r     [r]efreshes statistical costs DB                  connection to specifcations DB \n"
            printf "   -t     generate html and jpeg stats [t]ables in build/   based on statistical costs DB \n"
            printf "   -i     compress [i]mages, jpg and png files in build/    with ImageMagick \n"                        
            printf "   -m     [m]inify js, json, css and html files in build/   with npm: minifier, html-minifier, uglifycss and json-minify \n"
            printf "\n"
            printf "   -u     [u]upload to server                               -u work or -u prod (work by default) \n"
            printf "   -h     help (this output) \n\n"
            exit 0
            ;;                          
    esac
done

OPTIND=1

RELEASE="work" 
#get release
while getopts "$optstring" OPTION; 
do
    case "$OPTION" in

        l)
            l=${OPTARG}
            if [ "$l" == "prod" ]
            then
                RELEASE="prod"
            fi                                    
            ;;
        
    esac
done

echo "Chosen release: $RELEASE"


OPTIND=1

#this needs to be done before the "Refreshes statistical costs DB"
while getopts "$optstring" OPTION; 
do
    case $OPTION in

        s)
            cd stats/
            printf "\n## Creates DB with countries' specifcations \n"
            node setCountrySpecsDB.js $RELEASE
            cd ../
            ;;
        
    esac
done

OPTIND=1

#this needs to be done before the "generate html and jpeg stats [t]ables"
while getopts "$optstring" OPTION; 
do
    case $OPTION in
        
        r)
                
            cd stats/
            printf "\n## Refreshes statistical costs DB \n"
            node getAvgFromDB.js $RELEASE
            cd ../
            ;;
    esac
done

OPTIND=1

#if the -tables option is available execute it before minification so that html generated tables are minified
while getopts "$optstring" OPTION; 
do
    case $OPTION in

        t)
            #generating statistical tables
            cd stats/
            printf "\n## Generating statistical tables \n"

            printf "\n    Extracts stat info from prod and create html tables \n\n"
            php -f generateTables.php $RELEASE

            printf "\n    Renders html tables into jpge files \n\n"
            phantomjs rasterTables.js

            cd ../
            ;;                                             

    esac
done

OPTIND=1

while getopts "$optstring" OPTION; 
do
    case $OPTION in

        e)                
            #checks for JS errors
            cd jshint/

            printf "\n## Checking for JS errors in src/ \n\n"                        
            ./jshint.sh

            cd ../
            ;;

        m)
            #minification of js files
            cd build/
            printf "\n## Minifying files \n"

            printf "\n    Minifying JS files in build/ \n\n"
            find js/ -type f \
                -name *.js ! -name "*.min.*" ! -name "vfs_fonts*" \
                -exec echo {} \; \
                -exec uglifyjs -o {}.min {} \; \
                -exec rm {} \; \
                -exec mv {}.min {} \;

            #minification of CSS files
            printf "\n    Minifying CSS files in build/ \n\n"
            find css/ -type f \
                -name *.css ! -name "*.min.*" \
                -exec echo {} \; \
                -exec uglifycss --output {}.min {} \; \
                -exec rm {} \; \
                -exec mv {}.min {} \;

            #minification of html files
            printf "\n    Minifying HTML files in build/ \n\n"
            find . -path ./node_modules -prune -o -name "*.html" \
                -type f \
                -exec echo {} \;  \
                -exec html-minifier --collapse-whitespace --remove-comments --remove-optional-tags -o {}.min {} \; \
                -exec rm {} \; \
                -exec mv {}.min {} \;

            #minification of json files
            printf "\n    Minifying JSON files in build/ \n\n"
            cd countries/
            for i in *.json; do
                [ -f "$i" ] || break
                printf $i" ";
                json-minify $i > $i.min;
                rm $i;
                mv $i.min $i;
            done
            cd ../
            printf "\n"

            cd ../
            ;;

        i)
            #compress images
            cd build/images/
            printf "\n## Compress images, jpg and png files \n\n"

            for f in $(find . -type f -name '*.jpg')
            do 
                printf "Compressing $f \n"
                convert $f -sampling-factor 4:2:0 -strip -quality 85 -interlace Plane -colorspace RGB $f.min
                rm $f
                mv $f.min $f 
            done

            for f in $(find . -type f -name '*.png')
            do
                printf "Compressing $f \n"
                convert $f -strip $f.min
                rm $f
                mv $f.min $f
            done                        

            cd ../../
            ;;
    esac
done

OPTIND=1

UPLOAD_DIR="work" 
#get release
while getopts "$optstring" OPTION; 
do
    case "$OPTION" in

        u)
            u=${OPTARG}
            if [ "$u" == "prod" ]
            then
                UPLOAD_DIR="public_html"
            fi
            
            cd build/
            printf "\n## Upload to server on $UPLOAD_DIR/ directory \n\n"
            
            scp -P 2222 -r * jfolpf@autocosts.info:/home4/jfolpf/$UPLOAD_DIR
            
            cd ../          
            ;;
        
    esac
done

printf "\nProcessed without errors \n\n"

