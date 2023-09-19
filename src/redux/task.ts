import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'task',
  initialState: 'POMODORO 25 MIN',
  reducers: {
    //  name of reducers 1. increament 2. decreament 3. setCustomValue. note: you can add more reducers .
    // every reducer will get state, action , and in return it will return new state
    pomodoro: (state, action: PayloadAction<string>) => state + action.payload,
    shortBreak: (state, action: PayloadAction<string>) => action.payload,
    longBreak: (state, action: PayloadAction<string>) => action.payload,
    selectType: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const {pomodoro, shortBreak, longBreak, selectType
} = timerSlice.actions; // destructing actions with same name of reducer. through which dispatcher will dispatch action
export default timerSlice.reducer; // exported reducers
