
./compressImages.sh  
./upload2server.sh prod
ssh -p 2222 jfolpf@autocosts.info /home4/jfolpf/my_scripts/cron.sh prod
ssh -p 2222 jfolpf@autocosts.info /home4/jfolpf/my_scripts/minify.sh prod


