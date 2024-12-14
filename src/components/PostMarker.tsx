import { Image, Text, TouchableOpacity, View } from "react-native";

interface IPostMarker {
    item: PostMarker;
}

export type PostMarker = {
    latitude: number;
    longtitutude: number;
    name: string;
    avatar: string;
    postId: number;
    timePost: string;
}

const timeAgo = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);  // Chuyển chuỗi ISO 8601 thành đối tượng Date
    const currentTime = new Date();
    const diffInMilliseconds = currentTime.getTime() - dateTime.getTime();

    // Nếu thời gian đã qua
    if (diffInMilliseconds < 0) {
        return 'Time has passed';
    }

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // Nếu thời gian chênh lệch dưới 1 phút
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    }

    // Nếu thời gian chênh lệch dưới 1 ngày
    if (diffInHours < 24) {
        return `${diffInHours}h`;
    }

    // Nếu thời gian đã qua 1 ngày
    return `${diffInDays}d`;
};

const PostMarker = ({ item }: IPostMarker) => {
    return (
        <View className="flex items-center">
            <TouchableOpacity className="flex flex-row justify-between items-center space-x-3 bg-markerbg px-4 py-2 rounded-full">
                <Text
                    numberOfLines={2}
                    style={{ maxWidth: '65%' }}
                    className="text-[12px]"
                >
                    {item.name} has posted something
                </Text>
                <Text className="text-[10px] font-bold">{timeAgo(item.timePost)}</Text>
            </TouchableOpacity>

            <Image source={{ uri: item.avatar }}
                style={{ height: 35, width: 35, borderRadius: 30, borderWidth: 2, borderColor: "#FF6600" }} />
        </View>
    )
}

export default PostMarker;

