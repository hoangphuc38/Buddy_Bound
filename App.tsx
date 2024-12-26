import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Navigator from './src/navigation/Navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './src/contexts/auth-context';
import Config from 'react-native-config';
import Mapbox from '@rnmapbox/maps';
import { UserProvider } from './src/contexts/user-context';
import Geolocation from '@react-native-community/geolocation';
import { LocationHistoryApi } from './src/api/location-history.api';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { getData } from './src/helpers/asyncStorage';

Mapbox.setAccessToken(Config.MAPBOX_PB_TOKEN || 'pk.eyJ1IjoicGh1bGUyMzMzIiwiYSI6ImNtMHpna2l1azA1dDIya3B1bXRzMm5jcXMifQ.PPE8QVyyUoOSOXfwSg33hA');
const App = () => {
  useEffect(() => {
    const checkPermissionAndFetchLocation = async () => {
      const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (status === RESULTS.GRANTED) {
        // Immediately fetch the location
        Geolocation.getCurrentPosition(
          async (position) => {
            const token = await getData({ item: 'token'});
            console.log(token);
            if (token) {
              console.log(position);
              await LocationHistoryApi.updateLocation(position.coords.latitude, position.coords.longitude);
            }
          },
          (error) => {
            if (error.code === 3) {
              console.log('Location request timed out. Try again later.');
            } else if (error.code === 1) {
              console.log('Location permission denied.');
            } else if (error.code === 2) {
              console.log('Position unavailable.');
            } else {
              console.log('Error getting location: ', error);
            }
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        // Set up an interval for periodic location updates
        const intervalId = setInterval(() => {
          Geolocation.getCurrentPosition(
            async (position) => {
              const token = await getData({ item: 'token'});
              console.log(token);
              if (token) {
                console.log(position);
                await LocationHistoryApi.updateLocation(position.coords.latitude, position.coords.longitude);
              }
            },
            (error) => {
              if (error.code === 3) {
                console.log('Location request timed out. Try again later.');
              } else if (error.code === 1) {
                console.log('Location permission denied.');
              } else if (error.code === 2) {
                console.log('Position unavailable.');
              } else {
                console.log('Error getting location: ', error);
              }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }, 30000);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
      } else {
        console.log('Location permission denied');
      }
    };

    checkPermissionAndFetchLocation();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <UserProvider>
          <Navigator />
        </UserProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
