#!/usr/bin/env bash
node node_modules/watchify/bin/cmd.js -v -t babelify js/main.js --debug -o bundle.js
