import { combineReducers } from 'redux';

import { reducer as TodoInfoModalReducer } from './TodoInfoModal';

export default combineReducers({
  todoInfo: TodoInfoModalReducer
});
