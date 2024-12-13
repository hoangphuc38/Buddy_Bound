import { Image, Text, View } from "react-native";

interface ICommentItem {
    item: CommentItem
}

export type CommentItem = {
    id: number;
    name: string;
    avatar: string;
    content: string;
    time: Date;
}

const timeAgo = (date: Date) => {
    const currentTime = new Date();
    const diffInSeconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / (3600 * 24));

    if (minutes < 1) {
        return 'Just now';  // Nếu dưới 1 phút
    } else if (minutes < 60) {
        return `${minutes}m`;  // Nếu dưới 1 giờ
    } else if (hours < 24) {
        return `${hours}h`;  // Nếu dưới 1 ngày
    } else {
        return `${days}d`;  // Nếu trên 1 ngày
    }
};

const CommentItem = ({ item }: ICommentItem) => {
    return (
        <View className='flex flex-row space-x-2 mb-5'>
            <View>
                <Image
                    source={{ uri: item.avatar }}
                    style={{ width: 40, height: 40, borderRadius: 50 / 2 }}
                />
            </View>
            <View>
                <View className='items-start bg-[#F5F5F5] pl-3 pr-4 pt-2 pb-2 rounded-[10px] max-w-[280px]'>
                    <Text className='font-bold text-[#535862] text-medium mb-1'>{item.name}</Text>
                    <Text className='text-[12px] text-[#717680] font-medium leading-5'
                    >
                        {item.content}
                    </Text>
                </View>
                <Text className="text-[12px] text-[#717680] mt-1 ml-3">{timeAgo(item.time)}</Text>
            </View>

        </View>
    )
}

export default CommentItem;