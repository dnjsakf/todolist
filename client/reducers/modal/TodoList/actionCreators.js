import * as types from './actionTypes';

export function openModal({ mode, data }){
  return { 
    type: types.OPEN_TODO_MODAL, 
    payload: {
      open: true,
      mode,
      data
    }
  }
}
export function closeModal(){
  return {
    type: types.CLOSE_TODO_MODAL,
    payload: {
      open: false,
    }
  }
}
export function destroyModal(){
  return {
    type: types.DESTROY_TODO_MODAL,
    payload: {
      open: false,
      mode: null,
      data: null
    }
  }
}
export function setModalData({ data }){
  return {
    type: types.SET_TODO_MODAL_DATA,
    payload: {
      data
    }
  }
}