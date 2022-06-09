import { configureStore } from '@reduxjs/toolkit';

import authReducer from './user/user';
import equipmentReducer from './equipment/equipment';

const store = configureStore({ reducer: { auth: userReducer, equipment: equipmentReducer } });





export default store;
