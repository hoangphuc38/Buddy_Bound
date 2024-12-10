import { Image, Text, View } from "react-native";

interface ICommentItem {
    item: CommentItem
}

export type CommentItem = {
    id: number;
    name: string;
    avatar: string;
    content: string;
}

const CommentItem = ({ item }: ICommentItem) => {
    return (
        <View className='flex flex-row space-x-4 mb-5'>
            <View>
                <Image
                    source={{ uri: item.avatar }}
                    style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                />
            </View>
            <View className='items-start bg-[#D9D9D9] pl-2 pr-4 pt-1 pb-2 rounded-[10px] max-w-[260px]'>
                <Text className='font-bold text-slate-700 text-medium mb-1'>{item.name}</Text>
                <Text className='text-[12px] text-[#7C7979] font-regular'
                >
                    {item.content}
                </Text>
            </View>
        </View>
    )
}

export default CommentItem;