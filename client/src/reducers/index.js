import { combineReducers } from 'redux';

import formReducer from './form';
import modalReducer from './modal';

const rootReducer = combineReducers({
  form: formReducer,
  modal: modalReducer,
});

export default rootReducer;