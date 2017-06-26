#!/bin/bash

git add -A

if [ -z "$1" ] 
then
    git commit
else
    git commit -m $1
fi

git-ftp push

git push origin master


