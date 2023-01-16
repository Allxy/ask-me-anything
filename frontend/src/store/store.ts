import { configureStore } from '@reduxjs/toolkit';
import incomeSlice from './slices/incomeSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    income: incomeSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
