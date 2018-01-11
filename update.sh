#!/bin/bash
set -e

<<<<<<< HEAD
=======
git pull --no-edit
>>>>>>> 59520d5b0d106b6f1e8e3965ed061f0ba840c815
npm update
git add -A
git commit -m "update"
git push origin HEAD
npm version patch
npm publish

