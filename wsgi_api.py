# api.py
import os
import sys
import getopt
import dotenv

from server.api import create_app

# Load Environment Variables
dotenv.load_dotenv(dotenv_path=".env")

# Set Constant Variables
ROOT_PATH = os.path.dirname(os.path.abspath(__file__))

# Set Arguments
kwargs = {
  "ROOT_PATH": ROOT_PATH,
  "STATIC_PATH": os.path.join(ROOT_PATH, "static")
}

# Create Flask APP
app = create_app(**kwargs)

if __name__ == '__main__':
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
        os.environ.putenv("FLASK_MODE", "development")
    
    # Run Server
    host = kwargs.get("host", None)
    port = kwargs.get("port", None)
    app.run(host=host, port=port)
    
  except getopt.GetoptError:
    print(sys.argv[0], "\n".join([
      "'-h, --host : Run server host.'",
      "'-p, --port : Run server port.'",
      "'-d, --development : Run server development mode.'"
    ]))
    sys.exit()