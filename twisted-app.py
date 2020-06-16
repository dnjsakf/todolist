from twisted.web.wsgi import WSGIResource
from twisted.internet import reactor
from twisted.web import server

from wsgi_app import app as wsgi_app
from wsgi_api import app as wsgi_api

app_resource = WSGIResource(reactor, reactor.getThreadPool(), wsgi_app)
app_site = server.Site(app_resource)

api_resource = WSGIResource(reactor, reactor.getThreadPool(), wsgi_api)
api_site = server.Site(api_resource)

reactor.listenTCP(3002, app_site)
reactor.listenTCP(3003, api_site)

reactor.run()
