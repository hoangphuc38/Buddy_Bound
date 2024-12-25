import { FlatList, PermissionsAndroid, Text, TouchableOpacity, View } from 'react-native';
import { TabsScreenProps } from '../types/navigator.type';
import React, { useEffect, useState } from 'react';
import BuddyItem from '../components/BuddyItem';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import GroupItem from '../components/GroupItem';
import { Modal } from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { TBuddy, TFamily } from '../types/group.type';
import { GroupApi } from '../api/group.api';
import { TSetting } from '../types/setting.type';
import { UserApi } from '../api/user.api';

const HomeScreen = ({ navigation }: TabsScreenProps) => {
  // const [settings, setSettings] = useState<TSetting>({locationEnabled: true, locationHistoryEnabled: true, contactEnabled: true});
  const [allBuddy, setAllBuddy] = useState<boolean>(false);
  const [allGroup, setAllGroup] = useState<boolean>(false);
  const [buddies, setBuddies] = useState<TBuddy[]>([]);
  const [groups, setGroups] = useState<TFamily[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  // const requestPermissions = async () => {
  //   try {
  //     const contactGranted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //       {
  //         title: 'Buddy Bound Contact Permission',
  //         message: 'The app needs access to your Contact to help you connect your relatives or friends based on your contact.',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     const locationGranted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Buddy Bound Location Permission',
  //         message: 'The app needs access to your Location to help you connect your relatives or friends on map.',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       }
  //     );

  //     if (contactGranted === PermissionsAndroid.RESULTS.GRANTED) {
  //       setSettings(...settings, {
  //         contactEnabled: true,
  //       });
  //     }
  //   } catch (error){
  //     console.log('err: ', error);
  //   }
  // };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await GroupApi.getBuddies();
        setBuddies(data.buddies);
        setGroups(data.families);
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
    navigation.push('LocationGroup', { groupID: item.id });
    setAllBuddy(!allBuddy);
  };

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
              containerStyle={{ marginBottom: 20 }}
              placeholder="Search your buddy ..."
              onSearch={text => setSearchText(text)}
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
              containerStyle={{ marginBottom: 20 }}
              placeholder="Search your group ..."
              onSearch={text => setSearchText(text)}
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
