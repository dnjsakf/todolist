## Nginx + Flask + GraphQL + MongoDB + React

## 1. install
1) **Download**
```
$ git clone https://github.com/dnjsakf/todolist.git -o todolist
$ cd todolist
```
#
2) **Nginx install on Windows**
- [nginx-1.19.0 download](http://nginx.org/download/nginx-1.19.0.zip)
```
- decompress .zip
- move a file 'nginx.exe' to 'todolist'.nginx'
```
#
3) **Nginx install on Linux(Centos)**
```
$ yum install nginx
```
#
4) **Nginx install on OSX**
```
$ brew install nginx
```
#
5) **Python Package Install**
```
$ pip install -r requirements.txt
```
#
6) **Node Package Install**
```
$ npm install
```
#
## 2. settings
1) **Create Virtual Environment**
```
$ virtualenv .venv
```
#
2) **Set permission on Linux/OSX**
```
$ chmod +x start.nginx.sh
$ chmod +x stop.nginx.sh
```




gunicorn -c guni-api.py api:app -D
gunicorn -c guni-app.py app:app -D

kill $(head -1 /tmp/gunicorn-api.pid)
kill $(head -1 /tmp/gunicorn-app.pid)