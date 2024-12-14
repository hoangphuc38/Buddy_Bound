import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

interface IMemorableItem {
  press: () => void;
  item: MemorableItem;
}

export type MemorableItem = {
  name: string;
};

const MemorableItem = ({item, press}: IMemorableItem) => {
  return (
    <TouchableOpacity
      onPress={press}
      className="flex flex-row items-center mb-4 gap-[10px]">
      <View className="flex items-center justify-center bg-backButton w-[45px] h-[45px] rounded-full">
        <Image
          source={require('../assets/images/location.png')}
          style={{height: 30, width: 30}}
        />
      </View>

      <Text className="text-medim text-black font-medium">{item.name}</Text>
    </TouchableOpacity>
  );
};

export default MemorableItem;
