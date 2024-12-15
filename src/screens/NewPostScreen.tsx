import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NewPostScreenProps, RootStackParamList} from '../types/navigator.type';
import {RouteProp} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleRight,
  faGear,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {PhotoIcon} from 'react-native-heroicons/solid';
import {OptionStatus} from '../components/OptionStatus';
import {useState} from 'react';
import {Modal} from '../components/Modal';
import Header from '../components/Header';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {XMarkIcon} from 'react-native-heroicons/outline';
import mockData from '../mock/mockData';
import LimitedItem from '../components/LimitedItem';

const NewPostScreen = ({
  route,
  navigation,
}: NewPostScreenProps & {route: RouteProp<RootStackParamList, 'NewPost'>}) => {
  const {buddies} = mockData;

  const [isEveryOne, setEveryOne] = useState<boolean>(true);
  const [openOption, setOpenOption] = useState<boolean>(false);
  const [openLimitBuddy, setLimitBuddy] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<boolean>(false);
  const [imageList, setImageList] = useState<Asset[]>([]);

  const handleRemoveImage = (fileName: string | undefined) => {
    setImageList(prev =>
      prev.filter((item, index) => item.fileName !== fileName),
    );
  };

  const pickImages = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
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
  };

  return (
    <>
      <Header
        title="New post"
        onBack={() => navigation.pop()}
        onPrimaryAction={() => {}}
      />
      <View className="flex flex-1 mt-6">
        <View className="flex flex-row space-x-2 px-4 mb-4">
          <View>
            <Image
              source={require('../assets/images/avatar.jpg')}
              style={{width: 50, height: 50, borderRadius: 60 / 2}}
            />
          </View>
          <View className="items-start justify-around">
            <Text className="font-bold text-black text-medium">Hoàng Phúc</Text>
            <OptionStatus
              isChange={isEveryOne}
              onPress={() => setOpenOption(!openOption)}
            />
          </View>
        </View>

        <TextInput
          placeholder="Write your status ... (30 characters)"
          className="text-medium text-black h-auto px-4 mb-3"
          textAlignVertical="top"
          placeholderTextColor="#7C7979"
          multiline
        />
        {isImage && (
          <View className="w-full flex-row justify-center mb-5 px-4">
            {imageList.map((item, index) => {
              return (
                <View key={index} className="mx-4 w-full">
                  <View>
                    <Image
                      source={{uri: item.uri}}
                      style={{width: '100%', height: 200}}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveImage(item.fileName)}
                    className="rounded-full p-1 absolute top-2 right-2 bg-black">
                    <XMarkIcon size={16} color="white" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        <View className="mb-[80px]">
          <View className="border-b border-[#E3E1D9] w-full mb-3" />
          <TouchableOpacity
            onPress={pickImages}
            className="flex-row space-x-2 items-center mb-3 px-4">
            <PhotoIcon size={24} color="#096C47" />
            <Text className="text-primary text-medium">Picture</Text>
          </TouchableOpacity>
          <View className="border-b border-[#E3E1D9] w-full mb-4" />
        </View>
        <View className="flex items-center gap-4">
          <TouchableOpacity className="w-[80%] items-center py-[10px] bg-main rounded-[10px]">
            <Text className="text-white font-bold text-title">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[80%] items-center py-[9px] bg-white rounded-[10px] border border-primary">
            <Text className="text-main font-bold text-title">Cancel</Text>
          </TouchableOpacity>
        </View>

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
              data={buddies}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <LimitedItem item={item} press={() => {}} />
              )}
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
              className="border border-main px-2 py-3 rounded-[8px] mb-2">
              <Text className="text-main text-medium font-bold text-center">
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
