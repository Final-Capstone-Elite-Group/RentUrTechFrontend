import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user';

const store = configureStore({ reducer: { user: userReducer } });
export default store;
