#!/bin/bash

cd "${0%/*}"

cd ..

scp -P 2222 -r countries/ css/ db_stats/ google/ images/ js/ layout/ php/ jfolpf@autocosts.info:/home4/jfolpf/work/

scp -P 2222 favicon.ico i.php sitemap.php .htaccess jfolpf@autocosts.info:/home4/jfolpf/work/

cd scripts/