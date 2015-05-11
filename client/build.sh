#!/usr/bin/env bash
node node_modules/browserify/bin/cmd.js js/main.js -t babelify -t envify -g uglifyify > bundle.js
node node_modules/less/bin/lessc css/main.less > css/main.css
