import React from 'react';
import { TNotification } from '../types/notification.type';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import Bell from '../assets/icons/bell-white.svg';
import GroupPost from '../assets/icons/post-noti.svg';
import GroupInvitation from '../assets/icons/user-add.svg';
import Comment from '../assets/icons/comment-noti.svg';
import { TimeFormatter } from '../helpers';

interface NotificationItemProps {
    item: TNotification
    onPress: () => void
}

const NotificationItem = (data: NotificationItemProps) => {
    const { sender, message, isRead, notificationType, createdAt } = data.item;
    const getCorrectIcon = (type: 'COMMENT' | 'RELATIONSHIP_REQUEST' | 'GROUP_POST' | 'GROUP_INVITATION') => {
        switch (type) {
            case 'COMMENT':
                return <Comment width={20} height={20} />;
            case 'GROUP_INVITATION':
                return <GroupInvitation width={20} height={20} />;
            case 'RELATIONSHIP_REQUEST':
                return <Bell width={20} height={20} />;
            case 'GROUP_POST':
                return <GroupPost width={20} height={20} />;
        }
    };
    return (
        <TouchableOpacity onPress={data.onPress}
            className="flex justify-center py-1 px-2">
            <View className="flex flex-row justify-between">
                <View className="flex flex-row space-x-2">
                    <View className="h-[60px] w-[60px] flex items-center justify-top">
                        <View className="relative h-full w-full flex items-center">
                            <Image
                                source={{ uri: sender.avatar }}
                                style={{ height: 50, width: 50, borderRadius: 30 }}
                            />
                            <View className="p-[5px] bg-primary rounded-full absolute bottom-0 right-0">
                                {getCorrectIcon(notificationType)}
                            </View>
                        </View>
                    </View>
                    <View className={'max-w-[270px]'}>
                        <Text className={`${isRead && 'text-gray-400'} text-interRegular break-word leading-5 max-w-[100%]`}>
                            {message}
                        </Text>
                        <Text className={`${!isRead ? 'text-primary font-interMedium' : 'text-gray-500 font-interRegular'} text-[13px]`}>{TimeFormatter.format(createdAt)}</Text>
                    </View>
                </View>
                {!isRead && <View className="flex items-center justify-center">
                    <View className="p-[6px] bg-primary rounded-full" />
                </View>}
            </View>
        </TouchableOpacity>
    );
};

export default NotificationItem;
