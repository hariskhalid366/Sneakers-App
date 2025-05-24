import {Image, ToastAndroid} from 'react-native';
import React from 'react';
import LongButton from '../Components/LongButton';
import {theme} from '../constants/theme';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

const GoogleSignIn = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true, // if you want to access the user even when they are offline
      webClientId:
        '852702708084-4rhpslo48q2376uon5b780j3le37a2r9.apps.googleusercontent.com',
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
