import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from './counter';
import timerReducer from './timer';
import taskReducer from './task';

const rootReducer = combineReducers({
  // state
  counter: counterReducer,
  timer: timerReducer,
  task: taskReducer,
});

export default rootReducer;
