import React from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { TMember } from '../types/member.type';
import { TUser } from '../types/user.type';

interface IMemberItem {
  press: () => void;
  horizontal?: boolean;
  item: TMember | TUser;
  isInvited?: boolean
}

const MemberItem = ({ press, horizontal, item, isInvited }: IMemberItem) => {
  const getItemUserData = (item: TMember | TUser) => {
    if ('user' in item) {
      return { fullName: item.user.fullName, avatar: item.user.avatar, nameButton: 'Invite', nameButtonSelected: 'Invited' };
    }
    return { fullName: item.fullName, avatar: item.avatar, nameButton: 'Add', nameButtonSelected: 'Added' };
  };

  const displayedItem = getItemUserData(item);
  if (horizontal) {
    return (
      <View
        className="flex flex-row items-center mb-4 justify-between">
        <View className="flex flex-row items-center space-x-3">
          <Image
            source={{ uri: displayedItem.avatar }}
            style={{ height: 50, width: 50, borderRadius: 30 }}
          />
          <Text className="font-interRegular text-gray-700 text-[15px]">{displayedItem.fullName}</Text>
        </View>
        <TouchableOpacity onPress={press} className={`px-4 py-2 ${isInvited ? 'bg-secondary' : 'bg-primary'} rounded-full`}>
          <Text className="text-white font-interBold">{!isInvited ? displayedItem.nameButton : displayedItem.nameButtonSelected}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={press}
        className="flex items-center mr-4 gap-1">
        <Image
          source={{ uri: displayedItem.avatar }}
          style={{ height: 60, width: 60, borderRadius: 30 }}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-small color-black max-w-[60px]">
          {displayedItem.fullName}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default MemberItem;
