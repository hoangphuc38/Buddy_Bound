import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {TabsScreenProps} from '../types/navigator.type';
import {useAuth} from '../contexts/auth-context';
import SearchBar from '../components/SearchBar';
import {useState} from 'react';
import SideBar from '../components/SideBar';

const menu = require('../assets/images/menu.png');
const addUserGroup = require('../assets/images/add-user-group.png');
const mockData = [
  {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    role: 'Close Friend',
    family: null,
    avt: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=John',
  },
  {
    id: 2,
    name: 'Mary Brown',
    phone: '555-666-7777',
    role: 'Parent',
    family: 'Family',
    avt: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Mary',
  },
  {
    id: 3,
    name: 'William Green',
    phone: '987-654-3210',
    role: 'Colleague',
    family: null,
    avt: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=William',
  },
  {
    id: 4,
    name: 'Sophia White',
    phone: '444-555-6666',
    role: 'Acquaintance',
    family: null,
    avt: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=Sophia',
  },
  {
    id: 5,
    name: 'David Black',
    phone: '111-222-3333',
    role: 'Child',
    family: 'Family',
    avt: 'https://via.placeholder.com/150/800080/FFFFFF?text=David',
  },
  {
    id: 6,
    name: 'Emily Gray',
    phone: '888-999-0000',
    role: 'Others',
    family: 'Family',
    avt: 'https://via.placeholder.com/150/FFFF00/FFFFFF?text=Emily',
  },
  {
    id: 7,
    name: 'Michael Blue',
    phone: '777-888-9999',
    role: 'Close Friend',
    family: null,
    avt: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Michael',
  },
  {
    id: 8,
    name: 'Olivia Pink',
    phone: '222-333-4444',
    role: 'Colleague',
    family: null,
    avt: 'https://via.placeholder.com/150/FF69B4/FFFFFF?text=Olivia',
  },
  {
    id: 9,
    name: 'Ethan Brown',
    phone: '666-777-8888',
    role: 'Acquaintance',
    family: null,
    avt: 'https://via.placeholder.com/150/A52A2A/FFFFFF?text=Ethan',
  },
  {
    id: 10,
    name: 'Isabella Violet',
    phone: '333-444-5555',
    role: 'Parent',
    family: 'Family',
    avt: 'https://via.placeholder.com/150/9400D3/FFFFFF?text=Isabella',
  },
];

const RelationshipScreen = ({navigation}: TabsScreenProps) => {
  const {signOut} = useAuth();
  const handleSearch = () => {};

  const handleItemPress = (item: string) => {};

  const friendData = mockData.filter(
    user =>
      user.role === 'Close Friend' ||
      user.role === 'Colleague' ||
      user.role === 'Acquaintance',
  );
  const familyData = mockData.filter(user => user.family === 'Family');

  const [activeTag, setActiveTag] = useState('friend');
  //mở SideBar
  const [isSideBarVisible, setSideBarVisible] = useState(false);

  const toggleSideBar = () => {
    setSideBarVisible(!isSideBarVisible);
  };

  //xử lý chuyển tag
  const handleChangeFriendTag = () => {
    if (activeTag == 'family') {
      setActiveTag('friend');
    }
  };
  const handleChangeFamilyTag = () => {
    if (activeTag == 'friend') {
      setActiveTag('family');
    }
  };

  const renderItem = ({item}: {item: (typeof mockData)[0]}) => (
    <TouchableOpacity className="w-full rounded-lg px-[13] py-[9] justify-between items-center flex-row">
      <View className="items-center flex-row gap-[10]">
        <Image
          source={{uri: item.avt}}
          className="w-[55] h-[55] border-[#2C7CC1] rounded-full" />
        <View>
          <Text className="font-interBold">{item.name}</Text>
          <Text className="">{item.phone}</Text>
        </View>
      </View>
      <Text className="text-[#FF6600] font-interBold">{item.role}</Text>
    </TouchableOpacity>
  );

  return (
    <View className=" flex-1 pl-5 pr-5 flex items-center">
      <View className=" w-full mt-3 justify-between items-center flex-row">
        <TouchableOpacity className="w-[25] h-[25]" onPress={toggleSideBar}>
          <Image
            source={menu}
            className="w-full h-full"
            resizeMode="contain" />
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
            resizeMode="contain" />
        </TouchableOpacity>
      </View>
      {/* family and friend tag */}
      <View className="mt-[20] w-full p-[4] bg-[#D3E8F4] rounded-lg flex-row">
        <TouchableOpacity
          onPress={handleChangeFriendTag}
          className={`w-[50%] h-[40] items-center justify-center rounded-lg ${
            activeTag === 'friend' ? 'bg-[#2C91E7]' : ''
          }`}>
          <Text
            className={`text-center font-interRegular text-base font-bold ${
              activeTag === 'friend' ? 'text-[#fff]' : 'text-[#125B9A]'
            } `}>
            Friend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleChangeFamilyTag}
          className={`w-[50%] h-[40] items-center justify-center rounded-lg ${
            activeTag === 'family' ? 'bg-[#2C91E7]' : ''
          }`}>
          <Text
            className={`text-center font-interRegular text-base font-bold ${
              activeTag === 'family' ? 'text-[#fff]' : 'text-[#125B9A]'
            } `}>
            Family
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-[35] w-full">
        {/* <SearchBar placeholder="Search" onSearch={handleSearch} /> */}
      </View>
      {/* friend list */}
      {activeTag === 'friend' ? (
        <View className="mt-[20] w-full">
          <FlatList
            data={friendData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false} />
        </View>
      ) : (
        <View className="mt-[20] w-full">
          <FlatList
            data={familyData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false} />
        </View>
      )}
      <SideBar
        items={['Home', 'Settings', 'Profile']}
        onItemPress={handleItemPress}
        isVisible={isSideBarVisible}
        onClose={toggleSideBar}
      />
    </View>
  );
};

export default RelationshipScreen;
