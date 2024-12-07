import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { PostOfGroupProps, RootStackParamList } from "../types/navigator.type"
import { RouteProp } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import PostGroupItem from "../components/PostGroupItem";
import mockData from "../mock/mockData";

const PostOfGroupScreen = ({
    route,
    navigation
}: PostOfGroupProps & { route: RouteProp<RootStackParamList, 'PostOfGroup'> }) => {
    const { postGroup } = mockData;

    return (
        <View className="flex flex-1 px-4 mt-2">
            <View className='flex flex-row justify-center items-center mb-5'>
                <Text className='font-nunitoBold text-header text-center text-main font-bold'>Posts of Group</Text>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='absolute left-0 top-0 bg-backButton w-[33px] h-[33px] rounded-full items-center justify-center'
                >
                    <FontAwesomeIcon icon={faAngleLeft} size={17} />
                </TouchableOpacity>
            </View>

            <View className='mb-[70px]'>
                <FlatList data={postGroup}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <PostGroupItem
                            item={item}
                            press={() => { }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default PostOfGroupScreen;