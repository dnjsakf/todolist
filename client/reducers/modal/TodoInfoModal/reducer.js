import * as types from './actionTypes';

const initState = {
  open: false,
  mode: null,
  data: null
}

export default function todoInfoModalReducer( state=initState, action ){
  switch( action.type ){
    case types.OPEN_MODAL:
    case types.CLOSE_MODAL:
    case types.DESTROY_MODAL:
    case types.SET_MODAL_DATA:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}