import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronLeftIcon, EnvelopeIcon} from 'react-native-heroicons/outline';

import {theme} from '../constants/theme';
import {InputField} from '../Components';
import LongButton from '../Components/LongButton';
import showToast from '../Components/Toast'; // <-- use your custom toast
import {wp} from '../constants/Dimensions';
import {useMutation} from '@tanstack/react-query';

const SetNewPassword = ({navigation, route}) => {
  const {email, otp} = route.params || {};
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const resetPassword = useMutation({
    mutationFn: data => POST('request-password-reset', data),
    onSuccess: data => {
      if (data?.status) {
        signIn(data);
        setItem('user', JSON.stringify(data?.user));
        showToast('Login successful');

        navigation.replace('BottomNavigation');
      } else if (
        data?.message ===
        'Please verify your account with the OTP sent to your email.'
      ) {
        navigation.navigate('OtpScreen', {
          email: email,
          password: password,
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

  return (
    <>
      <View className="flex-1 p-5 bg-white">
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.backButton}
          className="w-12 h-12 rounded-full justify-center items-center">
          <ChevronLeftIcon color={theme.darkColor} size={18} />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View className="my-5">
            <Text
              style={styles.heading}
              className="text-center text-3xl tracking-widest font-bold my-2">
              Set New Password
            </Text>
            <Text
              style={styles.subtext}
              className="text-center text-xs tracking-wider">
              Set a strong password for security {'\n'} purposes
            </Text>
          </View>

          <InputField
            maxLength={40}
            autoComplete="password"
            value={confirm}
            onChangeText={text => setConfirm(text)}
            placeholder="*********"
            appendChild={<EnvelopeIcon color={theme.primeryDark} size={22} />}
          />
          <InputField
            maxLength={40}
            autoComplete="password"
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
            placeholder="*********"
            appendChild={<EnvelopeIcon color={theme.primeryDark} size={22} />}
          />

          <LongButton
            title="Reset Password"
            backgroundColor={theme.primery}
            color={theme.backgroundColor}
            onPress={() => {
              if (!newPassword || !confirm) {
                showToast('Both fields are required');
                return;
              }

              if (newPassword !== confirm) {
                showToast('Passwords do not match');
                return;
              }

              resetPassword.mutate({email, otp, newPassword});
            }}
          />
        </View>
      </View>
    </>
  );
};

export default SetNewPassword;

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
