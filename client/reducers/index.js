import { combineReducers } from 'redux';

import { SelectReducer } from './input';

const inputReducer = combineReducers({
  select: SelectReducer,
});

const rootReducer = combineReducers({
  input: inputReducer,
});

export default rootReducer;