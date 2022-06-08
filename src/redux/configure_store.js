import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user';

const store = configureStore({ reducer: { users: userReducer } });
export default store;
