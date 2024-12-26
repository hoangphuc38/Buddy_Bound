import { Image, Text, TouchableOpacity, View } from 'react-native';
import Back from '../assets/icons/back.svg';
import Map from '../assets/icons/map.svg';
import { TBuddy, TFamily, TGroup } from '../types/group.type';

interface ChatHeaderProps {
    back: () => void,
    item?: TBuddy | TFamily
}

const ChatHeader = ({ back, item }: ChatHeaderProps) => {
    const getItemUserData = (item: TBuddy | TFamily) => {
        if ('userDto' in item) {
          return { fullName: item.userDto.fullName, avatar: item.userDto.avatar };
        }
        return { fullName: item.groupName, avatar: 'https://res.cloudinary.com/daszajz9a/image/upload/v1734540191/project/Family_kva377.png' };
      };

    const displayedItem = getItemUserData(item);
    return (
        <View className="overflow-hidden pb-5 absolute top-0 right-0 left-0">
            <View className="w-full px-4 py-2 h-[90px] flex flex-row justify-between items-center border-b border-slate-200">
                <View className="flex flex-row space-x-4 items-center">
                    <TouchableOpacity onPress={back} className="p-2 items-center justify-center rounded-full">
                        <Back width={25} height={25} />
                    </TouchableOpacity>
                    <View className="flex flex-row items-center space-x-2">
                        <Image
                            className="h-[55px] w-[55px] rounded-full"
                            source={{ uri: displayedItem.avatar }}
                        />
                        <View>
                            <Text className="font-interBold text-[16px]">{displayedItem.fullName}</Text>
                            <Text className="font-interLight text-[13px] text-gray-600">Group</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <Map width={40} height={40} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatHeader;
