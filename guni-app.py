bind='unix:/tmp/gunicorn-app.sock wsgi-app:app'
workers=1
pidfile='/tmp/gunicorn-app.pid'

loglevel='info'
accesslog='logs/app.access.log'
errorlog='logs/app.error.log'
