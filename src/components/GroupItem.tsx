import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TFamily } from '../types/group.type';

interface IGroupItem {
  press: () => void;
  item: TFamily;
}

const GroupItem = ({ press, item }: IGroupItem) => {
  const getImageSource = (groupType: any) => {
    const images = {
      FAMILY: "https://res.cloudinary.com/daszajz9a/image/upload/v1734540191/project/Family_kva377.png",
      FRIEND: "https://res.cloudinary.com/daszajz9a/image/upload/v1734540193/project/Friend_ucaain.png"
    };
    return images[groupType] || images.FRIEND; // Mặc định trả về ảnh Friend nếu groupType không khớp
  };

  return (
    <TouchableOpacity
      onPress={press}
      className="flex flex-row items-center mb-4 gap-[20px]">
      <Image
        source={{ uri: getImageSource(item.groupType) }}
        className="h-[60px] w-[60px] rounded-[30px]"
      />

      <Text className="text-normal text-main font-interRegular">{item.groupName}</Text>
    </TouchableOpacity>
  );
};

export default GroupItem;
