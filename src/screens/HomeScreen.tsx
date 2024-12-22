import { FlatList, NativeSyntheticEvent, Text, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import { TabsScreenProps } from '../types/navigator.type';
import React, { useEffect, useState } from 'react';
import BuddyItem from '../components/BuddyItem';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import GroupItem from '../components/GroupItem';
import { Modal } from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import SearchBar from 'react-native-dynamic-search-bar';
import Header from '../components/Header';
import { TBuddy, TFamily } from '../types/group.type';
import { GroupApi } from '../api/group.api';

const HomeScreen = ({ navigation }: TabsScreenProps) => {
  const [allBuddy, setAllBuddy] = useState<boolean>(false);
  const [allGroup, setAllGroup] = useState<boolean>(false);
  const [buddies, setBuddies] = useState<TBuddy[]>([]);
  const [groups, setGroups] = useState<TFamily[]>([]);
  const [friendGroups, setFriendGroups] = useState<TFamily[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await GroupApi.getBuddies();
        setBuddies(data.buddies);
        setGroups(data.families);
        setFriendGroups(data.friends);
      }
      catch (error) {
        console.log('errsss: ', error);
      }
    };

    fetch();
  }, []);

  const HandleClickBuddy = (item: TBuddy) => {
    navigation.push('LocationBuddy', { userID: item.id });
    setAllBuddy(!allBuddy);
  };

  const HandleClickGroup = (item: TFamily) => {
    navigation.push('LocationGroup', { groupID: item.id, groupType: item.groupType });
    setAllBuddy(!allBuddy);
  };

  const onChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearchText(e.nativeEvent.text);
  }

  const filteredBuddies = searchText
    ? buddies.filter((buddy) =>
      buddy.userDto.fullName.toLowerCase().includes(searchText.toLowerCase())
    )
    : buddies;

  const filteredGroups = searchText
    ? groups.filter((group) =>
      group.groupName.toLowerCase().includes(searchText.toLowerCase())
    )
    : groups;

  return (
    <>
      <Header title="Your buddy" onPrimaryAction={() => { }} />
      <View className="flex flex-1 px-4 mt-2">
        <View className="flex mb-2">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="font-interMedium text-base text-main">
              Buddies
            </Text>
            <TouchableOpacity onPress={() => setAllBuddy(!allBuddy)}>
              <ChevronRightIcon size={20} color="#535862" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <FlatList
              data={buddies}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <BuddyItem
                  item={item}
                  press={() => {
                    navigation.push('LocationBuddy', { userID: item.id });
                  }}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="font-interMedium text-base text-main">
              Groups
            </Text>
            <TouchableOpacity onPress={() => setAllGroup(!allGroup)}>
              <ChevronRightIcon size={20} color="#535862" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <FlatList
              data={groups}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <GroupItem
                  item={item}
                  press={() => {
                    navigation.push('LocationGroup', { groupID: item.id, groupType: item.groupType });
                  }}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
            <FlatList
              data={friendGroups}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <GroupItem
                  item={item}
                  press={() => {
                    navigation.push('LocationGroup', { groupID: item.id, groupType: item.groupType });
                  }}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>

        <Modal isOpen={allBuddy}>
          <View className="bg-white w-full h-[80%] p-4 rounded-xl">
            <View className="flex flex-row justify-center items-center mb-4">
              <Text className="font-interMedium text-[20px] text-center">
                Buddies
              </Text>
              <TouchableOpacity
                onPress={() => setAllBuddy(!allBuddy)}
                className="absolute top-0 right-0 bg-backButton w-[20px] h-[20px] rounded-full items-center justify-center">
                <FontAwesomeIcon icon={faXmark} size={13} color="#2C7CC1" />
              </TouchableOpacity>
            </View>

            <SearchBar
              style={{ width: '100%' }}
              textInputStyle={{ fontSize: 16 }}
              className="bg-gray-100 rounded-[10px] mb-[20px] pr-2"
              placeholderTextColor="#6b7280"
              placeholder="Search your buddy ..."
              spinnerVisibility={false}
              returnKeyType="search"
              onChange={onChangeText}
              value={searchText}
            />

            <FlatList
              data={filteredBuddies}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <BuddyItem
                  horizontal
                  item={item}
                  press={() => HandleClickBuddy(item)}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </Modal>

        <Modal isOpen={allGroup}>
          <View className="bg-white w-full h-[80%] p-4 rounded-xl">
            <View className="flex flex-row justify-center items-center mb-4">
              <Text className="font-interMedium text-[20px] text-center">
                Groups
              </Text>
              <TouchableOpacity
                onPress={() => setAllGroup(!allGroup)}
                className="absolute top-0 right-0 bg-backButton w-[20px] h-[20px] rounded-full items-center justify-center">
                <FontAwesomeIcon icon={faXmark} size={13} color="#2C7CC1" />
              </TouchableOpacity>
            </View>

            <SearchBar
              style={{ width: '100%' }}
              textInputStyle={{ fontSize: 16 }}
              className="bg-gray-100 rounded-[10px] mb-[20px] pr-2"
              placeholderTextColor="#6b7280"
              placeholder="Search your buddy ..."
              spinnerVisibility={false}
              returnKeyType="search"
              onChange={onChangeText}
              value={searchText}
            />

            <FlatList
              data={filteredGroups}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <GroupItem item={item} press={() => HandleClickGroup(item)} />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Modal>
      </View>
    </>
  );
};

export default HomeScreen;
