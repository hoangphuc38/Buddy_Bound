import {Image, Text, TouchableOpacity, View} from 'react-native';

interface IApprovalMember {
  item: ApprovalMember;
}

export type ApprovalMember = {
  id: number;
  name: string;
  avatar: string;
  relationship: string;
};

const ApprovalMember = ({item}: IApprovalMember) => {
  return (
    <TouchableOpacity className="flex flex-row items-center justify-between mb-4 gap-[20px]">
      <View className="flex flex-row items-center">
        <Image
          source={{uri: item.avatar}}
          style={{height: 50, width: 50, borderRadius: 30}}
        />
        <View className="ml-5">
          <Text className="text-medium text-main font-medium">{item.name}</Text>
          <Text className="text-[12px] text-[#7C7979] font-regular">
            {item.relationship}
          </Text>
        </View>
      </View>
      <View className="flex flex-row">
        <Text className="text-main text-[12px] font-medium mr-4">Approve</Text>
        <Text className="text-secondary text-[12px] font-medium">Decline</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ApprovalMember;
