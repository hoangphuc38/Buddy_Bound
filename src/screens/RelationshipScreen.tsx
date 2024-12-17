import {Text, TouchableOpacity, View} from 'react-native';
import {TabsScreenProps} from '../types/navigator.type';
import { useAuth } from '../contexts/auth-context';

const RelationshipScreen = ({navigation}: TabsScreenProps) => {
  const { signOut } = useAuth();
  return (
    <View className="flex flex-1 h-full w-full">
      <Text>Relationship Screen</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RelationshipScreen;
