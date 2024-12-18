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
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../components/Modal';

const MemorablePlaceScreen = ({
  route,
  navigation,
}: MemorablePlacesProps & {
  route: RouteProp<RootStackParamList, 'MemorablePlaces'>;
}) => {
  const [memorablePlaces, setMemorablePlaces] = useState<TMemorablePlace[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);

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

  const filteredPlaces = searchText
    ? memorablePlaces.filter((place) =>
      place.note.toLowerCase().includes(searchText.toLowerCase())
    )
    : memorablePlaces;

  // Hàm xử lý tìm kiếm
  const handleSearch = (text: string) => {
    setSearchText(text);
    // Thực hiện tìm kiếm tại đây
  };

  // Hàm xử lý khi nhấn nút lọc
  const handleFilter = () => {
    setIsFilterModalVisible(true); // Mở modal lọc
  };

  // Hàm đóng modal lọc
  const closeFilterModal = () => {
    setIsFilterModalVisible(false);
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
          <View className="bg-white w-full h-[40%] p-4 rounded-xl">
            <Text>Home</Text>
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
