import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CreateAccInfoProps} from '../types/navigator.type';

const register = require('../assets/images/register-icon.png');
const back = require('../assets/images/back-vector.png');
const phone = require('../assets/images/phone-num.png');
const birthday = require('../assets/images/cake-icon.png');
const user = require('../assets/images/user-icon.png');
const calendar = require('../assets/images/calendar-icon.png');

const CreateAccInfoScreen = ({navigation}: CreateAccInfoProps) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isMale, setIsMale] = useState(true);

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
            Create your Buddy
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
          {/* username */}
          <View className="bg-[#2C7CC133] flex-row items-center px-[20] rounded-lg mb-[8]">
            <View className="h-[13] w-[13]">
              <Image
                source={user}
                resizeMode="contain"
                className="h-full w-full"
              />
            </View>
            <View className="ml-[10] w-full">
              <TextInput
                placeholder="User name"
                placeholderTextColor={'#2C7CC1'}
                multiline={false}
                className="text-interBold font-[600] text-sm leading-[0] w-full text-[#2C7CC1] h-[50]"
              />
            </View>
          </View>
          {/* phone */}
          <View className="bg-[#2C7CC133] flex-row items-center px-[20] rounded-lg mb-[8]">
            <View className="h-[13] w-[13]">
              <Image
                source={phone}
                resizeMode="contain"
                className="h-full w-full"
                style={{tintColor: '#2C7CC1'}}
              />
            </View>
            <View className="ml-[10] w-full">
              <TextInput
                placeholder="Phone number"
                placeholderTextColor={'#2C7CC1'}
                multiline={false}
                className="text-interBold font-[600] text-sm leading-[0] w-full text-[#2C7CC1] h-[50]"
              />
            </View>
          </View>
          {/* date */}
          <View className="bg-[#2C7CC133] flex-row items-center px-[20] rounded-lg mb-[8]">
            <View className="h-[13] w-[13]">
              <Image
                source={birthday}
                resizeMode="contain"
                className="h-full w-full"
                style={{tintColor: '#2C7CC1'}}
              />
            </View>
            <View className="ml-[10] w-full flex-1">
              <TextInput
                placeholder="Date of Birth"
                placeholderTextColor={'#2C7CC1'}
                readOnly
                value={dateOfBirth}
                multiline={false}
                className="text-interBold font-[600] text-sm leading-[0] w-full text-[#2C7CC1] h-[50]"
              />
            </View>
            <TouchableOpacity
              className="w-[15] h-[15]"
              onPress={() => setOpenDatePicker(true)}>
              <Image
                source={calendar}
                resizeMode="contain"
                className="w-full h-full"
                style={{tintColor: '#2C7CC1'}}></Image>
            </TouchableOpacity>
            <DatePicker
              modal
              open={openDatePicker}
              date={date}
              mode="date"
              onConfirm={date => {
                setOpenDatePicker(false);
                setDate(date);
                setDateOfBirth(date.toLocaleDateString('en-GB'));
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
            />
          </View>
          {/* confirm pass */}
          <View className="flex-row items-center px-[20] rounded-lg">
            <Text className="text-[#2C7CC1] font-interBold">You are:</Text>
            {/* Male Radio Button */}
            <TouchableOpacity
              onPress={() => setIsMale(true)}
              className={`flex-row items-center ml-4 ${
                isMale ? 'border-[#2C7CC1]' : 'border-gray-400'
              }`}>
              <View
                className={`w-4 h-4 rounded-full mr-2 ${
                  isMale ? 'bg-[#2C7CC1]' : 'bg-gray-400'
                }`}
              />
              <Text
                className={`font-interMedium ${
                  isMale ? 'text-[#2C7CC1]' : 'text[#cdcdcd]'
                }`}>
                Male
              </Text>
            </TouchableOpacity>

            {/* Female Radio Button */}
            <TouchableOpacity
              onPress={() => setIsMale(false)}
              className={`flex-row items-center ml-4 ${
                !isMale ? 'border-[#2C7CC1]' : 'border-gray-400'
              } `}>
              <View
                className={`w-4 h-4 rounded-full mr-2 ${
                  !isMale ? 'bg-[#2C7CC1]' : 'bg-gray-400'
                }`}
              />
              <Text
                className={`font-interMedium ${
                  !isMale ? 'text-[#2C7CC1]' : 'text[#cdcdcd]'
                }`}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="w-full py-[15] bg-[#125B9A] mt-[20]"
            style={{borderRadius: 30}}>
            <Text
              className="text-center text-[#fff] font-interBold font-[700]"
              style={{
                fontSize: 17,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
          {/* nút signUP */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccInfoScreen;
