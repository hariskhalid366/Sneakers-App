import {Image, ToastAndroid} from 'react-native';
import React from 'react';
import LongButton from '../Components/LongButton';
import {theme} from '../constants/theme';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const GoogleSignIn = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '503637809310-12lu4p2486vjrinas6dn5m91isnimlrc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);

  const isSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // AsyncStorage.setItem('userAuth', JSON.stringify(userInfo));
      // navigation.replace('HomeScreen');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.showWithGravity(
          'You cancelled the login flow',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.showWithGravity(
          'Already in progress',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.showWithGravity(
          'play services not available or outdated',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        ToastAndroid.showWithGravity(
          `${error}`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }
  };

  return (
    <LongButton
      title={'Sign Up With Google'}
      backgroundColor={theme.secondaryBackground}
      color={theme.darkColor}
      onPress={() => {
        isSignIn();
      }}
      Childred={
        <Image
          source={require('../../assets/google.png')}
          style={{width: 25, height: 25, marginHorizontal: 10}}
        />
      }
    />
  );
};

export default GoogleSignIn;
