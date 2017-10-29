#!/bin/bash
set -e

cd ../build
rm -R *
cd ..
cp -R src/* build/

