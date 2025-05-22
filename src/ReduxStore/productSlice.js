import {createSlice} from '@reduxjs/toolkit';
import products from '../constants/products';

const initialState = {
  product: products,
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.product.find(p => p.id === productId);
    },
  },
});
