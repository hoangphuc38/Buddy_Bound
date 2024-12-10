import { NavigationContainer, Theme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigator.type';
import React, { useContext } from 'react';
import Tabs from './BottomTab';
import WelcomeScreen from '../screens/WelcomeScreen';
import LocationBuddyScreen from '../screens/LocationBuddyScreen';
import LocationGroupScreen from '../screens/LocationGroupScreen';
import NewPostScreen from '../screens/NewPostScreen';
import PostOfGroupScreen from '../screens/PostOfGroup';
import PostDetailScreen from '../screens/PostDetailScreen';
import MemorablePlaceScreen from '../screens/MemorablePlaceScreen';
import NewMemorablePlaceScreen from '../screens/NewMemorablePlaceScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#FFFFFF"
    },
};

const Navigator = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Tabs' component={Tabs} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='LocationBuddy' component={LocationBuddyScreen} />
                <Stack.Screen name='LocationGroup' component={LocationGroupScreen} />
                <Stack.Screen name='NewPost' component={NewPostScreen} />
                <Stack.Screen name='PostOfGroup' component={PostOfGroupScreen} />
                <Stack.Screen name='PostDetail' component={PostDetailScreen}
                    options={{
                        gestureEnabled: true,
                        gestureDirection: 'vertical',
                        animation: 'slide_from_bottom',
                    }}
                />
                <Stack.Screen name='MemorablePlaces' component={MemorablePlaceScreen} />
                <Stack.Screen name='NewMemorable' component={NewMemorablePlaceScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;