import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'update',
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
    decrement: (state, action: PayloadAction<number>) => state - action.payload,
    setThirtyMinute: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const {increment, decrement, setThirtyMinute} = counterSlice.actions;
export default counterSlice.reducer;
