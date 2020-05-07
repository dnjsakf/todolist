import { combineReducers } from 'redux';

import { reducer as todoInfoFormReducer } from './TodoInfoForm';

export default combineReducers({
  todoInfo: todoInfoFormReducer
});
