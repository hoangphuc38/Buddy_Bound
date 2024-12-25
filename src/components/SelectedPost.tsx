import React from 'react';
import { TPost } from '../types/post.type';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CalendarIcon from '../assets/icons/calendar.svg';
import { toReadableFormat } from '../helpers';

interface ISelectedPost {
    item: TPost,
    isSelected: boolean,
    select: () => void;
}

const SelectedPost = ({ item, isSelected, select }: ISelectedPost) => {
    if (!item.image) {
        return;
    }
    return (
        <TouchableOpacity onPress={select} className={`${isSelected ? 'border border-primary' : ''} rounded-lg h-[102px] flex items-center justify-center`}>
            <View className="flex flex-row items-center space-x-2 h-[100px] w-full">
                <Image
                    className={`h-[100px] w-[100px] ${isSelected ? 'rounded-l-lg' : 'rounded-lg'}`}
                    source={{uri: item.image.imageUrl }}
                />
                <View className="flex flex-col items-center justify-start space-y-2">
                    <Text className="font-interMedium">{item.note}</Text>
                    <View className="flex flex-row space-x-2 items-center">
                        <CalendarIcon width={22} height={22} />
                        <Text className="font-interRegular text-gray-500">{toReadableFormat(item.createdAt)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SelectedPost;
