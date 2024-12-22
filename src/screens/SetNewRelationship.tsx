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
import { TNewRelationship } from '../types/relationship.type';
import { RelationshipApi } from '../api/relationship.api';
import { toast, ToastOptions } from '@baronha/ting';

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
  const [parent, setParent] = useState<string>('Father');
  const [receiverRole, setReceiverRole] = useState<string>('Child');

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

  const handleChooseRole = (selectedParent: string) => {
    setParent(selectedParent);

    // Nếu parent là Mother hoặc Father thì receiver chỉ có thể là Child
    if (selectedParent === "Father" || selectedParent === "Mother") {
      setReceiverRole("Child");
    }
    // Nếu parent là Child thì receiver có thể là Mother hoặc Father
    else if (selectedParent === "Child") {
      setReceiverRole("Father"); // Đặt giá trị mặc định là Father khi chọn Child
    }
  }

  const handleChooseReceiverRole = (role: string) => {
    // Chỉ cho phép thay đổi receiverRole khi parent là Child
    if (parent === "Child" && (role === "Father" || role === "Mother")) {
      setReceiverRole(role);
    }
  }

  const handleSend = async () => {
    if (selectedUser) {
      try {
        setLoading(true);
        if (detailRelationship === "Parent-Child") {
          let body: TNewRelationship = {
            receiverId: selectedUser.id,
            relationshipType: relationshipType.toUpperCase(),
            familyType: "PARENT_CHILD",
            senderRole: parent.toUpperCase(),
            receiverRole: receiverRole.toUpperCase(),
          }
          console.log("bodyParent_Child: ", body);
          await RelationshipApi.newRelationship(body);
          const options: ToastOptions = {
            title: 'Post',
            message: 'Create post successfully!',
            preset: 'done',
            backgroundColor: '#e2e8f0',
          };
          toast(options);
        }
        else if (relationshipType === "FAMILY") {
          let body: TNewRelationship = {
            receiverId: selectedUser.id,
            relationshipType: relationshipType.toUpperCase(),
            familyType: detailRelationship.toUpperCase()
          }
          console.log("bodyFAMILY: ", body);
          await RelationshipApi.newRelationship(body);
          const options: ToastOptions = {
            title: 'Post',
            message: 'Create post successfully!',
            preset: 'done',
            backgroundColor: '#e2e8f0',
          };
          toast(options);
        }
        else {
          let body: TNewRelationship = {
            receiverId: selectedUser.id,
            relationshipType: relationshipType.toUpperCase(),
            friendType: detailRelationship.toUpperCase(),
          }
          console.log("body: ", body);
          await RelationshipApi.newRelationship(body);
          const options: ToastOptions = {
            title: 'Post',
            message: 'Create post successfully!',
            preset: 'done',
            backgroundColor: '#e2e8f0',
          };
          toast(options);
        }
        setLoading(false);
      }
      catch (error) {
        console.log("err: ", error);
        setLoading(false);
      }
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ActivityIndicator style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}
          size='small'
          color="#2C7CC1"
        />
      </View>
    )
  }

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

            <FlatList
              data={users}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <MemberItem item={item} isInvited={ } horizontal press={() => handleAddPeople(item)} />
              )}
            />
          </View>
        </View>

        <Modal isOpen={modalVisible}>
          <View className='bg-white w-full h-[50%] p-4 rounded-xl relative'>
            <View className='relative h-full'>
              <Text className='font-interMedium text-[20px] text-center mb-4'>Relationship Request</Text>
              <Text className='font-interRegular leading-5'>Hi <Text className='font-interBold'>{selectedUser?.fullName}</Text>, i want to set relationship with you as {relationshipType} ({detailRelationship})</Text>

              {
                detailRelationship === 'Parent-Child' && (
                  <>
                    <Text className='mt-4 mb-2'>For detail, you are</Text>
                    <View className='flex-row items-center space-x-[50px]'>
                      <TouchableOpacity onPress={() => handleChooseRole('Father')}
                        className='flex-row space-x-2 items-center'>
                        <View className={parent === 'Father' ? 'w-[15px] h-[15px] rounded-full bg-primary' : 'w-[15px] h-[15px] rounded-full bg-main'} />
                        <Text className={parent === 'Father' ? 'font-interMedium text-primary' : 'font-interMedium text-main'}>Father</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => handleChooseRole('Mother')}
                        className='flex-row space-x-2 items-center'>
                        <View className={parent === 'Mother' ? 'w-[15px] h-[15px] rounded-full bg-primary' : 'w-[15px] h-[15px] rounded-full bg-main'} />
                        <Text className={parent === 'Mother' ? 'font-interMedium text-primary' : 'font-interMedium text-main'}>Mother</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => handleChooseRole('Child')}
                        className='flex-row space-x-2 items-center'>
                        <View className={parent === 'Child' ? 'w-[15px] h-[15px] rounded-full bg-primary' : 'w-[15px] h-[15px] rounded-full bg-main'} />
                        <Text className={parent === 'Child' ? 'font-interMedium text-primary' : 'font-interMedium text-main'}>Child</Text>
                      </TouchableOpacity>
                    </View>
                    <Text className='mt-4 mb-2'>For detail, <Text className='font-interBold'>{selectedUser?.fullName}</Text> is</Text>
                    <View className='flex-row items-center space-x-[50px]'>
                      <TouchableOpacity onPress={() => handleChooseReceiverRole('Father')}
                        className='flex-row space-x-2 items-center'>
                        <View className={receiverRole === 'Father' ? 'w-[15px] h-[15px] rounded-full bg-primary' : 'w-[15px] h-[15px] rounded-full bg-main'} />
                        <Text className={receiverRole === 'Father' ? 'font-interMedium text-primary' : 'font-interMedium text-main'}>Father</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => handleChooseReceiverRole('Mother')}
                        className='flex-row space-x-2 items-center'>
                        <View className={receiverRole === 'Mother' ? 'w-[15px] h-[15px] rounded-full bg-primary' : 'w-[15px] h-[15px] rounded-full bg-main'} />
                        <Text className={receiverRole === 'Mother' ? 'font-interMedium text-primary' : 'font-interMedium text-main'}>Mother</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => handleChooseReceiverRole('Child')}
                        className='flex-row space-x-2 items-center'>
                        <View className={receiverRole === 'Child' ? 'w-[15px] h-[15px] rounded-full bg-primary' : 'w-[15px] h-[15px] rounded-full bg-main'} />
                        <Text className={receiverRole === 'Child' ? 'font-interMedium text-primary' : 'font-interMedium text-main'}>Child</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )
              }
              <TouchableOpacity onPress={handleSend}
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
