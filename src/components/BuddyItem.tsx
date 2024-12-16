import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TBuddy } from '../types/group.type';

interface IBuddyItem {
  press: () => void;
  horizontal?: boolean;
  item: TBuddy;
}

const BuddyItem = ({ press, horizontal, item }: IBuddyItem) => {
  if (horizontal) {
    return (
      <TouchableOpacity
        onPress={press}
        className="flex flex-row items-center mb-4 gap-[20px]">
        <Image
          source={{ uri: item.userDto.avatar }}
          style={{ height: 60, width: 60, borderRadius: 30 }}
        />
        <Text className="text-normal text-main">{item.userDto.fullName}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={press}
        className="flex items-center mr-4 gap-1">
        <Image
          source={{ uri: item.userDto.avatar }}
          style={{ height: 60, width: 60, borderRadius: 30 }}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-small color-black max-w-[60px]">
          {item.userDto.fullName}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default BuddyItem;
