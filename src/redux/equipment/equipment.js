import { createSlice } from '@reduxjs/toolkit';

export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: { equipments: [], currentTech: null },
  reducers: {
    initEquipment(state, action) {
      const newState = state;
      newState.equipments = action.payload;
      return newState;
    },
    currentEquipment(state, action) {
      if (state.currentTech?.id === action.payload) {
        return state;
      }
      const newState = state;
      [newState.currentTech] = state.equipments.filter(
        (equipment) => equipment.id === action.payload,
      );
      return newState;
    },
    updateReservedDate(state, action) {
      state.currentTech.dates_reserved.push(action.payload);
    },
    removeReservedDate(state, action) {
      const newState = state;
      newState.currentTech.dates_reserved = state.currentTech
        .dates_reserved.filter((date) => date !== action.payload);
      return newState;
    },
  },
});

export const {
  initEquipment, currentEquipment, updateReservedDate, removeReservedDate,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
