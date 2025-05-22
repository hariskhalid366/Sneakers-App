import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {productSlice} from './productSlice';
import {popularProductSlice} from './popularProducts';
import {cartSlice} from './addToCart';
import {favSlice} from './favouriteSlice';
import {apiSlice} from './apiSlice';

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    popular: popularProductSlice.reducer,
    cart: cartSlice.reducer,
    favourite: favSlice.reducer,
    api: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
