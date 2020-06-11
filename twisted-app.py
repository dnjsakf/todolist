from twisted.web.wsgi import WSGIResource
from twisted.internet import reactor
from twisted.web import server

from server.app import app as app_server
from server.api import app as api_server

app_resource = WSGIResource(reactor, reactor.getThreadPool(), app_server)
app_site = server.Site(app_resource)

api_resource = WSGIResource(reactor, reactor.getThreadPool(), api_server)
api_site = server.Site(api_resource)

reactor.listenTCP(3002, app_site)
reactor.listenTCP(3003, api_site)
reactor.run()