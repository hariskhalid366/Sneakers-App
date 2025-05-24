import React, {useEffect, useMemo, useReducer, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgetPasswordScreen,
  LoginScreen,
  OtpScreen,
  RegisterScreen,
} from '../Authentication';
import {
  AllProducts,
  CheckOut,
  MyCart,
  OnBoardScreen,
  OrderedProduct,
  ProductScreen,
  SearchScreen,
} from '../Screens';
import WalletScreen from '../Screens/WalletScreen';
import Drawer from './Drawer';
import {theme} from '../constants/theme';
import {getItem, removeItem, setItem} from '../constants/mmkv';
import showToast from '../Components/Toast';

const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();

const Route = () => {
  const navigationRef = useRef();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = () => {
      try {
        const token = getItem('token');
        dispatch({type: 'RESTORE_TOKEN', token});
      } catch (e) {
        console.error('Failed to load token', e);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        setItem('token', data?.token);
        dispatch({type: 'SIGN_IN', token: data?.token});
      },
      signOut: () => {
        removeItem('token');
        dispatch({type: 'SIGN_OUT'});
        showToast('Logged out successfully');
      },
    }),
    [],
  );

  // ⚠️ Don't render until the token is checked
  if (state.isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => BootSplash.hide({fade: true})}
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
          }}>
          <Stack.Navigator
            initialRouteName={
              state.userToken ? 'BottomNavigation' : 'OnBoardScreen'
            }
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              statusBarStyle: 'dark',
              orientation: 'portrait',
              statusBarBackgroundColor: theme.backgroundColor,
              gestureDirection: 'horizontal',
            }}>
            {!state.userToken ? (
              <>
                <Stack.Screen
                  name="OnBoardScreen"
                  component={OnBoardScreen}
                  options={{
                    statusBarTranslucent: true,
                    statusBarBackgroundColor: theme.backdrop,
                  }}
                />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen name="Forget" component={ForgetPasswordScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="BottomNavigation" component={Drawer} />
                <Stack.Screen name="MyCart" component={MyCart} />
                <Stack.Screen name="Checkout" component={CheckOut} />
                <Stack.Screen name="All Products" component={AllProducts} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="Product" component={ProductScreen} />
                <Stack.Screen
                  name="SearchOrdredProduct"
                  component={OrderedProduct}
                />
                <Stack.Screen name="Wallet" component={WalletScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AuthContext.Provider>
  );
};

export default React.memo(Route);
