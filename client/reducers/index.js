import { combineReducers } from 'redux';

import { 
  DataReducer, 
} from './form';

const formReducer = combineReducers({
  data: DataReducer,
});

const rootReducer = combineReducers({
  form: formReducer,
});

export default rootReducer;