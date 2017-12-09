#!/bin/bash

#checks other normal JS files
cd ../src/js/
find . -name "*.js" ! -name "vfs_fonts*" ! -name "js_timer.js" ! -name "jAlert.js" -exec echo {} \; -exec jshint {} --config ../../scripts/cfg_jshint.json \;

echo "All JS files processed for errors!"


