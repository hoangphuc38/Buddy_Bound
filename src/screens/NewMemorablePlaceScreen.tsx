import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {NewMemorableProps, RootStackParamList} from '../types/navigator.type';
import {RouteProp} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBuilding,
  faHouse,
  faLocationDot,
  faSchoolFlag,
} from '@fortawesome/free-solid-svg-icons';
import SearchBar from 'react-native-dynamic-search-bar';
import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import {useEffect, useRef, useState} from 'react';
import CustomButton, {ButtonProps} from '../components/CustomButton';
import Mapbox, { Camera, MapView } from '@rnmapbox/maps';
import { TMemorablePlace } from '../types/location-history.type';
import { MemorablePlaceApi } from '../api/memorablePlace.api';
import { renderMarkers } from '../pattern/decorator';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import { toast, ToastOptions } from '@baronha/ting';

const NewMemorablePlaceScreen = ({
  route,
  navigation,
}: NewMemorableProps & {
  route: RouteProp<RootStackParamList, 'NewMemorable'>;
}) => {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const sheetRefLocationNote = useRef<BottomSheetMethods>(null);
  const sheetRefSave = useRef<BottomSheetMethods>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [memorablePlaces, setMemorablePlaces] = useState<TMemorablePlace[]>([]);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<{latitude: number, longitude: number}>();
  const [currentLocation, setCurrentLocation] = useState<{latitude: number, longitude: number}>({
    latitude: 10.769505599915275,
    longitude: 106.66807324372434,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const fetchAPI = async () => {
    try {
      const { data } = await MemorablePlaceApi.getAll();
      setMemorablePlaces(data || []);
    }
    catch (error) {
      console.log('err: ', error);
      setMemorablePlaces([]);
    }
  };

  const searchLocation = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=pk.eyJ1IjoicGh1bGUyMzMzIiwiYSI6ImNtMHpna2l1azA1dDIya3B1bXRzMm5jcXMifQ.PPE8QVyyUoOSOXfwSg33hA&country=VN&limit=5`
      );
      const data = await response.json();
      setSearchResults(data.features || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      if (selectedLocation && selectedType && locationName.length > 1) {
        const data: TMemorablePlace = {
          note: locationName,
          locationType: selectedType,
          latitude: selectedLocation?.longitude as number,
          longitude: selectedLocation?.latitude as number,
        };
        await MemorablePlaceApi.create(data);
        const options: ToastOptions = {
                title: 'Destination',
                message: 'Create successfully',
                preset: 'done',
                backgroundColor: '#e2e8f0',
              };
        toast(options);
        fetchAPI();
      }
      setSelectedType('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSearchSelect = (result: any) => {
    const [longitude, latitude] = result.center;
    setCurrentLocation({ latitude, longitude });
    setSearchResults([]);
    setSearchQuery('');
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log('Error getting location: ', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      if (!isMounted) {return;}

      try {
        await Mapbox.setTelemetryEnabled(false);
        await fetchAPI();
        if (isMounted) {
          setIsMapReady(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
    };
  }, []);

  const HandleLocationNote = () => {
    sheetRef.current?.close();
    sheetRefLocationNote.current?.open();
  };

  const HandleSaveLocation = () => {
    handleCreate();
    sheetRefLocationNote.current?.close();
  };

  const HandleTextChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const text = e.nativeEvent.text;
    setLocationName(text);
  };

  const [buttons, setButtons] = useState<ButtonProps[]>([
    {
      id: '1',
      name: 'Home',
      type: 'HOME',
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      id: '2',
      name: 'School',
      type: 'SCHOOL',
      icon: <FontAwesomeIcon icon={faSchoolFlag} />,
    },
    {
      id: '3',
      name: 'Workplace',
      type: 'WORK_PLACE',
      icon: <FontAwesomeIcon icon={faBuilding} />,
    },
  ]);

  return (
    <>
      <View style={{ flex: 1 }}>
        {isMapReady ? (
          <MapView
            style={{ flex: 1 }}
            zoomEnabled={true}
            styleURL="mapbox://styles/mapbox/outdoors-v12"
            rotateEnabled={true}
            attributionEnabled={true}
            logoEnabled={true}
            onPress={({geometry}) => {
              setSelectedLocation({latitude: geometry.coordinates[0], longitude: geometry.coordinates[1]});
              sheetRef.current.open();
            }}
          >
            <Camera
              zoomLevel={15}
              centerCoordinate={[currentLocation.longitude, currentLocation.latitude]}
              animationMode={'flyTo'}
              animationDuration={1000}
            />
            {renderMarkers({
              isShown: true,
              type: 'Destination',
              data: memorablePlaces,
            })}
          </MapView>
        ) : (
          <View className="flex flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2C7CC1" />
          </View>
        )}
      </View>
      <View className="absolute left-0 top-5 w-full px-5 right-0 z-10">
        <SearchBar
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchLocation(text);
          }}
          placeholder="Search location"
        />

        {searchResults.length > 0 && (
          <View className="bg-white rounded-lg shadow-lg mt-2 max-h-60">
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-3 border-b border-gray-200"
                  onPress={() => handleSearchSelect(item)}
                >
                  <Text className="font-medium">{item.place_name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
      <BottomSheet ref={sheetRef} height="30%">
        <View className="h-full px-4 pb-2">
          <View className="mb-5">
            <Text className="text-main text-title font-bold mb-1">
              Create memorable destination
            </Text>
          </View>
          <View className="flex flex-row justify-between space-x-3">
              <TouchableOpacity
                onPress={HandleLocationNote}
                className="flex-1 flex-row items-center justify-center border-2 border-main pr-[25px] py-1 rounded-[8px]">
                <Image
                  source={require('../assets/images/location-note-icon.png')}
                  style={{width: 35, height: 35}}
                />
                <Text className="text-[15px] text-main font-bold">
                  Location Note
                </Text>
              </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center border-2 border-main pr-[25px] py-1 rounded-[8px]">
              <Image
                source={require('../assets/images/start-post-icon.png')}
                style={{width: 35, height: 37}}
              />
              <Text className="text-[15px] text-main font-bold">
                Start a Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      <BottomSheet ref={sheetRefLocationNote} height="40%">
        <View className="h-full px-4 pb-2">
          <View className="mb-2">
            <Text className="text-main text-normal font-bold">
              Choose your location type
            </Text>
          </View>
          <View className="mb-4">
            <FlatList
              data={buttons}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <CustomButton item={item} isSelected={selectedType === item.type} press={() => setSelectedType(item.type)} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Text className="text-main font-bold text-normal mb-2">
            Location Name:
          </Text>
          <TextInput
            className="text-medium text-main h-auto px-4 mb-3 bg-backButton rounded-[10px]"
            placeholderTextColor="#2C7CC1"
            onChange={HandleTextChange}
          />
          <TouchableOpacity
            onPress={HandleSaveLocation}
            className="mt-2 bg-main px-10 py-2 rounded-[10px] items-center justify-center mb-2">
            <Text className="font-bold text-white text-normal">Save</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};

export default NewMemorablePlaceScreen;
