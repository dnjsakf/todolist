import * as types from './actionTypes';

export function setTodoData( todo_data ){
  return {
    type: types.SET_TODO_DATA,
    payload: todo_data
  }
}
export function setTitle( title ){
  return {
    type: types.SET_TODO_TITLE,
    payload: {
      title
    }
  }
}
export function setStatus( status ){
  return {
    type: types.SET_TODO_STATUS,
    payload: {
      status
    }
  }
}
export function setCategory( category ){
  return {
    type: types.SET_TODO_CATEGORY,
    payload: {
      category
    }
  }
}
export function setDueDate( due_date ){
  return {
    type: types.SET_TODO_DUE_DATE,
    payload: {
      due_date
    }
  }
}
export function setDueTime( due_time ){
  return {
    type: types.SET_TODO_DUE_TIME,
    payload: {
      due_time
    }
  }
}
export function setDescription( description ){
  return {
    type: types.SET_TODO_DESCRIPTION,
    payload: {
      description
    }
  }
}
export function setStar( star ){
  return {
    type: types.SET_TODO_STAR,
    payload: {
      star
    }
  }
}
