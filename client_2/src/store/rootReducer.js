// rootReducer.js
import { combineReducers } from 'redux';
import masterDataReducer from './masterDataReducer';

const rootReducer = combineReducers({
  masterData: masterDataReducer,
  // Add other reducers if needed
});

export default rootReducer;
