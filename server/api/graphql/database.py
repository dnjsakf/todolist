# api/datdabase.py
import datetime

from mongoengine import connect
from server.api.graphql.models import (
  RankModel, RankModeModel, CommonCodeModel
)

MONGO_DTATBASE="graphql-example"
MONGO_HOST="mongomock://localhost"

# Database 연결
conn = connect(MONGO_DTATBASE, host=MONGO_HOST, alias="default")
print( conn.server_info() )

# 기초 데이터 Insert 함수
def init_db():
  reg_dttm = datetime.datetime.now().strftime("%Y%m%d%H%M%S")

  for idx in range(1, 5):
    mode = f"{ idx }x{ idx }"

    RankModeModel(mode=mode).save()
  
    for idx in range(50):
      RankModel(
        name="heo", 
        mode=mode, 
        score=idx, 
        is_mobile=False, 
        reg_dttm=reg_dttm
      ).save()
  
  CommonCodeModel(code_grp="TODO_STATUS", code_value="1", code_name="대기", reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code_value="2", code_name="진행중", reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code_value="3", code_name="완료", reg_dttm=reg_dttm).save()
  CommonCodeModel(code_grp="TODO_STATUS", code_value="999", code_name="오류", reg_dttm=reg_dttm).save()