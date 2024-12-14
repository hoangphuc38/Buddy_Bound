import { Image, Text, TouchableOpacity, View } from "react-native";

interface IGroupMember {
    item: GroupMember;
}

export type GroupMember = {
    id: number;
    name: string;
    avatar: string;
    relationship: string;
    isAdmin?: boolean;
}

const GroupMember = ({ item }: IGroupMember) => {
    return (
        <TouchableOpacity className='flex flex-row items-center mb-4 gap-[20px]'
        >
            <Image source={{ uri: item.avatar }}
                style={item.isAdmin ? { height: 50, width: 50, borderRadius: 30, borderWidth: 2, borderColor: "#FF6600" }
                    : { height: 50, width: 50, borderRadius: 30 }} />
            <View>
                <Text className='text-medium text-main font-medium'>
                    {item.name}
                </Text>
                <Text className='text-[12px] text-[#7C7979] font-regular'>
                    {item.relationship}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default GroupMember;