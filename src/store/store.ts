import { configureStore } from '@reduxjs/toolkit';
import productFilterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter: productFilterSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
