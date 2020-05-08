import { combineReducers } from 'redux';

import { reducer as TodoInfoModalReducer } from './TodoInfo';

export default combineReducers({
  todoInfo: TodoInfoModalReducer
});
