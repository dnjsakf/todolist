import os
from flask import (
  Blueprint
  , current_app as app
  , send_from_directory
)

bp = Blueprint(__name__, __name__, url_prefix="/downloads")

@bp.route('/', methods=["GET"])
@bp.route('/<path:path>', methods=["GET"])
@bp.route('/<path:path>/<string:filename>', methods=["GET"])
def index(path="", filename=None):
  target_path = os.path.join(app.static_folder, path)
  
  if filename is not None:
    return send_from_directory(directory=target_path, filename=filename)
    
  return "Not Found Files", 203