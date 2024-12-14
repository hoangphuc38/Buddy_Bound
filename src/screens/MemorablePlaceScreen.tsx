import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { MemorablePlacesProps, RootStackParamList } from "../types/navigator.type"
import { RouteProp } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import mockData from "../mock/mockData";
import MemorableItem from "../components/MemorableItem";

const MemorablePlaceScreen = ({
    route,
    navigation
}: MemorablePlacesProps & { route: RouteProp<RootStackParamList, 'MemorablePlaces'> }) => {
    const { memorablePlaces } = mockData;

    return (
        <View className="flex flex-1 mt-4">
            <View className='flex flex-row justify-center items-center px-5 mb-[40px]'>
                <Text className='font-nunitoBold text-[20px] text-center text-black font-medium'>Memorable Places</Text>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='absolute left-4 top-0 w-[33px] h-[33px] rounded-full items-center justify-center'
                >
                    <FontAwesomeIcon color="" icon={faAngleLeft} size={17} />
                </TouchableOpacity>
            </View>

            <View className="px-4">
                <FlatList data={memorablePlaces}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <MemorableItem
                            item={item}
                            press={() => { navigation.push('PostDetail', { postID: item.id }) }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <TouchableOpacity onPress={() => navigation.push('NewMemorable')}
                className='absolute inset-x-5 bottom-3 bg-main px-10 py-3 rounded-[10px] items-center justify-center mb-2'>
                <Text className='font-bold text-white text-normal'>New memorable places</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MemorablePlaceScreen;