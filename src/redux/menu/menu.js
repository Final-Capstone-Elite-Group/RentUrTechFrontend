/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: true,
  reducers: {
    setMenu(state, action) {
      return action.payload;
    },
  },
});

export const { setMenu } = menuSlice.actions;

export default menuSlice.reducer;
