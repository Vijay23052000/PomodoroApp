import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: 0,
  reducers: {
    //  name of reducers 1. increament 2. decreament 3. setCustomValue. note: you can add more reducers .
    // every reducer will get state, action , and in return it will return new state
    updateToTwentyFiveMinutes: (state, action: PayloadAction<number>) =>
      state + action.payload,
    updateToOneHour: (state, action: PayloadAction<number>) =>
      state - action.payload,
    resetTimer: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const {updateToTwentyFiveMinutes, updateToOneHour, resetTimer} =
  timerSlice.actions; // destructing actions with same name of reducer. through which dispatcher will dispatch action
export default timerSlice.reducer; // exported reducers
