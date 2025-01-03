import { FlatList, Text, View } from 'react-native';
import { TabsScreenProps } from '../types/navigator.type';
import Header from '../components/Header';
import Bell from '../assets/icons/bell.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { TNotification } from '../types/notification.type';
import NotificationItem from '../components/NotificationItem';
import { NotificationApi } from '../api/notification.api';
import { PostApi } from '../api/post.api';
import { useFocusEffect } from '@react-navigation/native';

const NotificationScreen = ({ navigation }: TabsScreenProps) => {
  const [items, setItems] = useState<TNotification[]>([]);

  const fetchApi = async () => {
    try {
      const { data } = await NotificationApi.getAll();
      setItems(data);
    }
    catch (err) {
      console.log('err: ', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchApi();
    }, [])
  );

  const handleMarkAsRead = async (id: number, type: 'COMMENT' | 'RELATIONSHIP_REQUEST' | 'GROUP_POST' | 'GROUP_INVITATION', referenceId: number, groupType: string) => {
    try {
      await NotificationApi.markAsRead(id);
      switch (type) {
        case 'COMMENT':
          const { data } = await PostApi.getDetail(referenceId);
          if (!data.image) {
            return;
          }
          navigation.push('PostDetail', { postID: referenceId });
          break;
        case 'GROUP_INVITATION':
          navigation.push('LocationGroup', { groupID: referenceId, groupType: groupType });
          break;
        case 'RELATIONSHIP_REQUEST':
          navigation.push('RelationshipRequest', { referenceId: referenceId });
          break;
        case 'GROUP_POST':
          navigation.push('PostDetail', { postID: referenceId });
          break;
      }
    }
    catch (err) {
      console.log('Err: ', err);
    }
  };

  return (
    <>
      <Header title={items.length > 0 ? `Notifications (${items.length})` : 'Notfications'} SideTitleIcon={Bell} />
      <View className="flex flex-1 h-full w-full">
        <FlatList
          className="m-2"
          data={items}
          renderItem={({ item }: { item: TNotification }) => (
            <NotificationItem item={item} onPress={() => handleMarkAsRead(item.id, item.notificationType, item.referenceId, item.groupType as string)} />
          )}
        />
      </View>
    </>
  );
};

export default NotificationScreen;
