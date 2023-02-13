import { configureStore } from '@reduxjs/toolkit';
import productFilterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import { productsApi } from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    filter: productFilterSlice,
    cart: cartSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
