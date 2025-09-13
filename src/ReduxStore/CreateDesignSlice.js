import {createSlice} from '@reduxjs/toolkit';
import products from '../constants/products';

const initialState = {
  creator: products,
  selectedArt: null,
};

export const popularProductSlice = createSlice({
  name: 'creatorCenter',
  initialState,
  reducers: {
    setselectedArt: (action, state) => {
      const creatorCenterId = action.payload;
      state.selectedArt = state.creator.find(p => p?._id === creatorCenterId);
    },
  },
});
