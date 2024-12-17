import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WelcomeScreenProps} from '../types/navigator.type';

const welcomeImg = require('../assets/images/welcome-img.png');

const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  return (
    <SafeAreaView className="bg-white flex flex-1 flex-col items-center space-y-4 my-4">
      <View >
        <Text className="font-interBold text-xl text-[#125B9A]">Welcome to Buddy Bound</Text>
      </View>
      <View className="flex flex-col items-center justify-center space-y-1">
        <Text className="font-interRegular text-sky-700">Buddy Bound helps connect families and friends</Text>
        <Text className="text-center font-interRegular leading-5 text-sky-700">
          By prodviding real-time location updates and useful features
        </Text>
      </View>
      <View className="flex items-center justify-center w-full">
        <Image resizeMode="contain" className="w-full h-[75%]"  source={welcomeImg} />
      </View>
      <View className="flex items-center">
        <TouchableOpacity
            className="bg-[#125B9A] px-20 py-4 rounded-full"
            onPress={() => navigation.push('LogIn')}>
            <Text className="font-interBold text-white">
              GET STARTED
            </Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEFDFD',
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imgContainer: {
    width: '90%',
    height: '100%',
    position: 'absolute',
    flex: 1,
  },
  butContainer: {
    bottom: 80,
    position: 'absolute',
  },
  btnGo: {
    paddingHorizontal: 100,
    backgroundColor: '#125B9A',
    paddingVertical: 17,
    borderRadius: 30,
  },
});
