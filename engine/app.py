import sys
import traceback

from PyQt5.QtWidgets import QApplication, QStyleFactory
from .ui import MainWindow

def execute( args ):
  app = QApplication( sys.argv )
  app.setStyle(QStyleFactory.create('Fusion'))
  
  win = MainWindow("메인 윈도우", posX=100, posY=400, width=500, height=500)
  win.show()
  
  try:
    exit = app.exec()
    
  except Exception as e:
    traceback.print_exc()
  else:
    print('close')
  finally:
    return exit