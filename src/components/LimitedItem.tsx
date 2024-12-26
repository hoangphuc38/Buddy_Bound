import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TMember } from '../types/member.type';

interface ILimitedItem {
  press: () => void;
  item: TMember;
  isActive: boolean;
}

const LimitedItem = ({ item, press, isActive: active }: ILimitedItem) => {

  const HandleSelect = () => {
    press();
  };

  return (
    <View className="flex flex-row items-center mb-4 space-x-4">
      <TouchableOpacity onPress={HandleSelect}>
        <FontAwesomeIcon
          icon={faCircleMinus}
          color={!active ? '#EF4444' : '#125B9A'}
          size={20}
        />
      </TouchableOpacity>
      <View className="flex flex-row items-center space-x-2">
        <Image
          source={{ uri: item.user.avatar }}
          style={{ height: 40, width: 40, borderRadius: 10 }}
        />
        <Text className="text-medium text-main">{item.user.fullName}</Text>
      </View>
    </View>
  );
};

export default LimitedItem;
