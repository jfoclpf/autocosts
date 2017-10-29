#!/bin/bash

cd /home4/jfolpf/
rm backup.tar.gz
tar --exclude='./backups' -cvpzf backup.tar.gz --one-file-system .
mv backup.tar.gz "./backups/backup.$(date +%F_%R).tar.gz"
cd backups/

