#!/bin/sh

# line endings must be \n, not \r\n !
echo -n "'use strict';" > ./env-config.js
echo -n "Object.defineProperty(window, '_wemiEnv_', {" >> ./env-config.js
echo -n "value: Object.freeze({" >> ./env-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env >> ./env-config.js
#awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ../.env >> ./env-config.js
echo -n "})," >> ./env-config.js
echo -n "writable: false," >> ./env-config.js
echo -n "configurable: false," >> ./env-config.js
echo -n "enumerable: false," >> ./env-config.js
echo -n "});" >> ./env-config.js
