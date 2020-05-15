import { combineReducers } from 'redux';

import { reducer as todoListReducer } from './TodoList';

export default combineReducers({
  todoList: todoListReducer
});
