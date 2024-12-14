import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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

const PostGroupItem = ({press, item}: IPostGroupItem) => {
  return (
    <TouchableOpacity onPress={press} className="w-full relative mb-5">
      <ImageBackground
        source={{uri: item.image}}
        style={{
          width: '100%',
          height: 175,
          borderRadius: 5,
          overflow: 'hidden',
        }}
        imageStyle={{borderRadius: 5}}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.0)']}
          style={styles.gradient}
        />
        <View className="absolute top-2 left-2 flex-row gap-2">
          <Image
            source={{uri: item.avatar}}
            style={{width: 30, height: 30, borderRadius: 50}}
          />
          <View className="flex justify-between">
            <View className="flex flex-row">
              <Text className="font-bold text-white text-[13px] mr-2">
                {item.name}
              </Text>
              <Text className="font-bold text-white text-[13px]">
                {item.time}h
              </Text>
            </View>
            <Text className="text-white text-[9px]">tại {item.location}</Text>
          </View>
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
