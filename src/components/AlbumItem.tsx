import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TAlbum } from '../types/album.type';
import AngleRight from '../assets/icons/angle-right.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import CalendarDoneIcon from '../assets/icons/calendar-done.svg';
import { getStartAndEndDates, toReadableFormat } from '../helpers';
import SingleSidedShadowBox from './SingleSidedShadowBox';

interface AlbumItem {
    item: TAlbum;
    press: () => void
}

const AlbumItem = ({ item, press }: AlbumItem) => {
    const { title, posts } = item;

    // Handle case where there are no posts
    const hasPosts = posts && posts.length > 0;
    const imageUrl = hasPosts ? posts.at(0)?.image.imageUrl : 'https://res.cloudinary.com/daszajz9a/image/upload/v1734540193/project/Friend_ucaain.png'; // Default image
    const { startDate, endDate } = getStartAndEndDates(posts);
    const period = hasPosts
        ? `${toReadableFormat(startDate as string)} - ${toReadableFormat(endDate as string)}`
        : 'No posts available';

    return (
        <SingleSidedShadowBox style={{ overflow: 'hidden' }}>
            <TouchableOpacity className="bg-white rounded-lg flex flex-col space-y-2 mx-3 my-3" onPress={press}>
                <View>
                    <Image
                        className="w-full rounded-t-lg h-[200px]"
                        source={{ uri: imageUrl }}
                        resizeMode="cover"
                    />
                </View>
                <View className="flex flex-col items-start w-full space-y-1 px-4 pb-4">
                    <View className="flex flex-row items-center justify-between w-full">
                        <Text className="font-interMedium text-[15px]">{title}</Text>
                        <AngleRight width={18} height={18} />
                    </View>
                    <View className="flex flex-row space-x-2">
                        <CalendarIcon width={22} height={22} />
                        <Text className="font-interRegular text-gray-500">{period}</Text>
                    </View>
                    <View className="flex flex-row items-center space-x-2">
                        <CalendarDoneIcon width={22} height={22} />
                        <Text className="font-interRegular text-gray-500">{toReadableFormat(item.createdAt)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </SingleSidedShadowBox>
    );
};

export default AlbumItem;
