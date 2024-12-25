import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { AddAlbumProps, RootStackParamList } from '../types/navigator.type';
import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native';
import { useInput } from '../hooks/useInput';
import { TPost } from '../types/post.type';
import { PostApi } from '../api/post.api';
import SelectedPost from '../components/SelectedPost';
import { AlbumApi } from '../api/album.api';
import { TAlbum, TCreateAlbum } from '../types/album.type';
import { toast, ToastOptions } from '@baronha/ting';
import { RouteProp } from '@react-navigation/native';
import { UserContext } from '../contexts/user-context';

const AddAlbum = ({
    route,
    navigation,
  }: AddAlbumProps & { route: RouteProp<RootStackParamList, 'AddAlbum'> }) => {
    const { isEditMode, albumId } = route.params;
    const item1 = useInput({
            defaultValue: '',
            validationFn: (inputText) => inputText !== undefined && inputText !== '',
    });
    const [posts, setPosts] = useState<TPost[]>([]);
    const [selectedPosts, setSelectedPosts] = useState<TPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadedAlbum, setLoadedAlbum] = useState<TAlbum>();

    const handleSelect = (item: TPost) => {
        if (!selectedPosts.some((value) => value.id === item.id)) {
            setSelectedPosts((prev) => [...prev, item]);
        } else {
            setSelectedPosts((prev) => prev.filter((value) => value.id !== item.id));
        }
    };

    const handleCreate = async () => {
        setLoading(true);
        try {
            if (item1.hasError) {
                const options: ToastOptions = {
                    title: 'Error',
                    message: 'Title is required field',
                    preset: 'error',
                    backgroundColor: '#e2e8f0',
                };
                toast(options);
                item1.setDidEdit(true);
                throw new Error('Failed');
            }
            const album: TCreateAlbum = {
                id: albumId ? albumId : undefined,
                postIdList: selectedPosts.map((value) => value.id),
                title: item1.value as string,
            };
            await AlbumApi.createAlbum(album);
            const options: ToastOptions = {
                title: 'Album',
                message: !isEditMode ? 'Added new album successfully!' : 'Edited the album!',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
            setLoading(false);
            navigation.pop();
        } catch (error) {
            console.log('Err creating album', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fecthAPI = async () => {
          try {
            if (isEditMode) {
                const { data } = await AlbumApi.getAlbumById(albumId as number);
                setSelectedPosts(data.posts);
                setLoadedAlbum(data);
                item1.setValue(data.title);
            }
            const { data } = await PostApi.getUserPosts();
            setPosts(data);
            setLoading(false);
          }
          catch (error) {
            console.log('Err: ', error);
            setLoading(false);
          }
        };

        fecthAPI();
      }, []);

    if (loading) {
        return (
            <View className="flex flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2C7CC1" />
            </View>
        );
    }
    return (
        <View className="relative h-full w-full">
            <Header title={isEditMode ? 'Edit album' : 'Add album'} onBack={() => navigation.pop() } primaryText={isEditMode ? 'Save' : 'Create'} onPrimaryAction={handleCreate}/>
            <View className="h-full mx-3 flex flex-col space-y-2">
                <Textbox label="Album title" placeholder="Enter album title" item={item1} />
                <View className="flex flex-row justify-between items-center">
                    <Text className="font-interMedium text-gray-700">Select posts ({selectedPosts.length})</Text>
                </View>
                <FlatList
                    className="max-h-[72%]"
                    data={posts}
                    renderItem={({ item }: { item: TPost }) => (
                        <SelectedPost item={item} isSelected={selectedPosts.some((prev) => prev.id === item.id)} select={() => handleSelect(item)} />
                    )}
                      // eslint-disable-next-line react/no-unstable-nested-components
                    ItemSeparatorComponent={() => <View className="h-1" />}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
};

interface ITextbox {
    label: string,
    placeholder: string,
    item: any
}

const Textbox = ({ label, placeholder, item} : ITextbox) => {
    const {value, handleInputChange, handleInputBlur } = item;

    return (
        <View className="flex flex-col space-y-2 mt-4">
            <Text className="font-interMedium text-gray-700">{label}</Text>
            <View className={`p-1 px-4 bg-gray-50 rounded-lg border ${item.didEdit && item.hasError ? 'border-red-400' : 'border-gray-300'}`}>
                <TextInput
                    placeholder={placeholder}
                    className={'w-full text-gray-900'}
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />
            </View>
        </View>
    );
};

export default AddAlbum;
