import platform

class UinuxCommand(object):
  kill = [ "sudo", "kill" ]
  nginx = [
    "sudo",
    "nginx",
    "-p", ".nginx",
    "-c", "conf/nginx.conf"
  ]
  wsgi = [ "python", "twisted-app.py" ]

  
class WindowsCommand(object):
  kill = [ "taskkill", "/F" ]
  nginx = [
    ".nginx/nginx",
    "-p", ".nginx",
    "-c", "conf/win.nginx.conf"
  ]
  wsgi = [ "python", "twisted-app.py" ]

  
class Command(object):
  system = platform.system()
  
  def __init__(self):
    if self.system == "Drawin":
      self.__class__ = UinuxCommand
    elif self.system == "Windows":
      self.__class__ = WindowsCommand
      

def nginx():
  return Command().nginx
      
def wsgi():
  return Command().wsgi
  
def kill():
  return Command().kill