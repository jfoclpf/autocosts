#!/bin/bash

#checks other normal JS files

find ../src/js -name "*.js" ! -name "vfs_fonts*" ! -name "js_timer.js" ! -name "jAlert.js" -exec echo {} \; -exec jshint {} --config cfg_jshint.json \;

echo "All JS files processed for errors!"


