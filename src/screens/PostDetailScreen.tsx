import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { PostDetailProps, RootStackParamList } from "../types/navigator.type"
import { RouteProp } from "@react-navigation/native";
import {
    GestureHandlerRootView,
    PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import mockData from "../mock/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRotateLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ChatBubbleOvalLeftEllipsisIcon } from "react-native-heroicons/solid";

const { width, height } = Dimensions.get('window');

const PostDetailScreen = ({
    route,
    navigation
}: PostDetailProps & { route: RouteProp<RootStackParamList, 'PostDetail'> }) => {
    const { detailPost } = mockData;
    const translateY = useSharedValue(0);

    const handleGestureEvent = (event: any) => {
        translateY.value = event.nativeEvent.translationY;
    };

    const handleGestureEnd = (event: any) => {
        // Check if the swipe distance is greater than 100 pixels
        if (event.nativeEvent.translationY > 200) {
            navigation.goBack(); // Go back to the previous screen
        } else {
            translateY.value = withSpring(0); // Reset the position
        }
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler
                onGestureEvent={handleGestureEvent}
                onEnded={handleGestureEnd}>
                <Animated.View style={animatedStyle} className="flex flex-1 h-full w-full bg-black">
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

                    <View className="absolute left-3 bottom-2 flex-row gap-1 items-center justify-center">
                        <Text className="font-bold text-white text-title">{detailPost.totalComment}</Text>
                        <ChatBubbleOvalLeftEllipsisIcon size={18} color="white" />
                    </View>

                    <View className="absolute inset-x-0 bottom-3">
                        <Text className="font-bold text-white text-[8px] text-center">
                            {detailPost.firstUserComment} has recently commented this post
                        </Text>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

export default PostDetailScreen;