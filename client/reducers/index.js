import { combineReducers } from 'redux';

import { SelectReducer } from './form';

const formReducer = combineReducers({
  select: SelectReducer,
});

const rootReducer = combineReducers({
  form: formReducer,
});

export default rootReducer;