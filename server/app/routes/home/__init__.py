from flask import (
  Blueprint
  , current_app as app
  , send_from_directory
)

bp = Blueprint(__name__, __name__, url_prefix="/home")

@bp.route("/", methods=["GET"])
@bp.route("/<path:path>", methods=["GET"])
def home_index(path=None):
  return "HOME"
