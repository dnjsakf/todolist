import logging
import threading

from PyQt5.QtGui import QIcon, QFont
from PyQt5.QtCore import QThreadPool

from PyQt5.QtWidgets import (
  QMainWindow, 
  QDesktopWidget,
  QToolTip, QAction,
  qApp
)

from .widgets import MainWidget

class MainWindow(QMainWindow):
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
    self.main_widget = MainWidget(self)
    self.setCentralWidget(self.main_widget)
    
  def closeEvent(self, event):
    print( self )
    print( event )