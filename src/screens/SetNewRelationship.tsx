import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Animated,
} from 'react-native';
import {SetNewRelationshipScreenProps} from '../types/navigator.type';
import {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Search from '../components/search';

const back = require('../assets/images/back-vector.png');
const home = require('../assets/images/home-icon.png');
const group = require('../assets/images/group-icon.png');
const chevronDown = require('../assets/images/chevron-down.png');

const SetNewRelationshipScreen = ({
  navigation,
}: SetNewRelationshipScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-[#FEFDFD] items-center">
      <TouchableOpacity className="h-[35] w-[35] mt-[20] absolute justify-center items-center left-[15] bg-[#2C7CC133] rounded-full">
        <Image source={back} className="h-[17] w-[10]" />
      </TouchableOpacity>
      <View className="mt-[20] items-center justify-center w-full px-[20]">
        <Text className=" leading-[0]-  text-2xl font-[600] text-[#2C7CC1]">
          New Relationship
        </Text>
        <View className="h-[150] w-[150] rounded border mt-[15]" />
      </View>
    </SafeAreaView>
  );
};

export default SetNewRelationshipScreen;
