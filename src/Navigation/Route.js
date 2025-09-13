import React, {useEffect, useMemo, useReducer, useRef} from 'react';
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
import Drawer from './Drawer';
import {theme} from '../constants/theme';
import {getItem, removeItem, setItem} from '../constants/mmkv';
import showToast from '../Components/Toast';
import ChatBotModal from '../Components/((modal))/ChatBotModal';
import SetNewPassword from '../Authentication/SetNewPassword';
import {Loading} from '../Components';
import PublishDesign from '../Screens/Design/PublishDesign';
import BidProductScreen from '../Screens/BidProductScreen';
import {Text, View} from 'react-native';
import UserPublicProfile from '../Screens/UserPublicProfile';
import NFTPage from '../Screens/NFTPage';

const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();

const Route = () => {
  const navigationRef = React.useRef();

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
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => BootSplash.hide({fade: true})}
        theme={{
          ...DefaultTheme,
          colors: {
            primary: '#F7F7F9',
            background: '#F7F7F9',
            card: '#F7F7F9',
            text: '#000',
            border: '#F7F7F9',
            notification: '#000',
          },
        }}>
        <Stack.Navigator
          initialRouteName={
            state.userToken ? 'BottomNavigation' : 'OnBoardScreen'
          }
          // screenLayout={() => (
          //   <View
          //     style={{
          //       flex: 1,
          //       height: 20,
          //       backgroundColor: theme.primery,
          //     }}>
          //     <Text>Hello</Text>
          //   </View>
          // )}
          screenOptions={{
            headerShown: false,
            animation: 'ios_from_right',
            statusBarStyle: 'dark',
            orientation: 'portrait',
            statusBarTranslucent: true,
            gestureDirection: 'horizontal',
          }}>
          {!state.userToken ? (
            <>
              <Stack.Screen
                name="OnBoardScreen"
                component={OnBoardScreen}
                options={{
                  statusBarTranslucent: true,
                  statusBarStyle: 'light',
                  // statusBarBackgroundColor: theme.backdrop,
                }}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} />
              <Stack.Screen name="Forget" component={ForgetPasswordScreen} />
              <Stack.Screen name="NewPassword" component={SetNewPassword} />
            </>
          ) : (
            <>
              <Stack.Screen name="BottomNavigation" component={Drawer} />
              <Stack.Screen name="UploadDesign" component={PublishDesign} />
              <Stack.Screen name="MyCart" component={MyCart} />
              <Stack.Screen name="Checkout" component={CheckOut} />
              <Stack.Screen name="All Products" component={AllProducts} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="Product" component={ProductScreen} />
              <Stack.Screen name="NftDetails" component={NFTPage} />
              <Stack.Screen
                name="PublicProfile"
                component={UserPublicProfile}
              />
              <Stack.Screen
                name="ChatBot"
                component={ChatBotModal}
                options={{
                  gestureEnabled: true,
                  gestureDirection: 'horizontal',
                  presentation: 'fullScreenModal',
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen
                name="SearchOrdredProduct"
                component={OrderedProduct}
              />
              <Stack.Screen name="BidProduct" component={BidProductScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default React.memo(Route);
