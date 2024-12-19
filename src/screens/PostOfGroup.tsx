import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { PostOfGroupProps, RootStackParamList } from '../types/navigator.type';
import { RouteProp } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import PostGroupItem from '../components/PostGroupItem';
import mockData from '../mock/mockData';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { PostApi } from '../api/post.api';
import { TPost } from '../types/post.type';

const PostOfGroupScreen = ({
  route,
  navigation,
}: PostOfGroupProps & {
  route: RouteProp<RootStackParamList, 'PostOfGroup'>;
}) => {
  const { groupID } = route.params;

  const [postGroup, setPostGroup] = useState<TPost[]>([]);

  useEffect(() => {
    const fecthAPI = async () => {
      try {
        const { data } = await PostApi.getAll(groupID);
        setPostGroup(data);
      }
      catch (error) {
        console.log("Err: ", error);
      }
    }

    fecthAPI();
  }, [])

  if (postGroup.length === 0) {
    return (
      <View className='flex flex-1 items-center justify-center'>
        <ActivityIndicator size="large" color="#2C7CC1" />
      </View>
    );
  }

  return (
    <>
      <Header
        title="Group Posts"
        onBack={() => navigation.pop()}
        onPrimaryAction={() => { }}
      />
      <View className="flex flex-1 px-4 mt-4">
        <View className="mb-5">
          <FlatList
            data={postGroup}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <PostGroupItem
                item={item}
                press={() => {
                  navigation.push('PostDetail', { postID: item.id });
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </>
  );
};

export default PostOfGroupScreen;
