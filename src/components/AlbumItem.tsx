import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TAlbum } from '../types/album.type';
import AngleRight from '../assets/icons/angle-right.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import { toReadableFormat } from '../helpers';
import SingleSidedShadowBox from './SingleSidedShadowBox';

interface AlbumItem {
    item: TAlbum
}

const AlbumItem = ({ item }: AlbumItem) => {
    const { title, posts  } = item;
    const imageUrl = posts.at(0)?.image.imageUrl as string;
    const startDate = posts.at(0)?.createdAt;
    const endDate = posts.at(posts.length - 1)?.createdAt;
    const period = toReadableFormat(startDate as string) + ' - ' + toReadableFormat(endDate as string);

    return (
        <SingleSidedShadowBox style={{ overflow: 'hidden' }}>
            <TouchableOpacity className="bg-white rounded-lg flex flex-col space-y-2 mx-3 my-3">
            <View>
                <Image className="w-full rounded-t-lg h-[200px]" source={{uri: imageUrl}} resizeMode="cover"/>
            </View>
            <View className="flex flex-col items-start w-full space-y-1 px-4 pb-4">
                <View className="flex flex-row items-center justify-between w-full">
                    <Text className="font-interMedium text-lg">{title}</Text>
                    <AngleRight width={18} height={18} />
                </View>
                <View className="flex flex-row space-x-2">
                    <CalendarIcon width={22} height={22} />
                    <Text className="font-interRegular text-gray-500">{period}</Text>
                </View>
            </View>
            </TouchableOpacity>
        </SingleSidedShadowBox>
    );
};

export default AlbumItem;
