import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface IBuddyItem {
    press: () => void;
    item: Buddy;
}

export type Buddy = {
    id: number;
    name: string;
    // avatar: any;
};

const BuddyItem = ({ press, item }: IBuddyItem) => {
    return (
        <TouchableOpacity onPress={press} className='flex items-center mr-4 gap-1'>
            <Image source={require("../assets/images/avatar.jpg")}
                style={{ height: 60, width: 60, borderRadius: 30 }} />
            <Text className='text-small color-black'>{item.name}</Text>
        </TouchableOpacity>
    );
}

export default BuddyItem;