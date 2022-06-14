/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: { equipments: [], currentTech: null },
  reducers: {
    initEquipment(state, action) {
      state.equipments.push(...action.payload);
    },
    currentEquipment(state, action) {
      // eslint-disable-next-line prefer-destructuring
      console.log(state)
      state.currentTech = state.equipments
    },
  },
});

export const { initEquipment, currentEquipment } = equipmentSlice.actions;

export default equipmentSlice.reducer;
