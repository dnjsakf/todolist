# app.py
import os
import sys
import getopt
import dotenv

from server.app import create_app

app = create_app()

if __name__ == '__main__':
  FILE_PATH = os.path.dirname(os.path.abspath(__file__))
    
  try:
    opts, etc_args = getopt.getopt(sys.argv[1:], "h:p:d", ["host", "port", "development"])
    
    # Make arguments
    kwargs = {}
    
    # Set arguments
    for opt, args in opts:
      if opt in ( "-h", "--host" ):
        kwargs["host"] = args
      elif opt in ( "-p", "--port" ):
        kwargs["port"] = args
      elif opt in ( "-d", "--development" ):
        kwargs["mode"] = "development"
      
    # Load dotenv    
    mode = kwargs.get("mode", "production")
    dotenv_file = ".env"
    if mode == "development":
      dotenv_file = ".dev.env"
    dotenv.load_dotenv(dotenv_path=os.path.join(FILE_PATH, dotenv_file))
    
    # Run Server
    host = kwargs.get("host", None)
    port = kwargs.get("port", None)
    app.run(host=host, port=port)
    
  except getopt.GetoptError:
    print(sys.argv[0], '-D,--development : Run server development mode.')
    sys.exit()