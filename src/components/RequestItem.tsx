import { Image, Text, TouchableOpacity, View } from "react-native";
import { TRelationship } from "../types/relationship.type";
import { useState } from "react";
import React from "react";

interface IRequestItem {
    item: TRelationship;
    onAccept?: () => void;
    onReject?: () => void;
}

const RequestItem = ({ item, onAccept, onReject }: IRequestItem) => {
    // Thêm state để theo dõi trạng thái
    const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');

    // Xử lý khi nhấn Accept
    const handleAccept = () => {
        setStatus('accepted');
        onAccept?.();
    };

    // Xử lý khi nhấn Reject
    const handleReject = () => {
        setStatus('rejected');
        onReject?.();
    };

    return (
        <View className="flex-row w-full items-center space-x-3">
            <Image
                source={{ uri: item.receiver.avatar }}
                style={{ height: 80, width: 80, borderRadius: 50, borderWidth: 2, borderColor: "#2C7CC1" }}
            />
            <View className="flex justify-between flex-1 space-y-2">
                <Text className="text-[#7C7979] text-[14px] leading-5">
                    <Text className="font-interBold text-black">{item.receiver.fullName}</Text> has requested for relationship:
                    <Text className="font-interBold text-black"> {item.friendType}</Text>
                </Text>

                <View className="flex-row justify-between">
                    {status === 'pending' ? (
                        // Hiển thị các nút khi trạng thái là pending
                        <>
                            <TouchableOpacity
                                className="bg-[#125B9A] w-[47%] py-2 rounded-[5px]"
                                onPress={handleAccept}
                            >
                                <Text className="text-center font-interMedium text-white">Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-[#7C7979] w-[47%] py-2 rounded-[5px]"
                                onPress={handleReject}
                            >
                                <Text className="text-center font-interMedium text-white">Reject</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        // Hiển thị text thông báo khi đã accept hoặc reject
                        <Text className={`font-interMedium text-black ${status === 'accepted' ? 'text-[#125B9A]' : 'text-secondary'}`}>
                            {status === 'accepted' ? 'Have accepted the request' : 'Have rejected the request'}
                        </Text>
                    )}
                </View>

            </View>
        </View>
    )
}

export default RequestItem;