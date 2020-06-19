import tailer
import logging
import traceback

from .commands import Command
from .multithreading import Worker

from PyQt5.QtCore import QProcess

class MainEvent(object):
  def __init__(self, *args, **kwargs):
    self.args = args
    self.kwargs = kwargs
    
    logger = logging.getLogger(self.__class__.__name__)    
    self.logger = kwargs.get("logger", logger)
    
  def start(self):
    pass
    
  def stop(self):
    pass


class TailEvent(MainEvent):
  def __init__(self, *args, **kwargs):
    super(TailEvent, self).__init__(*args, **kwargs)
    
  def start(self, filename, logger, trigger):
    self.logger.info( '[tail][{}]'.format( filename ) )
    
    def handler(log_file, progress_callback):
    
      f = open(log_file)
      for line in tailer.follow(f):
        logger.info("[tail.close]")
        break
          
        progress_callback.emit( line )
      logger.info("[tail][break]")
          
      return True
    
    worker = Worker(handler, log_file=filename)
    worker.signals.result.connect(lambda retval: self.logger.info('[tail][retval] {}'.format(retval)) )
    worker.signals.finished.connect(lambda: self.logger.info('[tail][finish]') )
    worker.signals.progress.connect(lambda msg: logger.info(msg) )
    
    self.parent.threadpool.start(worker)
    

class NginxEvent(MainEvent):
  def __init__(self, *args, **kwargs):
    super(NginxEvent, self).__init__(*args, **kwargs)
    
    self.command = Command().nginx
  
  def start(self):
    self.logger.info( '[nginx.start][start]' )
    self.logger.debug( '[nginx.start.test][start]' )
    
    cmd_test = self.command.copy()
    cmd_test.extend([ "-t" ])
    retval = QProcess.startDetached( cmd_test[0], cmd_test[1:] )
    
    self.logger.debug( '[nginx.start.test][cmd] {}'.format( " ".join(cmd_test) ) )
    self.logger.debug( '[nginx.start.test][retval] {}'.format( retval ) )
    self.logger.debug( '[nginx.start.test][finish]' )
    
    cmd = self.command.copy()
    retval = QProcess.startDetached( cmd[0], cmd[1:] )
    
    self.logger.debug( '[nginx.start][cmd] {}'.format( " ".join(cmd) ) )
    self.logger.debug( '[nginx.start][retval] {}'.format( retval ) )
    self.logger.info( '[nginx.start][finish]' )
    
  def stop(self):
    self.logger.info( '[nginx.stop][start]' )
    
    cmd = self.command.copy()
    cmd.extend([ "-s", "stop" ])
    retval, pid = QProcess.startDetached( cmd[0], cmd[1:], "." )
    
    self.logger.debug( '[nginx.stop][cmd] {}'.format( " ".join(cmd) ) )
    self.logger.debug( '[nginx.stop][retval] {}'.format( retval ) )
    self.logger.debug( '[nginx.stop][pid] {}'.format( pid ) )
    self.logger.info( '[NGINX.stop][finish]' )

    
    
class WSGIEvent(MainEvent):
  def __init__(self, *args, **kwargs):
    super(WSGIEvent, self).__init__(*args, **kwargs)
    
    self.command = Command().wsgi
    self.kill_command = Command().kill
  
  def init_command(self):
    if self.system == "Windows":
      self.command = [
        ".nginx/nginx",
        "-p", ".nginx",
        "-c", "conf/win.nginx.conf"
      ]
    elif self.system == "Darwin":
      self.command = [
        "sudo",
        "nginx",
        "-p", ".nginx",
        "-c", "conf/nginx.conf"
      ]
    else:
      self.command = []
  
  def start(self):
    self.logger.info( '[wsgi.start][start]' )
    
    cmd = self.command.copy()
    retval, pid = QProcess.startDetached( cmd[0], cmd[1:], "." )
    
    self.logger.info( '[wsgi.start][cmd] {}'.format( " ".join(cmd) ) )
    self.logger.info( '[wsgi.start][retval] {}'.format( retval ) )
    self.logger.info( '[wsgi.start][pid] {}'.format( pid ) )
    self.logger.info( '[wsgi.start][finish]' )

    return (retval, pid )
    
  def stop(self, pid):
    self.logger.info( '[wsgi.stop][start][{}]'.format(pid) )
    
    cmd = self.kill_command.copy()
    cmd.extend([ "/PID", str(pid) ])
    
    retval = QProcess.startDetached( cmd[0], cmd[1:] )
    
    self.logger.info( '[wsgi.stop][cmd] {}'.format( " ".join(cmd) ) )
    self.logger.info( '[wsgi.stop][retval] {}'.format( retval ) )
    self.logger.info( '[wsgi.stop][finish]' )
    


class MainEvents(object):
  def __init__(self, *args, **kwargs):
    self.args = args
    self.kwargs = kwargs
    
    self.logger = kwargs.get("logger", logging.getLogger("MainEvents"))
