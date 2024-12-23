import React, { useCallback, useState } from 'react';
import { AlbumStorageScreenProps } from '../types/navigator.type';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import AddIcon from '../assets/icons/add-icon.svg';
import { AlbumApi } from '../api/album.api';
import { TAlbum } from '../types/album.type';
import AlbumItem from '../components/AlbumItem';

const AlbumStorage = ({ navigation }: AlbumStorageScreenProps) => {
    const [albums, setAlbums] = useState<TAlbum[]>([]);

    const fetchAlbums = async () => {
        try {
            const { data } = await AlbumApi.getAlbums();
            setAlbums(data);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchAlbums();
        }, [])
    );

    return (
        <>
            <Header
                title="Album storage"
                onBack={() => navigation.pop()}
                PrimaryIcon={AddIcon}
                onPrimaryAction={() => navigation.push('AddAlbum', { isEditMode: false })}
            />
            <FlatList
                className="bg-gray-100"
                data={albums}
                renderItem={({ item }: { item: TAlbum }) => (
                    <AlbumItem
                        item={item}
                        press={() => navigation.push('AlbumDetailsScreen', { albumId: item.id })}
                    />
                )}
            />
        </>
    );
};

export default AlbumStorage;
