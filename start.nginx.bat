@echo off

REM 현재 폴더 절대경로 설정
pushd %~dp0
set BASEDIR=%CD%
popd

set NGINX_HOME=%BASEDIR%\.nginx
set NGINX_CONF=%NGINX_HOME%\conf\win.nginx.conf

start %NGINX_HOME%\nginx -c %NGINX_CONF% -p %NGINX_HOME%
start pythonw twisted-app.py