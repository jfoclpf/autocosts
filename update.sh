#!/bin/bash
set -e

git pull --no-edit
npm update
git add -A
git commit -m "update"
git push origin HEAD
npm version patch
npm publish

