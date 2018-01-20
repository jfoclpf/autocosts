#!/bin/bash
cd "$(dirname "$0")"

rsync -avz --delete --exclude '.git*' --exclude 'rsync2work.sh' --exclude 'app/' --exclude 'build/' . jfolpf@autocosts.work:/var/www/autocosts.work/

ssh jfolpf@autocosts.work 'pkill -f /usr/local/bin/node'

#when no arguments, just runs using src/ folder
if [ $# -eq 0 ] 
then
    ssh jfolpf@autocosts.work 'cd /var/www/autocosts.work/src && /usr/local/bin/node index.js'
fi

#builds (compressing all the code, etc.) and runs on the build/ folder
if [ $1 = "build" ] 
then
    ssh jfolpf@autocosts.work 'cd /var/www/autocosts.work && ./build.sh -cesrtim'
    ssh jfolpf@autocosts.work 'cd /var/www/autocosts.work/build && /usr/local/bin/node index.js'
fi










