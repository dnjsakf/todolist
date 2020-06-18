import os
import sys
import tailer
import logging
import threading
import traceback

from PyQt5.QtCore import Qt, pyqtSlot, pyqtSignal, QProcess, QThreadPool, QRunnable, QObject, QThread
from PyQt5.QtWidgets import (
  QApplication, QWidget, QMainWindow, QDesktopWidget, QDialog, QAction, qApp,
  QPushButton, QToolTip, QLabel, QLineEdit, QComboBox, QMessageBox, QRadioButton,
  QVBoxLayout, QHBoxLayout, QGridLayout, QGroupBox, QCheckBox, QScrollArea,
  QSizePolicy, QHeaderView, QPlainTextEdit, QTextEdit,
  QAbstractItemView, QAbstractScrollArea,
  QStyleFactory
)
from PyQt5.QtGui import QIcon, QFont


# Ref https://www.learnpyqt.com/courses/concurrent-execution/multithreading-pyqt-applications-qthreadpool/
class WorkerSignals(QObject):
  finished = pyqtSignal()
  error = pyqtSignal(tuple)
  result = pyqtSignal(object)
  progress = pyqtSignal(str)
    
class Worker(QRunnable):
  def __init__(self, fn, *args, **kwargs):
    super(Worker, self).__init__()
    self.fn = fn
    self.args = args
    self.kwargs = kwargs
    
    self.signals = WorkerSignals()
    self.kwargs['progress_callback'] = self.signals.progress
      
  @pyqtSlot()
  def run(self):
    try:
      result = self.fn(*self.args, **self.kwargs)
      
      print(result)
    except:
      traceback.print_exc()
      exctype, value = sys.exc_info()[:2]
      self.signals.error.emit((exctype, value, traceback.format_exc()))
    else:
      self.signals.result.emit(result)
    finally:
      self.signals.finished.emit()


class QTextEditLogger(logging.Handler):
  def __init__(self, parent):
    super().__init__()
    self.widget = QPlainTextEdit(parent)
    self.widget.setReadOnly(True)

  def emit(self, record):
    msg = self.format(record)
    self.widget.appendPlainText(msg)

    
class MyEvents(object):
  def __init__(self):
    self.process = None
    
  def start_tail(self, filename, logger, trigger):
    self.logger.info( '[tail][{}]'.format( filename ) )
    
    trigger.clear()
    
    def handler(log_file, stop_event, progress_callback):
    
      f = open(log_file)
      for line in tailer.follow(f):
        if stop_event.is_set():
          logger.info("[tail.close]")
          
          f.close()
          break
          
        QThread.sleep(1)        
        progress_callback.emit( line )
        
      logger.info("[tail][break]")
          
      return True
    
    worker = Worker(handler, log_file=filename, stop_event=trigger)
    worker.signals.result.connect(lambda retval: self.logger.info('[tail][retval] {}'.format(retval)) )
    worker.signals.finished.connect(lambda: self.logger.info('[tail][finish]') )
    worker.signals.progress.connect(lambda msg: logger.info(msg) )
    
    self.parent.threadpool.start(worker)

  def start_nginx(self):
    self.logger.info( '[nginx.start][start]' )
    self.logger.info( '[nginx.start.test][start]' )
    retval = QProcess.startDetached(
      r".nginx/nginx.exe", [
        "-p", ".nginx", 
        "-c", "conf/win.nginx.conf",
        "-t"
      ]
    )
    self.logger.info( '[nginx.start.test][retval] {}'.format( retval ) )
    self.logger.info( '[nginx.start.test][finish]' )
    
    retval, pid = QProcess.startDetached(
      r".nginx/nginx.exe", [
        "-p", ".nginx", 
        "-c", "conf/win.nginx.conf"
      ],
      "."
    )
    self.logger.info( '[nginx.start][retval] {}'.format( retval ) )
    self.logger.info( '[nginx.start][pid] {}'.format( pid ) )
    self.logger.info( '[nginx.start][finish]' )
    
  def stop_nginx(self):
    self.logger.info( '[NGINX.stop][start]' )
    retval = QProcess.startDetached(
      r".nginx/nginx.exe", [
        "-p", ".nginx", 
        "-c", "conf/win.nginx.conf",
        "-s", "stop"
      ]
    )
    self.logger.info( '[nginx.stop][retval] {}'.format( retval ) )
    self.logger.info( '[NGINX.stop][finish]' )
    
    
  def start_wsgi(self):
    self.logger.info( '[wsgi.start][start]' )
    retval = QProcess.startDetached(
      r"python twisted-app.py"
    )
    self.logger.info( '[wsgi.start][retval] {}'.format( retval ) )
    self.logger.info( '[wsgi.start][finish]' )
    
  def stop_wsgi(self):
    self.logger.info( '[wsgi.stop][start]' )
    retval = QProcess.startDetached(
      r"taskkill /F /IM python.exe"
    )
    self.logger.info( '[wsgi.stop][retval] {}'.format( retval ) )
    self.logger.info( '[wsgi.stop][finish]' )
    
  
