from flask import Blueprint, render_template, send_file, send_from_directory

app = Blueprint("/", __name__)

@app.route("/", methods=["GET"])
@app.route("/<path:path>")
def home_index(path=None):
  return send_from_directory('../../client/dist', 'index.html')

bp_home = app