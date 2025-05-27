import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import LongButton from '../Components/LongButton';
import OTPTextInput from 'react-native-otp-textinput';
import {wp, hp} from '../constants/Dimensions';
import {useMutation} from '@tanstack/react-query';
import {POST} from '../services/apiServices';
import {setItem} from '../constants/mmkv';
import showToast from '../Components/Toast';
import {AuthContext} from '../Navigation/Route';

const OtpScreen = ({navigation, route}) => {
  const {signIn} = useContext(AuthContext);
  const {email, passwordReset = false} = route.params;
  const [otp, setOtp] = useState('');
  const [time, setTime] = useState(30);
  const otpInput = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(prev => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const verifyOtp = useMutation({
    mutationFn: data => POST('verify-otp', data),
    onSuccess: data => {
      if (data?.status) {
        if (passwordReset) {
          navigation.replace('NewPassword', {email, otp});
          showToast('OTP verified, please reset your password');
          return;
        }
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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.pop()}
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
            containerStyle={{marginTop: hp(1)}}
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
          title="Verify"
          backgroundColor={theme.primery}
          color={theme.backgroundColor}
          onPress={() => {
            verifyOtp.mutate({email, otp});
          }}
        />

        <View style={styles.timerWrapper}>
          <Text style={styles.timerText}>Resend code to</Text>
          <Text style={styles.timerText}>
            00:{time < 10 ? `0${time}` : time}
          </Text>
        </View>
      </View>
    </View>
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
  otpBox: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: wp(4),
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