# 위젯 설정
class MyWidget(QWidget, MyEvents):
  def __init__(self, parent=None):        
    super(QWidget, self).__init__(parent)
    
    logger = logging.getLogger("stdout")
    
    self.parent = parent
    self.logger = logger
    
    self.init_ui()
    
  def init_ui(self):
    self.main_layout = QGridLayout(self)
    
    # row-1
    self.setRunButtons(0, 0)
    
    # row-2
    self.setLogViewer(1, 0)
    self.setLogViewer3(2, 0)
    
    self.setLayout(self.main_layout)
    
  def setLogViewer(self, row, col, rowSpan=1, colSpan=1):
    hbox = QHBoxLayout()
    
    logTextBox = QTextEditLogger(self.parent)
    logTextBox.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
    
    self.logger.addHandler(logTextBox)
    self.logger.setLevel(logging.DEBUG)

    hbox.addWidget(logTextBox.widget)
        
    self.main_layout.addLayout(hbox, row, col, rowSpan, colSpan)
    
  def setLogViewer2(self, row, col, rowSpan=1, colSpan=1):
    hbox = QHBoxLayout()
    
    filename = r"C:\Users\14D00944\Desktop\python\todolist\.nginx\logs\app.access.log"
    process = QProcess(self.parent)
    output = QTextEdit()
    btn = QPushButton("Start Nginx")
    
    self.process = process
    btn.clicked.connect(lambda: self.tail(filename))
    
    def readStdout(process, output):
      cursor = output.textCursor()
      cursor.movePosition(cursor.End)
      
      text = process.readAll()
      msg = str( text, encoding='cp949' )
      
      cursor.insertText(msg)
      output.ensureCursorVisible()
      
    process.readyRead.connect(lambda: readStdout(process, output))
    process.started.connect(lambda: print('started'))
    process.finished.connect(lambda: print('end'))
    
    hbox.addWidget(btn)
    hbox.addWidget(output)
    
    self.main_layout.addLayout(hbox, row, col, rowSpan, colSpan)
    
  def setLogViewer3(self, row, col, rowSpan=1, colSpan=1):
    hbox = QHBoxLayout()
    vbox_buttons = QVBoxLayout()
    
    trigger = threading.Event()
    filename = ".nginx/logs/app.access.log"
    
    logger = logging.getLogger(filename)
    logger.setLevel( logging.DEBUG )
    
    btn_start = QPushButton("tail start")
    btn_start.clicked.connect(lambda: self.start_tail(filename, logger, trigger))
    
    btn_stop = QPushButton("tail stop")
    btn_stop.clicked.connect(lambda: trigger.set())
    
    logTextBox = QTextEditLogger( self.parent )
    logTextBox.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
    
    logger.addHandler( logTextBox )

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
    btn_nginx_start.clicked.connect(self.start_nginx)
    
    btn_nginx_stop = QPushButton("Stop Nginx")
    btn_nginx_stop.clicked.connect(self.stop_nginx)
    
    hbox_nginx.addWidget(btn_nginx_start)
    hbox_nginx.addWidget(btn_nginx_stop)
    
    
    btn_wsgi_start = QPushButton("Start WSGI")
    btn_wsgi_start.clicked.connect(self.start_wsgi)
    
    btn_wsgi_stop = QPushButton("Stop WSGI")
    btn_wsgi_stop.clicked.connect(self.stop_wsgi)
    
    hbox_wsgi.addWidget(btn_wsgi_start)
    hbox_wsgi.addWidget(btn_wsgi_stop)
    
    vbox.addLayout( hbox_nginx )
    vbox.addLayout( hbox_wsgi )

    self.main_layout.addLayout(vbox, row, col, rowSpan, colSpan)
    

