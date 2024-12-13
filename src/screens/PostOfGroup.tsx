import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { PostOfGroupProps, RootStackParamList } from "../types/navigator.type"
import { RouteProp } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import PostGroupItem from "../components/PostGroupItem";
import mockData from "../mock/mockData";
import Header from "../components/Header";

const PostOfGroupScreen = ({
    route,
    navigation
}: PostOfGroupProps & { route: RouteProp<RootStackParamList, 'PostOfGroup'> }) => {
    const { postGroup } = mockData;

    return (
        <>
            <Header title="Group Posts" onBack={() => navigation.pop()} onPrimaryAction={() => { }} />
            <View className="flex flex-1 px-4 mt-4">
                <View className='mb-5'>
                    <FlatList data={postGroup}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <PostGroupItem
                                item={item}
                                press={() => { navigation.push('PostDetail', { postID: item.id }) }}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </>
    )
}

export default PostOfGroupScreen;