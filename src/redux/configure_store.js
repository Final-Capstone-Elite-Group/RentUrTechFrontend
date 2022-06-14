import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import reservationsReducer from './reservation/reservation';
import authReducer from './user/user';
import equipmentReducer from './equipment/equipment';

const store = configureStore({
  reducer: {
    auth: authReducer,
    reservation: reservationsReducer,
    equipment: equipmentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
export default store;
