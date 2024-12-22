import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LogInScreenProps} from '../types/navigator.type';
import React from 'react';
import { useAuth } from '../contexts/auth-context';
import { ToastOptions, toast } from '@baronha/ting';
import { useInput } from '../hooks/useInput';
import { Validator } from '../helpers/validator';
import { AuthApi } from '../api/auth.api';
import { UserContext } from '../contexts/user-context';

const backgroundImg = require('../assets/images/login-background.png');
const email = require('../assets/images/email-icon.png');
const pasword = require('../assets/images/lock-icon.png');

const LoginScreen = ({navigation}: LogInScreenProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { signIn } = useAuth();
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
        const { account, access_token, refresh_token } = await AuthApi.login({
            email: emailValue as string,
            password: passwordValue as string,
        });

        const { user } = account;
        if (access_token && refresh_token && user) {
            setEmailValue('');
            setPasswordValue('');
            signIn(`Bearer ${refresh_token}`);
            setUser(user);

            const options: ToastOptions = {
              title: 'Login',
              message: 'Login successfully!',
              preset: 'done',
              backgroundColor: '#e2e8f0',
            };
            toast(options);
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
};

  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    setEnteredValue: setEmailValue,
    didEdit: emailDidEdit,
    hasError: emailHasError,
  } = useInput({
      defaultValue: '',
      validationFn: (emailText) => Validator.validateEmail(emailText as string),
  });

  const {
      value: passwordValue,
      handleInputBlur: handlePasswordBlur,
      handleInputChange: handlePasswordChange,
      setEnteredValue: setPasswordValue,
      didEdit: passwordDidEdit,
      hasError: passwordHasError,
  } = useInput({
      defaultValue: '',
      validationFn: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(value as string),
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Image style={styles.img} source={backgroundImg} />
        </View>
        <View style={styles.loginForm}>
          <Text style={{fontSize: 24, fontWeight: 700, color: '#2C7CC1'}}>
            Login to Buddy Bound
          </Text>
          <View style={styles.form}>
            <View style={styles.textInput}>
              <View style={{height: 13, width: 13}}>
                <Image source={email} style={styles.icon} />
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="Email"
                  value={emailValue}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  placeholderTextColor={'#2C7CC1'}
                  multiline={false}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#2C7CC1',
                    height: 50,
                  }}
                />
              </View>
            </View>
            <View style={styles.textInput}>
              <View style={{height: 13, width: 13}}>
                <Image source={pasword} style={styles.icon} />
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="Password"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  placeholderTextColor={'#2C7CC1'}
                  secureTextEntry
                  multiline={false}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#2C7CC1',
                    height: 50,
                  }}
                />
              </View>
            </View>
            {/* remember me */}
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    isChecked && {
                      backgroundColor: '#2C7CC1',
                      borderColor: '#2C7CC1',
                    },
                  ]}
                  onPress={() => setIsChecked(!isChecked)}>
                  {isChecked && <Text style={styles.tick}>✔</Text>}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Remember me</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.push('ForgetPass')}>
                <Text style={{color: '#2C7CC1', fontWeight: 600}}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* nút đăng nhập */}
          <View style={styles.loginBtnContainer}>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={handleLogin}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 17,
                  fontWeight: 700,
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{color: 'rgba(0, 0, 0, 0.6)', fontWeight: 500}}>
                Don't have account?
              </Text>
              <TouchableOpacity onPress={() => navigation.push('Register')}>
                <Text style={{color: '#2C7CC1', fontWeight: 700}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEFDFD',
  },
  backgroundContainer: {
    position: 'relative',
    height: '45%',
    width: '100%',
    marginTop: 5,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  loginForm: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  form: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 36,
    gap: 8,
  },
  textInput: {
    backgroundColor: 'rgba(44, 124, 193, 0.2)',
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textInputContainer: {
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2C7CC1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: {
    fontSize: 12, // Kích thước dấu tick
    color: '#fff', // Màu tick
    fontWeight: 'bold',
    left: 1,
    bottom: 1,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2C7CC1',
  },
  loginBtnContainer: {
    width: '100%',
    paddingHorizontal: 36,
    gap: 15,
    marginTop: 70,
    alignItems: 'center',
  },
  btnLogin: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#125B9A',
    borderRadius: 30,
  },
});
