#!/bin/bash
set -e

PATH=$(npm bin):$PATH

#goes to the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

if [ $# -eq 0 ]
then
    printf "Missing options!\n"
    printf "(run $0 -h for help) \n\n"        
    exit 0
fi

#string with available options
optstring=':hcesrtim :A u: l:'

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
            printf "   -A     runs [a]ll previous options                         \n"
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

while getopts "$optstring" OPTION; 
do
    case "$OPTION" in

        A)  
            #runs all options
            ./build.sh -cesrtim -l $RELEASE
            exit
            ;;
        
    esac
done

OPTIND=1

#this needs to be done before the "Refreshes statistical costs DB"
while getopts "$optstring" OPTION; 
do
    case $OPTION in

        s)
            cd scripts/
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
                
            cd scripts/
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
            cd scripts/
            printf "\n## Generating statistical tables \n"

            printf "\n    Extracts stat info from prod and create html tables \n\n"
            node generateTables.js $RELEASE

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
            #minification and concatenation of files
            cd scripts/
            printf "\n## Minify and concatenate, js, html/hbs, css and json files \n\n"

            node minifyFiles.js

            cd ../
            ;;

        i)
            #compress images
            cd scripts/
            printf "\n## Compress images, jpg and png files \n\n"
                  
            node compressImages.js

            cd ../
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

printf "\nProcessed \n\n"

