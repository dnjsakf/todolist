@echo off

REM 현재 폴더 절대경로 설정
pushd %~dp0
set BASEDIR=%CD%
popd

set NGINX_HOME=%BASEDIR%\.nginx
set NGINX_CONF=conf/win.nginx.conf

start %NGINX_HOME%\nginx -p %NGINX_HOME% -c %NGINX_CONF%
start pythonw twisted-app.py