import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  ChevronLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {InputField, SecurityIcon} from '../Components';
import {ScrollView} from 'react-native-gesture-handler';
import LongButton from '../Components/LongButton';
import GoogleSignin from './GoogleSignIn';
import {useLoginUserAccountMutation} from '../ReduxStore/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen');

const input = 'text-sm font-semibold tracking-wider ';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [eye, setEye] = React.useState(true);

  const [loginUserAccount, {isLoading}] = useLoginUserAccountMutation();

  const handleLogin = async () => {
    try {
      if (email.includes('@') && password.length > 4) {
        const response = await loginUserAccount({
          email: email,
          password: password,
        });

        if (response?.error?.data?.message) {
          ToastAndroid.showWithGravity(
            `${response?.error?.data?.message}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          return;
        }
        await AsyncStorage.setItem('userAuth', JSON.stringify(response.data));
        navigation.replace('Drawer');
      } else {
        ToastAndroid.showWithGravity(
          'Please enter your email and password properly',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  return (
    <>
      {isLoading && (
        <View
          style={{
            backgroundColor: '#00000044',
            height: height + 100,
            position: 'absolute',
            width: width,
            alignSelf: 'center',
            top: '0',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 200,
            paddingBottom: 100,
          }}>
          <ActivityIndicator color={theme.primery} size={80} />
        </View>
      )}

      <ScrollView className="flex-1 p-5 bg-white">
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={{backgroundColor: theme.secondaryBackground}}
          className="w-12 h-12 rounded-full justify-center items-center">
          <ChevronLeftIcon color={theme.darkColor} size={'18'} />
        </TouchableOpacity>
        <View style={{height: 700, width: 360}}>
          <View className="my-5 ">
            <Text
              style={styles.HeadingColor}
              className="text-center text-3xl tracking-widest font-bold my-2">
              Hello Again!
            </Text>
            <Text
              style={styles.textColor}
              className="text-center text-xs tracking-wider">
              Fill Your Details Or Continue With{'\n'}Social Media
            </Text>
          </View>
          <View className="my-2">
            <Text className={input} style={styles.HeadingColor}>
              Email Address
            </Text>
            <InputField
              maxLength={40}
              autoComplete={'email'}
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder={'Email address'}
              prependChild={
                <UserIcon
                  strokeWidth={2}
                  color={theme.primeryDark}
                  size={'22'}
                />
              }
              appendChild={
                <EnvelopeIcon
                  strokeWidth={2}
                  color={theme.primeryDark}
                  size={'22'}
                />
              }
            />
          </View>
          <View>
            <Text className={input} style={styles.HeadingColor}>
              Password
            </Text>
            <InputField
              maxLength={45}
              autoComplete={'password'}
              value={password}
              secureTextEntry={eye}
              onChangeText={text => setPassword(text)}
              placeholder={'Password'}
              appendChild={
                <SecurityIcon
                  color={theme.primeryDark}
                  size={'22'}
                  setIcon={eye}
                  onPress={() => {
                    setEye(!eye);
                  }}
                />
              }
              prependChild={
                <LockClosedIcon
                  strokeWidth={2}
                  color={theme.primeryDark}
                  size={'22'}
                />
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.push('Forget');
            }}
            className=" w-32  justify-center items-end self-end">
            <Text
              style={styles.textColor}
              className="text-xs tracking-wide font-semibold">
              Recovery Password
            </Text>
          </TouchableOpacity>
          <LongButton
            title={'Sign In'}
            backgroundColor={theme.primery}
            color={theme.backgroundColor}
            onPress={() => {
              handleLogin();
            }}
          />
          <GoogleSignin />
        </View>
        <View className="flex-row self-center justify-center items-center">
          <Text
            style={styles.textColor}
            className="text-sm font-semibold tracking-wide">
            New User?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push('Register');
            }}>
            <Text
              className="font-bold tracking-wider text-sm"
              style={styles.HeadingColor}>
              {' '}
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  HeadingColor: {
    color: theme.darkColor,
  },
  textColor: {
    color: theme.primeryDark,
  },
});
