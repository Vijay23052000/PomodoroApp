import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from './demo/update';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
