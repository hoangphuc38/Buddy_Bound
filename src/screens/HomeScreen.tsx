import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {TabsScreenProps} from '../types/navigator.type';
import React, {useState} from 'react';
import BuddyItem, {Buddy} from '../components/BuddyItem';
import {ChevronRightIcon} from 'react-native-heroicons/outline';
import GroupItem, {Group} from '../components/GroupItem';
import {Modal} from '../components/Modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/SearchBar';
import mockData from '../mock/mockData';
import Header from '../components/Header';

const HomeScreen = ({navigation}: TabsScreenProps) => {
  const {buddies, groups} = mockData;

  const [allBuddy, setAllBuddy] = useState<boolean>(false);
  const [allGroup, setAllGroup] = useState<boolean>(false);

  const HandleClickBuddy = (item: Buddy) => {
    navigation.push('LocationBuddy', {userID: item.id});
    setAllBuddy(!allBuddy);
  };

  const HandleClickGroup = (item: Group) => {
    navigation.push('LocationGroup', {groupID: item.id});
    setAllBuddy(!allBuddy);
  };

  return (
    <>
      <Header title="Your buddy" onPrimaryAction={() => {}} />
      <View className="flex flex-1 px-4 mt-2">
        <View className="flex mb-2">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="font-interMedium text-xl">
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
              renderItem={({item}) => (
                <BuddyItem
                  item={item}
                  press={() => {
                    navigation.push('LocationBuddy', {userID: item.id});
                  }}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="font-nunitoBold text-title text-main font-medium">
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
              renderItem={({item}) => (
                <GroupItem
                  item={item}
                  press={() => {
                    navigation.push('LocationGroup', {groupID: item.id});
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
              <Text className="font-nunitoBold text-[20px] text-center text-main font-bold">
                Buddies
              </Text>
              <TouchableOpacity
                onPress={() => setAllBuddy(!allBuddy)}
                className="absolute top-0 right-0 bg-backButton w-[20px] h-[20px] rounded-full items-center justify-center">
                <FontAwesomeIcon icon={faXmark} size={13} color="#2C7CC1" />
              </TouchableOpacity>
            </View>

            <SearchBar
              containerStyle={{marginBottom: 20}}
              placeholder="Search your buddy ..."
              onSearch={text => console.log(text)}
            />

            <FlatList
              data={buddies}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
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
              <Text className="font-nunitoBold text-[20px] text-center text-main font-bold">
                Groups
              </Text>
              <TouchableOpacity
                onPress={() => setAllGroup(!allGroup)}
                className="absolute top-0 right-0 bg-backButton w-[20px] h-[20px] rounded-full items-center justify-center">
                <FontAwesomeIcon icon={faXmark} size={13} color="#2C7CC1" />
              </TouchableOpacity>
            </View>

            <SearchBar
              containerStyle={{marginBottom: 20}}
              placeholder="Search your group ..."
              onSearch={text => console.log(text)}
            />

            <FlatList
              data={groups}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
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
