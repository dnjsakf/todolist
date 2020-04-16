from flask import Blueprint, render_template, send_file

app = Blueprint("/", __name__)

@app.route("/", methods=["GET"])
def home_index():

  return send_file('../client/dist/index.html')

@app.route("/test", methods=["GET"])
def home_test():
  return render_template("test.html")

bp_home = app