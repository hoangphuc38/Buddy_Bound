import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { TabsScreenProps } from '../types/navigator.type';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import { TRelationship } from '../types/relationship.type';
import { RelationshipApi } from '../api/relationship.api';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

const menu = require('../assets/images/menu.png');
const addUserGroup = require('../assets/images/add-user-group.png');

const RelationshipScreen = ({ navigation }: TabsScreenProps) => {
  const [data, setData] = useState<TRelationship[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTag, setActiveTag] = useState<string>('FRIEND');
  const [searchText, setSearchText] = useState<string>('');
  const [isSideBarVisible, setSideBarVisible] = useState(false);

  const fetchAPI = async () => {
    try {
      setLoading(true);
      const { data } = await RelationshipApi.getRelationshipsByType({ type: activeTag });
      setData(data);
      setLoading(false);
    }
    catch (err) {
      console.log("Err: ", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, [activeTag])

  useFocusEffect(
    React.useCallback(() => {
      fetchAPI();
    }, [])
  );

  const handleSearch = (text: string) => {
    setSearchText(text)
  };

  const handleItemPress = (item: string) => {
    switch (item) {
      case "Limited People List":
        navigation.push('LimitedPeople');
        setSideBarVisible(!isSideBarVisible);
        break;
      case "New Group":
        navigation.push("NewGroupScreen");
        setSideBarVisible(!isSideBarVisible);
        break;
      case "Relationship Request":
        navigation.push('RelationshipRequest', {});
        setSideBarVisible(!isSideBarVisible);
    }
  };

  const filteredData = searchText
    ? data.filter((data) =>
      data.receiver.fullName.toLowerCase().includes(searchText.toLowerCase())
    )
    : data;

  const toggleSideBar = () => {
    setSideBarVisible(!isSideBarVisible);
  };

  //xử lý chuyển tag
  const handleChangeFriendTag = () => {
    if (activeTag == 'FAMILY') {
      setActiveTag('FRIEND');
    }
  };
  const handleChangeFamilyTag = () => {
    if (activeTag == 'FRIEND') {
      setActiveTag('FAMILY');
    }
  };

  const renderItem = ({ item }: { item: TRelationship }) => (
    <TouchableOpacity className="w-full rounded-lg py-[9] justify-between items-center flex-row">
      <View className="items-center flex-row gap-[10]">
        <Image
          source={{ uri: item.receiver.avatar }}
          className="w-[55] h-[55] border-[#2C7CC1] rounded-full" />
        <View>
          <Text className="font-interBold">{item.receiver.fullName}</Text>
          {
            item.receiver.phoneNumber && (
              <Text className="">{item.receiver.phoneNumber}</Text>
            )
          }
        </View>
      </View>
      <Text className="text-[#FF6600] font-interBold">{item.receiverRole}</Text>
    </TouchableOpacity>
  );

  return (
    <View className=" flex-1 pl-5 pr-5 flex items-center">
      <View className=" w-full mt-3 justify-between items-center flex-row">
        <TouchableOpacity className="w-[25] h-[25]" onPress={toggleSideBar}>
          <Image source={menu} className="w-full h-full" resizeMode="contain" />
        </TouchableOpacity>
        <Text className="font-interBold text-2xl font-bold text-[#2C7CC1]">
          Relationship
        </Text>
        <TouchableOpacity
          onPress={() => navigation.push('NewRelationship')}
          className="h-[40] w-[40] rounded-full items-center justify-center bg-[#125B9A]">
          <Image
            source={addUserGroup}
            className="w-[15] h-[15]"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {/* family and friend tag */}
      <View className="mt-[20] w-full p-[4] bg-[#D3E8F4] rounded-lg flex-row">
        <TouchableOpacity
          onPress={handleChangeFriendTag}
          className={`w-[50%] h-[40] items-center justify-center rounded-lg ${activeTag === 'FRIEND' ? 'bg-[#2C91E7]' : ''
            }`}>
          <Text
            className={`text-center font-interRegular text-base font-bold ${activeTag === 'FRIEND' ? 'text-[#fff]' : 'text-[#125B9A]'
              } `}>
            Friend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleChangeFamilyTag}
          className={`w-[50%] h-[40] items-center justify-center rounded-lg ${activeTag === 'FAMILY' ? 'bg-[#2C91E7]' : ''
            }`}>
          <Text
            className={`text-center font-interRegular text-base font-bold ${activeTag === 'FAMILY' ? 'text-[#fff]' : 'text-[#125B9A]'
              } `}>
            Family
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-[35] w-full">
        <SearchBar placeholder="Search" onSearch={handleSearch} value={searchText} />
      </View>
      {/* friend list */}
      {loading ? (
        <View className="mt-[20] flex-1 w-full items-center justify-center">
          <ActivityIndicator style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}
            size='small'
            color="#2C7CC1"
          />
        </View>
      ) : (
        <View className="mt-[20] w-full">
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      <SideBar
        items={['Limited People List', 'New Group', 'Relationship Request']}
        onItemPress={handleItemPress}
        isVisible={isSideBarVisible}
        onClose={toggleSideBar}
      />
    </View>
  );
};

export default RelationshipScreen;
