import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TPost } from '../types/post.type';

interface IPostGroupItem {
  press: () => void;
  item: TPost;
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

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / (3600 * 24));

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

const PostGroupItem = ({ press, item }: IPostGroupItem) => {
  if (!item.image) {
    return;
  }
  return (
    <TouchableOpacity onPress={press} className="w-full relative mb-5">
      <ImageBackground
        source={{ uri: item.image.imageUrl }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 5,
          overflow: 'hidden',
        }}
        imageStyle={{ borderRadius: 5 }}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.0)']}
          style={styles.gradient}
        />
        <View className="absolute top-2 left-2 right-2 flex-row items-center justify-between">
          <View className='flex-row items-center space-x-2'>
            <Image
              source={{ uri: item.member.user.avatar }}
              style={{ width: 30, height: 30, borderRadius: 50, borderWidth: 2, borderColor: '#FF6600' }}
            />
            <View className="flex">
              <View className="flex flex-row">
                <Text className="font-interBold text-white text-[11px] mr-2">
                  {item.member.user.fullName}
                </Text>
                <Text className="font-interBold text-white text-[11px]">
                  {timeAgo(item.createdAt)}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <Text className='text-white font-interBold text-[11px]'>See in map</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
});

export default PostGroupItem;
