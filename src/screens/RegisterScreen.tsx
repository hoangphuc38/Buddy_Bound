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
const user = require('../assets/images/user-icon.png');
const google = require('../assets/images/google-icon.png');

const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  const handleSignUp = () => {
    navigation.push('CreateAccInfo');
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
                multiline={false}
                className="text-interBold font-[600] text-sm leading-[0] w-full text-[#2C7CC1] h-[50]"
              />
            </View>
          </View>
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
                multiline={false}
                className="text-interBold font-[600] text-sm leading-[0] w-full text-[#2C7CC1] h-[50]"
              />
            </View>
          </View>
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
                multiline={false}
                className="text-interBold font-[600] text-sm leading-[0] w-full text-[#2C7CC1] h-[50]"
              />
            </View>
          </View>
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
