import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterScreenProps} from '../types/navigator.type';

const register = require('../assets/images/register-icon.png');
const back = require('../assets/images/back-vector.png');
const email = require('../assets/images/email-icon.png');
const pasword = require('../assets/images/lock-icon.png');
const google = require('../assets/images/google-icon.png');

const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignUp = () => {
    let valid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(emailInput)) {
      setEmailError('Invalid email format');
      valid = false;
    }

    // Validate password
    if (!passwordInput) {
      setPasswordError('Password is required');
      valid = false;
    }

    // Validate confirm password
    if (!confirmPasswordInput) {
      setConfirmPasswordError('Please confirm your password');
      valid = false;
    } else if (passwordInput && confirmPasswordInput !== passwordInput) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    if (valid) {
      navigation.push('CreateAccInfo', {email: emailInput, password: passwordInput});
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FEFDFD]">
      <TouchableOpacity
        className="h-[35] w-[35] bg-[#2C7CC133] rounded-full mt-[70] relative left-[25] items-center justify-center"
        onPress={() => navigation.pop()}>
        <Image source={back} className="h-[17] w-[10]" />
      </TouchableOpacity>
      <View className="mt-[20] items-center justify-center">
        <View className="flex-row">
          <Text
            className="text-[#2C7CC1] font-[600]"
            style={{
              fontSize: 35,
            }}>
            Register
          </Text>
          <View className="h-[50] w-[40]">
            <Image
              source={register}
              resizeMode="contain"
              className="w-full h-full"
            />
          </View>
        </View>
        {/* form đăng ký */}
        <View className="mt-[40] px-[36] w-full">
          {/* email */}
          <View className="bg-[#2C7CC133] flex-row items-center px-[20] rounded-lg mb-[8]">
            <View className="h-[13] w-[13]">
              <Image
                source={email}
                resizeMode="contain"
                className="h-full w-full"
              />
            </View>
            <View className="ml-[10] w-full">
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#2C7CC1'}
                value={emailInput}
                onChangeText={setEmailInput}
                multiline={false}
                className="text-interBold font-[600] text-sm leading-[0] w-full text-[#2C7CC1] h-[50]"
              />
            </View>
          </View>
          {emailError ? (
            <Text className="text-[#FF0000] text-sm mt-[-5] mb-[8]">
              {emailError}
            </Text>
          ) : null}

          {/* password */}
          <View className="bg-[#2C7CC133] flex-row items-center px-[20] rounded-lg mb-[8]">
            <View className="h-[13] w-[13]">
              <Image
                source={pasword}
                resizeMode="contain"
                className="h-full w-full"
              />
            </View>
            <View className="ml-[10] w-full">
              <TextInput
                placeholder="Password"
                placeholderTextColor={'#2C7CC1'}
                secureTextEntry
                value={passwordInput}
                onChangeText={setPasswordInput}
                multiline={false}
                className="text-interBold font-[600] text-sm leading-[0] w-full text-[#2C7CC1] h-[50]"
              />
            </View>
          </View>
          {passwordError ? (
            <Text className="text-[#FF0000] text-sm mt-[-5] mb-[8]">
              {passwordError}
            </Text>
          ) : null}

          {/* confirm pass */}
          <View className="bg-[#2C7CC133] flex-row items-center px-[20] rounded-lg">
            <View className="h-[13] w-[13]">
              <Image
                source={pasword}
                resizeMode="contain"
                className="h-full w-full"
              />
            </View>
            <View className="ml-[10] w-full">
              <TextInput
                placeholder="Repeat your password"
                placeholderTextColor={'#2C7CC1'}
                secureTextEntry
                value={confirmPasswordInput}
                onChangeText={setConfirmPasswordInput}
                multiline={false}
                className="text-interBold font-[600] text-sm leading-[0] w-full text-[#2C7CC1] h-[50]"
              />
            </View>
          </View>
          {confirmPasswordError ? (
            <Text className="text-[#FF0000] text-sm mt-[3] mb-[8]">
              {confirmPasswordError}
            </Text>
          ) : null}

          <TouchableOpacity
            className="w-full py-[15] bg-[#125B9A] mt-[30]"
            style={{borderRadius: 30}}
            onPress={handleSignUp}>
            <Text
              className="text-center text-[#fff] font-interBold font-[700]"
              style={{
                fontSize: 17,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          {/* nút signUP */}
        </View>
        {/* continue with */}
        <View className="flex-row items-center justify-center mt-[60]">
          <View className="w-[80] h-[2] bg-[#00000080]" />
          <Text className="ml-[5] mr-[5] font-[500]">Or Continue With</Text>
          <View className="w-[80] h-[2] bg-[#00000080]" />
        </View>
        {/* google */}
        <TouchableOpacity className="mt-[20] w-[45] h-[45] border-[#d9d9d9] border-2 rounded-full p-[5]">
          <Image
            source={google}
            className="w-full h-full"
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* login */}
        <View className="flex-row gap-[5] mt-[80]">
          <Text className="font-[500] text-[#00000099]">
            Already have an account?
          </Text>
          <TouchableOpacity>
            <Text className="text-[#2C7CC1] font-[700]">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
