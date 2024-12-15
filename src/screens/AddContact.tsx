import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    (typeof mockData.users)[0] | null
  >(null);
  const [relationship, setRelationship] = useState(''); // Trạng thái radio chính
  const [parentChild, setParentChild] = useState(''); // Trạng thái Parent/Child

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Thực hiện logic tìm kiếm tại đây (gọi API, lọc danh sách, ...)
  };

  const handleToggleAdd = (user: (typeof mockData.users)[0]) => {
    if (addedUsers.includes(user.id)) {
      // Loại người dùng ra khỏi danh sách nếu đã được thêm
      setAddedUsers(prev => prev.filter(id => id !== user.id));
    } else {
      // Hiển thị modal để thêm người dùng mới
      setSelectedUser(user);
      setModalVisible(true);
    }
  };

  const handleSend = () => {
    if (selectedUser) {
      setAddedUsers(prev => [...prev, selectedUser.id]);
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
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
          onPress={() => handleToggleAdd(item)}>
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
        <Search placeholder="Search..." onSearch={handleSearch} />
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
      {/* Modal */}
      {selectedUser && (
        <Modal
          style={styles.modalContainer}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Relationship Request</Text>
              <Text style={styles.modalText}>
                Hi {selectedUser.name}, i want to set relationship with you as
              </Text>
              <View style={styles.radioBtnContainer}>
                {/* Friend */}
                <TouchableOpacity
                  style={styles.radioContainer}
                  onPress={() => setRelationship('Friend')}>
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        backgroundColor:
                          relationship === 'Friend' ? '#125B9A' : '#d9d9d9',
                      },
                    ]} />
                  <Text
                    style={[
                      styles.radioLabel,
                      {
                        color: relationship === 'Friend' ? '#125B9A' : '#000',
                      },
                    ]}>
                    Friend
                  </Text>
                </TouchableOpacity>

                {/* Family (Others) */}
                <TouchableOpacity
                  style={styles.radioContainer}
                  onPress={() => setRelationship('FamilyOthers')}>
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        backgroundColor:
                          relationship === 'FamilyOthers'
                            ? '#125B9A'
                            : '#d9d9d9',
                      },
                    ]} />
                  <Text
                    style={[
                      styles.radioLabel,
                      {
                        color:
                          relationship === 'FamilyOthers' ? '#125B9A' : '#000',
                      },
                    ]}>
                    Family (Others)
                  </Text>
                </TouchableOpacity>

                {/* Family (Parent-Child) */}
                <TouchableOpacity
                  style={styles.radioContainer}
                  onPress={() => setRelationship('ParentChild')}>
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        backgroundColor:
                          relationship === 'ParentChild'
                            ? '#125B9A'
                            : '#d9d9d9',
                      },
                    ]} />
                  <Text style={styles.radioLabel}>Family (Parent-Child)</Text>
                </TouchableOpacity>

                {/* Sub-options for Parent-Child */}
                {relationship === 'ParentChild' && (
                  <View style={styles.subRadioContainer}>
                    <Text style={styles.modalText}>For detail, you are:</Text>
                    {/* Parent */}
                    <View style={styles.subRadioOption}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() => setParentChild('Parent')}>
                        <View
                          style={[
                            styles.radioCircle,
                            {
                              backgroundColor:
                                parentChild === 'Parent'
                                  ? '#125B9A'
                                  : '#d9d9d9',
                            },
                          ]} />
                        <Text
                          style={[
                            styles.radioLabel,
                            {
                              color:
                                parentChild === 'Parent' ? '#125B9A' : '#000',
                            },
                          ]}>
                          Parent
                        </Text>
                      </TouchableOpacity>

                      {/* Child */}
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() => setParentChild('Child')}>
                        <View
                          style={[
                            styles.radioCircle,
                            {
                              backgroundColor:
                                parentChild === 'Child' ? '#125B9A' : '#d9d9d9',
                            },
                          ]} />
                        <Text
                          style={[
                            styles.radioLabel,
                            {
                              color:
                                parentChild === 'Child' ? '#125B9A' : '#000',
                            },
                          ]}>
                          Child
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, {backgroundColor: '#125B9A'}]}
                  onPress={handleSend}>
                  <Text style={styles.modalButtonText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    {backgroundColor: 'rgba(0, 0, 0, 0.6)'},
                  ]}
                  onPress={handleCancel}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
    bottom: 40,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền đen với độ mờ 0.5
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.37)',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 19,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 500,
    color: '#125B9A',
  },
  modalText: {
    fontSize: 16,
    fontWeight: 500,
  },
  modalButton: {
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 145,
  },
  modalActions: {
    gap: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 500,
    color: '#fff',
  },
  radioBtnContainer: {
    alignSelf: 'flex-start',
    gap: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 50,
  },
  radioLabel: {
    fontSize: 16,
  },
  subRadioContainer: {
    marginTop: 5,
    gap: 10,
  },
  subRadioOption: {
    flexDirection: 'row',
    gap: 50,
    alignItems: 'center',
  },
});
