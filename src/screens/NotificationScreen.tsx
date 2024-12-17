import {FlatList, Text, View} from 'react-native';
import {TabsScreenProps} from '../types/navigator.type';
import Header from '../components/Header';
import Bell from '../assets/icons/bell.svg';
import React, { useEffect, useState } from 'react';
import { TNotification } from '../types/notification.type';
import NotificationItem from '../components/NotificationItem';

const notifications = require('../assets/data/notification.json');

const NotificationScreen = ({navigation}: TabsScreenProps) => {
  const [items, setItems] = useState<TNotification[]>(notifications);
  const [fetched, setFetched] = useState<boolean>(false);

  const handleFetch = () => {
    setFetched(true);
  };

  useEffect(() => {
    // console.log(items);
    handleFetch();
  }, [fetched]);

  return (
    <>
      <Header title="Notifications (3)" SideTitleIcon={Bell}/>
      <View className="flex flex-1 h-full w-full">
        <FlatList
          className="m-2"
          data={items}
          renderItem={({ item }: { item: TNotification }) => (
            <NotificationItem item={item} />
          )}
        />
      </View>
    </>
  );
};

export default NotificationScreen;
