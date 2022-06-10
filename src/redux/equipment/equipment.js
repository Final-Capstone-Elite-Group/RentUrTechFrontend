/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: { equipments: [] },
  reducers: {
    initEquipment(state, action) {
      state.equipments = action.payload;
    },
  },
});

export const { initEquipment } = equipmentSlice.actions;

export default equipmentSlice.reducer;
