import { Image, Text, TouchableOpacity, View } from "react-native"

interface IPostGroupItem {
    press: () => void;
    item: PostGroup;
}

export type PostGroup = {
    id: number;
    name: string;
    location: string;
    time: number;
    image: string;
    avatar: string;
};

const PostGroupItem = ({ press, item }: IPostGroupItem) => {
    return (
        <TouchableOpacity onPress={press}
            className="w-full relative mb-5"
        >
            <Image source={{ uri: item.image }}
                style={{ width: "100%", height: 175, borderRadius: 5, opacity: 0.8 }}
            />
            <View className="absolute top-2 left-2 flex-row gap-2">
                <Image source={{ uri: item.avatar }}
                    style={{ width: 30, height: 30, borderRadius: 50 }} />
                <View className="flex justify-between">
                    <View className="flex flex-row">
                        <Text className="font-bold text-white text-[13px] mr-2">{item.name}</Text>
                        <Text className="font-bold text-white text-[13px]">{item.time}h</Text>
                    </View>
                    <Text className="text-white text-[9px]">tại {item.location}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PostGroupItem;