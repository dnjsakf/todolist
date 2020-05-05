import { combineReducers } from 'redux';

import { 
  DataReducer as FormDataReducer, 
} from './form';

import { 
  DataReducer as ListDataReducer, 
} from './list';

const formReducer = combineReducers({
  data: FormDataReducer,
});

const listReducer = combineReducers({
  data: ListDataReducer,
});

const rootReducer = combineReducers({
  form: formReducer,
  list: listReducer
});

export default rootReducer;