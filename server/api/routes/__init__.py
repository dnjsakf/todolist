from flask import current_app as app

from server.api.routes.downloads import bp as downloads
from server.api.routes.uploads import bp as uploads

app.register_blueprint(downloads) # /downloads
app.register_blueprint(uploads)   # /uploads