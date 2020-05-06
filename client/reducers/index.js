import { combineReducers } from 'redux';

import { 
  DataReducer as FormDataReducer,
  TodoInfoReducer
} from './form';
import { 
  DataReducer as ListDataReducer, 
} from './list';

import modalReducer from './modal';

const formReducer = combineReducers({
  data: FormDataReducer,
  todoInfo: TodoInfoReducer
});

const listReducer = combineReducers({
  data: ListDataReducer,
});

const rootReducer = combineReducers({
  form: formReducer,
  list: listReducer,
  modal: modalReducer,
});

export default rootReducer;