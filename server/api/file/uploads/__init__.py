import os
import psutil
import werkzeug

from flask import (
  request, redirect, url_for
  , send_from_directory
  , current_app as app
)


def check_save_path( save_path ):
  if not os.path.isdir( save_path ):
    os.makedirs( save_path )
  return save_path

@app.route("/uploads", methods=["GET","POST"])
def uploads_index():
  save_path = check_save_path(app.config["FILE_UPLOAD_PATH"])
  files = os.listdir( save_path )
  
  app.logger.info(files)
  
  html = [
  '''
  <form id="multiple_upload" method="POST" action="/static/upload" enctype="multipart/form-data">
    <input type="file" name="multiple_file" multiple="multiple">
    <button>static upload</button>
  </form>
  ''',
  '''
    <form id="multiple_upload" method="POST" action="/stream/upload" enctype="multipart/form-data">
    <input type="file" name="multiple_file" multiple="multiple">
    <button>streaming upload</button>
  </form>
  '''
  ]
  
  html.append('<ul>')
  for f in files:
    html.append( '<li><a href="/static/{}">{}</a></li>'.format( f, f ) )
  html.append('</ul>')

  return "\n".join( html )
  
@app.route("/static/upload", methods=["POST"])
def do_statc_upload():
  save_path = check_save_path(app.config["FILE_UPLOAD_PATH"])
  app.logger.info('save to ===> '+str(save_path))
    
  app.logger.info('start receive request')
  upload_files = request.files.getlist("multiple_file")
  app.logger.info('end receive request')
  
  for f in upload_files:
    app.logger.info("start save => " + f.filename)
    f.save(os.path.join(save_path, werkzeug.utils.secure_filename(f.filename)))
    app.logger.info("end save => " + f.filename)
    
  process = psutil.Process(os.getpid())
  
  app.logger.info("memory usage: %.1f MiB" % (process.memory_info().rss / (1024.0*1024.0)))
  
  return redirect(url_for('uploads_index'))

  
@app.route('/stream/upload', methods = ['POST'])
def do_stream_upload():
  save_path = check_save_path(app.config["FILE_UPLOAD_PATH"])
  app.logger.info('save to ===> '+str(save_path))
  
  app.logger.info('start receive request')
  def custom_stream_factory(total_content_length, filename, content_type, content_length=None):
    app.logger.info("start save => " + filename)    
    return open(os.path.join(save_path, filename), 'wb+')
  app.logger.info('end receive request')
  
  stream, form, files = werkzeug.formparser.parse_form_data(request.environ, stream_factory=custom_stream_factory)
  stream_size = 0
  
  # Generate
  app.logger.info('start streaming')
  for f in files.values():
    app.logger.info(" ".join(["end save args=", f.name, "submitted as", f.filename, "to ", f.stream.name]))
    stream_size += os.path.getsize( f.stream.name )
  app.logger.info('end streaming')
  
  process = psutil.Process(os.getpid())
  
  app.logger.info("memory usage: %.1f MiB" % (process.memory_info().rss / (1024.0*1024.0)))
  app.logger.info("total size: %.1f MiB" % (stream_size / (1024.0*1024.0)))

  return redirect(url_for('uploads_index'))