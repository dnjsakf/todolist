import time
import threading

class Tailer(object):
  def __init__(self, file=None, end=False, *args, **kwargs):
    self.args = args
    self.kwargs = kwargs
    
    self.running = threading.Event()
    self.newlines = [ '\n', '\r', '\r\n' ]
    self.file = file
    
    if end:
      self.seek_last()
  
  def setFile(self, file):
    self.file = file

  def seek(self, offset, whence=0):
    self.file.seek(offset, whence)
    
  def seek_first(self):
    self.seek(0,1)
    
  def seek_last(self):
    self.seek(0,2)
  
  def follow(self, delay=1.0):
    self.running.set()
    
    tailling = True
    
    while self.running.isSet():
      pivot = self.file.tell()
      line = self.file.readline()
      
      if line:
        if tailling and line in self.newlines:
          tailling = False
          continue
          
        if line[-1] in self.newlines:
          line = line[:-1]
          if line[-1:] == '\r\n' and '\r\n' in self.newlines:
            line = line[:-1]
            
        tailling = False
        yield line
      
      else:
        trailing = True
        self.file.seek(pivot)
        time.sleep(delay)
    
  def stop(self):
    self.running.clear()
    self.file.close()

def follow(file, delay=1.0):
  tailer = Tailer(file, end=True)
  return ( tailer.follow( delay ), tailer.stop )
