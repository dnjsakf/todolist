import { combineReducers } from 'redux';

import { SelectReducer } from './input';

const rootReducer = combineReducers({
  select: SelectReducer,
});

export default rootReducer;