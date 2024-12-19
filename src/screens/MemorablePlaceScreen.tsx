import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MemorablePlacesProps,
  RootStackParamList,
} from '../types/navigator.type';
import { RouteProp } from '@react-navigation/native';
import MemorableItem from '../components/MemorableItem';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { TMemorablePlace } from '../types/location-history.type';
import { MemorablePlaceApi } from '../api/memorablePlace.api';
import SearchBar from '../components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../components/Modal';
import CustomButton, { ButtonProps } from '../components/CustomButton';

const MemorablePlaceScreen = ({
  route,
  navigation,
}: MemorablePlacesProps & {
  route: RouteProp<RootStackParamList, 'MemorablePlaces'>;
}) => {
  const [memorablePlaces, setMemorablePlaces] = useState<TMemorablePlace[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);
  const [buttons, setButtons] = useState<ButtonProps[]>([
    {
      id: '1',
      name: 'All',
    },
    {
      id: '2',
      name: 'Home',
    },
    {
      id: '3',
      name: 'School',
    },
    {
      id: '4',
      name: 'Workplace',
    },
    {
      id: '5',
      name: 'Favourite place',
    },
  ]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const { data } = await MemorablePlaceApi.getAll();
        setMemorablePlaces(data);
      }
      catch (error) {
        console.log("err: ", error);
      }
    }

    fetchAPI();
  }, [])

  const filteredPlaces = memorablePlaces.filter((place) => {
    const matchesSearch = searchText ? place.note.toLowerCase().includes(searchText.toLowerCase()) : true;
    const matchesFilter = selectedFilter ? place.locationType === selectedFilter.toUpperCase() : true;

    return matchesSearch && matchesFilter;
  });

  // Hàm xử lý khi nhấn nút lọc
  const handleFilter = () => {
    setIsFilterModalVisible(true); // Mở modal lọc
  };

  // Hàm đóng modal lọc
  const closeFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  const handleSelectType = (type: string) => {
    setSelectedFilter(type === 'All' ? '' : type);

    closeFilterModal();
  };

  return (
    <>
      <Header title='Memorable Places'
        onBack={() => navigation.pop()} />
      <View className="flex flex-1 mt-4">
        <View className='flex px-4 flex-row justify-between space-x-1'>
          <View className='flex w-[87%]'>
            <SearchBar
              containerStyle={{ marginBottom: 20 }}
              placeholder="Search your place ..."
              onSearch={text => setSearchText(text)}
              value={searchText}
            />
          </View>

          <TouchableOpacity
            onPress={handleFilter}
            className="bg-primary p-2 rounded-[10px] h-[40px] justify-center items-center">
            <FontAwesomeIcon icon={faFilter} size={17} color="white" />
          </TouchableOpacity>
        </View>

        <Modal isOpen={isFilterModalVisible}>
          <View className="bg-white w-full h-[40%] p-4  rounded-xl">
            <View className='flex flex-row mb-4'>
              <TouchableOpacity
                onPress={closeFilterModal}
                className="absolute top-0 right-0 bg-backButton w-[20px] h-[20px] rounded-full items-center justify-center">
                <FontAwesomeIcon icon={faXmark} size={13} color="#2C7CC1" />
              </TouchableOpacity>
            </View>

            <View className="mb-4 items-center">
              <FlatList
                data={buttons}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <CustomButton item={item}
                    press={() => handleSelectType(item.name)} />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>

        <View className="px-4">
          <FlatList
            data={filteredPlaces}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <MemorableItem
                item={item}
                press={() => {
                  navigation.push('PostDetail', { postID: item.id });
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.push('NewMemorable')}
          className="absolute inset-x-5 bottom-3 bg-primary px-10 py-3 rounded-[10px] items-center justify-center mb-2">
          <Text className="font-bold text-white text-normal">
            New memorable places
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MemorablePlaceScreen;
