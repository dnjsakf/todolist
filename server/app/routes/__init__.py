from flask import (
  current_app as app
  , send_from_directory
)
from server.app.routes.home import bp as home

# Set Root Route
@app.route("/", methods=["GET"])
@app.route("/<path:path>", methods=["GET"])
def index(path=None):
  return send_from_directory(app.static_folder, 'index.html')  


# Set Blueprints
app.register_blueprint( home )
