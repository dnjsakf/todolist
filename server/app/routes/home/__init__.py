from flask import current_app as app, send_from_directory

@app.route("/")
@app.route("/<path:path>")
def home_index(path=None):
  return send_from_directory(app.static_folder, 'index.html')