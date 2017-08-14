#!/bin/bash

if [ -z "$1" ]
then
  echo "Error. No input!"
  exit
fi

if [ $1 = "work" ] || [ $1 = "main" ]
then
  echo "Aceptable answer"
else
  echo "Error in input"
  exit
fi

if [ $1 = "main" ]
then
  dir="public_html"
fi

if [ $1 = "work" ]
then
  dir="work"
fi


cd "${0%/*}"

cd ..

scp -P 2222 -r countries/ css/ db_stats/ google/ images/ js/ layout/ php/ jfolpf@autocosts.info:/home4/jfolpf/$dir/

scp -P 2222 GlobalSwitches.js favicon.ico i.php sitemap.php .htaccess jfolpf@autocosts.info:/home4/jfolpf/$dir/

cd scripts/


