
from functools import wraps
from server.api.graphql.models import UserModel

def session_user(func):
  @wraps(func)
  def wrapper(*args, **kwargs):
    return func(*args, user=UserModel.objects.first(), **kwargs)
  return wrapper
