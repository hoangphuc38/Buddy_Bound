import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {AddContactScreenProps} from '../types/navigator.type';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Search from '../components/search';

const nextIcon = require('../assets/images/next-icon.png');

const mockData = {
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '0961826917',
      role: 'Parent',
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '0905564414',
      role: 'Child',
      location: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
      profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ],
  groups: [
    {
      id: 1,
      name: 'Family Group',
      type: 'Family',
      members: [1, 2],
      createdAt: '2024-11-01T12:00:00Z',
    },
  ],
  notifications: [
    {
      id: 1,
      title: 'SOS Alert',
      message: 'Jane sent an SOS from 34.0522, -118.2437',
      timestamp: '2024-11-25T14:00:00Z',
      type: 'SOS',
    },
  ],
  safeZones: [
    {
      id: 1,
      name: 'Home',
      radius: 500, // in meters
      center: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
      createdBy: 1,
    },
  ],
};

const AddContactScreen = ({navigation}: AddContactScreenProps) => {
  const [addedUsers, setAddedUsers] = useState<number[]>([]);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Thực hiện logic tìm kiếm tại đây (gọi API, lọc danh sách, ...)
  };

  const handleToggleAdd = (userId: number) => {
    setAddedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId],
    );
  };

  const Item = ({item}: {item: (typeof mockData.users)[0]}) => {
    const isAdded = addedUsers.includes(item.id);
    return (
      <View style={styles.userItem}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <View style={styles.avtContainer}>
            <Image source={{uri: item.profileImage}} style={styles.img} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userPhone}>{item.phone}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.addButton, isAdded ? styles.added : styles.notAdded]}
          onPress={() => handleToggleAdd(item.id)}>
          <Text style={styles.addButtonText}>{isAdded ? 'Added' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add your Buddy</Text>
      <View style={styles.content}>
        <View style={{width: '100%'}}>
          <Text
            style={{
              textAlign: 'left',
              color: '#2C7CC1',
              fontSize: 17,
              fontWeight: 500,
              marginBottom: 5,
            }}>
            Find your buddy in your contact
          </Text>
        </View>
        <Search placeholder="Search..." onSearch={handleSearch}></Search>
        <FlatList
          data={mockData.users}
          renderItem={Item}
          keyExtractor={item => item.id.toString()}
          style={styles.userList}
        />
      </View>
      <View style={styles.continueBtn}>
        <TouchableOpacity style={styles.btnNext}>
          <View style={styles.btnContent}>
            <Text style={styles.btnText}>Continue</Text>
            <View style={{height: 14, width: 15}}>
              <Image source={nextIcon} style={styles.img} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFDFD',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#2C7CC1',
    fontWeight: 600,
    marginTop: 15,
  },
  avtContainer: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: '#2C7CC1',
    borderRadius: '50%',
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    resizeMode: 'contain',
  },
  content: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  userList: {
    marginTop: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  addButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  notAdded: {
    backgroundColor: '#125B9A',
  },
  added: {
    backgroundColor: '#FF6600',
  },
  userName: {
    fontWeight: 600,
    fontSize: 16,
  },
  userPhone: {
    color: 'rgba(0, 0, 0, 0.37)',
  },
  continueBtn: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    paddingHorizontal: 30,
  },
  btnNext: {
    backgroundColor: '#125B9A',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  btnText: {color: '#fff', fontSize: 18, fontWeight: '600'},
});
