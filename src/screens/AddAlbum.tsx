import React, { useEffect } from 'react';
import Header from '../components/Header';
import { AddAlbumProps } from '../types/navigator.type';
import { Text, TextInput, View } from 'react-native';
import { useInput } from '../hooks/useInput';

const AddAlbum = ({ navigation }: AddAlbumProps) => {
    const item1 = useInput({
            defaultValue: '',
            validationFn: (inputText) => inputText !== undefined && inputText.length > 5,
        });

    useEffect(() => {
        const fetchPosts = async () => {
        };
    }, []);
    return (
        <View className="relative h-full w-full">
            <Header title="Add album" onBack={() => navigation.pop() } primaryText="Create"/>
            <View className="h-full mx-3 flex flex-col space-y-2">
                <Textbox label="Album title" placeholder="Enter album title" item={item1} />
                <Text className="font-interMedium text-gray-700">Select posts</Text>
            </View>
            <View className="absolute bottom-0 right-0 left-0 h-[40px] bg-slate-100 flex justify-center px-4">
                <Text className="font-interRegular text-gray-700">5 posts selected</Text>
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
