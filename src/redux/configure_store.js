import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user';
import equipmentReducer from './equipment/equipment';

const store = configureStore({ reducer: { user: userReducer, equipment: equipmentReducer } });
export default store;
