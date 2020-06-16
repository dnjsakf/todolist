from flask import (
  send_from_directory
  , current_app as app
)

@app.route('/download', methods=['GET', 'POST'])
@app.route('/download/<path:filename>', methods=['GET', 'POST'])
def download(filename=None):
  save_path = check_save_path(app.config["FILE_UPLOAD_PATH"])
  
  if filename is not None:
    return send_from_directory(directory=save_path, filename=filename)
  else:
    return send_from_directory(directory=save_path)