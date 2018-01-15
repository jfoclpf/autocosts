#!/bin/bash
cd "$(dirname "$0")"

rsync -avz --delete --exclude '.git*' --exclude 'rsync2work.sh' --exclude 'app/' --exclude 'build/' . jfolpf@autocosts.work:/var/www/autocosts.work/

ssh jfolpf@autocosts.work 'pkill -f /usr/local/bin/node'

ssh jfolpf@autocosts.work 'cd /var/www/autocosts.work/src && /usr/local/bin/node index.js'









