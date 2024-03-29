#!/bin/bash

BASEDIR=$(pwd)
NGINX_HOME=$BASEDIR/.nginx
NGINX_CONF=conf/nginx.conf
TWISTED_FILE=$BASEDIR/twisted-app.py

echo "Nginx staring..."
sudo nginx -p $NGINX_HOME -c $NGINX_CONF -t
sudo nginx -p $NGINX_HOME -c $NGINX_CONF

echo "Twisted staring..."
source $BASEDIR/.venv/bin/activate
nohup python $TWISTED_FILE 1> /dev/null 2>&1 &

echo "All started"
