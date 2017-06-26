#!/bin/bash

cd ..

git add -A

if [ -z "$1" ] 
then
    git commit -m "update"
else
    git commit -m $1
fi

git-ftp push

git push origin master

cd scripts/