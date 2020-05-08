import * as actionTypes from './actionTypes';

const initState = {
  no: null,
  title: null,
  status: null,
  category: null,
  due_date: null,
  due_time: null,
  description: null,
  star: null,
}

export default function todoInfoFormReducer( state=initState, action ){
  switch( action.type ){
    case actionTypes.SET_TODO_DATA:
    case actionTypes.SET_TODO_TITLE:
    case actionTypes.SET_TODO_STATUS:
    case actionTypes.SET_TODO_CATEGORY:
    case actionTypes.SET_TODO_DUE_DATE:
    case actionTypes.SET_TODO_DUE_TIME:
    case actionTypes.SET_TODO_DESCRIPTION:
    case actionTypes.SET_TODO_STAR:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}