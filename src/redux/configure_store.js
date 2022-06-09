import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/user';
import reservationsReducer from './reservation/reservation';

const store = configureStore({ reducer: { auth: authReducer, reservation: reservationsReducer } });
export default store;
