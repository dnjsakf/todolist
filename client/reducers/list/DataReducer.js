export const SET_DATA = 'list/data/SET_DATA';

export const actionSetData = ( payload )=>({ type: SET_DATA, payload: payload });

const initState = {}

export default function( state=initState, action ){
  switch( action.type ){
    case SET_DATA:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}