import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ForgetPasswordScreen,
  LoginScreen,
  OtpScreen,
  RegisterScreen,
} from '../Authentication';
import BootSplash from 'react-native-bootsplash';
import {
  AllProducts,
  CheckOut,
  MyCart,
  OnBoardScreen,
  OrderedProduct,
  ProductScreen,
  SearchScreen,
} from '../Screens';
import {theme} from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawer from './Drawer';

const Route = () => {
  const [user, setUser] = React.useState([]);
  React.useEffect(() => {
    AsyncStorage.getItem('userAuth').then(userInfo => {
      if (userInfo) {
        setUser(user);
        console.log('====================================');
        console.log('hello');
        console.log('====================================');
      } else {
        console.log('====================================');
        console.log('fuck you');
        console.log('====================================');
      }
    });
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            primary: '#fff',
            background: theme.backgroundColor,
            card: theme.backgroundColor,
            text: '#000',
            border: '#fff',
            notification: '#000',
          },
        }}
        onReady={() => {
          BootSplash.hide();
        }}>
        <Stack.Navigator
          initialRouteName={user ? 'BottomNavigation' : 'OnBoardScreen'}
          screenOptions={{
            headerShown: false,
            statusBarStyle: 'dark',
            animation: 'slide_from_right',
            animationTypeForReplace: 'push',
            orientation: 'portrait',
            statusBarBackgroundColor: theme.secondaryBackground,
            gestureDirection: 'horizontal',
          }}>
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Forget" component={ForgetPasswordScreen} />
          <Stack.Screen
            name="OnBoardScreen"
            options={{
              statusBarColor: theme.backdrop,
              statusBarTranslucent: true,
              navigationBarColor: theme.backdrop,
              statusBarStyle: 'light',
            }}
            component={OnBoardScreen}
          />
          <Stack.Screen name="BottomNavigation" component={Drawer} />
          <Stack.Screen
            name="MyCart"
            component={MyCart}
            // options={{
            //   statusBarColor: theme.secondaryBackground,
            //   statusBarTranslucent: true,
            //   navigationBarHidden: true,
            //   statusBarStyle: 'dark',
            // }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckOut}
            // options={{
            //   statusBarColor: theme.secondaryBackground,
            //   statusBarTranslucent: true,
            //   navigationBarHidden: true,
            //   statusBarStyle: 'dark',
            // }}
          />
          <Stack.Screen
            name="All Products"
            component={AllProducts}
            // options={{
            //   statusBarColor: theme.secondaryBackground,
            //   statusBarTranslucent: true,
            //   navigationBarHidden: true,
            //   statusBarStyle: 'dark',
            // }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            // options={{
            //   statusBarColor: theme.secondaryBackground,
            //   statusBarTranslucent: true,
            //   navigationBarHidden: true,
            //   statusBarStyle: 'dark',
            // }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            // options={{
            //   statusBarColor: theme.secondaryBackground,
            //   statusBarTranslucent: true,
            //   navigationBarHidden: true,
            //   statusBarStyle: 'dark',
            // }}
          />
          <Stack.Screen
            name="SearchOrdredProduct"
            component={OrderedProduct}
            // options={{
            //   statusBarColor: theme.secondaryBackground,
            //   statusBarTranslucent: true,
            //   navigationBarHidden: true,
            //   statusBarStyle: 'dark',
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default React.memo(Route);
