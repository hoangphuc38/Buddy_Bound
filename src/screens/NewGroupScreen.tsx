import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NewGroupScreenProps } from '../types/navigator.type';
import Header from '../components/Header';
import { TextInput } from 'react-native-gesture-handler';
import { useInput } from '../hooks/useInput';
import { TMember } from '../types/member.type';
import MemberItem from '../components/MemberItem';
import { SelectCountry } from 'react-native-element-dropdown';
import { Modal } from '../components/Modal';
import Close from '../assets/icons/close.svg';
import SearchBar from 'react-native-dynamic-search-bar';

const members = require('../assets/data/member.json');
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

    const handleCreateGroup = () => {
        console.log(groupType);
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

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    const item1 = useInput({
        defaultValue: '',
        validationFn: (inputText) => inputText !== undefined && inputText.length > 5,
    });
    const item2 = useInput({
        defaultValue: '',
        validationFn: (inputText) => inputText !== undefined && inputText.length > 5,
    });

    const handleOpenModal = () => {
        setOpen((prev) => !prev);
    };

    const handleAddMember = (item: TMember) => {
        if (invitedMembers.some((value) => value.id === item.id)) {
            return;
        }
        setInvitedMembers((prev) => [...prev, item]);
    };
    const [invitedMembers, setInvitedMembers] = useState<TMember[]>(members);
    return (
        <>
        <View className="relative h-full">
            <Header onBack={() => navigation.pop()} title="Create new group"/>
            <View className="mx-4 flex flex-col">
                <Textbox label="Group Name" placeholder="Enter group name" item={item1} />
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
                    <TouchableOpacity onPress={handleCreateGroup} className="mx-4 py-3 bg-primary rounded-lg">
                        <Text className="w-full text-center font-interBold text-white">Create Group</Text>
                    </TouchableOpacity>
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
            <SearchBar
                style={{ height: 40, width: '100%' }}
                textInputStyle={{ fontSize: 16 }}
                className="bg-gray-100 rounded-full my-4"
                placeholderTextColor="#6b7280"
                placeholder="Find your relationship"
                spinnerVisibility={false}
                returnKeyType="search"
            />
            <FlatList
                data={invitedMembers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MemberItem item={item} horizontal press={() => handleAddMember(item)} />
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
            <View className="p-1 px-4 bg-gray-50 rounded-lg border border-gray-300">
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
