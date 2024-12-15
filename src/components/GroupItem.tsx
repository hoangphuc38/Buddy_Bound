import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

interface IGroupItem {
  press: () => void;
  item: Group;
}

export type Group = {
  id: number;
  name: string;
  avatar: string;
};

const GroupItem = ({press, item}: IGroupItem) => {
  return (
    <TouchableOpacity
      onPress={press}
      className="flex flex-row items-center mb-4 gap-[20px]">
      <Image
        source={{uri: item.avatar}}
        style={{height: 60, width: 60, borderRadius: 30}}
      />
      <Text className="text-normal text-main">{item.name}</Text>
    </TouchableOpacity>
  );
};

export default GroupItem;
