import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {AddContactScreenProps} from '../types/navigator.type';
import {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Contacts from 'react-native-contacts';
import {UserApi} from '../api/user.api';
import {TUser} from '../types/user.type';
import Header from '../components/Header';
import SearchBar from 'react-native-dynamic-search-bar';

const AddContactScreen = ({navigation}: AddContactScreenProps) => {
  const [loading, setLoading] = useState(false);

  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const [users, setUsers] = useState<TUser[]>([]);

  const [recommendUsers, setRecommendUsers] = useState<TUser[]>([]);

  //Lấy số điện thoại
  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to access your contacts.',
          buttonPositive: 'Please accept',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // iOS permissions are handled automatically
      return true;
    }
  };

  const fetchContacts = async () => {
    const permissionGranted = await requestContactsPermission();
    if (permissionGranted) {
      Contacts.getAll()
        .then(contacts => {
          const numbers = contacts
            .filter(contact => contact.phoneNumbers.length > 0)
            .map(contact => {
              // Lấy số điện thoại đầu tiên và loại bỏ khoảng trắng
              let number = contact.phoneNumbers[0].number.replace(/\s+/g, ''); // Loại bỏ khoảng trắng
              // Chuyển đổi +84 thành 0
              if (number.startsWith('+84')) {
                number = '0' + number.slice(3); // Thay thế +84 bằng 0
              }
              return number;
            });
          setPhoneNumbers(numbers);
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
        });
    } else {
      console.log('Contacts permission denied');
    }
  };

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const {data} = await UserApi.getUsers('');
      const filteredUsers = data.filter(user =>
        phoneNumbers.includes(user.phoneNumber),
      );
      setRecommendUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      console.log('Cannot get users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (phoneNumbers.length > 0) {
      fetchAllUsers();
    }
  }, [phoneNumbers]); // Gọi fetchAllUsers khi phoneNumbers thay đổi

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

  const Item = ({item}) => {
    const isAdded = addedUsers.includes(item.id);
    return (
      <View style={styles.userItem}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <View style={styles.avtContainer}>
            <Image source={{uri: item.avatar}} style={styles.img} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.fullName}</Text>
            <Text style={styles.userPhone}>{item.phoneNumber}</Text>
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
    <>
      <Header title="Buddy contacts" onBack={() => navigation.pop()} />
      <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{width: '100%'}}>
          <Text
            className="font-interMedium text-gray-700">
            Find your buddy in your contact
          </Text>
        </View>
        <SearchBar style={{ height: 40, width: '100%' }}
                textInputStyle={{ fontSize: 16 }}
                className="bg-gray-100 rounded-full my-4"
                placeholderTextColor="#6b7280" onChangeText={(text) => handleSearch(text)} />
        {loading ? (
          <ActivityIndicator
            className="mt-2"
            size={'small'}
            color={'#2C7CC1'} />
        ) : (
          <FlatList
            data={recommendUsers}
            renderItem={Item}
            keyExtractor={item => item.id.toString()}
            style={styles.userList}
          />
        )}
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
                    ]}
                  />
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
                    ]}
                  />
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
                    ]}
                  />
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
                          ]}
                        />
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
                          ]}
                        />
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
    </>
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
