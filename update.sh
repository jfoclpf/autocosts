#!/bin/bash
set -e

npm update
git add -A
git commit -m "update"
git push origin HEAD
npm version patch
npm publish

