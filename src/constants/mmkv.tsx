import {MMKV} from 'react-native-mmkv';

export const Storage = new MMKV({
  id: 'com.sneakers',
  encryptionKey: 'sneakers',
});

/**
 * Save or update a value
 * @param key - The key for the value
 * @param value - The value to store (string | number | boolean | object)
 */
export const setItem = (key: string, value: any): void => {
  if (typeof value === 'object') {
    Storage.set(key, JSON.stringify(value));
  } else {
    Storage.set(key, value);
  }
};

/**
 * Get a value
 * @param key - The key to retrieve
 * @returns The parsed value or null
 */
export const getItem = <T = any,>(key: string): T | null => {
  const value = Storage.getString(key);
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return value as unknown as T; // fallback for string, number, or boolean
  }
};

/**
 * Delete a key/value
 * @param key - The key to delete
 */
export const removeItem = (key: string): void => {
  Storage.delete(key);
};

/**
 * Update a stored object (merge with new values)
 * Only works with objects
 * @param key - The key of the object to update
 * @param updates - An object with fields to update
 */
export const updateItem = (key: string, updates: object): void => {
  const existing = getItem<object>(key) || {};
  const updated = {...existing, ...updates};
  setItem(key, updated);
};
