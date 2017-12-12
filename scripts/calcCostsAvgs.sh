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

cd ~/$dir/db_stats
php -f populate_country_specs_db.php
~/node/bin/node get_average_from_db.js


