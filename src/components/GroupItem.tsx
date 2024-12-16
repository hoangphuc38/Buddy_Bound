import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TFamily } from '../types/group.type';

interface IGroupItem {
  press: () => void;
  item: TFamily;
}

const GroupItem = ({ press, item }: IGroupItem) => {
  return (
    <TouchableOpacity
      onPress={press}
      className="flex flex-row items-center mb-4 gap-[20px]">
      <Image
        source={{ uri: "https://th.bing.com/th/id/OIP.UCuDpMlqBpgLFFyg2OmwtQAAAA?rs=1&pid=ImgDetMain" }}
        style={{ height: 60, width: 60, borderRadius: 30 }}
      />
      <Text className="text-normal text-main">{item.groupName}</Text>
    </TouchableOpacity>
  );
};

export default GroupItem;
