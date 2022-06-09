import { createSlice } from '@reduxjs/toolkit';

export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: { equipments: [] },
  reducers: {
    initEquipment({ equipments }, action) {
      equipments.push(action.payload);
    },
  },
});

export const { initEquipment } = equipmentSlice.actions;

export default equipmentSlice.reducer;
