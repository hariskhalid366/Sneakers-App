import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronLeftIcon, EnvelopeIcon} from 'react-native-heroicons/outline';

import {theme} from '../constants/theme';
import {InputField, Loading} from '../Components';
import LongButton from '../Components/LongButton';
import showToast from '../Components/Toast'; // <-- use your custom toast
import {wp} from '../constants/Dimensions';
import {useMutation} from '@tanstack/react-query';
import {POST} from '../services/apiServices';

const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const requestReset = useMutation({
    mutationFn: data => POST('request-password-reset', data),
    onSuccess: data => {
      if (data?.status) {
        navigation.replace('OtpScreen', {email: email, passwordReset: true});
        showToast(data?.message);
      } else if (
        data?.message ===
        'Please verify your account with the OTP sent to your email.'
      ) {
        navigation.navigate('OtpScreen', {
          email: email,
        });
        showToast(data?.message);
      } else {
        showToast('Invalid credentials');
      }
    },
    onError: error => {
      showToast(error?.message || 'Something went wrong');
    },
  });

  if (requestReset.error) {
    showToast(requestReset.error?.message || 'Something went wrong');
  }

  return (
    <>
      {requestReset?.isPending && <Loading />}
      <View className="flex-1 p-5 pt-11 bg-white">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          className="w-12 h-12 rounded-full justify-center items-center">
          <ChevronLeftIcon color={theme.darkColor} size={18} />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View className="my-5">
            <Text
              style={styles.heading}
              className="text-center text-3xl tracking-widest font-bold my-2">
              Forgot Password
            </Text>
            <Text
              style={styles.subtext}
              className="text-center text-xs tracking-wider">
              Enter your email to reset{'\n'}your password
            </Text>
          </View>

          <InputField
            maxLength={40}
            autoComplete="email"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="xyz@gmail.com"
            appendChild={<EnvelopeIcon color={theme.primeryDark} size={22} />}
          />

          <LongButton
            title="Reset Password"
            backgroundColor={theme.primery}
            color={theme.backgroundColor}
            onPress={() => {
              requestReset.mutate({email});
            }}
          />
        </View>
      </View>
    </>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: theme.secondaryBackground,
  },
  contentContainer: {
    height: 700,
    width: 360,
  },
  heading: {
    fontSize: wp(6.5),
    color: theme.darkColor,
  },
  subtext: {
    fontSize: wp(3.5),
    color: theme.primeryDark,
  },
});
