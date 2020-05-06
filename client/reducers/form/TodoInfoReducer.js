export const SET_TITLE = 'form/todoInfo/SET_TITLE';
export const SET_STATUS = 'form/todoInfo/SET_STATUS';
export const SET_MAIN_CATE = 'form/todoInfo/SET_MAIN_CATE';
export const SET_SUB_CATE = 'form/todoInfo/SET_SUB_CATE';
export const SET_DUE_DATE = 'form/todoInfo/SET_DUE_DATE';
export const SET_DUE_TIME = 'form/todoInfo/SET_DUE_TIME';
export const SET_DESCRIPTION = 'form/todoInfo/SET_DESCRIPTION';
export const SET_STAR = 'form/todoInfo/SET_STAR';
export const SET_DATA = 'form/todoInfo/SET_DATA';

export const setTitle = ( title )=>({ type: SET_TITLE, payload: { title } });
export const setStatus = ( status )=>({ type: SET_STATUS, payload: { status } });
export const setMainCate = ( main_cate )=>({ type: SET_MAIN_CATE, payload: { main_cate } });
export const setSubCate = ( sub_cate )=>({ type: SET_SUB_CATE, payload: { sub_cate } });
export const setDueDate = ( due_date )=>({ type: SET_DUE_DATE, payload: { due_date } });
export const setDueTime = ( due_time )=>({ type: SET_DUE_TIME, payload: { due_time } });
export const setDescription = ( description )=>({ type: SET_DESCRIPTION, payload: { description } });
export const setStar = ( start )=>({ type: SET_STAR, payload: { start } });
export const setData = ( data )=>({ type: SET_DATA, payload: data });

const initState = {
  no: null,
  title: null,
  status: null,
  main_cate: null,
  sub_cate: null,
  due_date: null,
  due_time: null,
  desc: null,
  star: null,
}

export default function( state=initState, action ){
  switch( action.type ){
    case SET_DATA:
    case SET_TITLE:
    case SET_STATUS:
    case SET_MAIN_CATE:
    case SET_SUB_CATE:
    case SET_DUE_DATE:
    case SET_DUE_TIME:
    case SET_DESCRIPTION:
    case SET_DESCRIPTION:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}