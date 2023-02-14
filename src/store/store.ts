import { configureStore } from '@reduxjs/toolkit';
import productFilterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import searchSlice from './slices/searchSlice';
import { productsApi } from './slices/apiSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: productFilterSlice,
    cart: cartSlice,
    search: searchSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
