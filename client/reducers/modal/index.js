export const MODAL_OPEN = 'modal/MODAL_OPEN';
export const MODAL_CLOSE = 'modal/MODAL_CLOSE';
export const MODAL_DESTROY = 'modal/MODAL_DESTROY';
export const MODAL_SET_DATA = 'modal/MODAL_SET_DATA';
export const MODAL_CHANGE_MODE = 'modal/MODAL_CHANGE_MODE';


export const actionModalOpen = ({ mode, id, data })=>({ 
  type: MODAL_OPEN, 
  payload: {
    open: true,
    mode,
    id,
    data
  } 
});
export const actionModalClose = ()=>({
  type: MODAL_CLOSE,
  payload: {
    open: false,
  }
});
export const actionModalDestroy = ()=>({
  type: MODAL_CLOSE,
  payload: {
    open: false,
    mode: null,
    id: null
  }
});
export const actionModalSetData = ({ data })=>({
  type: MODAL_SET_DATA,
  payload: {
    data: data
  }
})
export const actionModalChangeMode = ({ mode })=>({
  type: MODAL_CLOSE,
  payload: {
    mode: null,
  }
}); 


const initState = {
  open: false,
  mode: null,
  id: null,
  data: null
}

export default function( state=initState, action ){
  switch( action.type ){
    case MODAL_OPEN:
      return Object.assign({}, state, {
        open: action.payload.open,
        mode: action.payload.mode,
        id: action.payload.id
      });
    case MODAL_CLOSE:
      return Object.assign({}, state, {
        open: action.payload.open
      });
    case MODAL_DESTROY:
      return initState;
    case MODAL_SET_DATA:
      return Object.assign({}, state, {
        data: action.payload.data,
      })
    case MODAL_CHANGE_MODE:
      return Object.assign({}, state, {
        mode: action.payload.mode,
      });
    default:
      return state;
  }
}