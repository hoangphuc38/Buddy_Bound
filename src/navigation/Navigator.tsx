import { NavigationContainer, Theme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigator.type';
import React, { useContext } from 'react';
import Tabs from './BottomTab';
import WelcomeScreen from '../screens/WelcomeScreen';

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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;