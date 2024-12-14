import {Text, TouchableOpacity, View} from 'react-native';
import {TabsScreenProps} from '../types/navigator.type';

const SettingScreen = ({navigation}: TabsScreenProps) => {
  return (
    <View className="flex flex-1 h-full w-full justify-center">
      <TouchableOpacity
        className="px-2 py-1 bg-main"
        onPress={() => navigation.push('MemorablePlaces')}>
        <Text className="text-white">Memorable Places</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
