import { FlatList, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native"
import { NewMemorableProps, RootStackParamList } from "../types/navigator.type"
import { RouteProp } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import mockData from "../mock/mockData";
import MemorableItem from "../components/MemorableItem";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { useRef } from "react";

const NewMemorablePlaceScreen = ({
    route,
    navigation
}: NewMemorableProps & { route: RouteProp<RootStackParamList, 'NewMemorable'> }) => {
    const { memorablePlaces } = mockData;
    const sheetRef = useRef<BottomSheetMethods>(null);
    const sheetRefLocationNote = useRef<BottomSheetMethods>(null);

    const HandleLocationNote = () => {
        sheetRef.current?.close();
        sheetRefLocationNote.current?.open();
    }

    return (
        <>
            <View>
                <Image source={require("../assets/images/map.png")}
                    style={{ width: "100%", height: "100%", overflow: "hidden" }} />
            </View>
            <TouchableOpacity className="absolute right-[100px] top-[400px]" onPress={() => sheetRef.current?.open()}>
                <FontAwesomeIcon icon={faLocationDot} size={25} color="#F32A2A" />
            </TouchableOpacity>
            <View className="absolute left-0 top-5 w-full px-5">
                <SearchBar containerStyle={{ marginBottom: 20 }}
                    placeholder='Search location'
                    onSearch={(text) => console.log(text)} />

                <View className="bg-tooltip rounded-[10px] px-4 pt-3">
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
            </View>
            <BottomSheet ref={sheetRef} height="30%">
                <View className="h-full px-4 pb-2">
                    <View className="mb-5">
                        <Text className="text-main text-title font-bold mb-1">Đại học Công nghệ thông tin</Text>
                        <Text className="text-[13px]">Đường Hàn Thuyên, khu phố 6, Linh Trung, Thủ Đức</Text>
                    </View>
                    <View className="flex flex-row justify-between space-x-3">
                        <TouchableOpacity onPress={HandleLocationNote}
                            className="flex-1 flex-row items-center justify-center border-2 border-main pr-[25px] py-1 rounded-[8px]">
                            <Image source={require("../assets/images/location-note-icon.png")}
                                style={{ width: 35, height: 35 }}
                            />
                            <Text className="text-[15px] text-main font-bold">Location Note</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 flex-row items-center justify-center border-2 border-main pr-[25px] py-1 rounded-[8px]">
                            <Image source={require("../assets/images/start-post-icon.png")}
                                style={{ width: 35, height: 37 }}
                            />
                            <Text className="text-[15px] text-main font-bold">Start a Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
            <BottomSheet ref={sheetRefLocationNote} height="40%">
                <View className="h-full px-4 pb-2">
                    <View className="mb-5">
                        <Text className="text-main text-normal font-bold">Choose your location type</Text>
                    </View>
                </View>
            </BottomSheet>
        </>

    )
}

export default NewMemorablePlaceScreen;