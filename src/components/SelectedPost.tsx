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
        <TouchableOpacity onPress={select} className={`${isSelected ? 'border border-blue-400' : ''} p-2`}>
            <View className="flex flex-row items-center space-x-2">
                <Image
                    className="h-[100px] w-[100px]"
                    source={{uri: item.image.imageUrl }}
                />
                <View className="flex flex-col items-center justify-start">
                    <Text>{item.note}</Text>
                    <View className="flex flex-row space-x-2">
                        <CalendarIcon width={22} height={22} />
                        <Text>{toReadableFormat(item.createdAt)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SelectedPost;
