export const CHANGE_VALUE = 'form/select/CHANGE_VALUE';

export const onChangeValue = ( payload )=>({ type: CHANGE_VALUE, payload: payload });

const initState = {}

export default function( state=initState, action ){
  switch( action.type ){
    case CHANGE_VALUE:
      return {
        ...state,
        [action.payload.parent]: {
          ...state[action.payload.parent],
          [action.payload.name]: action.payload.value
        },
      }
    default:
      return state;
  }
}