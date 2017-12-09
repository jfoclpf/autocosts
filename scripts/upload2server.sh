#!/bin/bash
set -e

if [ -z "$1" ]
then    
    dir="work"
else
    if [ $1 = "work" ] || [ $1 = "prod" ]
    then        
        dir=$1
    else
      echo "Invalid input! Define 'work' or 'prod'"
      exit
    fi
fi

echo "Upload to "$dir

cd ../build/

scp -P 2222 -r * jfolpf@autocosts.info:/home4/jfolpf/$dir

cd ../scripts/


