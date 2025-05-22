// FavoritesContext.js

import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavoritesFromStorage = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites from storage:', error);
      }
    };

    loadFavoritesFromStorage();
  }, []);

  const addToFavorites = async newItem => {
    try {
      const updatedFavorites = [...favorites, newItem];
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async itemIdToRemove => {
    try {
      const updatedFavorites = favorites.filter(
        item => item.id !== itemIdToRemove,
      );
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const deleteAllFavorites = async () => {
    try {
      setFavorites([]);
      await AsyncStorage.removeItem('favorites');
    } catch (error) {
      console.error('Error deleting all favorites:', error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        deleteAllFavorites,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
