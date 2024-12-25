import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TMember } from '../types/member.type';

interface IApprovalMember {
  item: TMember;
}

const ApprovalMember = ({ item, handlePress }: IApprovalMember) => {
  return (
    <TouchableOpacity className="flex flex-row items-center justify-between mb-4 gap-[20px]">
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: item.user.avatar }}
          style={{ height: 50, width: 50, borderRadius: 30 }}
        />
        <View className="ml-5">
          <Text className="text-medium text-main font-medium">{item.user.fullName}</Text>
          {
            item.role && <Text className="text-[12px] text-[#7C7979] font-regular">
              {item.role}
            </Text>
          }

        </View>
      </View>
      <View className="flex flex-row">
        <Text className="text-primary text-[12px] font-medium mr-4">Approve</Text>
        <Text className="text-secondary text-[12px] font-medium">Decline</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ApprovalMember;
