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
    case actionTypes.SET_TODO_INFO_DATA:
    case actionTypes.SET_TODO_INFO_TITLE:
    case actionTypes.SET_TODO_INFO_STATUS:
    case actionTypes.SET_TODO_INFO_CATEGORY:
    case actionTypes.SET_TODO_INFO_DUE_DATE:
    case actionTypes.SET_TODO_INFO_DUE_TIME:
    case actionTypes.SET_TODO_INFO_DESCRIPTION:
    case actionTypes.SET_TODO_INFO_STAR:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}