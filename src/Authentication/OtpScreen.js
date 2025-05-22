import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import LongButton from '../Components/LongButton';
import OTPTextInput from 'react-native-otp-textinput';

const OtpScreen = ({navigation}) => {
  const [otp, setOtp] = React.useState('');
  const [time, setTime] = React.useState(30);

  const otpInput = React.useRef(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <View className="flex-1 p-5 bg-white">
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
            OTP Verification
          </Text>
          <Text
            style={styles.textColor}
            className="text-center text-sm tracking-wider">
            Please Check Your Email To See The{'\n'}Verification Code
          </Text>
        </View>
        <Text
          style={{color: theme.darkColor}}
          className="text-2xl font-bold tracking-wide">
          OTP Code
        </Text>
        <View className="my-2">
          <OTPTextInput
            containerStyle={{marginTop: 10}}
            autoFocus={true}
            keyboardType="number-pad"
            textInputStyle={{
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 16,
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.darkColor,
            }}
            tintColor={theme.primery}
            inputCount={4}
            handleTextChange={value => {
              setOtp(value);
            }}
            ref={otpInput}
          />
        </View>
        <LongButton
          title={'Verify'}
          backgroundColor={theme.primery}
          color={theme.backgroundColor}
          onPress={() => {}}
        />
        <View className="flex-row justify-between mx-1 my-5">
          <Text
            className="text-xs font-semibold tracking-wide "
            style={{color: theme.secondaryDark}}>
            Resend code to
          </Text>
          <Text
            className="text-xs font-semibold tracking-wide "
            style={{color: theme.secondaryDark}}>
            00:{time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  HeadingColor: {
    color: theme.darkColor,
  },
  textColor: {
    color: theme.primeryDark,
  },
});
