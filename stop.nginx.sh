#!/bin/bash

BASEDIR=$(pwd)
NGINX_HOME=$BASEDIR/.nginx
NGINX_CONF=$NGINX_HOME/conf/nginx.conf
TWISTED_FILE=$BASEDIR/twisted-app.py
APP_PID=`ps -ef | grep python | grep $TWISTED_FILE | grep -v grep | awk '{print $2}'`

if [ -n "$APP_PID" ]; then
  echo "Twisted stopping... ${APP_PID}"
  
  kill ${APP_PID}
else
  echo "Twisted is already stopped."
fi

echo "Nginx stopping..."
sudo nginx -s stop -p $NGINX_HOME -c $NGINX_CONF

echo "All stopped"
