import React from 'react';
import { TNotification } from '../types/notification.type';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import Bell from '../assets/icons/bell-white.svg';

interface NotificationItemProps {
    item: TNotification
}

const NotificationItem = (data: NotificationItemProps) => {
    const { sender, message, isRead } = data.item;
    return (
        <TouchableOpacity className="flex justify-center py-1 px-2">
            <View className="flex flex-row justify-between">
                <View className="flex flex-row space-x-2">
                    <View className="h-[60px] w-[60px] flex items-center justify-top">
                        <View className="relative h-full w-full flex items-center">
                            <Image
                                source={{uri: sender.avatar}}
                                style={{height: 50, width: 50, borderRadius: 30}}
                            />
                            <View className="p-1 bg-blue-500 rounded-full absolute bottom-0 right-0">
                                <Bell width={22} height={22} />
                            </View>
                        </View>
                    </View>
                    <View className={'max-w-[270px]'}>
                        <Text className={`${isRead && 'text-gray-400'} text-interRegular break-word leading-5 max-w-[100%]`}>
                            { message }
                        </Text>
                        <Text className={`${!isRead ? 'text-blue-600 font-interMedium' : 'text-gray-500 font-interRegular'} text-[13px]`}>3w</Text>
                    </View>
                </View>
                {!isRead && <View className="flex items-center justify-center">
                    <View className="p-[6px] bg-blue-600 rounded-full" />
                </View>}
            </View>
        </TouchableOpacity>
    );
};

export default NotificationItem;
