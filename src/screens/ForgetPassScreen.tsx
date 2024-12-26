import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ForgetPassScreenProps} from '../types/navigator.type';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AuthApi} from '../api/auth.api';
import {faL} from '@fortawesome/free-solid-svg-icons';

const back = require('../assets/images/back-vector.png');
const nextIcon = require('../assets/images/next-icon.png');
const preIcon = require('../assets/images/previous-icon.png');
const checkIcon = require('../assets/images/check-icon.png');

const ForgetPassScreen = ({navigation}: ForgetPassScreenProps) => {
  // State để quản lý bước hiện tại
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [param, setParam] = useState('');
  const [keyboardType, setKeyboardType] = useState('');
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // Hàm kiểm tra email hợp lệ
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm chuyển bước
  const handleNext = async () => {
    if (currentStep === 1) {
      if (!validateEmail(email)) {
        setEmailError('Invalid email format');
        return;
      } else {
        try {
          setLoading(true);
          const response = await AuthApi.forgetPass({
            email: email as string,
          });
          setParam(email);
          setEmail('');
          setKeyboardType('numeric');
          setLoading(false);
          setCurrentStep(currentStep + 1);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
        setEmailError('');
      }
    } else if (currentStep === 2) {
      if (email === '' || !email) {
        setEmailError('Please type OTP');
      } else {
        try {
          setLoading(true);
          const response = await AuthApi.verifyCode({
            code: email as string,
            email: param as string,
          });
          setKeyboardType('');
          setEmail('');
          setLoading(false);
          setCurrentStep(currentStep + 1);
        } catch (error) {
          setLoading(false);
        }
        setEmailError('');
      }
    } else if (currentStep === 3) {
      if (!password || !confirmPass) {
        setEmailError('Please fill all needed information');
      }
      else {
        if (confirmPass !== password)
        {
          setEmailError('Password did not match');
        }
        else {
          try {
            setLoading(true);
            const response = await AuthApi.changePass({
              email: param as string,
              password: password as string,
            });
            setKeyboardType('');
            setEmail('');
            setLoading(false);
            navigation.navigate('LogIn');
          } catch (error) {
            setLoading(false);
          }
          setEmailError('');
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Dữ liệu cho từng bước
  const steps = [
    {
      title: 'Verify your email',
      placeholder: 'Type your email',
      image: require('../assets/images/email-verify.png'),
      showPrevious: false,
      showDone: false,
    },
    {
      title: 'Verify OTP',
      placeholder: 'Type your OTP',
      image: require('../assets/images/otp-verify.png'),
      showPrevious: true,
      showDone: false,
    },
    {
      title: 'Create new Password',
      placeholder: 'Type your new password',
      placeholderConfirm: 'Re-type your new password',
      image: require('../assets/images/confirm-pass.png'),
      showPrevious: true,
      showDone: true,
    },
  ];

  const currentData = steps[currentStep - 1];

  return (
    <SafeAreaView className="flex-1 bg-[#FEFDFD]">
      <TouchableOpacity
        className="h-[35] w-[35] bg-[#2C7CC133] rounded-full mt-[40] absolute left-[25] items-center justify-center"
        onPress={() => navigation.pop()}>
        <Image source={back} className="h-[17] w-[10]" />
      </TouchableOpacity>
      <View className="mt-[40] w-full items-center justify-center">
        {/* tiêu đề */}
        <Text className="text-[#2C7CC1] font-interBold" style={{fontSize: 24}}>
          {currentData.title}
        </Text>
        {/* ảnh */}
        <View className="w-[175] h-[175] mt-[10]">
          <Image
            className="w-full h-full"
            resizeMode="contain"
            source={currentData.image}
          />
        </View>
        {/* nhập liệu */}
        <View className="w-full px-[36]">
          {currentStep === 3 ? (
            <>
              <View
                className={`${emailError === '' ? 'bg-[#2C7CC133]' : 'bg-[#fdb5b5]'} px-[20] rounded-lg flex-row items-center`}>
                <TextInput
                  placeholder={currentData.placeholder}
                  placeholderTextColor={emailError === '' ? '#2C7CC1' : '#FE5C5C'}
                  multiline={false}
                  secureTextEntry
                  value={password}
                  onChangeText={e => setPassword(e)}
                  className={`font-interBold h-[50] text-sm flex-1  ${
                    emailError === '' ? 'text-[#2C7CC1]' : 'text-[#FE5C5C]'
                  }`}
                />
              </View>
              <View className={`${emailError === '' ? 'bg-[#2C7CC133]' : 'bg-[#fdb5b5]'} px-[20] rounded-lg flex-row items-center mt-2`}>
                <TextInput
                  placeholder={currentData.placeholderConfirm}
                  placeholderTextColor={emailError === '' ? '#2C7CC1' : '#FE5C5C'}
                  multiline={false}
                  secureTextEntry
                  value={confirmPass}
                  onChangeText={e => setConfirmPass(e)}
                  className={`font-interBold h-[50] text-sm flex-1  ${
                    emailError === '' ? 'text-[#2C7CC1]' : 'text-[#FE5C5C]'
                  }`}
                />
              </View>
            </>
          ) : (
            <View
              className={`px-[20] rounded-lg flex-row items-center ${
                emailError === '' ? 'bg-[#2C7CC133]' : 'bg-[#fdb5b5]'
              }`}>
              <TextInput
                placeholder={currentData.placeholder}
                placeholderTextColor={emailError === '' ? '#2C7CC1' : '#FE5C5C'}
                multiline={false}
                className={`font-interBold h-[50] text-sm flex-1  ${
                  emailError === '' ? 'text-[#2C7CC1]' : 'text-[#FE5C5C]'
                }`}
                value={email}
                keyboardType={keyboardType}
                onChangeText={e => setEmail(e)}
              />
            </View>
          )}
          {emailError && (
            <Text className=" text-red-500 mt-[5]">{emailError}</Text>
          )}
          {/* nút chuyển bước */}
          <View
            className="mt-[10] justify-between flex-row w-full items-center"
            style={{gap: 8}}>
            {currentData.showPrevious && (
              <TouchableOpacity
                className="flex-1 rounded-3xl justify-center items-center bg-[#125B9A]"
                onPress={handlePrevious}>
                <View
                  style={{gap: 5}}
                  className="py-[15] flex-row justify-center items-center">
                  <View className="h-[14] w-[15]">
                    <Image
                      source={preIcon}
                      resizeMode="contain"
                      className="w-full h-full"
                    />
                  </View>
                  <Text className="text-white font-interBold text-base">
                    Previous
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="flex-1 rounded-3xl justify-center items-center bg-[#125B9A]"
              onPress={handleNext}>
              <View
                style={{gap: 5}}
                className="py-[15] flex-row justify-center items-center">
                <Text className="text-white font-interBold text-base">
                  {currentData.showDone ? 'Done' : 'Next'}
                </Text>
                <View className="h-[14] w-[15]">
                  {!loading ? (
                    <Image
                      source={currentData.showDone ? checkIcon : nextIcon}
                      resizeMode="contain"
                      className="w-full h-full"
                    />
                  ) : (
                    <ActivityIndicator size={'small'} color={'#fff'} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        className="flex-row absolute bottom-[20] self-center"
        style={{
          gap: 5,
        }}>
        <Text className="text-[#00000099] font-interMedium">
          Don't have account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="font-interBold text-[#2C7CC1]">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassScreen;
