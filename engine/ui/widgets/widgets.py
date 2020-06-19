import logging
import threading

from .logging import QLogger

from PyQt5.QtWidgets import (
  QWidget,
  QGridLayout, QVBoxLayout,QHBoxLayout,
  QTextEdit, QPushButton
)
from engine.utils.events import TailEvent, NginxEvent, WSGIEvent

class MainWidget(QWidget):
  def __init__(self, parent=None):        
    super(QWidget, self).__init__(parent)
    
    logger = logging.getLogger("stdout")
    
    self.parent = parent
    self.logger = logger
    
    self.tail = TailEvent(parent, logger=logger)
    self.nginx = NginxEvent(logger=logger)
    self.wsgi = WSGIEvent(logger=logger)
    
    self.init_ui()
    
  def init_ui(self):
    self.main_layout = QGridLayout(self)
    
    # row-1
    self.setRunButtons(0, 0)
    
    # row-2
    self.setStdoutViewer(1, 0)
    self.setTailViewer(2, 0)
    
    self.setLayout(self.main_layout)
    
  def setStdoutViewer(self, row, col, rowSpan=1, colSpan=1):
    hbox = QHBoxLayout()
    
    logTextBox = QLogger(self.parent)
    logTextBox.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
    
    self.logger.addHandler(logTextBox)
    self.logger.setLevel(logging.DEBUG)

    hbox.addWidget(logTextBox.widget)
        
    self.main_layout.addLayout(hbox, row, col, rowSpan, colSpan)
    
  def setTailViewer(self, row, col, rowSpan=1, colSpan=1):
    hbox = QHBoxLayout()
    vbox_buttons = QVBoxLayout()
    
    trigger = threading.Event()
    filename = ".nginx/logs/app.access.log"
    
    logTextBox = QLogger( self.parent )
    logger = logging.getLogger(filename)
    logger.setLevel( logging.DEBUG )
    logger.addHandler( logTextBox )

    self.tail.init( filename, logger )

    btn_start = QPushButton("tail start")
    btn_start.clicked.connect(self.tail.start)
    
    btn_stop = QPushButton("tail stop")
    btn_stop.clicked.connect(self.tail.stop)

    vbox_buttons.addWidget(btn_start)
    vbox_buttons.addWidget(btn_stop)
    
    hbox.addLayout(vbox_buttons)
    hbox.addWidget(logTextBox.widget)
    
    self.main_layout.addLayout(hbox, row, col, rowSpan, colSpan)
    
  def setRunButtons(self, row, col, rowSpan=1, colSpan=1):
    vbox = QVBoxLayout()
    hbox_nginx = QHBoxLayout()
    hbox_wsgi = QHBoxLayout()
    
    btn_nginx_start = QPushButton("Start Nginx")
    btn_nginx_stop = QPushButton("Stop Nginx")

    btn_wsgi_start = QPushButton("Start WSGI")
    btn_wsgi_stop = QPushButton("Stop WSGI")

    btn_nginx_start.clicked.connect(self.nginx.start)
    btn_nginx_stop.clicked.connect(self.nginx.stop)
    
    btn_wsgi_start.clicked.connect(self.wsgi.start)
    btn_wsgi_stop.clicked.connect(self.wsgi.stop)
    
    hbox_nginx.addWidget(btn_nginx_start)
    hbox_nginx.addWidget(btn_nginx_stop)

    hbox_wsgi.addWidget(btn_wsgi_start)
    hbox_wsgi.addWidget(btn_wsgi_stop)

    vbox.addLayout( hbox_nginx )
    vbox.addLayout( hbox_wsgi )

    self.main_layout.addLayout(vbox, row, col, rowSpan, colSpan)