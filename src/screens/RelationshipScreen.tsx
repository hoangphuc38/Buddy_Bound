import {Text, View} from 'react-native';
import {TabsScreenProps} from '../types/navigator.type';

const RelationshipScreen = ({navigation}: TabsScreenProps) => {
  return (
    <View className="flex flex-1 h-full w-full">
      <Text>Relationship Screen</Text>
    </View>
  );
};

export default RelationshipScreen;
