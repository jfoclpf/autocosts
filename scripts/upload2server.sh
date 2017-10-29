#!/bin/bash

if [ -z "$1" ]
then
  echo "Error. No input! Define 'work' or 'prod'"
  exit
fi

if [ $1 = "work" ] || [ $1 = "prod" ]
then
  echo "Aceptable answer"
else
  echo "Valid input! Define 'work' or 'prod'"
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

cd ../website

scp -P 2222 -r countries/ css/ db_stats/ google/ images/ js/ layout/ php/ jfolpf@autocosts.info:/home4/jfolpf/$dir

scp -P 2222 *.php favicon.ico jfolpf@autocosts.info:/home4/jfolpf/$dir

cd ../scripts/


