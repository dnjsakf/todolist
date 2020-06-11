@echo off

REM 현재 폴더 절대경로 설정
pushd %~dp0
set BASEDIR=%CD%
popd

REM nginx
set NGINX_HOME=%BASEDIR%\.nginx
set NGINX_CONF=%NGINX_HOME%\conf\win.nginx.conf


REM 명령어 검색
set PID=
set KEYWORD=twisted-app.py

set CONDITION=pythonw%%^%KEYWORD%^%%
set CMD="wmic process where "commandline like '%CONDITION%'" get caption,processid /format:csv"

FOR /F "skip=2 tokens=2-3 delims=," %%A IN ( '%CMD%' ) DO (
  echo "%%A" "%%B"
  call :set_pid "%%A" "%%B"
)

if defined PID (
  taskkill /F /PID %PID%
) else (
  echo No Process: %KEYWORD%
)

%NGINX_HOME%\nginx -s stop -p %NGINX_HOME% -c %NGINX_CONF%

goto :eof
:set_pid
if NOT ["%~2"] EQU [""] (
  set PID=%~2
)