/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  LocationGroupScreenProps,
  RootStackParamList,
} from '../types/navigator.type';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faAngleLeft,
  faArrowLeft,
  faChevronUp,
  faMessage,
  faPen,
  faPeopleGroup,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { NewspaperIcon } from 'react-native-heroicons/solid';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import GroupMember from '../components/GroupMember';
import ApprovalMember from '../components/ApprovalMember';
import React from 'react';
import { GroupApi } from '../api/group.api';
import { TMember } from '../types/member.type';
import { Modal } from '../components/Modal';
import SearchBar from '../components/SearchBar';
import MemberItem from '../components/MemberItem';
import { RelationshipApi } from '../api/relationship.api';
import { TUser } from '../types/user.type';
import { TInviteGroup } from '../types/group.type';
import { toast, ToastOptions } from '@baronha/ting';
import Mapbox, { Camera, MapView, MarkerView } from '@rnmapbox/maps';
import { LocationHistoryApi } from '../api/location-history.api';
import { TLocation } from '../types/location.type';
import Geolocation from '@react-native-community/geolocation';
import { TimeFormatter } from '../helpers';
import { TPost } from '../types/post.type';
import { TMemorablePlace } from '../types/location-history.type';
import { PostApi } from '../api/post.api';
import { MemorablePlaceApi } from '../api/memorablePlace.api';
import useWebSocketConnection from '../hooks/useWebsocket';
import { renderMarkers } from '../pattern/decorator';
import { UserContext } from '../contexts/user-context';

