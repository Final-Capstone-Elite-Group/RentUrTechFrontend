import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user';
import reservationsReducer from './reservation/reservation';

const store = configureStore({ reducer: { user: userReducer, reservation: reservationsReducer } });
export default store;
