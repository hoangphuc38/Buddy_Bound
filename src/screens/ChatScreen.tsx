import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AngleLeft from '../assets/icons/angle-left.svg';
import Map from '../assets/icons/map.svg';
import { useInput } from '../hooks/useInput';
import { ChatScreenProps } from '../types/navigator.type';
import Send from '../assets/icons/send.svg';

const items: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

const ChatScreen = ({ navigation }: ChatScreenProps) => {
    const handleBack = () => {
        navigation.pop();
    };
    return (
        <View className="flex flex-col h-full relative">
            <ChatHeader back={handleBack} />
            <FlatList
                    className="top-[90px] mx-4 w-full"
                    data={items}
                    renderItem={(item: number) => (
                        <Message  />
                      )}
                    keyExtractor={(item) => item}
                />
            <MessageInput />
        </View>
    );
};

const MessageInput = () => {
    const {
        value: messageValue,
        handleInputChange: handleMessageChange,
        setEnteredValue: setMessageValue,
        hasError: messageHasError,
      } = useInput({
          defaultValue: '',
          validationFn: (emailText) => emailText !== '' && emailText !== undefined && emailText?.length > 0,
      });

    return (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
            <View className="flex flex-row items-center space-x-3">
                <TextInput
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 font-interLight"
                    placeholder="Type a message..."
                    value={messageValue}
                    onChange={handleMessageChange}
                    multiline
                />
                <TouchableOpacity
                    className="bg-blue-500 w-10 h-10 rounded-full items-center justify-center"
                    onPress={() => {
                        // Handle send message
                        setMessageValue('');
                    }}
                >
                    <Send width={20} height={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

interface ChatHeaderProps {
    back: () => void
}

const ChatHeader = ({ back }: ChatHeaderProps) => {
    return (
        <View className="overflow-hidden pb-5 absolute top-0 right-0 left-0">
            <View className="w-full px-4 py-2 h-[90px] flex flex-row justify-between items-center border-b border-slate-200">
                <View className="flex flex-row space-x-4 items-center">
                    <TouchableOpacity onPress={back} className="p-2 items-center justify-center bg-blue-200 rounded-full">
                        <AngleLeft width={17} height={17} />
                    </TouchableOpacity>
                    <View className="flex flex-row items-center space-x-2">
                        <Image
                            className="h-[55px] w-[55px] rounded-full"
                            source={{uri: 'https://i.guim.co.uk/img/media/67944850a1b5ebd6a0fba9e3528d448ebe360c60/359_0_2469_1482/master/2469.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=03f3e07a7f367f36a738f1ad8132b3bb'}}
                        />
                        <View>
                            <Text className="font-interBold text-[16px]">Andy</Text>
                            <Text className="font-interLight text-[13px] text-gray-600">Acquaintance</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <Map width={40} height={40} />
                </TouchableOpacity>
            </View>
        </View>
    );
};


const Message = () => {
    const [showTime, setShowTime] = useState<boolean>(false);
    return (
       <View className="flex flex-row space-x-3 my-1 w-full max-w-[70%]">
            <View className="flex items-center justify-end">
                <Image
                    className="h-[40px] w-[40px] rounded-full"
                    source={{uri: 'https://i.guim.co.uk/img/media/67944850a1b5ebd6a0fba9e3528d448ebe360c60/359_0_2469_1482/master/2469.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=03f3e07a7f367f36a738f1ad8132b3bb'}}
                />
            </View>
            <View className="flex flex-col space-y-1 items-start">
                <Text className="font-interLight text-[13px] ml-2">Hoàng Phúc</Text>
                <View className="flex flex-row">
                    <TouchableOpacity onPress={() => setShowTime(!showTime)} className="bg-[#D9D9D9] px-4 py-4 rounded-2xl">
                        <Text className="font-interLight leading-5">Xin chao ban nha van de la nha minh co viec nen minh khong the sap xep di duoc</Text>
                    </TouchableOpacity>
                    <View className="flex justify-end items-end">
                        {showTime && <Text className="font-interLight text-[12px] ml-2">4m</Text>}
                    </View>
                </View>
            </View>
       </View>
    );
};

export default ChatScreen;
