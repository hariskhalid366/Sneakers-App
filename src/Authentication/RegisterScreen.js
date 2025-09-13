import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {
  ChevronLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {InputField, SecurityIcon} from '../Components';
import LongButton from '../Components/LongButton';
import GoogleSignin from './GoogleSignIn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useCreateUserAccountMutation} from '../ReduxStore/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {hp, wp} from '../constants/Dimensions';

const input = 'text-sm font-semibold tracking-wider ';

const RegisterScreen = ({navigation}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const [eye, setEye] = React.useState(true);
  const [createUserAccount, {isLoading}] = useCreateUserAccountMutation();

  const handleCreateAccount = async () => {
    try {
      if (
        (formData.email.includes('@') && formData.password.length > 4,
        formData.name.length > 3,
        formData.phone.length > 10)
      ) {
        const response = await createUserAccount(formData);

        if (response?.error?.data?.message) {
          ToastAndroid.showWithGravity(
            `${response?.error?.data?.message}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          return;
        }
        await AsyncStorage.setItem('userAuth', JSON.stringify(response.data));
      } else {
        ToastAndroid.showWithGravity(
          'Please fill the  required fields \n properly',
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
            height: hp(100) + 100,
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
      <ScrollView className="flex-1 bg-white p-5 ">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{backgroundColor: theme.secondaryBackground}}
          className="w-12 h-12 rounded-full justify-center items-center">
          <ChevronLeftIcon color={theme.darkColor} size={'18'} />
        </TouchableOpacity>

        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={100}>
          <View className="my-5 ">
            <Text
              style={styles.HeadingColor}
              className="text-center text-3xl tracking-widest font-bold my-2">
              Register Account
            </Text>
            <Text
              style={styles.textColor}
              className="text-center text-xs tracking-wider">
              Fill Your Details Or Continue With{'\n'}Google
            </Text>
          </View>
          <View className="my-2">
            <Text className={input} style={styles.HeadingColor}>
              Your Name
            </Text>
            <InputField
              maxLength={40}
              autoComplete={'username'}
              value={formData.name}
              onChangeText={text => handleChange('name', text)}
              placeholder={'Your Name'}
              keyboardType={'default'}
              prependChild={
                <UserIcon
                  color={theme.primeryDark}
                  size={'22'}
                  strokeWidth={2}
                />
              }
            />
          </View>
          <View className="">
            <Text className={input} style={styles.HeadingColor}>
              Email Address
            </Text>
            <InputField
              maxLength={40}
              autoComplete={'email'}
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
              placeholder={'Email address'}
              keyboardType={'email-address'}
              prependChild={
                <EnvelopeIcon
                  color={theme.primeryDark}
                  size={'22'}
                  strokeWidth={2}
                />
              }
            />
          </View>
          <View className="">
            <Text className={input} style={styles.HeadingColor}>
              Email Address
            </Text>
            <InputField
              maxLength={40}
              autoComplete={'off'}
              value={formData.phone}
              onChangeText={text => handleChange('phone', text)}
              placeholder={'Phone Number'}
              keyboardType={'phone-pad'}
              prependChild={
                <PhoneIcon
                  color={theme.primeryDark}
                  size={'22'}
                  strokeWidth={2}
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
              autoComplete={'password-new'}
              value={formData.password}
              onChangeText={text => handleChange('password', text)}
              placeholder={'Password'}
              keyboardType={'default'}
              prependChild={
                <LockClosedIcon
                  color={theme.primeryDark}
                  size={'22'}
                  strokeWidth={2}
                />
              }
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
            />
          </View>
          <LongButton
            title={'Sign Up'}
            backgroundColor={theme.primery}
            color={theme.backgroundColor}
            onPress={() => {
              handleCreateAccount();
            }}
          />
          <GoogleSignin />
        </KeyboardAwareScrollView>
        <View className="flex-row self-center justify-center pt-8 items-center">
          <Text
            style={styles.textColor}
            className="text-sm font-semibold tracking-wide">
            Already Have Account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              className="font-bold tracking-wider text-sm"
              style={styles.HeadingColor}>
              {' '}
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  HeadingColor: {
    color: theme.darkColor,
  },
  textColor: {
    color: theme.primeryDark,
  },
});
