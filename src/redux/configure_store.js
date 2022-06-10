import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from './reservation/reservation';
import authReducer from './user/user';
import equipmentReducer from './equipment/equipment';

const store = configureStore({
  reducer: {
    auth: authReducer,
    reservation: reservationsReducer,
    equipment: equipmentReducer,
  },
});
export default store;
