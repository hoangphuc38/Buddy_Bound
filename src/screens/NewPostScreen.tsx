import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { NewPostScreenProps, RootStackParamList } from "../types/navigator.type"
import { RouteProp } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { PhotoIcon } from 'react-native-heroicons/solid';
import { OptionStatus } from "../components/OptionStatus";
import { useState } from "react";
import { Modal } from "../components/Modal";
import {
    Asset,
    ImageLibraryOptions,
    ImagePickerResponse,
    launchImageLibrary,
} from 'react-native-image-picker';
import { XMarkIcon } from "react-native-heroicons/outline";

const NewPostScreen = ({
    route,
    navigation
}: NewPostScreenProps & { route: RouteProp<RootStackParamList, 'NewPost'> }) => {
    const [isEveryOne, setEveryOne] = useState<boolean>(true);
    const [openOption, setOpenOption] = useState<boolean>(false);
    const [openLimitBuddy, setLimitBuddy] = useState<boolean>(false);
    const [isImage, setIsImage] = useState<boolean>(false);
    const [imageList, setImageList] = useState<Asset[]>([]);

    const handleRemoveImage = (fileName: string | undefined) => {
        setImageList((prev) => prev.filter((item, index) => item.fileName !== fileName));
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
    }

    const HandleLimitBuddy = () => {
        setOpenOption(!openOption);
        setLimitBuddy(!openLimitBuddy)
    }

    const HandleSaveBuddy = () => {
        setLimitBuddy(!openLimitBuddy);
        setEveryOne(false);
    }

    return (
        <View className="flex flex-1 mt-2">
            <View className='flex flex-row justify-center items-center px-4 mb-5'>
                <Text className='font-nunitoBold text-header text-center text-main font-bold'>New Post</Text>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='absolute left-4 top-0 bg-backButton w-[33px] h-[33px] rounded-full items-center justify-center'
                >
                    <FontAwesomeIcon icon={faAngleLeft} size={17} />
                </TouchableOpacity>
            </View>

            <View className='flex flex-row space-x-2 px-4 mb-4'>
                <View>
                    <Image
                        source={require('../assets/images/avatar.jpg')}
                        style={{ width: 50, height: 50, borderRadius: 60 / 2 }}
                    />
                </View>
                <View className='items-start justify-around'>
                    <Text className='font-bold text-black text-medium'>Hoàng Phúc</Text>
                    <OptionStatus isChange={isEveryOne}
                        onPress={() => setOpenOption(!openOption)}
                    />
                </View>
            </View>

            <TextInput
                placeholder='Write your status ... (30 characters)'
                className='text-medium text-black h-[150px] px-4 mb-3'
                textAlignVertical='top'
                placeholderTextColor="#7C7979"
            />
            {
                isImage &&
                <View className='w-full flex-row justify-center mb-5 px-4'>
                    {imageList.map((item, index) => {
                        return (
                            <View key={index} className='mr-4'>
                                <View className=''>
                                    <Image source={{ uri: item.uri }} style={{ width: 170, height: 170 }} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleRemoveImage(item.fileName)}
                                    className='rounded-full p-1 absolute top-0 right-0 bg-black'>
                                    <XMarkIcon size={16} color='white' />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            }
            <View className='mb-[80px]'>
                <View className='border-b border-[#E3E1D9] w-full mb-3' />
                <TouchableOpacity onPress={pickImages}
                    className='flex-row space-x-2 items-center mb-3 px-4'>
                    <PhotoIcon size={24} color='#096C47' />
                    <Text className='text-primary text-medium'>Picture</Text>
                </TouchableOpacity>
                <View className='border-b border-[#E3E1D9] w-full mb-4' />
            </View>
            <View className='flex items-center gap-4'>
                <TouchableOpacity className='w-[80%] items-center py-[10px] bg-main rounded-[10px]'>
                    <Text className='text-white font-bold text-title'>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity className='w-[80%] items-center py-[9px] bg-white rounded-[10px] border border-main'>
                    <Text className='text-main font-bold text-title'>Cancel</Text>
                </TouchableOpacity>
            </View>

            <Modal isOpen={openOption}>
                <View className='bg-white w-full px-4 py-8 rounded-xl justify-center'>
                    <TouchableOpacity onPress={HandleEveryone}
                        className="border border-main px-2 py-2 rounded-[8px] mb-5">
                        <Text className="text-main text-normal">Everyone</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={HandleLimitBuddy}
                        className="border border-main px-2 py-2 rounded-[8px] flex flex-row justify-between items-center">
                        <Text className="text-main text-normal">Limited Buddies</Text>
                        <FontAwesomeIcon icon={faAngleRight} size={14} color="#2C7CC1" />
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal isOpen={openLimitBuddy}>
                <View className='bg-white w-full h-[50%] px-4 py-8 rounded-xl'>
                    <TouchableOpacity onPress={HandleSaveBuddy}
                        className="border border-main px-2 py-2 rounded-[8px] mb-5">
                        <Text className="text-main text-normal">Save Limited Buddies</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default NewPostScreen;