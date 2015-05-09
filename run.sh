#!/usr/bin/env bash

trap killgroup SIGINT

killgroup(){
  echo killing...
  kill 0
}

source server/venv/bin/activate
python server/app.py &

cd client
node server.js &

wait
