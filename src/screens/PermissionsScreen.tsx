import React, { useEffect, useState } from 'react';
import { PermissionScreenProps } from '../types/navigator.type';
import Header from '../components/Header';
import PermissionItem, { IPermissionItem } from '../components/PermissionItem';
import Location from '../assets/icons/location-blue.svg';
import Call from '../assets/icons/call.svg';
import LocationHistory from '../assets/icons/location-history-purple.svg';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { TSetting } from '../types/setting.type';
import { UserApi } from '../api/user.api';

const PermissionsScreen = ({ navigation }: PermissionScreenProps) => {
  const [settings, setSettings] = useState<TSetting>({locationEnabled: true, locationHistoryEnabled: true, contactEnabled: true});
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const { data } = await UserApi.getSettings();
      setSettings(data);
      setLoading(false);
    } catch (error) {
      console.log('err: ', error);
      setLoading(false);
    }
  };

  const handlePermissionChange = (key: keyof TSetting, value: boolean) => {
    if (!settings) {return;}
    const updatedSettings = {
      ...settings,
      [key]: value,
      ...(key === 'locationEnabled' && !value && { locationHistoryEnabled: false }),
    };
    setSettings(updatedSettings);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await UserApi.updateSettings(settings as TSetting);
      setLoading(false);
    } catch (error) {
      console.log('err: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const items: IPermissionItem[] = [
    {
      Icon: Location,
      backgroundColor: 'bg-blue-100',
      description: 'Enable everyone to see your location',
      text: 'Location to everyone',
      isEnabled: settings?.locationEnabled ?? false,
      onChange: (value) => handlePermissionChange('locationEnabled', value),
    },
    {
      Icon: Call,
      description: 'Help you connect your acquaintances',
      text: 'Contact permission',
      backgroundColor: 'bg-green-100',
      isEnabled: settings?.contactEnabled ?? false,
      onChange: (value) => handlePermissionChange('contactEnabled', value),
    },
    {
      Icon: LocationHistory,
      description: 'Track destinations which you traveled',
      backgroundColor: 'bg-purple-100',
      text: 'Location history tracking',
      isEnabled: settings?.locationHistoryEnabled ?? false,
      onChange: (value) => handlePermissionChange('locationHistoryEnabled', value),
    },
  ];

  if (loading) {
    return (
        <View className="flex flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2C7CC1" />
        </View>
    );
  }

  return (
    <>
      <Header onBack={() => navigation.pop()} title="Permissions" onPrimaryAction={handleSave} primaryText="Save"/>
      <FlatList
        data={items}
        renderItem={({ item }: { item: IPermissionItem }) => (
          <PermissionItem
            description={item.description}
            backgroundColor={item.backgroundColor}
            Icon={item.Icon}
            text={item.text}
            isEnabled={item.isEnabled}
            onChange={item.onChange}
          />
        )}
        keyExtractor={(item) => item.text}
      />
    </>
  );
};

export default PermissionsScreen;
