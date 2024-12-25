import React from 'react';
import { TPost } from '../types/post.type';
import { Image, TouchableOpacity } from 'react-native';

interface IAlbumImageItem {
    select: () => void;
    item: TPost,
    isSelected: boolean
}

export const AlbumImageItem = ({ select, item, isSelected }: IAlbumImageItem) => {
    return (
        <TouchableOpacity onPress={select} className={`mr-2 rounded-lg ${isSelected && 'border-2 border-secondary'}`}>
            <Image
                className="w-[100px] h-[100px] rounded-lg"
                source={{uri: item.image.imageUrl}}
            />
        </TouchableOpacity>
    );
};
