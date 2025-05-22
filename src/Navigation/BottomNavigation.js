import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  HeartIcon,
  BellIcon,
  UserIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as Home,
  HeartIcon as Heart,
  BellIcon as Bell,
  UserIcon as User,
} from 'react-native-heroicons/solid';
import {Favourite, HomeScreen, MyCart, Notification, Profile} from '../Screens';
import {theme} from '../constants/theme';

const BottomNavigation = () => {
  const Stack = createBottomTabNavigator();

  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        animation: 'shift',
        tabBarStyle: {
          height: 70,
          elevation: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.backgroundColor,
        },
        tabBarIconStyle: {
          top: 15,
        },
      })}>
      <Stack.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Home color={theme.primery} />
            ) : (
              <HomeIcon color={'#000'} size={25} />
            ),
        }}
        name="HomeScreen"
        component={HomeScreen} // Replace with your actual component
      />
      <Stack.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Heart color={'red'} />
            ) : (
              <HeartIcon color={'#000'} size={25} />
            ),
        }}
        name="FavScreen"
        component={Favourite}
      />
      <Stack.Screen
        options={{
          tabBarIcon: ({}) => (
            <ShoppingBagIcon color={theme.backgroundColor} size={25} />
          ),
          tabBarIconStyle: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 35,
            borderRadius: 50,
            backgroundColor: theme.primery,
            bottom: 25,
            shadowColor: theme.primery,
            shadowOffset: {
              width: 0,
              height: 30,
            },
            shadowOpacity: 0.8,
            shadowRadius: 3.5,
            elevation: 5,
          },
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('MyCart');
          },
        })}
        name="CartScreen"
        component={MyCart} // Replace with your actual component
      />
      <Stack.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Bell color={theme.primery} />
            ) : (
              <BellIcon color={'#000'} size={25} />
            ),
        }}
        name="Notification"
        component={Notification} // Replace with your actual component
      />
      <Stack.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <User color={theme.primery} />
            ) : (
              <UserIcon color={'#000'} size={25} />
            ),
        }}
        name="Profile"
        component={Profile} // Replace with your actual component
      />
    </Stack.Navigator>
  );
};
export default React.memo(BottomNavigation);
