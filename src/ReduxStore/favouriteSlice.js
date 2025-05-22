const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  items: [],
};

export const favSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavItem: (state, action) => {
      const newProduct = action.payload.product;
      console.log(state.items, action);
      const existingIndex = state.items.find(
        item => item.product.id === newProduct.id,
      );
      if (existingIndex) {
        state.items = state.items.filter(item => {
          item !== existingIndex;
        });
      } else {
        state.items.push({fav: newProduct});
      }
    },
  },
});
