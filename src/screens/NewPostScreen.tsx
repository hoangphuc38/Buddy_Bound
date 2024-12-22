import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NewPostScreenProps, RootStackParamList } from '../types/navigator.type';
import { RouteProp } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faAngleRight,
  faGear,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { PhotoIcon } from 'react-native-heroicons/solid';
import { OptionStatus } from '../components/OptionStatus';
import { useEffect, useState } from 'react';
import { Modal } from '../components/Modal';
import Header from '../components/Header';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import { XMarkIcon } from 'react-native-heroicons/outline';
import mockData from '../mock/mockData';
import LimitedItem from '../components/LimitedItem';
import { TBuddy } from '../types/group.type';
import { GroupApi } from '../api/group.api';
import { PostApi } from '../api/post.api';
import { TCreatePost, TPost } from '../types/post.type';
import { useInput } from '../hooks/useInput';
import { Validator } from '../helpers/validator';
import { TMember } from '../types/member.type';
import GroupMember from '../components/GroupMember';
import { toast, ToastOptions } from '@baronha/ting';
import { TCreateImage } from '../types/image.type';
import { useAuth } from '../contexts/auth-context';

const NewPostScreen = ({
  route,
  navigation,
}: NewPostScreenProps & { route: RouteProp<RootStackParamList, 'NewPost'> }) => {
  const { groupID } = route.params;

  const [isEveryOne, setEveryOne] = useState<boolean>(true);
  const [openOption, setOpenOption] = useState<boolean>(false);
  const [openLimitBuddy, setLimitBuddy] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<boolean>(false);
  const [imageList, setImageList] = useState<Asset[]>([]);
  const [groupMembers, setGroupMembers] = useState<TMember[]>([]);
  const [limitedBuddyId, setLimitedBuddyId] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    value: noteValue,
    handleInputBlur: handleNoteBlur,
    handleInputChange: handleNoteChange,
    setEnteredValue: setNoteValue,
    didEdit: noteDidEdit,
    hasError: noteHasError,
  } = useInput({
    defaultValue: '',
    validationFn: (note) => note !== undefined && note?.length < 30 && note.length > 0,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await GroupApi.getMembers(groupID);
        setGroupMembers(data);
      }
      catch (error) {
        console.log('errsss: ', error);
      }
    };

    fetch();
  }, []);

  const handleRemoveImage = (fileName: string | undefined) => {
    setImageList(prev =>
      prev.filter((item, index) => item.fileName !== fileName),
    );

    setIsImage(false);
  };

  const pickImages = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      presentationStyle: 'fullScreen',
    };
    const result: ImagePickerResponse = await launchImageLibrary(options);
    if (!result.errorCode) {
      if (result.assets) {
        setImageList(result.assets);
      }
    }
    setIsImage(true);
  };

  const HandleEveryone = () => {
    setEveryOne(true);
    setOpenOption(!openOption);
    setLimitedBuddyId(groupMembers.map((value) => value.user.id));
  };

  const HandleLimitBuddy = () => {
    setOpenOption(!openOption);
    setLimitBuddy(!openLimitBuddy);
  };

  const HandleSaveBuddy = () => {
    setLimitBuddy(!openLimitBuddy);
    setEveryOne(false);
  };

  const HandleCancelLimit = () => {
    setLimitBuddy(!openLimitBuddy);
    setLimitedBuddyId([]);
  };

  const addToLimitList = (id: number) => {
    setLimitedBuddyId(prevList => {
      if (prevList.includes(id)) {
        return prevList.filter(item => item !== id);
      } else {
        return [...prevList, id];
      }
    });
  };

  const handleNewPost = async () => {
    try {
      setLoading(true);
      const postData: TCreatePost = {
        note: noteValue as string,
        groupId: groupID,
        viewerIds: limitedBuddyId,
        location: {
          latitude: 17.0685,
          longitude: 106.6925,
        },
      };
      let image;
      if (imageList[0]) {
        image = {
          uri: imageList[0].uri,
          name: imageList[0].fileName,
          type: imageList[0].type,
        };
      }

      const response = await PostApi.createPost(postData, image ? image : undefined);
      console.log(response);

      const options: ToastOptions = {
        title: 'Post',
        message: 'Create post successfully!',
        preset: 'done',
        backgroundColor: '#e2e8f0',
      };
      toast(options);

      navigation.pop();

      setLoading(false);
    }
    catch (error) {
      console.log('err: ', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2C7CC1" />
      </View>
    );
  }

  return (
    <>
      <Header
        title="New post"
        onBack={() => navigation.pop()}
        primaryText='Post'
        onPrimaryAction={handleNewPost}
      />
      <View className="flex flex-1 mt-6">
        <View className="flex flex-row space-x-2 px-4 mb-5">
          <View>
            <Image
              source={require('../assets/images/avatar.jpg')}
              style={{ width: 50, height: 50, borderRadius: 60 / 2 }}
            />
          </View>
          <View className="items-start justify-around">
            <Text className="font-interBold text-black text-medium">Hoàng Phúc</Text>
            <OptionStatus
              isChange={isEveryOne}
              onPress={() => setOpenOption(!openOption)}
            />
          </View>
        </View>

        <View className='px-4'>
          {!isImage ? (
            <View className="rounded-lg py-8 items-center justify-center" style={{ borderStyle: 'dashed', borderRadius: 1, borderWidth: 1 }}>
              <View className="bg-gray-100 p-4 rounded-full">
                <PhotoIcon size={32} color="#9e9e9e" />
              </View>
              <Text className="text-sm text-gray-600 mt-2">Add photo to your post</Text>
              <TouchableOpacity onPress={pickImages} className="mt-4">
                <Text className="text-sm text-blue-600">Select from gallery</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="relative">
              <Image
                source={{ uri: imageList[0].uri }}
                className="w-full h-48 rounded-lg"
              />
              <TouchableOpacity
                onPress={() => handleRemoveImage(imageList[0].fileName)}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full"
              >
                <XMarkIcon size={16} color="white" />
              </TouchableOpacity>
            </View>
          )}

          <View className="mt-4 mb-4">
            <Text className="text-sm font-medium text-gray-700">Caption</Text>
            <TextInput
              placeholder="Write your status ... (30 characters)"
              className="min-h-24 border border-gray-300 rounded-lg p-3 mt-2 text-sm"
              textAlignVertical="top"
              placeholderTextColor="#7C7979"
              multiline
              value={noteValue}
              onChange={handleNoteChange}
              onBlur={handleNoteBlur}
            />
          </View>
        </View>

        {/* <View className="flex items-center gap-4">
          <TouchableOpacity onPress={handleNewPost}
            className="w-[80%] items-center py-[10px] bg-primary rounded-[10px]">
            <Text className="text-white font-bold text-title">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[80%] items-center py-[9px] bg-white rounded-[10px] border border-primary">
            <Text className="text-primary font-bold text-title">Cancel</Text>
          </TouchableOpacity>
        </View> */}

        <Modal isOpen={openOption}>
          <View className="bg-white w-full px-4 py-8 rounded-xl">
            <TouchableOpacity
              onPress={HandleEveryone}
              className="px-2 py-3 border-y border-primary flex flex-row items-center space-x-2">
              <FontAwesomeIcon icon={faUserGroup} size={13} color="#2C7CC1" />
              <Text className="text-main text-medium">Everyone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={HandleLimitBuddy}
              className="px-2 py-3 flex flex-row justify-between items-center border-y border-primary">
              <View className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={faGear} size={13} color="#2C7CC1" />
                <Text className="text-main text-medium">Limited Buddies</Text>
              </View>
              <FontAwesomeIcon icon={faAngleRight} size={14} color="#2C7CC1" />
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal isOpen={openLimitBuddy}>
          <View className="bg-white w-full h-[85%] px-4 pb-2 pt-4 rounded-xl">
            <FlatList
              data={groupMembers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <GroupMember item={item} onPress={() => addToLimitList(item.user.id)} />}
              showsHorizontalScrollIndicator={false}
            />
            <TouchableOpacity
              onPress={HandleSaveBuddy}
              className="bg-primary px-2 py-3 rounded-[8px] mb-2">
              <Text className="text-white text-medium font-bold text-center">
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={HandleCancelLimit}
              className="border border-primary px-2 py-3 rounded-[8px] mb-2">
              <Text className="text-primary text-medium font-bold text-center">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default NewPostScreen;
