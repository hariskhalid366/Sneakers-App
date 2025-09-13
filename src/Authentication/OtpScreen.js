import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import OTPTextInput from 'react-native-otp-textinput';
import {useMutation} from '@tanstack/react-query';

import {theme} from '../constants/theme';
import {wp, hp} from '../constants/Dimensions';
import LongButton from '../Components/LongButton';
import {POST} from '../services/apiServices';
import {setItem} from '../constants/mmkv';
import showToast from '../Components/Toast';
import {AuthContext} from '../Navigation/Route';
import {Loading} from '../Components';

const OtpScreen = ({navigation, route}) => {
  const {signIn} = useContext(AuthContext);
  const {email, passwordReset = false} = route.params;

  const [otp, setOtp] = useState('');
  const [time, setTime] = useState(30);
  const otpInput = useRef(null);

  useEffect(() => {
    setTime(30); // reset on mount
    const timer = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const verifyOtp = useMutation({
    mutationFn: data => POST('verify-otp', data),
    onSuccess: data => {
      if (data?.status) {
        signIn(data);
        setItem('user', JSON.stringify(data?.user));
        showToast('Login successful');
        navigation.replace('BottomNavigation');
      } else {
        showToast('Network error, please try again later');
      }
    },
    onError: error => {
      showToast(error?.message || 'Something went wrong');
    },
  });

  return (
    <>
      {verifyOtp.isPending && <Loading />}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ChevronLeftIcon color={theme.darkColor} size={wp(4.5)} />
        </TouchableOpacity>

        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <Text style={styles.headingText}>OTP Verification</Text>
            <Text style={styles.subText}>
              Please Check Your Email To See The{'\n'}Verification Code
            </Text>
          </View>

          <Text style={styles.label}>OTP Code</Text>

          <View style={styles.otpInputContainer}>
            <OTPTextInput
              containerStyle={styles.otpContainer}
              autoFocus
              defaultValue={otp}
              keyboardType="number-pad"
              textInputStyle={styles.otpBox}
              tintColor={theme.primery}
              inputCount={6}
              handleTextChange={setOtp}
              ref={otpInput}
            />
          </View>

          <LongButton
            title={time === 0 ? 'Resend Code' : 'Verify'}
            backgroundColor={theme.primery}
            color={theme.backgroundColor}
            onPress={() => {
              if (passwordReset) {
                navigation.replace('NewPassword', {email, otp});
                showToast('OTP verified, please reset your password');
                return;
              }

              verifyOtp.mutate({email, otp});
            }}
          />

          <View style={styles.timerWrapper}>
            <Text style={styles.timerText}>Resend code in</Text>
            <Text style={styles.timerText}>
              00:{time < 10 ? `0${time}` : time}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: '#fff',
  },
  backButton: {
    backgroundColor: theme.secondaryBackground,
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    height: hp(85),
    width: wp(90),
    alignSelf: 'center',
  },
  header: {
    marginVertical: hp(2.5),
  },
  headingText: {
    color: theme.darkColor,
    fontSize: wp(7),
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  subText: {
    color: theme.primeryDark,
    fontSize: wp(3.5),
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  label: {
    color: theme.darkColor,
    fontSize: wp(5),
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  otpInputContainer: {
    marginVertical: hp(1.5),
  },
  otpContainer: {
    marginTop: hp(1),
  },
  otpBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(3),
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: theme.darkColor,
  },
  timerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
    marginTop: hp(3),
  },
  timerText: {
    fontSize: wp(3),
    fontWeight: '600',
    color: theme.secondaryDark,
    letterSpacing: 0.5,
  },
});
