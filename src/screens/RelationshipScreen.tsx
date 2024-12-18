import {Image, Text, TouchableOpacity, View} from 'react-native';
import {TabsScreenProps} from '../types/navigator.type';
import {useAuth} from '../contexts/auth-context';

const menu = require('../assets/images/menu.png');
const addUserGroup = require('../assets/images/add-user-group.png');

const RelationshipScreen = ({navigation}: TabsScreenProps) => {
  const {signOut} = useAuth();
  return (
    <View className=" pl-5 pr-5 flex items-center">
      <View className="w-full mt-3 justify-between items-center flex-row">
        <TouchableOpacity className="w-[25] h-[25]">
          <Image
            source={menu}
            className="w-full h-full"
            resizeMode="contain"></Image>
        </TouchableOpacity>
        <Text className="font-interBold text-2xl font-bold text-[#2C7CC1]">
          Relationship
        </Text>
        <TouchableOpacity className="h-[40] w-[40] rounded-full items-center justify-center bg-[#125B9A]">
          <Image
            source={addUserGroup}
            className="w-[15] h-[15]"
            resizeMode="contain"></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RelationshipScreen;
