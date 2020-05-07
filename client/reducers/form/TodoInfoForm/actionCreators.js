import * as types from './actionTypes';

export function setTodoInfo( todo_info ){
  return {
    type: types.SET_TODO_INFO_DATA,
    payload: todo_info
  }
}
export function setTitle( title ){
  return {
    type: types.SET_TODO_INFO_TITLE,
    payload: {
      title
    }
  }
}
export function setStatus( status ){
  return {
    type: types.SET_TODO_INFO_STATUS,
    payload: {
      status
    }
  }
}
export function setCategory( category ){
  return {
    type: types.SET_TODO_INFO_CATEGORY,
    payload: {
      category
    }
  }
}
export function setDueDate( due_date ){
  return {
    type: types.SET_TODO_INFO_DUE_DATE,
    payload: {
      due_date
    }
  }
}
export function setDueTime( due_time ){
  return {
    type: types.SET_TODO_INFO_DUE_TIME,
    payload: {
      due_time
    }
  }
}
export function setDescription( description ){
  return {
    type: types.SET_TODO_INFO_DESCRIPTION,
    payload: {
      description
    }
  }
}
export function setStar( star ){
  return {
    type: types.SET_TODO_INFO_STAR,
    payload: {
      star
    }
  }
}
