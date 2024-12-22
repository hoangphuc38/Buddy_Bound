import { Image, Text, View } from 'react-native';
import { TComment } from '../types/comment.type';

interface ICommentItem {
  item: TComment;
}

const timeAgo = (createdAt: string) => {
  const currentTime = new Date();
  const date = new Date(createdAt);

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const diffInSeconds = Math.floor(
    (currentTime.getTime() - date.getTime()) / 1000,
  );

  console.log("date: ", date);
  console.log("diffInSeconds: ", diffInSeconds);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / (3600 * 24));

  console.log("minute: ", minutes);
  console.log("hour: ", hours);
  console.log("day: ", days);

  if (minutes < 1) {
    return 'Just now'; // Nếu dưới 1 phút
  } else if (minutes < 60) {
    return `${minutes}m`; // Nếu dưới 1 giờ
  } else if (hours < 24) {
    return `${hours}h`; // Nếu dưới 1 ngày
  } else {
    return `${days}d`; // Nếu trên 1 ngày
  }
};

const CommentItem = ({ item }: ICommentItem) => {
  return (
    <View className="flex flex-row space-x-2 mb-5">
      <View>
        <Image
          source={{ uri: item.member.user.avatar }}
          style={{ width: 40, height: 40, borderRadius: 50 / 2 }}
        />
      </View>
      <View>
        <View className="items-start bg-[#F5F5F5] pl-3 pr-4 pt-2 pb-2 rounded-[10px] max-w-[280px]">
          <Text className="font-bold text-[#535862] text-medium mb-1">
            {item.member.user.fullName}
          </Text>
          <Text className="text-[12px] text-[#717680] font-medium leading-5">
            {item.content}
          </Text>
        </View>
        <Text className="text-[12px] text-[#717680] mt-1 ml-3">
          {timeAgo(item.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default CommentItem;
