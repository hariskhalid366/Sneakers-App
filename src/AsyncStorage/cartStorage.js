// CartContext.js

import React, {createContext, useContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return addToCart(state, action.payload);
    case 'REMOVE_FROM_CART':
      return removeFromCart(state, action.payload);
    case 'INCREASE_QUANTITY':
      return increaseQuantity(state, action.payload);
    case 'DECREASE_QUANTITY':
      return decreaseQuantity(state, action.payload);
    case 'LOAD_CART':
      return action.payload; // Handle loading the cart from storage
    case 'DELETE_ALL':
      return deleteAll();
    default:
      return state;
  }
};

const addToCart = (state, newItem) => {
  const existingItemIndex = state.findIndex(item => item?._id === newItem?._id);

  if (existingItemIndex !== -1) {
    state[existingItemIndex].quantity += 1; // If the item exists, update the quantity
  } else {
    state.push({...newItem, quantity: 1}); // If the item doesn't exist, add it to the cart
  }

  return [...state];
};

const removeFromCart = (state, itemIdToRemove) => {
  return state.filter(item => item?._id !== itemIdToRemove);
};

const increaseQuantity = (state, itemIdToIncrease) => {
  const itemToIncrease = state.find(item => item?._id === itemIdToIncrease);

  if (itemToIncrease) {
    itemToIncrease.quantity += 1;
  }

  return [...state];
};

const decreaseQuantity = (state, itemIdToDecrease) => {
  const itemToDecrease = state.find(item => item?._id === itemIdToDecrease);

  if (itemToDecrease) {
    if (itemToDecrease.quantity > 1) {
      itemToDecrease.quantity -= 1;
    } else {
      // If quantity is 1 or less, remove the item
      return state.filter(item => item?._id !== itemIdToDecrease);
    }
  }

  return [...state];
};

const deleteAll = () => {
  return [];
};

const CartProvider = ({children}) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          dispatch({type: 'LOAD_CART', payload: JSON.parse(storedCart)});
        }
      } catch (error) {
        console.error('Error loading cart from storage:', error);
      }
    };

    loadCartFromStorage();
  }, []);

  useEffect(() => {
    const saveCartToStorage = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to storage:', error);
      }
    };

    saveCartToStorage();
  }, [cart]);

  const contextValue = {
    cart,
    addToCart: newItem => dispatch({type: 'ADD_TO_CART', payload: newItem}),
    removeFromCart: itemIdToRemove =>
      dispatch({type: 'REMOVE_FROM_CART', payload: itemIdToRemove}),
    increaseQuantity: itemIdToIncrease =>
      dispatch({type: 'INCREASE_QUANTITY', payload: itemIdToIncrease}),
    decreaseQuantity: itemIdToDecrease =>
      dispatch({type: 'DECREASE_QUANTITY', payload: itemIdToDecrease}),
    deleteAll: () => dispatch({type: 'DELETE_ALL'}),
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export {CartProvider, useCart};
