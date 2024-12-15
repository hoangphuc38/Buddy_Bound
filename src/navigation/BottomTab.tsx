import React from 'react';
import {View, StyleSheet, Text, Dimensions, Platform} from 'react-native';
import {
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from 'react-native-heroicons/outline';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../types/navigator.type';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import RelationshipScreen from '../screens/RelationshipScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const {width} = Dimensions.get('window');
const TAB_WIDTH = width / 4;
const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;

const CustomTabBarIcon = ({icon: Icon, label, focused}) => {
  return (
    <View style={[styles.tabItemContainer]}>
      <Icon
        color={focused ? '#000' : '#9ca3af'}
        size={24}
        strokeWidth={focused ? 2 : 1.5}
      />
      <Text style={[styles.tabLabel, focused && styles.focusedTabLabel]}>
        {label}
      </Text>
      {focused && <View style={styles.indicator} />}
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
        tabBarStyle: {
          ...styles.tabBar,
          height: TAB_BAR_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon icon={HomeIcon} label="Buddy" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="RelationshipScreen"
        component={RelationshipScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon
              icon={MagnifyingGlassIcon}
              label="Relationship"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon
              icon={HeartIcon}
              label="Notification"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon
              icon={UserCircleIcon}
              label="Setting"
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f4f4f5',
    paddingTop: 8,
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: TAB_WIDTH,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#9ca3af',
  },
  focusedTabLabel: {
    color: '#000',
    fontWeight: '500',
  },
  indicator: {
    position: 'absolute',
    top: -11,
    width: 20,
    height: 3,
    backgroundColor: '#000',
    borderRadius: 2,
  },
});

export default Tabs;
