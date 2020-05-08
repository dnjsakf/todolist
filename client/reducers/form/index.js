import { combineReducers } from 'redux';

import { reducer as todoInfoFormReducer } from './TodoInfo';

export default combineReducers({
  todoInfo: todoInfoFormReducer
});
