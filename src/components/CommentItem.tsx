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
        <View className='flex flex-row space-x-2 mb-5'>
            <View>
                <Image
                    source={{ uri: item.avatar }}
                    style={{ width: 40, height: 40, borderRadius: 50 / 2 }}
                />
            </View>
            <View className='items-start bg-[#F5F5F5] pl-3 pr-4 pt-2 pb-2 rounded-[10px] max-w-[280px]'>
                <Text className='font-bold text-[#535862] text-medium mb-1'>{item.name}</Text>
                <Text className='text-[12px] text-[#717680] font-medium leading-5'
                >
                    {item.content}
                </Text>
            </View>
        </View>
    )
}

export default CommentItem;