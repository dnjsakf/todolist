from flask import Blueprint, render_template, send_file, send_from_directory
from werkzeug.utils import secure_filename

app = Blueprint("/upload", __name__)

@app.route("/upload", methods=["GET","POST"])
def home_index():
  print('hi')

  return "<h5>hi</h5>"

bp_upload = app