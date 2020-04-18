export const CHANGE_VALUE = 'select/CHANGE_VALUE';

export const onChangeValue = ( payload )=>({ type: CHANGE_VALUE, payload: payload });

const initState = {
  value: null,
  prevValue: null
}
const SelectReducer = ( state = initState, action )=>{
  switch( action.type ){
    case CHANGE_VALUE:
      return {
        ...state,
        value: action.payload.value,
        prevValue: state.value
      }
    default:
      return state;
  }
}

export default SelectReducer;