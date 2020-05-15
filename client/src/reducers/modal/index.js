import { combineReducers } from 'redux';

import { reducer as TodoListModal } from './TodoList';

export default combineReducers({
  todoList: TodoListModal
});
