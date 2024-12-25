import {
  NavigationContainer,
  Theme,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigator.type';
import React, { useEffect, useState } from 'react';
import Tabs from './BottomTab';
import WelcomeScreen from '../screens/WelcomeScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgetPassScreen from '../screens/ForgetPassScreen';
import AddContactScreen from '../screens/AddContact';
import NewRelationshipScreen from '../screens/NewRelationship';
import SetNewRelationshipScreen from '../screens/SetNewRelationship';
import LocationBuddyScreen from '../screens/LocationBuddyScreen';
import LocationGroupScreen from '../screens/LocationGroupScreen';
import NewPostScreen from '../screens/NewPostScreen';
import PostOfGroupScreen from '../screens/PostOfGroup';
import PostDetailScreen from '../screens/PostDetailScreen';
import MemorablePlaceScreen from '../screens/MemorablePlaceScreen';
import NewMemorablePlaceScreen from '../screens/NewMemorablePlaceScreen';
import NewGroupScreen from '../screens/NewGroupScreen';
import AlbumStorage from '../screens/AlbumStorage';
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen';
import HistoryLocation from '../screens/HistoryLocation';
import ChatScreen from '../screens/ChatScreen';
import { useAuth } from '../contexts/auth-context';
import AddAlbum from '../screens/AddAlbum';
import CreateAccInfoScreen from '../screens/CreateAccInfo';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

const Navigator = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsLoading(false);
    };
    initializeApp();
  }, [token]);

  if (isLoading) {
    return null;
  }
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token !== null ?
          <>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="NewRelationship" component={NewRelationshipScreen}/>
        <Stack.Screen name="SetNewRelationship" component={SetNewRelationshipScreen}/>
        <Stack.Screen name="LocationBuddy" component={LocationBuddyScreen} />
        <Stack.Screen name="LocationGroup" component={LocationGroupScreen} />
        <Stack.Screen name="NewPost" component={NewPostScreen} />
        <Stack.Screen name="PostOfGroup" component={PostOfGroupScreen} />
        <Stack.Screen name="LocationHistoryScreen" component={HistoryLocation} />
        <Stack.Screen name="PermissionScreen" component={PermissionsScreen} />
        <Stack.Screen name="NewGroupScreen" component={NewGroupScreen} />
        <Stack.Screen name="AlbumStorageScreen" component={AlbumStorage} />
        <Stack.Screen name="AlbumDetailsScreen" component={AlbumDetailsScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{
            gestureEnabled: true,
            gestureDirection: 'vertical',
            animation: 'slide_from_bottom',
          }}/>
        <Stack.Screen name="MemorablePlaces" component={MemorablePlaceScreen} />
        <Stack.Screen name="NewMemorable" component={NewMemorablePlaceScreen} />
        <Stack.Screen name="AddAlbum" component={AddAlbum} />
        <Stack.Screen name='CreateAccInfo' component={CreateAccInfoScreen}/>
        <Stack.Screen name='AddContact' component={AddContactScreen}/>
          </>
          :
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="LogIn" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name='CreateAccInfo' component={CreateAccInfoScreen}/>
            <Stack.Screen name="ForgetPass" component={ForgetPassScreen} />
            <Stack.Screen name="AddContact" component={AddContactScreen} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
