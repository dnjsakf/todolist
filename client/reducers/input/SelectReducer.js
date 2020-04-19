export const CHANGE_VALUE = 'input/select/CHANGE_VALUE';

export const onChangeValue = ( payload )=>({ type: CHANGE_VALUE, payload: payload });

const initState = {

}
const SelectReducer = ( state=initState, action )=>{
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

export default SelectReducer;