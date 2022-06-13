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
      // eslint-disable-next-line prefer-destructuring
      state.currentTech = state.equipments.filter(
        (equipment) => equipment.id === action.payload,
      )[0];
    },
    updateEquipmentDates(state, action) {
      state.equipments.filter(
        (equipment) => equipment.id === action.payload.id,
      )[0].dates_reserved.push(action.payload.dates_reserved);
    },
  },
});

export const { initEquipment, currentEquipment, updateEquipmentDates } = equipmentSlice.actions;

export default equipmentSlice.reducer;
