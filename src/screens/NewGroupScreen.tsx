import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NewGroupScreenProps } from '../types/navigator.type';
import Header from '../components/Header';
import { TextInput } from 'react-native-gesture-handler';
import { useInput } from '../hooks/useInput';
import MemberItem from '../components/MemberItem';
import { SelectCountry } from 'react-native-element-dropdown';
import { Modal } from '../components/Modal';
import Close from '../assets/icons/close.svg';
import Info from '../assets/icons/info.svg';
import Error from '../assets/icons/error.svg';
import SearchBar from 'react-native-dynamic-search-bar';
import { TCreateGroup } from '../types/group.type';
import { RelationshipApi } from '../api/relationship.api';
import { TUser } from '../types/user.type';
import { toast, ToastOptions } from '@baronha/ting';
import { GroupApi } from '../api/group.api';

const data = [
    { lable: 'Family', value: 'FAMILY', image: {
        uri: 'https://res.cloudinary.com/daszajz9a/image/upload/v1734540191/project/Family_kva377.png',
    }},
    { lable: 'Friend', value: 'FRIEND', image: {
        uri: 'https://res.cloudinary.com/daszajz9a/image/upload/v1734540193/project/Friend_ucaain.png',
    } },
];

const NewGroupScreen = ({ navigation }: NewGroupScreenProps) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [groupType, setGroupType] = useState<string>('FAMILY');
    const [isOpen, setOpen] = useState<boolean>(false);
    const [showNotification, setShowNotificationBanner] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateGroup = async () => {
        try {
            if (invitedMembers.length < 2) {
                setShowNotificationBanner(true);
                return;
            }
            setShowNotificationBanner(false);
            if (item1.hasError) {
                item1.setDidEdit(true);
                item2.setDidEdit(true);
                return;
            }
            setLoading(true);
            const payload: TCreateGroup = {
                groupName: item1.value as string,
                groupDescription: item1.value as string,
                groupType: groupType,
                userIds: invitedMembers.map((value) => value.id),
            };
            await GroupApi.createGroup(payload);
            const options: ToastOptions = {
                title: 'Group',
                message: 'Create group successfully!',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
            setLoading(false);
            navigation.pop();
        } catch (error) {
            console.log('err: ', error);
            setLoading(false);
        }
    };

    const getRelationshipByType = async (searchTerm?: string) => {
        setLoading(true);
        try {
            const { data: members } = await RelationshipApi.getRelationshipsByType({
                searchText: searchTerm ? searchTerm : undefined,
                type: groupType,
                isPending: false,
            });
            setMembers(members.map((value) => value.receiver));
            setLoading(false);
        } catch (error) {
            console.log('err: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true);
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false);
        }
        );
        getRelationshipByType();

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [groupType]);
    const item1 = useInput({
        defaultValue: '',
        validationFn: (inputText) => inputText !== undefined && inputText.length > 2,
    });
    const item2 = useInput({
        defaultValue: '',
        validationFn: () => true,
    });

    const handleOpenModal = () => {
        setOpen((prev) => !prev);
    };

    const handleAddMember = (item: TUser) => {
        if (invitedMembers.some((value) => value.id === item.id)) {
            return;
        }
        setInvitedMembers((prev) => [...prev, item]);
    };
    const [invitedMembers, setInvitedMembers] = useState<TUser[]>([]);
    const [members, setMembers] = useState<TUser[]>([]);

    if (loading) {
        return (
            <View className="flex flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2C7CC1" />
            </View>
        );
    }
    return (
        <>
        <View className="relative h-full">
            <Header onBack={() => navigation.pop()} title="Create new group" primaryText="Create" onPrimaryAction={handleCreateGroup}/>
            <View className="mx-4 flex flex-col">
                {showNotification && <View className="w-full flex items-center flex-row justify-start mt-2 space-x-2 bg-red-100 py-2 px-2 rounded-[4px]">
                    <Error width={22} height={22} />
                    <Text className="font-interRegular text-[12px]">A group must have at least 2 members.</Text>
                </View>}
                <Textbox label="Group Name (*)" placeholder="Enter group name" item={item1} />
                <Textbox label="Group Description" placeholder="Enter group description" item={item2} />
                <View className="mt-3">
                    <Text className="font-interMedium text-gray-700">Choose group type</Text>
                    <SelectCountry
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        imageStyle={styles.imageStyle}
                        iconStyle={styles.iconStyle}
                        maxHeight={200}
                        value={groupType}
                        data={data}
                        valueField="value"
                        labelField="lable"
                        imageField="image"
                        placeholder="Select country"
                        searchPlaceholder="Search..."
                        onChange={e => {
                            setGroupType(e.value);
                            setInvitedMembers([]);
                        }}
                    />
                </View>
                <View className="flex mt-3 space-y-2">
                    <Text className="font-interMedium text-gray-700">Invited people ({invitedMembers.length})</Text>
                    <FlatList
                        horizontal={true}
                        data={invitedMembers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <MemberItem isInvited={invitedMembers.some((value) => value.id === item.id)} item={item} press={() => setInvitedMembers((prev) => prev.filter((value) => value.id !== item.id))} />
                        )}
                    />
                </View>
            </View>
            {!isKeyboardVisible &&
                <>
                <View className="flex flex-col absolute bottom-5 w-full space-y-3">
                    <TouchableOpacity onPress={handleOpenModal} className="mx-4 py-3 border border-gray-300 rounded-lg">
                        <Text className="w-full text-center font-interMedium text-gray-700">Invite Someone</Text>
                    </TouchableOpacity>
                </View>
                </>
            }
        </View>
        <Modal isOpen={isOpen}>
          <View className="bg-white w-full h-[65%] p-4 rounded-xl">
            <View className="flex flex-row justify-center items-center mb-4">
              <Text className="font-interMedium text-lg text-center text-gray-700">
                Invite to group
              </Text>
              <TouchableOpacity onPress={() => setOpen(!isOpen)} className="absolute top-2 right-2">
                <Close width={14} height={14} />
              </TouchableOpacity>
            </View>
            <View className="w-full flex items-center flex-row justify-start space-x-2 bg-blue-100 py-2 px-2 rounded-[4px]">
                <Info width={22} height={22} />
                <Text className="font-interRegular text-[12px]">Only {groupType} relationships are shown here.</Text>
            </View>
            <SearchBar
                style={{ height: 40, width: '100%' }}
                textInputStyle={{ fontSize: 16 }}
                className="bg-gray-100 rounded-full my-4"
                placeholderTextColor="#6b7280"
                placeholder="Find your relationship"
                onChangeText={(text: string) => {
                    getRelationshipByType(text);
                }}
                spinnerVisibility={false}
                returnKeyType="search"
            />
            <FlatList
                data={members}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MemberItem item={item} horizontal isInvited={invitedMembers.some((value) => value.id === item.id)} press={() => handleAddMember(item)} />
                )}
            />
          </View>
        </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    dropdown: {
      marginTop: 7,
      height: 50,
      width: 150,
      borderColor: '#d1d5db',
      borderWidth: 1,
      backgroundColor: '#f9fafb',
      borderRadius: 10,
      paddingHorizontal: 8,
    },
    imageStyle: {
      width: 40,
      height: 40,
      borderRadius: 35,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
      marginLeft: 8,
      color: '#374151',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  });

interface ITextbox {
    label: string,
    placeholder: string,
    item: any
}

const Textbox = ({ label, placeholder, item} : ITextbox) => {
    const {value, handleInputChange, handleInputBlur } = item;

    return (
        <View className="flex flex-col space-y-2 mt-4">
            <Text className="font-interMedium text-gray-700">{label}</Text>
            <View className={`p-1 px-4 bg-gray-50 rounded-lg border ${item.didEdit && item.hasError ? 'border-red-400' : 'border-gray-300'}`}>
                <TextInput
                    placeholder={placeholder}
                    className="w-full text-gray-900 leading-5"
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    multiline={label === 'Group Description'}
                />
            </View>
        </View>
    );
};

export default NewGroupScreen;
