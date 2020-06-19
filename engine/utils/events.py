import os
import logging
import traceback

from .commands import Command
from .multithreading import Worker
from .tailer import Tailer

from PyQt5.QtCore import QProcess


class MainEvent(object):
  def __init__(self, *args, **kwargs):
    self.args = args
    self.kwargs = kwargs
    self.cmd = Command()
    
    logger = logging.getLogger(self.__class__.__name__)
    self.logger = kwargs.get("logger", logger)
    
  def start(self):
    pass
    
  def stop(self):
    pass


class TailEvent(MainEvent):
  def __init__(self, parent, *args, **kwargs):
    super(TailEvent, self).__init__(*args, **kwargs)

    self.parent = parent

    self.tailer = None
    self.stop_event = None
    self.filename = None
    self.tail_logger = None

  def init(self, filename, logger):
    self.filename = filename
    self.tail_logger = logger
    
  def start(self):
    if self.tailer is None:
      self.logger.info( '[tail] follow {}'.format( self.filename ) )

      self.tailer = Tailer(open( self.filename ), end=True)

      self.worker = Worker(self.follow, filename=self.filename)
      self.worker.signals.result.connect(self.result)
      self.worker.signals.finished.connect(self.finished)
      self.worker.signals.print.connect(self.print)
      
      self.parent.threadpool.start(self.worker)

  def stop(self):
    if self.tailer is not None:
      self.tailer.stop()

  def follow(self, filename, print_callback):
    for line in self.tailer.follow():
      print_callback.emit( line )

    return True
  
  def print(self, msg):
    self.tail_logger.info( msg )

  def result(self, retval):
    self.logger.info('[tail][retval] {}'.format( retval )) 

  def finished(self):
    self.logger.info('[tail][finish]')
    self.tailer = None

    

class NginxEvent(MainEvent):
  def __init__(self, *args, **kwargs):
    super(NginxEvent, self).__init__(*args, **kwargs)

    self.pid = None
    self.is_running = False
  
  def start(self):
    if not self.is_running:
      cmd = self.cmd.nginx.copy()
      cmd.extend([ "-t" ])
      retval = QProcess.startDetached( cmd[0], cmd[1:] )
      
      if retval:
        cmd = self.cmd.nginx.copy()
        retval, pid = QProcess.startDetached( cmd[0], cmd[1:], "." )

        self.is_running = retval
        
        if retval:
          self.pid = pid
          self.logger.info( '[nginx] started!!! pid={}'.format( self.pid ) )
        else:
          self.logger.info( '[nginx] failed start. cmd={}'.format( cmd ) )
      else:
        self.logger.info( '[nginx] failed start. invalid configuration.' )
    else:
      self.logger.info( '[nginx] Already started. pid={}'.format( self.pid ) )
    
  def stop(self):
    if self.is_running:
      cmd = self.cmd.nginx.copy()
      cmd.extend([ "-s", "stop" ])
      retval = QProcess.startDetached( cmd[0], cmd[1:] )

      if retval:
        self.logger.info( '[wsgi] stopped!!! pid={}'.format( self.pid ) )
        self.pid = None
        self.is_running = False
      else:
        self.logger.info( '[wsgi] failed kill, pid={}'.format( self.pid ) )
      
    else:
      self.logger.info( '[nginx] Already stopped. pid={}'.format( self.pid ) )
      
    
    
class WSGIEvent(MainEvent):
  def __init__(self, *args, **kwargs):
    super(WSGIEvent, self).__init__(*args, **kwargs)

    self.pid = None
    self.is_running = False
  
  def start(self):
    if not self.is_running:
      cmd = self.cmd.wsgi.copy()
      retval, pid = QProcess.startDetached( cmd[0], cmd[1:], "." )

      self.is_running = retval
      if retval:
        self.logger.info( '[wsgi] Started!!! pid={}'.format( pid ) )
        self.pid = pid
      else:
        self.logger.info( '[wsgi] Failed start. cmd={}'.format( " ".join( cmd ) ) )
    else:
      self.logger.info( '[wsgi] Already running. pid={}'.format(self.pid) )
    
  def stop(self):
    if self.is_running and self.pid is not None:
      
      cmd = self.cmd.kill.copy()
      cmd.extend([ str(self.pid) ])
      
      retval = QProcess.startDetached( cmd[0], cmd[1:] )

      if retval:
        self.logger.info( '[wsgi] Stopped!!! pid={}'.format( self.pid ) )
        self.pid = None
        self.is_running = False
      else:
        self.logger.info( '[wsgi] Failed kill, pid={}'.format( self.pid ) )
    else:
      self.logger.info( '[wsgi] Already stopped. pid={}'.format( self.pid ) )
  