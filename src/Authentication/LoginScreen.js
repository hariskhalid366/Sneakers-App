import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {
  ChevronLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from 'react-native-heroicons/outline';

import {theme} from '../constants/theme';
import {InputField, SecurityIcon} from '../Components';
import LongButton from '../Components/LongButton';
import GoogleSignin from './GoogleSignIn';
import {hp, wp} from '../constants/Dimensions';
import {POST} from '../services/apiServices';
import {useMutation} from '@tanstack/react-query';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setItem} from '../constants/mmkv';
import {AuthContext} from '../Navigation/Route';
import showToast from '../Components/Toast';
const {width, height} = Dimensions.get('screen');

const LoginScreen = ({navigation}) => {
  const {signIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eye, setEye] = useState(true);

  const userLogin = useMutation({
    mutationFn: data => POST('login', data),
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
      {userLogin?.isPending && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator color={theme.primery} size={wp(20)} />
        </View>
      )}

      <KeyboardAwareScrollView
        extraHeight={hp(20)}
        enableOnAndroid={true}
        contentContainerStyle={styles.scrollContent}
        style={styles.container}>
        <TouchableOpacity onPress={navigation.pop} style={styles.backButton}>
          <ChevronLeftIcon color={theme.darkColor} size={wp(4.5)} />
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />

          <View style={styles.welcomeText}>
            <Text style={styles.heading}>Hello Again!</Text>
            <Text style={styles.subText}>
              Fill Your Details Or Continue With{'\n'}Social Media
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <InputField
              maxLength={40}
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
              prependChild={
                <UserIcon
                  strokeWidth={2}
                  color={theme.primeryDark}
                  size={wp(5)}
                />
              }
              appendChild={
                <EnvelopeIcon
                  strokeWidth={2}
                  color={theme.primeryDark}
                  size={wp(5)}
                />
              }
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <InputField
              maxLength={45}
              autoComplete="password"
              value={password}
              secureTextEntry={eye}
              onChangeText={setPassword}
              placeholder="Password"
              prependChild={
                <LockClosedIcon
                  strokeWidth={2}
                  color={theme.primeryDark}
                  size={wp(5)}
                />
              }
              appendChild={
                <SecurityIcon
                  color={theme.primeryDark}
                  size={wp(5)}
                  setIcon={eye}
                  onPress={() => setEye(!eye)}
                />
              }
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.push('Forget')}
            style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Forget Password</Text>
          </TouchableOpacity>

          <LongButton
            title="Sign In"
            backgroundColor={theme.primery}
            color={theme.backgroundColor}
            onPress={() => {
              userLogin?.mutate({email, password});
            }}
          />

          <GoogleSignin />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New User?</Text>
          <TouchableOpacity onPress={() => navigation.push('Register')}>
            <Text style={styles.createAccountText}> Create Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5),
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    height: height + wp(20),
    width,
    backgroundColor: '#00000044',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
  },
  backButton: {
    margin: wp(3),
    backgroundColor: theme.secondaryBackground,
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: wp(3),
    left: wp(3),
    zIndex: 100,
  },
  formContainer: {
    width: wp(90),
    paddingTop: wp(20),
    paddingBottom: wp(6),
    alignItems: 'center',
  },
  logo: {
    width: wp(32),
    height: wp(32),
    borderRadius: wp(16),
    marginBottom: wp(4),
  },
  welcomeText: {
    marginBottom: wp(5),
    alignItems: 'center',
  },
  heading: {
    fontSize: wp(7),
    fontWeight: 'bold',
    color: theme.darkColor,
    marginBottom: wp(1.5),
  },
  subText: {
    fontSize: wp(3.2),
    textAlign: 'center',
    letterSpacing: 0.5,
    color: theme.primeryDark,
  },
  inputGroup: {
    width: '100%',
    marginBottom: wp(3),
  },
  label: {
    fontSize: wp(3.5),
    fontWeight: '600',
    color: theme.darkColor,
    marginBottom: wp(1),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: wp(4),
  },
  forgotText: {
    fontSize: wp(3),
    fontWeight: '600',
    color: theme.primeryDark,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: wp(5),
  },
  footerText: {
    fontSize: wp(3.5),
    fontWeight: '600',
    color: theme.primeryDark,
  },
  createAccountText: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    color: theme.darkColor,
    marginLeft: wp(1),
  },
});
