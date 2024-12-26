import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { PostDetailProps, RootStackParamList } from '../types/navigator.type';
import { RouteProp } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ChatBubbleOvalLeftEllipsisIcon } from 'react-native-heroicons/solid';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import CommentItem from '../components/CommentItem';
import CommentInput from '../components/CommentInput';
import { TPost } from '../types/post.type';
import { PostApi } from '../api/post.api';
import { TAddComment, TComment } from '../types/comment.type';
import { CommentApi } from '../api/comment.api';
import React from 'react';

const { width, height } = Dimensions.get('window');

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

const PostDetailScreen = ({
  route,
  navigation,
}: PostDetailProps & { route: RouteProp<RootStackParamList, 'PostDetail'> }) => {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const { postID } = route.params;

  const [detailPost, setDetailPost] = useState<TPost>(null);
  const [comments, setComments] = useState<TComment[]>([]);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fecthAPI = async () => {
      try {
        const { data } = await PostApi.getDetail(postID);
        const { data: comment } = await CommentApi.getAllComment(postID);
        console.log(data.id);
        setComments(comment);
        setDetailPost(data);
      }
      catch (error) {
        console.log('Err: ', error);
        navigation.pop();
      }
    };

    fecthAPI();
  }, [postID]);

  const handleOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setContent(e.nativeEvent.text);
  };

  const handeAddComment = async () => {
    let body: TAddComment = {
      postId: postID,
      content: content,
    };
    try {
      const { data } = await CommentApi.commentPost(body);

      setComments(prevComments => [...prevComments, data]);

      setDetailPost(prevPost => ({
        ...prevPost,
        commentCount: (prevPost.commentCount || 0) + 1,
      }));

      setContent('');
    }
    catch (error) {
      console.log('err: ', error);
    }
  };

  const handleOpenComment = () => {
    console.log('check: ', sheetRef);
    sheetRef.current.open();
  };

  if (!detailPost) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2C7CC1" />
      </View>
    );
  }

  return (
    <>
      <View className="flex flex-1 h-full w-full bg-black">
        <TouchableOpacity
          onPress={() => navigation.pop()}
          className="absolute right-2 top-2">
          <FontAwesomeIcon icon={faXmark} size={24} color="white" />
        </TouchableOpacity>
        <View className="w-full relative mb-4" style={{ marginTop: height / 5 }}>
          <Image
            source={{ uri: detailPost?.image.imageUrl }}
            style={{
              width: '100%',
              height: width,
              borderRadius: 40,
              objectFit: 'fill',
            }}
          />
          <View className="absolute inset-x-0 bottom-3 items-center">
            <View className="bg-contentPost px-4 py-2 rounded-[20px]">
              <Text className="text-white text-medium text-center font-interBold">
                {detailPost?.note}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-3 items-center justify-center pl-[0.1px]">
          <Image
            source={{ uri: detailPost?.member.user.avatar }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#FF6600',
            }}
          />
          <View className="flex flex-col justify-center">
            <View className="flex flex-row">
              <Text className="font-interBold text-white text-[13px] mr-2">
                {detailPost?.member.user.fullName}
              </Text>
              <Text className="font-interBold text-white text-[13px]">
                {timeAgo(detailPost?.createdAt)}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleOpenComment}
          className="absolute left-3 bottom-2 flex-row gap-1 items-center justify-center">
          <Text className="font-interBold text-white text-title">
            {detailPost.commentCount ? detailPost.commentCount : 0}
          </Text>
          <TouchableOpacity>
            <ChatBubbleOvalLeftEllipsisIcon size={18} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
        {
          detailPost.firstComment && <View className="absolute inset-x-0 bottom-3 flex items-center">
            <View className="flex w-[50%]">
              <Text className="font-interBold text-white text-[10px] text-center">
                {detailPost.firstComment.member.user.fullName}
              </Text>
              <Text className="font-interRegular text-white text-[10px] text-center">
                has recently commented this post
              </Text>
            </View>
          </View>
        }

      </View>
      <BottomSheet
        ref={sheetRef}
        height="100%"
        style={{ backgroundColor: 'white' }}>
        <View className="h-full px-4 pb-[30px] bg-white">
          {
            comments.length > 0 ? (
              <FlatList
                data={comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CommentItem item={item} />}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <Text className="text-center font-interRegular text-placeHolder">Be the first one to comment this post</Text>
            )
          }

          <CommentInput
            containerStyle={{
              marginBottom: 20,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            placeholder="Comment something ..."
            value={content}
            onChange={handleOnChange}
            onPress={handeAddComment}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default PostDetailScreen;
