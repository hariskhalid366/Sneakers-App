import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ChevronLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {ScrollView} from 'react-native-gesture-handler';

import {theme} from '../constants/theme';
import {InputField, SecurityIcon} from '../Components';
import LongButton from '../Components/LongButton';
import GoogleSignin from './GoogleSignIn';
import {useLoginUserAccountMutation} from '../ReduxStore/apiSlice';

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
        const response = await loginUserAccount({email, password});

        if (response?.error?.data?.message) {
          ToastAndroid.showWithGravity(
            response.error.data.message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          return;
        }

        // await Storage.setToken(response.data?.token); // ✅ Use MMKV wrapper
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
        <View style={styles.loaderOverlay}>
          <ActivityIndicator color={theme.primery} size={80} />
        </View>
      )}

      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.backButton}>
          <ChevronLeftIcon color={theme.darkColor} size={18} />
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <View style={styles.welcomeText}>
            <Text style={[styles.headingColor, styles.heading]}>
              Hello Again!
            </Text>
            <Text style={[styles.textColor, styles.subText]}>
              Fill Your Details Or Continue With{'\n'}Social Media
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text className={input} style={styles.headingColor}>
              Email Address
            </Text>
            <InputField
              maxLength={40}
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
              prependChild={
                <UserIcon strokeWidth={2} color={theme.primeryDark} size={22} />
              }
              appendChild={
                <EnvelopeIcon
                  strokeWidth={2}
                  color={theme.primeryDark}
                  size={22}
                />
              }
            />
          </View>

          <View style={styles.inputGroup}>
            <Text className={input} style={styles.headingColor}>
              Password
            </Text>
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
                  size={22}
                />
              }
              appendChild={
                <SecurityIcon
                  color={theme.primeryDark}
                  size={22}
                  setIcon={eye}
                  onPress={() => setEye(!eye)}
                />
              }
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.push('Forget')}
            style={styles.forgotPassword}>
            <Text style={[styles.textColor, styles.forgotText]}>
              Recovery Password
            </Text>
          </TouchableOpacity>

          <LongButton
            title="Sign In"
            backgroundColor={theme.primery}
            color={theme.backgroundColor}
            onPress={handleLogin}
          />

          <GoogleSignin />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.textColor, styles.footerText]}>New User?</Text>
          <TouchableOpacity onPress={() => navigation.push('Register')}>
            <Text style={[styles.headingColor, styles.createAccountText]}>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loaderOverlay: {
    backgroundColor: '#00000044',
    height: height + 100,
    width: width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
    top: 0,
    paddingBottom: 100,
  },
  backButton: {
    backgroundColor: theme.secondaryBackground,
    width: 48,
    height: 48,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    height: 700,
    width: 360,
    alignSelf: 'center',
  },
  welcomeText: {
    marginVertical: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 28,
    letterSpacing: 2,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    textAlign: 'center',
    fontSize: 12,
    letterSpacing: 1,
  },
  inputGroup: {
    marginBottom: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    width: 128,
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  createAccountText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headingColor: {
    color: theme.darkColor,
  },
  textColor: {
    color: theme.primeryDark,
  },
});
