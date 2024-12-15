import React from 'react';
import { PermissionScreenProps } from '../types/navigator.type';
import Header from '../components/Header';
import PermissionItem, { IPermissionItem } from '../components/PermissionItem';
import Location from '../assets/icons/location-blue.svg';
import Call from '../assets/icons/call.svg';
import LocationHistory from '../assets/icons/location-history-purple.svg';
import { FlatList } from 'react-native';

const PermissionsScreen = ({ navigation }: PermissionScreenProps) => {
  const items: IPermissionItem[] = [
        {
          Icon: Location,
          backgroundColor: 'bg-blue-100',
          description: 'Enable everyone to see your location',
          text: 'Location to everyone',
          onClick: () => {},
        },
        {
          Icon: Call,
          description: 'Help you connect your acquaintances',
          text: 'Contact permission',
          backgroundColor: 'bg-green-100',
          onClick: () => navigation.push('LocationHistoryScreen'),
        },
        {
          Icon: LocationHistory,
          description: 'Track destinations which you traveled',
          backgroundColor: 'bg-purple-100',
          text: 'Location history tracking',
          onClick: () => navigation.push('AlbumStorageScreen'),
        },
  ];
  return (
    <>
      <Header onBack={() => navigation.pop()} title="Permissions"/>
      <FlatList
            data={items}
            renderItem={({ item }: { item: IPermissionItem }) => (
              <PermissionItem description={item.description} backgroundColor={item.backgroundColor} Icon={item.Icon} text={item.text} onClick={item.onClick} />
            )}
            keyExtractor={(item) => item.text}
          />
    </>
  );
};

export default PermissionsScreen;
