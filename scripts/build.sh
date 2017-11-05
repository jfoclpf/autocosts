#!/bin/bash
set -e

cd ../build
rm -R -f *
cd ..
cp -R src/* build/

cd scripts/
php -f createLangFiles.php



