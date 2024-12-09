import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AddContactScreenProps} from '../types/navigator.type';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Search from '../components/search';

const mockData = {
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
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
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Thực hiện logic tìm kiếm tại đây (gọi API, lọc danh sách, ...)
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
        <View style={styles.userList}></View>
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
  img: {
    height: '100%',
    width: '100%',
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
  },
});
