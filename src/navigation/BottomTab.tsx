import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HeartIcon, HomeIcon, MagnifyingGlassIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../types/navigator.type";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import RelationshipScreen from '../screens/RelationshipScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const CustomTabBarIcon = ({ icon: Icon, label, focused }) => {
    return (
        <View style={[styles.tabItemContainer, focused && styles.focusedTab]}>
            <Icon color={focused ? '#1e1e1e' : '#8e8e93'} size={24} />
            <Text style={[styles.tabLabel, focused && styles.focusedTabLabel]}>{label}</Text>
        </View>
    );
};

const Tabs = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { paddingBottom: insets.bottom, ...styles.tabBar },
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarActiveTintColor: "#1e1e1e",
            }}
        >
            <Tab.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon icon={HomeIcon} label='Buddy' focused={focused} />
                    )
                }}
            />
            <Tab.Screen
                name='RelationshipScreen'
                component={RelationshipScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon icon={MagnifyingGlassIcon} label='Relationship' focused={focused} />
                    )
                }}
            />
            <Tab.Screen
                name='NotificationScreen'
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon icon={HeartIcon} label='Notification' focused={focused} />
                    )
                }}
            />
            <Tab.Screen
                name='SettingScreen'
                component={SettingScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon icon={UserCircleIcon} label='Setting' focused={focused} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        backgroundColor: '#f4f4f5',
    },
    tabBarLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    tabItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    focusedTab: {
        borderTopWidth: 4,
        borderTopColor: '#FF6F61',
    },
    tabLabel: {
        fontSize: 13,
        marginTop: 2,
        color: '#8e8e93',
    },
    focusedTabLabel: {
        color: '#1e1e1e',
    },
});

export default Tabs;