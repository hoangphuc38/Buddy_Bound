import React, { useEffect, useState } from 'react';
import { AlbumStorageScreenProps } from '../types/navigator.type';
import { FlatList, View } from 'react-native';
import Header from '../components/Header';
import AddIcon from '../assets/icons/add-icon.svg';
import { AlbumApi } from '../api/album.api';
import { TAlbum } from '../types/album.type';
import AlbumItem from '../components/AlbumItem';

const AlbumStorage = ({ navigation }: AlbumStorageScreenProps) => {
    const [albums, setAlbums] = useState<TAlbum[]>([]);
    useEffect(() => {
        const fetchAlbums = async () => {
            const { data } = await AlbumApi.getAlbums();
            console.log(data);
            setAlbums(data);
        };

        fetchAlbums();
    }, []);
    return (
        <>
            <Header title="Album storage" onBack={() => navigation.pop()} PrimaryIcon={AddIcon} onPrimaryAction={() => navigation.push('AddAlbum')} />
            <FlatList
                className="bg-gray-100"
                data={albums}
                renderItem={({ item }: { item: TAlbum }) => (
                    <AlbumItem item={item} />
                )}
            />
        </>
    );
};

export default AlbumStorage;
