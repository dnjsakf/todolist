import os
import sys
import traceback

from PyQt5.QtCore import (
  Qt,
  pyqtSlot,
  pyqtSignal,
  QRunnable,
  QObject
)

class WorkerSignals(QObject):
  finished = pyqtSignal()
  error = pyqtSignal(tuple)
  result = pyqtSignal(object)
  print = pyqtSignal(str)
    
class Worker(QRunnable):
  def __init__(self, fn, *args, **kwargs):
    super(Worker, self).__init__()
    self.fn = fn
    self.args = args
    self.kwargs = kwargs
    
    self.signals = WorkerSignals()
    self.kwargs['print_callback'] = self.signals.print
      
  @pyqtSlot()
  def run(self):
    try:
      result = self.fn(*self.args, **self.kwargs)
    except:
      traceback.print_exc()
      exctype, value = sys.exc_info()[:2]
      self.signals.error.emit((exctype, value, traceback.format_exc()))
    else:
      self.signals.result.emit(result)
    finally:
      self.signals.finished.emit()