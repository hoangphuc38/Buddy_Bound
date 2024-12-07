import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface IBuddyItem {
    press: () => void;
    horizontal?: boolean;
    item: Buddy;
}

export type Buddy = {
    id: number;
    name: string;
    avatar: string;
};

const BuddyItem = ({ press, horizontal, item }: IBuddyItem) => {
    if (horizontal) {
        return (
            <TouchableOpacity onPress={press} className='flex flex-row items-center mb-4 gap-[20px]'>
                <Image source={{ uri: item.avatar }}
                    style={{ height: 60, width: 60, borderRadius: 30 }} />
                <Text className='text-normal text-main'>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity onPress={press} className='flex items-center mr-4 gap-1'>
                <Image source={{ uri: item.avatar }}
                    style={{ height: 60, width: 60, borderRadius: 30 }} />
                <Text numberOfLines={1}
                    ellipsizeMode='tail'
                    className='text-small color-black max-w-[60px]'>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    }

}

export default BuddyItem;