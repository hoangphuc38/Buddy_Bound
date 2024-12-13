import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { PostDetailProps, RootStackParamList } from "../types/navigator.type"
import { RouteProp } from "@react-navigation/native";
import {
    GestureHandlerRootView,
    PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import mockData from "../mock/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ChatBubbleOvalLeftEllipsisIcon } from "react-native-heroicons/solid";
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { useRef } from "react";
import CommentItem from "../components/CommentItem";
import CommentInput from "../components/CommentInput";

const { width, height } = Dimensions.get('window');

const PostDetailScreen = ({
    route,
    navigation
}: PostDetailProps & { route: RouteProp<RootStackParamList, 'PostDetail'> }) => {
    const { detailPost, comments } = mockData;
    const sheetRef = useRef<BottomSheetMethods>(null);

    return (
        <>
            <View className="flex flex-1 h-full w-full bg-black">
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='absolute right-2 top-2'
                >
                    <FontAwesomeIcon icon={faXmark} size={24} color="white" />
                </TouchableOpacity>
                <View className="w-full relative mb-4" style={{ marginTop: height / 5 }}>
                    <Image source={{ uri: detailPost.image }}
                        style={{ width: "100%", height: width, borderRadius: 40, objectFit: "fill" }}
                    />
                    <View className="absolute inset-x-0 bottom-3 items-center">
                        <View className="bg-contentPost px-4 py-2 rounded-[20px]">
                            <Text className="text-white text-medium text-center font-bold">{detailPost.content}</Text>
                        </View>
                    </View>
                </View>

                <View className="flex-row gap-3 items-center justify-center pl-[0.1px]">
                    <Image
                        source={{ uri: detailPost.user.avatar }}
                        style={{ width: 30, height: 30, borderRadius: 50, borderWidth: 1, borderColor: "#FF6600" }}
                    />
                    <View className="flex flex-col justify-center">
                        <View className="flex flex-row">
                            <Text className="font-bold text-white text-[13px] mr-2">{detailPost.user.name}</Text>
                            <Text className="font-bold text-white text-[13px]">{detailPost.time}h</Text>
                        </View>
                        <Text className="text-white text-[9px]">tại {detailPost.location}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => sheetRef.current?.open()}
                    className="absolute left-3 bottom-2 flex-row gap-1 items-center justify-center">
                    <Text className="font-bold text-white text-title">{detailPost.totalComment}</Text>
                    <ChatBubbleOvalLeftEllipsisIcon size={18} color="white" />
                </TouchableOpacity>

                <View className="absolute inset-x-0 bottom-3">
                    <Text className="font-bold text-white text-[8px] text-center">
                        {detailPost.firstUserComment} has recently commented this post
                    </Text>
                </View>


            </View>
            <BottomSheet ref={sheetRef} height="100%" style={{ backgroundColor: "white" }}>
                <View className="h-full px-4 pb-[30px] bg-white">
                    <FlatList data={comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <CommentItem
                                item={item}
                            />
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                    <CommentInput containerStyle={{ marginBottom: 20 }}
                        placeholder='Comment something ...'
                        onPress={(text) => console.log(text)} />
                </View>
            </BottomSheet>
        </>

    )
}

export default PostDetailScreen;