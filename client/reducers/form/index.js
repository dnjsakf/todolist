import { combineReducers } from 'redux';

import { reducer as todoFormReducer } from './Todo';

export default combineReducers({
  todo: todoFormReducer
});
