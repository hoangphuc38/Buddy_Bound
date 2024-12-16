import React from 'react';
import { Image, View } from 'react-native';
import { TPost } from '../types/post.type';

interface Props {
    item: TPost
}

const LocationHistoryPostItem = ({ item }: Props) => {
    const { image, location, note, createdAt, id } = item;
    return (
        <View className="w-full h-auto bg-white rounded-lg">
            <View className="bg-white p-2" />
        </View>
    );
};

export default LocationHistoryPostItem;
