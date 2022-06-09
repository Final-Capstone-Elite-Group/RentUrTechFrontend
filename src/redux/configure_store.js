import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/user';

const store = configureStore({ reducer: { auth: authReducer } });

export default store;
