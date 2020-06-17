import os
import psutil
import werkzeug

from flask import (
  Blueprint
  , current_app as app
  , request, redirect, url_for
  , send_from_directory
)

from server.api.routes.downloads import bp as bp_downloads

bp = Blueprint(__name__, __name__, url_prefix="/uploads")

FILE_UPLOAD_PATH = app.static_folder

def check_path( target_path ):
  type = None
  if os.path.isfile( target_path ):
    type = 'file'
  elif os.path.isdir( target_path ):
    type = 'directory'
  else:
    type = 'directory'
    os.makedirs( target_path )
    
    bp.logger.info("mkdirs", target_path)  
    
  return ( type, target_path )

def get_dir_list( target_path ):
  if os.path.isdir( target_path ):
    return os.listdir( target_path )
  return None

@bp.route("/", methods=["GET"])
@bp.route("/<path:path>", methods=["GET"])
def index(path=""):
  target_path = os.path.join(FILE_UPLOAD_PATH, path)
  
  if os.path.isfile( target_path ):
    return redirect(url_for("{}.index".format(bp_downloads.name), path=path))
    
  files = get_dir_list( target_path )
  
  static_url = [ bp.url_prefix, "static" ]
  stream_url = [ bp.url_prefix, "stream" ]
  href_url = [ '/uploads' ]
  
  if path != "":
    static_url.append( path )
    stream_url.append( path )
    href_url.append( path )
  
  html = [
  '''
  <form id="multiple_upload" method="POST" action="{action}" enctype="multipart/form-data">
    <input type="file" name="multiple_file" multiple="multiple">
    <button>static upload</button>
  </form>
  '''.format(action="/".join( static_url )),
  '''
    <form id="multiple_upload" method="POST" action="{action}" enctype="multipart/form-data">
    <input type="file" name="multiple_file" multiple="multiple">
    <button>streaming upload</button>
  </form>
  '''.format(action="/".join( stream_url ))
  ]
  
  html.append('<ul>')
  for f in files:
    html.append( '<li><a href="{href}/{filename}">{filename}</a></li>'.format(href="/".join(href_url), filename=f) )
  html.append('</ul>')

  return "\n".join( html )

  
@bp.route("/static", methods=["POST"])
@bp.route("/static/<path:path>", methods=["POST"])
def upload_static(path=""):
  app.logger.info('static save to ===> '+str(os.path.join(FILE_UPLOAD_PATH, path)))
    
  app.logger.info('start receive request')
  upload_files = request.files.getlist("multiple_file")
  app.logger.info('end receive request')
  
  for f in upload_files:
    app.logger.info("start save => " + f.filename)
    f.save(os.path.join(FILE_UPLOAD_PATH, path, werkzeug.utils.secure_filename(f.filename)))
    app.logger.info("end save => " + f.filename)
    
  process = psutil.Process(os.getpid())
  
  app.logger.info("memory usage: %.1f MiB" % (process.memory_info().rss / (1024.0*1024.0)))
  
  return redirect(url_for('{}.index'.format(bp.name), path=path))

  
@bp.route('/stream', methods=["POST"])
@bp.route("/stream/<path:path>", methods=["POST"])
def upload_stream(path=""):
  app.logger.info('stream save to ===> '+str(os.path.join(FILE_UPLOAD_PATH, path)))
  
  app.logger.info('start receive request')
  def custom_stream_factory(total_content_length, filename, content_type, content_length=None):
    app.logger.info("start save => " + filename)    
    return open(os.path.join(FILE_UPLOAD_PATH, path, filename), 'wb+')
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

  return redirect(url_for('{}.index'.format(bp.name), path=path))