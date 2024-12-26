import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import {
  LocationBuddyScreenProps,
  RootStackParamList,
} from '../types/navigator.type';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faMessage } from '@fortawesome/free-solid-svg-icons';
import Mapbox, { Camera, MapView, MarkerView } from '@rnmapbox/maps';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MemorablePlaceApi } from '../api/memorablePlace.api';
import { LocationHistoryApi } from '../api/location-history.api';
import { UserContext } from '../contexts/user-context';
import { TLocation } from '../types/location.type';
import { TMemorablePlace } from '../types/location-history.type';
import { renderMarkers } from '../pattern/decorator';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import useWebSocketConnection from '../hooks/useWebsocket';


const LocationBuddyScreen = ({
  route,
  navigation,
}: LocationBuddyScreenProps & {
  route: RouteProp<RootStackParamList, 'LocationBuddy'>;
}) => {
  const { groupID, userID, user } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const { user: currentUser } = useContext(UserContext);

  const [memberLocations, setMemberLocations] = useState<TLocation[]>([]);
  const [currentUserLocation, setCurrentUserLocation] = useState<TLocation>();
  const [memorableDestinations, setMemorableDestinations] = useState<TMemorablePlace[]>([]);

  const fetchMap = async () => {
      try {
        const [memorableResponse, locationsResponse, currentLocationResponse] =
          await Promise.all([
            MemorablePlaceApi.getAll(),
            LocationHistoryApi.getUserLocations(userID),
            LocationHistoryApi.getMemberLocation(currentUser?.id as number),
          ]);

        return {
          locations: locationsResponse.data,
          memorablePlaces: memorableResponse.data,
          currentLocation: currentLocationResponse.data,
        };
      } catch (error) {
        console.log('Error fetching map data:', error);
        throw error;
      }
  };


  const {
    connected,
    subscribeToLocation,
  } = useWebSocketConnection({
    onLocationReceived: (groupId: number, location: TLocation) => {
      setMemberLocations((prev) => {
        return prev.map((oldLocation) => {
          if (oldLocation.user?.id === location.user?.id) {
            return { ...oldLocation, ...location };
          }
          return oldLocation;
        });
      });
    },
    debug: true,
  });

  useEffect(() => {
    if (connected) {
      subscribeToLocation(userID);
    }
  });

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      if (!isMounted) {return;}

      setLoading(true);
      try {
        await Mapbox.setTelemetryEnabled(false);
        const mapData = await fetchMap();

        if (!isMounted) {return;}

        setCurrentUserLocation(mapData.currentLocation);
        setMemberLocations(mapData.locations);
        setMemorableDestinations(mapData.memorablePlaces);
        setIsMapReady(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
    };
  }, [groupID]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     Geolocation.getCurrentPosition(
  //       async (position) => {
  //         if (user) {
  //           setCurrentUserLocation({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //             userId: user.id,
  //             timestamp: new Date().toISOString(),
  //           });
  //         }
  //       },
  //       (error) => {
  //         if (error.code === 3) {
  //           console.log('Location request timed out. Try again later.');
  //         } else if (error.code === 1) {
  //           console.log('Location permission denied.');
  //         } else if (error.code === 2) {
  //           console.log('Position unavailable.');
  //         } else {
  //           console.log('Error getting location: ', error);
  //         }
  //       },
  //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );
  //   }, 10000);
  //   return () => clearInterval(intervalId);
  // }, []);

  const handleMessage = () => {
    navigation.push('ChatScreen', { groupId: userID, user: user });
  };

  const centerCoordinate = useMemo(() => {
      if (
        currentUserLocation &&
        currentUserLocation.longitude !== undefined &&
        currentUserLocation.latitude !== undefined
      ) {
        return [currentUserLocation.longitude, currentUserLocation.latitude];
      }
      return [10.769505599915275, 106.66807324372434];
    }, [currentUserLocation]);

  return (
    <View className="flex flex-1 h-full w-full">
      <View style={{ flex: 1 }}>
              {isMapReady && !loading ? (
                <MapView
                  style={{ flex: 1 }}
                  zoomEnabled={true}
                  styleURL="mapbox://styles/mapbox/outdoors-v12"
                  rotateEnabled={true}
                  attributionEnabled={true}
                  logoEnabled={true}
                >
                  {!loading && (
                    <Camera
                      zoomLevel={15}
                      centerCoordinate={centerCoordinate}
                      animationMode={'flyTo'}
                      animationDuration={1000}
                    />
                  )}
                  {!loading && (
                    <>
                      {renderMarkers({
                        isShown: true,
                        type: 'User',
                        data: memberLocations,
                      })}
                      {renderMarkers({
                        isShown: true,
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

      <TouchableOpacity
        onPress={handleMessage}
        className="absolute bottom-3 right-3 bg-backButton w-[40px] h-[40px] rounded-full items-center justify-center">
        <FontAwesomeIcon icon={faMessage} size={17} color="#125B9A" />
      </TouchableOpacity>
    </View>
  );
};

export default LocationBuddyScreen;
