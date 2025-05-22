import {createSlice} from '@reduxjs/toolkit';
import products from '../constants/products';

const initialState = {
  product: products,
  selectedPopular: null,
};

export const popularProductSlice = createSlice({
  name: 'popularProducts',
  initialState,
  reducers: {
    setSelectedPopular: (action, state) => {
      const popularId = action.payload;
      state.selectedPopular = state.product.find(p => p.id === popularId);
    },
  },
});
