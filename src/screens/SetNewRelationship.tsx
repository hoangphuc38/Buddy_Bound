import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SetNewRelationshipScreenProps } from '../types/navigator.type';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { TUser } from '../types/user.type';
import { UserApi } from '../api/user.api';
import MemberItem from '../components/MemberItem';
import React from 'react';
import { Modal } from '../components/Modal';

const SetNewRelationshipScreen = ({
  route,
  navigation,
}: SetNewRelationshipScreenProps) => {
  const { relationshipType, detailRelationship } = route.params;

  const [searchText, setSearchText] = useState<string>("");
  const [users, setUsers] = useState<TUser[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);
        const { data } = await UserApi.getUsers(searchText);
        setUsers(data);
        setLoading(false);
      }
      catch (err) {
        console.log("err: ", err);
        setLoading(false);
      }
    }

    fetchAPI();
  }, [searchText])

  const handleAddPeople = (item: TUser) => {
    setSelectedUser(item);
    setModalVisible(!modalVisible);
  }

  const handleSend = () => {
    if (selectedUser) {

    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Header title='New Relationship'
        onBack={() => navigation.pop()}
      />

      <View className="flex-1 bg-[#FEFDFD] items-center">
        <View className="mt-[5] items-center justify-center w-full px-[20]">
          <View className="w-full mt-[25] ">
            <Text className="font-interMedium text-black text-base">
              Set new relationship with buddies
            </Text>
            <View className='w-full mt-[15] mb-4'>
              <SearchBar placeholder='Search by name or phone number' onSearch={text => setSearchText(text)} value={searchText}></SearchBar>
            </View>
            {/* list user */}
            {
              loading ? (
                <ActivityIndicator style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}
                  size='small'
                  color="#2C7CC1"
                />
              ) :
                <FlatList
                  data={users}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <MemberItem item={item} horizontal press={() => handleAddPeople(item)} />
                  )}
                />
            }

          </View>
        </View>

        <Modal isOpen={modalVisible}>
          <View className='bg-white w-full h-[40%] p-4 rounded-xl relative'>
            <View className='relative h-full'>
              <Text className='font-interMedium text-[20px] text-center mb-4'>Relationship Request</Text>
              <Text className='font-interRegular leading-5'>Hi <Text className='font-interBold'>{selectedUser?.fullName}</Text>, i want to set relationship with you as {relationshipType} ({detailRelationship})</Text>

              {
                detailRelationship === 'Parent-Child' && (
                  <>
                    <Text className='my-4'>For detail, you are</Text>
                    <View className='flex-row items-center'>

                    </View>
                  </>
                )
              }
              <TouchableOpacity onPress={handleCancel}
                className='w-full absolute bottom-[45px] rounded-[5px] py-2 bg-primary'
              >
                <Text className='text-white font-interBold text-center'>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel}
                className='w-full absolute bottom-0 rounded-[5px] py-2'
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
              >
                <Text className='text-white font-interBold text-center'>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default SetNewRelationshipScreen;
