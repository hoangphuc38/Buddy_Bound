import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { NewGroupScreenProps } from '../types/navigator.type';
import Header from '../components/Header';
import { TextInput } from 'react-native-gesture-handler';
import { useInput } from '../hooks/useInput';
import { TMember } from '../types/member.type';

const members = require('../assets/data/member.json');

const NewGroupScreen = ({ navigation }: NewGroupScreenProps) => {
    const item1 = useInput({
        defaultValue: '',
        validationFn: (inputText) => inputText !== undefined && inputText.length > 5,
    });
    const item2 = useInput({
        defaultValue: '',
        validationFn: (inputText) => inputText !== undefined && inputText.length > 5,
    });
    const [invitedMembers, setInvitedMembers] = useState<TMember[]>(members);
    return (
        <View className="relative h-full">
            <Header onBack={() => navigation.pop()} title="Create new group"/>
            <View className="mx-4 flex flex-col">
                <Textbox label="Group Name" placeholder="Enter group name" item={item1} />
                <Textbox label="Group Description" placeholder="Enter group description" item={item2} />
                <View className="flex mt-2 space-y-2">
                    <Text className="font-interMedium text-gray-700">Invited people</Text>
                    <FlatList
                        data={invitedMembers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <InvitedPeople item={item} onRemove={() => console.log(`Remove ${item.user.fullName}`)} />
                        )}
                    />
                </View>
            </View>
            <View className="flex flex-col absolute bottom-5 w-full space-y-3">
                <TouchableOpacity className="mx-4 py-3 bg-primary rounded-lg">
                    <Text className="w-full text-center font-interBold text-white">Create Group</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mx-4 py-3 border border-gray-300 rounded-lg">
                    <Text className="w-full text-center font-interMedium text-gray-700">Invite Someone</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

interface ITextbox {
    label: string,
    placeholder: string,
    item: any
}

interface IInvitedPeople {
    item: TMember,
    onRemove: () => void
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
                    multiline={label === 'Group Description'}
                />
            </View>
        </View>
    );
};

const InvitedPeople = ({ item, onRemove}: IInvitedPeople) => {
    return (
        <View className="flex items-center w-full flex-row my-1">
            <View className="flex items-center w-full justify-between p-3 flex-row bg-slate-50 border-[0.75px] border-gray-300 rounded-lg">
                <View className="flex flex-row space-x-3">
                    <Image
                        className="h-[45px] w-[45px] rounded-full"
                        source={{uri: item.user.avatar}}
                    />
                    <View>
                        <Text className="font-interBold text-gray-700">{item.user.fullName}</Text>
                        <Text className="font-interLight text-gray-500 text-[12px]">#{item.id}</Text>
                    </View>
                </View>
                <View className="px-4 py-1 bg-primary rounded-full">
                    <Text className="text-white font-interBold">Invited</Text>
                </View>
            </View>
        </View>
    );
};

export default NewGroupScreen;
