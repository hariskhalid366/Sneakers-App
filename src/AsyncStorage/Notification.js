import React, {createContext, useContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return addNotification(state, action.payload);
    case 'DELETE_NOTIFICATION':
      return deleteNotification(state, action.payload);
    case 'CLEAR_NOTIFICATIONS':
      return clearNotifications();
    case 'LOAD_NOTIFICATIONS':
      return action.payload;
    default:
      return state;
  }
};

const addNotification = (state, newNotification) => {
  const updatedNotifications = [newNotification, ...state];
  saveNotificationsToStorage(updatedNotifications);
  return updatedNotifications;
};

const deleteNotification = (state, notificationIdToDelete) => {
  const updatedNotifications = state.filter(
    notification => notification.id !== notificationIdToDelete,
  );
  saveNotificationsToStorage(updatedNotifications);
  return updatedNotifications;
};

const clearNotifications = () => {
  saveNotificationsToStorage([]);
  return [];
};

const saveNotificationsToStorage = async notifications => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications to storage:', error);
  }
};

export const NotificationProvider = ({children}) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  useEffect(() => {
    const loadNotificationsFromStorage = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications) {
          dispatch({
            type: 'LOAD_NOTIFICATIONS',
            payload: JSON.parse(storedNotifications),
          });
        }
      } catch (error) {
        console.error('Error loading notifications from storage:', error);
      }
    };

    loadNotificationsFromStorage();
  }, []);

  const contextValue = {
    notifications,
    addNotification: newNotification =>
      dispatch({type: 'ADD_NOTIFICATION', payload: newNotification}),
    deleteNotification: notificationIdToDelete =>
      dispatch({type: 'DELETE_NOTIFICATION', payload: notificationIdToDelete}),
    clearNotifications: () => dispatch({type: 'CLEAR_NOTIFICATIONS'}),
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider',
    );
  }
  return context;
};
