import PropTypes from 'prop-types';

import * as actionTypes from './actionTypes';

const initState = {
  no: PropTypes.string,
  title: PropTypes.string,
  status: {
    p_code: PropTypes.string,
    code: PropTypes.string,
  },
  category: {
    p_code: PropTypes.string,
    code: PropTypes.string,
  },
  due_date: PropTypes.string,
  due_time: PropTypes.string,
  description: PropTypes.string,
  star: PropTypes.bool,
}


export default function todoInfoFormReducer( state=initState, action ){
  switch( action.type ){
    case actionTypes.SET_TODO_DATA:
    case actionTypes.SET_TODO_TITLE:
    case actionTypes.SET_TODO_STATUS:
    case actionTypes.SET_TODO_DUE_DATE:
    case actionTypes.SET_TODO_DUE_TIME:
    case actionTypes.SET_TODO_DESCRIPTION:
    case actionTypes.SET_TODO_STAR:
      return Object.assign({}, state, action.payload);
    case actionTypes.SET_TODO_CATEGORY:
      return Object.assign({}, state, {
        category: {
          ...state.category,
          ...action.payload
        }
      });
    default:
      return state;
  }
}