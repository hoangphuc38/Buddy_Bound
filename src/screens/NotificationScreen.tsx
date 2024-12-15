import {Text, View} from 'react-native';
import {TabsScreenProps} from '../types/navigator.type';

const NotificationScreen = ({navigation}: TabsScreenProps) => {
  return (
    <View className="flex flex-1 h-full w-full">
      <Text>Notification Screen</Text>
    </View>
  );
};

export default NotificationScreen;
