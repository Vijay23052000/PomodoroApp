import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from './counter';
import timerReducer from './timer';

const rootReducer = combineReducers({
  // state
  counter: counterReducer,
  timer: timerReducer,
});

export default rootReducer;
