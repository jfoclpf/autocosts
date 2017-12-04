#!/bin/bash
set -e

cd ../build

#make clean copy 
rm -R -f *
cd ..
cp -R src/* build/

#minification of html and js files

