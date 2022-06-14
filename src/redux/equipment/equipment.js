/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: { equipments: [], currentTech: null },
  reducers: {
    initEquipment(state, action) {
      state.equipments = action.payload;
    },
    currentEquipment(state, action) {
      if (state.currentTech?.id === action.payload) {
        return;
      }
      state.currentTech = state.equipments.filter(
        (equipment) => equipment.id === action.payload,
      )[0];
    },
    updateReservedDate(state, action) {
      state.currentTech.dates_reserved.push(action.payload);
    },
    removeReservedDate(state, action) {
      state.currentTech.dates_reserved = state.currentTech
        .dates_reserved.filter((date) => date !== action.payload);
    },
  },
});

export const {
  initEquipment, currentEquipment, updateReservedDate, removeReservedDate,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
