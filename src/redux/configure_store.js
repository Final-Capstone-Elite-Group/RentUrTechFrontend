import { configureStore } from '@reduxjs/toolkit';

import authReducer from './user/user';
import equipmentReducer from './equipment/equipment';

const store = configureStore({ reducer: { auth: authReducer, equipment: equipmentReducer } });

export default store;
