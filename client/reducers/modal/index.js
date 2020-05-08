import { combineReducers } from 'redux';

import { reducer as TodoModalReducer } from './Todo';

export default combineReducers({
  todo: TodoModalReducer
});
