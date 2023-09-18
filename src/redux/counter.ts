import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'update',
  initialState: 0,
  reducers: {
    //  name of reducers 1. increament 2. decreament 3. setCustomValue. note: you can add more reducers .
    // every reducer will get state, action , and in return it will return new state
    increment: (state, action: PayloadAction<number>) => state + action.payload,
    decrement: (state, action: PayloadAction<number>) => state - action.payload,
    setCustomValue: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const {increment, decrement, setCustomValue} = counterSlice.actions;      // destructing actions with same name of reducer. through which dispatcher will dispatch action
export default counterSlice.reducer;  // exported reducers
 