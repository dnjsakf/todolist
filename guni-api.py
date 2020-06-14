bind='unix:/tmp/gunicorn-api.sock wsgi-api:app'
workers=1
pidfile='/tmp/gunicorn-api.pid'

loglevel='info'
accesslog='logs/api.access.log'
errorlog='logs/api.error.log'