const LocationGroupScreen = ({
  route,
  navigation,
}: LocationGroupScreenProps & {
  route: RouteProp<RootStackParamList, 'LocationGroup'>;
}) => {
  const { user } = useContext(UserContext);
  const { groupID, groupType } = route.params;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSeeAll, setIsSeeAll] = useState<string | null>(null);
  const [groupMembers, setGroupMembers] = useState<TMember[]>([]);
  const [approvalMembers, setApprovalMembers] = useState<TMember[]>([]);
  const [allRelatedUsers, setAllRelatedUsers] = useState<TUser[]>([]);
  const [invitedBuddies, setInvitedBuddies] = useState<number[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [showPosts, setShowPosts] = useState<boolean>(true);
  const [showMembers, setShowMembers] = useState<boolean>(true);
  const [showMemorableDestinations, setShowMemorableDestinations] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  //for map
  const [groupPosts, setGroupPosts] = useState<TPost[]>([]);
  const [memberLocations, setMemberLocations] = useState<TLocation[]>([]);
  const [memorableDestinations, setMemorableDestinations] = useState<TMemorablePlace[]>([]);
  const [selectedMemberLocation, setSelectedMemberLocation] = useState<TLocation>();

  const [modal, setModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const sheetRef = useRef<BottomSheetMethods>(null);

  //websocket
  const {
    connected,
    subscribeToLocation,
  } = useWebSocketConnection({
    onLocationReceived: (groupId: number, location: TLocation) => {
      console.log('Location received for group:', groupId, location);
    },
    debug: true,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  const fetchMap = async () => {
    try {
      const [postsResponse, memorableResponse, locationsResponse, currentLocationResponse] =
        await Promise.all([
          PostApi.getAll(groupID),
          MemorablePlaceApi.getAll(),
          LocationHistoryApi.getUserLocations(groupID),
          LocationHistoryApi.getMemberLocation(user?.id as number),
        ]);

      return {
        posts: postsResponse.data,
        locations: locationsResponse.data,
        memorablePlaces: memorableResponse.data,
        currentLocation: currentLocationResponse.data,
      };
    } catch (error) {
      console.log('Error fetching map data:', error);
      throw error;
    }
  };

  const buttonAnimations = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
  const chevronRotation = useRef(new Animated.Value(0)).current;

  const chevronRotationStyle = {
    transform: [
      {
        rotate: chevronRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-180deg'],
        }),
      },
    ],
  };

  useEffect(() => {
    if (isOpen) {
      Animated.stagger(
        100,
        buttonAnimations.map(animation =>
          Animated.spring(animation, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
        ),
      ).start();

      Animated.timing(chevronRotation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      buttonAnimations.forEach(animation => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });

      Animated.timing(chevronRotation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  // Animation styles for buttons
  const getButtonStyle = (index: number) => ({
    opacity: buttonAnimations[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: buttonAnimations[index].interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  });

  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSeeAll) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isSeeAll]);

  useEffect(() => {
    if (connected) {
      subscribeToLocation(groupID);
    }
  }, [connected, groupID]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          membersResponse,
          approvalResponse,
          mapData,
        ] = await Promise.all([
          GroupApi.getMembers(groupID),
          GroupApi.getWaitingApproval(groupID),
          fetchMap(),
        ]);

        setSelectedMemberLocation(mapData.currentLocation);
        setMemberLocations(mapData.locations);
        setMemorableDestinations(mapData.memorablePlaces);
        setGroupPosts(mapData.posts);
        setGroupMembers(membersResponse.data);
        setApprovalMembers(approvalResponse.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupID]);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        await Mapbox.setTelemetryEnabled(false);
        setIsMapReady(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      Geolocation.getCurrentPosition(
        async (position) => {
          console.log(position);
          await LocationHistoryApi.updateLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log('Error getting location: ', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
      );
    }, 180000);
    return () => clearInterval(intervalId);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMap();
    }, [])
  );

  const addToInvitedList = (id: number) => {
    setInvitedBuddies(prevList => {
      if (prevList.includes(id)) {
        return prevList.filter(item => item !== id);
      } else {
        return [...prevList, id];
      }
    });
  };

  const handleSendInviation = async () => {
    let body: TInviteGroup = {
      id: groupID,
      groupType: groupType,
      userIds: invitedBuddies,
      groupName: '',
      groupDescription: '',
    };

    try {
      await GroupApi.inviteGroup(body);

      const options: ToastOptions = {
        title: 'Invite buddies',
        message: 'Send invitation successfully!',
        preset: 'done',
        backgroundColor: '#e2e8f0',
      };
      toast(options);
    }
    catch (error) {
      console.log('err: ', error);
    }
  };

  return (
    <>
      <View className="flex flex-1 h-full w-full">
        <View style={{ flex: 1 }}>
        {isMapReady ? (
          <MapView
            style={{ flex: 1 }}
            zoomEnabled={true}
            styleURL="mapbox://styles/mapbox/outdoors-v12"
            rotateEnabled={true}
            attributionEnabled={true}
            logoEnabled={true}
          >
            <Camera
              zoomLevel={15}
              centerCoordinate={
                selectedMemberLocation
                  ? [selectedMemberLocation.longitude, selectedMemberLocation.latitude]
                  : [10.769505599915275, 106.66807324372434]
              }
              animationMode={'flyTo'}
              animationDuration={6000}
            />
            {!loading && (
              <>
                {renderMarkers({
                  isShown: showMembers,
                  type: 'User',
                  data: memberLocations,
                })}
                {renderMarkers({
                  isShown: showPosts,
                  type: 'Post',
                  data: groupPosts,
                })}
                {renderMarkers({
                  isShown: showMemorableDestinations,
                  type: 'Destination',
                  data: memorableDestinations,
                })}
              </>
            )}
          </MapView>
        ) : (
          <View className="flex flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2C7CC1" />
          </View>
        )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          className="absolute left-3 top-3 bg-backButton w-[33px] h-[33px] rounded-full items-center justify-center">
          <FontAwesomeIcon icon={faAngleLeft} size={17} />
        </TouchableOpacity>

        {isOpen && (
          <>
            <Animated.View
              style={[
                getButtonStyle(0),
                {
                  position: 'absolute',
                  bottom: 60,
                  right: 12,
                },
              ]}>
              <TouchableOpacity onPress={() => navigation.push('ChatScreen')} className="bg-primary w-[40px] h-[40px] rounded-full items-center justify-center">
                <FontAwesomeIcon icon={faMessage} size={17} color="white" />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={[
                getButtonStyle(1),
                {
                  position: 'absolute',
                  bottom: 105,
                  right: 12,
                },
              ]}>
              <TouchableOpacity
                onPress={() => sheetRef.current?.open()}
                className="bg-primary w-[40px] h-[40px] rounded-full items-center justify-center">
                <FontAwesomeIcon icon={faPeopleGroup} size={20} color="white" />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={[
                getButtonStyle(2),
                {
                  position: 'absolute',
                  bottom: 150,
                  right: 12,
                },
              ]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('PostOfGroup', { groupID: groupID })
                }
                className="bg-primary w-[40px] h-[40px] rounded-full items-center justify-center">
                <NewspaperIcon size={20} color="white" />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={[
                getButtonStyle(3),
                {
                  position: 'absolute',
                  bottom: 195,
                  right: 12,
                },
              ]}>
              <TouchableOpacity
                onPress={() => navigation.push('NewPost', { groupID: groupID })}
                className="bg-secondary w-[40px] h-[40px] rounded-full items-center justify-center">
                <FontAwesomeIcon icon={faPen} size={17} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </>
        )}

        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          className="absolute bottom-3 right-3 bg-backButton w-[40px] h-[40px] rounded-full items-center justify-center">
          <Animated.View style={chevronRotationStyle}>
            <FontAwesomeIcon icon={faChevronUp} size={17} color="#125B9A" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Modal isOpen={modal}>
        <View className="bg-white w-full h-[80%] p-4 rounded-xl">
          <View className="flex flex-row justify-center items-center mb-4">
            <Text className="font-interMedium text-[20px] text-center">
              Buddies
            </Text>
            <TouchableOpacity
              onPress={() => setModal(!modal)}
              className="absolute top-0 right-0 bg-backButton w-[20px] h-[20px] rounded-full items-center justify-center">
              <FontAwesomeIcon icon={faXmark} size={13} color="#2C7CC1" />
            </TouchableOpacity>
          </View>

          <SearchBar
            containerStyle={{ marginBottom: 20 }}
            placeholder="Search your buddy ..."
            onSearch={text => setSearchText(text)}
            value={searchText}
          />

          <FlatList
            data={allRelatedUsers.filter(user => !groupMembers.some(member => member.id === user.id))}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <MemberItem
                horizontal
                item={item}
                press={() => addToInvitedList(item.id)}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />

          <TouchableOpacity onPress={handleSendInviation}
            className="absolute bottom-0 left-0 right-0 bg-primary rounded-[10px] p-3 mx-4 mb-4 flex-row items-center justify-center">
            <Text className="text-white text-normal font-bold text-center ml-2">
              Send invitation
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <BottomSheet
        style={{ backgroundColor: 'white' }}
        ref={sheetRef}
        height="90%">
        <View className="h-full px-4 relative bg-white">
          <View className="flex flex-row justify-center items-center mb-4">
            <Text className="font-interMedium text-headerTitle text-center text-main">
              Group Member
            </Text>
          </View>
          <View className="mb-4">
            {/* Hiển thị hoặc ẩn groupMembers và approvalMembers tùy vào trạng thái isSeeAll */}

            {isSeeAll === 'groupMembers' && (
              <>
                <FlatList
                  data={groupMembers}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <GroupMember item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
                <TouchableOpacity
                  onPress={() => setIsSeeAll(null)}
                  className="mb-4 flex-row items-center">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    size={15}
                    color="#535862"
                  />
                  <Text className="text-[#535862] text-normal font-bold ml-2">
                    Back to List
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {isSeeAll === 'approvalMembers' && (
              <>
                <FlatList
                  data={approvalMembers}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <ApprovalMember item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
                <TouchableOpacity
                  onPress={() => setIsSeeAll(null)}
                  className="mb-4 flex-row items-center">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    size={15}
                    color="#535862"
                  />
                  <Text className="text-[#535862] text-normal font-bold ml-2">
                    Back to List
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Hiển thị groupMembers nếu không phải đang xem "See all" của groupMembers */}
            {isSeeAll === null && (
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: slideAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -300], // Hiệu ứng lướt qua trái
                      }),
                    },
                  ],
                }}>
                <FlatList
                  data={groupMembers.slice(0, 3)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <GroupMember item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
                <TouchableOpacity onPress={() => setIsSeeAll('groupMembers')}>
                  <Text className="text-placeHolder font-bold">See all</Text>
                </TouchableOpacity>
                <Text className="text-normal text-main font-bold my-4">
                  Waiting for Approval
                </Text>
                <FlatList
                  data={approvalMembers.slice(0, 2)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <ApprovalMember item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
                <TouchableOpacity
                  onPress={() => setIsSeeAll('approvalMembers')}>
                  <Text className="text-placeHolder font-bold">See all</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>

          <TouchableOpacity onPress={() => setModal(!modal)}
            className="absolute bottom-[30px] left-0 right-0 bg-primary rounded-[10px] p-3 mx-4 mb-4 flex-row items-center justify-center">
            <FontAwesomeIcon icon={faPlus} size={15} color="white" />
            <Text className="text-white text-normal font-bold text-center ml-2">
              Invite your buddies
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};

export default LocationGroupScreen;
