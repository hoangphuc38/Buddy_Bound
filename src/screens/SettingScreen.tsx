import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { TabsScreenProps } from '../types/navigator.type';
import React from 'react';
import Header from '../components/Header';
import Location from '../assets/icons/location.svg';
import Image from '../assets/icons/image.svg';
import LocationHistory from '../assets/icons/location-history.svg';
import Shield from '../assets/icons/shield.svg';
import Logout from '../assets/icons/logout.svg';
import SettingItem, { ISettingItem } from '../components/SettingItem';
import { useAuth } from '../contexts/auth-context';

const SettingScreen = ({ navigation }: TabsScreenProps) => {

  const {signOut} = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.push('LogIn'); // Điều hướng về màn hình đăng nhập (tùy chỉnh theo cấu trúc của bạn)
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const items: ISettingItem[] = [
    {
      Icon: Shield,
      text: 'Permission',
      onClick: () => navigation.push('PermissionScreen'),
    },
    {
      Icon: LocationHistory,
      text: 'Your location history',
      onClick: () => navigation.push('LocationHistoryScreen'),
    },
    {
      Icon: Image,
      text: 'Album storage',
      onClick: () => navigation.push('AlbumStorageScreen'),
    },
    {
      Icon: Location,
      text: 'Memorable destinations',
      onClick: () => navigation.push('MemorablePlaces'),
    },
  ];
  return (
    <>
      <Header title="Settings" />
      <View className="flex flex-1 h-full w-full ">
        <FlatList
          data={items}
          renderItem={({ item }: { item: ISettingItem }) => (
            <SettingItem Icon={item.Icon} text={item.text} onClick={item.onClick} />
          )}
          keyExtractor={(item) => item.text}
        />
        <TouchableOpacity
          className="bg-[#EF4444] flex items-center justify-center py-3 mb-5 mx-2 rounded-lg"
          onPress={handleSignOut}
        >
          <View className="flex flex-row items-center justify-center space-x-2">
            <Logout height={20} width={20} />
            <Text className="text-white font-interMedium">Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SettingScreen;