class MyWindow(QMainWindow):
  def __init__(self, title="Window", **kwargs):
    super(QMainWindow, self).__init__()
    
    # 상태값 설정
    self.title = title
    self.posX = int(kwargs.get("posX")) if "posX" in kwargs else 0
    self.posY = int(kwargs.get("posY")) if "posY" in kwargs else 0
    self.width = int(kwargs.get("width")) if "width" in kwargs else 300
    self.height = int(kwargs.get("height")) if "height" in kwargs else 200
    
    self.threadpool = QThreadPool()
    print("Multithreading with maximum %d threads" % self.threadpool.maxThreadCount())
    
    # 초기 설정
    self.init_ui()
    
  # 초기 설정
  def init_ui(self):
    self.init_window()
    self.init_tooltip()
    self.init_status_bar()
    self.init_menu_bar()
    self.init_tool_bar()
    self.init_widget()
  
  # Window 설정
  def init_window(self):
    # 제목 설정
    self.setWindowTitle(self.title)
    # 아이콘 설정
    self.setWindowIcon(QIcon("static/icons/dochi.png"))
    # 크기 및 위치 설정
    #self.resize(self.width, self.height)
    self.setGeometry(self.posX, self.posY, self.width, self.height)    
    
    # 가운데 정렬
    frame_geo = self.frameGeometry()
    desktop_center = QDesktopWidget().availableGeometry().center()
    frame_geo.moveCenter(desktop_center)
    self.move(frame_geo.topLeft())
    
  # 툴팁 설정
  def init_tooltip(self):
    # 툴팁 폰트 설정
    font = QFont("SansSerif", 10)
    message = f"'<b>Window ToolTip</b>' 입니다."
    
    QToolTip.setFont(font)
    self.setToolTip(message)
    
  # 상태바 설정
  def init_status_bar(self):
    statusBar = self.statusBar()
    statusBar.showMessage("Ready")
  
  # 메뉴바 설정
  def init_menu_bar(self):
    menubar = self.menuBar()
    menubar.setNativeMenuBar(False)
    
    # 기능 설정
    exit_action = QAction(QIcon("static/icons/exit.png"), "종료", self)
    exit_action.setShortcut("Alt+Q")
    exit_action.setStatusTip("Window를 종료합니다.")
    exit_action.triggered.connect(qApp.quit)
    
    # 메뉴 추가
    filemenu = menubar.addMenu('File')
    filemenu.addAction(exit_action)
    
  # 툴바 설정
  def init_tool_bar(self):
    # 기능 설정
    exit_action = QAction(QIcon("static/icons/exit.png"), "종료", self)
    exit_action.setShortcut("Alt+W")
    exit_action.setStatusTip("Window를 종료합니다.")
    exit_action.triggered.connect(qApp.quit)
    
    # 툴바 추가
    self.toolbar = self.addToolBar('종료')
    self.toolbar.addAction(exit_action)
    
  # 위젯 설정
  def init_widget(self):  
    self.main_widget = MyWidget(self)
    self.setCentralWidget(self.main_widget)
    
    
if __name__ == '__main__':
  app = QApplication( sys.argv )
  app.setStyle(QStyleFactory.create('Fusion'))
  win = MyWindow("메인 윈도우", posX=100, posY=400, width=300, height=500)
  win.show()
  
  try:
    exit = app.exec()
    
  except Exception as e:
    traceback.print_exc()
  else:
    print('close')
  finally:
    print('byebye~')
    sys.exit( exit )