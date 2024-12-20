import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TMember } from '../types/member.type';

interface IGroupMember {
  item: TMember;
  onPress?: () => void
}

const GroupMember = ({ item, onPress }: IGroupMember) => {
  return (
    <TouchableOpacity onPress={onPress}
      className="flex flex-row items-center mb-4 gap-[20px]">
      <Image
        source={{ uri: item.user.avatar }}
        style={
          item.isAdmin
            ? {
              height: 50,
              width: 50,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: '#FF6600',
            }
            : { height: 50, width: 50, borderRadius: 30 }
        }
      />
      <View>
        <Text className="text-medium text-main font-medium">{item.user.fullName}</Text>
        {
          item.role && <Text className="text-[10px] text-[#7C7979] font-regular">
            {item.role}
          </Text>
        }
      </View>
    </TouchableOpacity>
  );
};

export default GroupMember;
