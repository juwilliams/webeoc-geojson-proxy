#!/bin/bash

# copy over example config if not exists
if [ ! -f ./config/config.js ]; then
	cp ./config/example-config.js ./config/config.js
	echo 'example-config copied to config/config.js'
fi

# create the cert dir
if [ ! -d ./cert/ ]; then
	mkdir ./cert/
fi

# create the localhost self signed cert
if [ ! -f ./cert/local.cert ]; then
	openssl req -x509 -newkey rsa:4096 -keyout ./cert/local.pem -out ./cert/local.cert -days 356 -nodes
fi

# install node dependencies
npm install

NOW=$(date +"%F")

# run the webserver
pkill -f node
#nohup node app.js >> webeoc-geojson-proxy-$NOW.log &
node app.js