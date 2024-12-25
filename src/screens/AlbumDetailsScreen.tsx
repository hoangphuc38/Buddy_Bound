import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { AlbumDetailsScreenProps, RootStackParamList } from '../types/navigator.type';
import Header from '../components/Header';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { TAlbum } from '../types/album.type';
import { AlbumApi } from '../api/album.api';
import CalendarIcon from '../assets/icons/calendar.svg';
import TrashIcon from '../assets/icons/trash.svg';
import { getStartAndEndDates, toReadableFormat } from '../helpers';
import { TPost } from '../types/post.type';
import { AlbumImageItem } from '../components/AlbumImageItem';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { toast, ToastOptions } from '@baronha/ting';

const AlbumDetailsScreen = ({
  route,
  navigation,
}: AlbumDetailsScreenProps & { route: RouteProp<RootStackParamList, 'AlbumDetailsScreen'> }) => {
    const { albumId } = route.params;
    const [album, setAlbum] = useState<TAlbum>();
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedPost, setSelectedPost] = useState<TPost>();
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);

    const hasPosts = album && album.posts.length > 0;
    const { startDate, endDate } = getStartAndEndDates(hasPosts ? album.posts : []);
    const period = hasPosts
            ? `${toReadableFormat(startDate as string)} - ${toReadableFormat(endDate as string)}`
            : 'No posts available';

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await AlbumApi.deleteAlbum(albumId);
            const options: ToastOptions = {
                title: 'Album',
                message: 'Delete successfully!',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
        toast(options);
        setLoading(false);
        setDialogVisible(false);
        navigation.pop();
        } catch(error) {
            console.log('err: ', error);
            setLoading(true);
            setDialogVisible(false);
        }
    };

    const fetch = async () => {
        try {
            const { data } = await AlbumApi.getAlbumById(albumId);
            setAlbum(data);
            setSelectedPost(data.posts.at(0));
            setLoading(false);
        } catch (error) {
            console.error('Err', error);
            setLoading(false);
        }
    };


    useFocusEffect(
        useCallback(() => {
            fetch();
        }, [])
    );

    if (loading) {
        return (
            <View className="flex flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2C7CC1" />
            </View>
        );
    }

    return (
        <>
            <Header title="Album" onBack={() => navigation.pop()} onPrimaryAction={() => navigation.push('AddAlbum', { isEditMode: true, albumId: albumId })} primaryText="Edit"/>
            <View className="">
                <View className="flex flex-row items-center justify-between p-4">
                    <View className="flex flex-1 flex-col space-y-2">
                        <Text className="text-lg font-interMedium">{album?.title}</Text>
                        <View className="flex flex-row items-center space-x-2">
                        <CalendarIcon width={22} height={22} />
                        <Text className="font-interRegular text-gray-600">{period}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        className="bg-red-600 rounded-full items-center justify-center"
                        style={{ width: 40, height: 40, marginLeft: 10 }}
                        onPress={() => setDialogVisible(true)}
                    >
                        <TrashIcon width={22} height={22} />
                    </TouchableOpacity>
                </View>

                {hasPosts && (
                    <>
                        <View className="h-[400px] w-full flex items-center justify-center bg-black">
                    <View className="bg-black h-[50px] w-full"/>
                    <Image
                        className="w-full h-[300px]"
                        source={{ uri: selectedPost?.image.imageUrl}}
                    />
                    <View className="h-[50px] px-4 flex flex-row w-full items-center justify-between bg-black">
                        <Text className="text-white font-interMedium">{selectedPost?.note}</Text>
                        <Text className="text-white font-interRegular">{toReadableFormat(selectedPost?.createdAt as string)}</Text>
                    </View>
                </View>
                <View className="p-2">
                    <FlatList
                        horizontal
                        data={album?.posts}
                        renderItem={({ item }: { item: TPost }) => (
                            <AlbumImageItem item={item} isSelected={item.id === selectedPost?.id} select={() => setSelectedPost(item)}/>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
                    </>
                )}
            </View>
            <ConfirmationDialog
                visible={dialogVisible}
                title="Delete album"
                message="Are you sure you want to delete this album?"
                onConfirm={handleConfirm}
                onCancel={() => setDialogVisible(false)}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    );
};

export default AlbumDetailsScreen;
