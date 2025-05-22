import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ChevronLeftIcon, EnvelopeIcon} from 'react-native-heroicons/outline';
import {theme} from '../constants/theme';
import {InputField, RecoveryModal} from '../Components';
import LongButton from '../Components/LongButton';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');

  const {dismiss} = useBottomSheetModal();

  const ModalRef = React.useRef(null);

  const openFilterModel = () => {
    ModalRef?.current.present();
  };

  return (
    <>
      <RecoveryModal ref={ModalRef} />
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
              Forgot Password
            </Text>
            <Text
              style={styles.textColor}
              className="text-center text-xs tracking-wider">
              Enter Your Email Account To Reset{'\n'}Your Password
            </Text>
          </View>
          <View className="my-2">
            <InputField
              maxLength={40}
              autoComplete={'email'}
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder={'xyz@gmail.com'}
              appendChild={
                <EnvelopeIcon color={theme.primeryDark} size={'22'} />
              }
            />
          </View>
          <LongButton
            title={'Reset Password'}
            backgroundColor={theme.primery}
            color={theme.backgroundColor}
            onPress={() => {
              if (email.length > 2 && email.includes('@')) {
                setTimeout(() => {
                  openFilterModel();
                  if (dismiss) {
                    navigation.push('OtpScreen');
                  }
                }, 500);
              } else {
                ToastAndroid.showWithGravity(
                  'Please Enter Your Proper Email',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              }
            }}
          />
        </View>
      </View>
    </>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  HeadingColor: {
    color: theme.darkColor,
  },
  textColor: {
    color: theme.primeryDark,
  },
});
