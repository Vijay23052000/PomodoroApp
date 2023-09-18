import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from './update';

const rootReducer = combineReducers({
  // state
  counter: counterReducer,
});

export default rootReducer;
