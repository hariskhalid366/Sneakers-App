import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronLeftIcon, EnvelopeIcon} from 'react-native-heroicons/outline';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

import {theme} from '../constants/theme';
import {InputField, RecoveryModal} from '../Components';
import LongButton from '../Components/LongButton';
import showToast from '../Components/Toast'; // <-- use your custom toast
import {wp} from '../constants/Dimensions';

const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {dismiss} = useBottomSheetModal();
  const modalRef = useRef(null);

  const openRecoveryModal = () => {
    modalRef?.current?.present();
  };

  const handleResetPassword = () => {
    const isValidEmail = email.length > 2 && email.includes('@');

    if (!isValidEmail) {
      return showToast('Please enter a valid email address');
    }

    openRecoveryModal();

    setTimeout(() => {
      if (dismiss) navigation.push('OtpScreen');
    }, 500);
  };

  return (
    <>
      <RecoveryModal ref={modalRef} />
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
            onChangeText={setEmail}
            placeholder="xyz@gmail.com"
            appendChild={<EnvelopeIcon color={theme.primeryDark} size={22} />}
          />

          <LongButton
            title="Reset Password"
            backgroundColor={theme.primery}
            color={theme.backgroundColor}
            onPress={handleResetPassword}
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
