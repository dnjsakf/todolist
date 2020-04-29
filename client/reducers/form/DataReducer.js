export const SET_DATA = 'form/data/SET_DATA';
export const SET_ERROR = 'form/data/SET_ERROR';

export const actionSetData = ( payload )=>({ type: SET_DATA, payload: payload });
export const actionSetError = ( payload )=>({ type: SET_ERROR, payload: payload });

const initState = {}

export default function( state=initState, action ){
  switch( action.type ){
    case SET_DATA:
      return Object.assign({}, state, {
        [action.payload.parent]: {
          ...state[action.payload.parent],
          [action.payload.name]: {
            data: action.payload.value,
            error: !!action.payload.error,
            required: !!action.payload.required
          }
        }
      });
    case SET_ERROR:
      return Object.assign({}, state, {
        [action.payload.parent]: {
          ...state[action.payload.parent],
          [action.payload.name]: {
            ...state[action.payload.parent][action.payload.name],
            error: !!action.payload.error
          }
        }
      });
    default:
      return state;
  }
}