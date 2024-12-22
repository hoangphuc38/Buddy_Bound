import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { AddAlbumProps } from '../types/navigator.type';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useInput } from '../hooks/useInput';
import { TPost } from '../types/post.type';
import { PostApi } from '../api/post.api';
import SelectedPost from '../components/SelectedPost';

const AddAlbum = ({ navigation }: AddAlbumProps) => {
    const item1 = useInput({
            defaultValue: '',
            validationFn: (inputText) => inputText !== undefined && inputText.length > 5,
        });
    const [posts, setPosts] = useState<TPost[]>([]);
    const [selectedPosts, setSelectedPosts] = useState<TPost[]>([]);

    const handleSelect = (id: number) => {
    };

    useEffect(() => {
        const fecthAPI = async () => {
          try {
            const { data } = await PostApi.getAll(1);
            setPosts(data);
          }
          catch (error) {
            console.log('Err: ', error);
          }
        };

        fecthAPI();
      }, []);
    return (
        <View className="relative h-full w-full">
            <Header title="Add album" onBack={() => navigation.pop() } primaryText="Create"/>
            <View className="h-full mx-3 flex flex-col space-y-2">
                <Textbox label="Album title" placeholder="Enter album title" item={item1} />
                <Text className="font-interMedium text-gray-700">Select posts</Text>
                <FlatList
                    data={posts}
                    renderItem={({ item }: { item: TPost }) => (
                        <SelectedPost item={item} isSelected select={() => {}} />
                      )}
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
            <View className="p-1 px-4 bg-gray-50 rounded-lg border border-gray-300">
                <TextInput
                    placeholder={placeholder}
                    className="w-full text-gray-900"
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />
            </View>
        </View>
    );
};

export default AddAlbum;
