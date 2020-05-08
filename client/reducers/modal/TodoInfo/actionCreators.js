import * as types from './actionTypes';

export function openModal({ mode, data }){
  return { 
    type: types.OPEN_MODAL, 
    payload: {
      open: true,
      mode,
      data
    }
  }
}
export function closeModal(){
  return {
    type: types.CLOSE_MODAL,
    payload: {
      open: false,
    }
  }
}
export function destroyModal(){
  return {
    type: types.DESTROY_MODAL,
    payload: {
      open: false,
      mode: null,
      data: null
    }
  }
}
export function setModalData({ data }){
  return {
    type: types.SET_MODAL_DATA,
    payload: {
      data
    }
  }
}