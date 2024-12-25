import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { TMessage } from "../types/message.type";

interface TMessageItem {
    message: TMessage,
    idSender: number
}

function formatTimeToMMHH(timeString: string) {
    const date = new Date(timeString);

    const minutes = date.getMinutes();
    const hours = date.getHours();

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

const Message = ({ message, idSender }: TMessageItem) => {
    const [showTime, setShowTime] = useState<boolean>(false);
    const isSender = message.member.user.id === idSender;

    return (
        <View className={`flex flex-row ${isSender ? 'justify-end' : 'justify-start'} w-full`}>
            <View className={`flex flex-row space-x-3 my-1 max-w-[70%]`}>
                {!isSender && (
                    <View className="flex items-center justify-end">
                        <Image
                            className="h-[40px] w-[40px] rounded-full"
                            source={{ uri: message.member.user.avatar }}
                        />
                    </View>
                )}

                {isSender && showTime && (
                    <View className="flex justify-end items-end">
                        <Text className="font-interLight text-[12px]">{formatTimeToMMHH(message.createdAt)}</Text>
                    </View>
                )}

                <View className={`flex flex-col space-y-1 ${isSender ? 'items-end' : 'items-start'}`}>
                    {/* Tên người gửi */}
                    <Text className={`font-interLight text-[13px] ${isSender ? 'mr-1' : 'ml-2'}`}>{message.member.user.fullName}</Text>

                    <View className="flex flex-col space-y-2">
                        {/* Tin nhắn */}

                        <TouchableOpacity
                            onPress={() => setShowTime(!showTime)}
                            className={`px-3 py-2 rounded-2xl ${isSender ? 'bg-[#007AFF]' : 'bg-[#D9D9D9]'}`}
                        >
                            <Text
                                className={`font-interLight leading-5 ${isSender ? 'text-white' : 'text-black'}`}
                            >
                                {message.content}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    !isSender && showTime && (
                        <View className="flex justify-end items-end">
                            <Text className="font-interLight text-[12px] ml-2">{formatTimeToMMHH(message.createdAt)}</Text>
                        </View>
                    )
                }

                {isSender && (
                    <View className="flex items-center justify-end">
                        <Image
                            className="h-[40px] w-[40px] rounded-full"
                            source={{ uri: message.member.user.avatar }}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default Message;