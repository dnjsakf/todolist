from server.app.routes.home import bp_home

def set_routes(app):
  app.register_blueprint(bp_home, url_prefix="/")
