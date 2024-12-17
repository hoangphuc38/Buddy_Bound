import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AngleLeft from '../assets/icons/angle-left.svg';
import Map from '../assets/icons/map.svg';

const ChatScreen = () => {
    return (
        <View className="flex flex-col relative">
            <ChatHeader />
            <View className="absolute top-[95px] mx-4">
                <Text>Hello</Text>
            </View>
        </View>
    );
};

const ChatHeader = () => {
    return (
        <View className="overflow-hidden pb-5 absolute top-0 right-0 left-0">
            <View className="w-full px-4 py-3 h-[90px] flex flex-row justify-between items-center border-b border-slate-200">
                <View className="flex flex-row space-x-4 items-center">
                    <TouchableOpacity className="p-2 items-center justify-center bg-blue-200 rounded-full">
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
    return (
       <View/>
    );
};

export default ChatScreen;
