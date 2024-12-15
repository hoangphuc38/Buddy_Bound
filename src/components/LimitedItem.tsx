import {faCircleMinus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

interface ILimitedItem {
  press: () => void;
  item: LimitedItem;
}

export type LimitedItem = {
  id: number;
  name: string;
  avatar: string;
};

const LimitedItem = ({item, press}: ILimitedItem) => {
  const [active, setActive] = useState<boolean>(false);

  const HandleSelect = () => {
    setActive(!active);
    press();
  };

  return (
    <View className="flex flex-row items-center mb-4 space-x-4">
      <TouchableOpacity onPress={HandleSelect}>
        <FontAwesomeIcon
          icon={faCircleMinus}
          color={active ? '#EF4444' : '#125B9A'}
          size={20}
        />
      </TouchableOpacity>
      <View className="flex flex-row items-center space-x-2">
        <Image
          source={{uri: item.avatar}}
          style={{height: 40, width: 40, borderRadius: 10}}
        />
        <Text className="text-medium text-main">{item.name}</Text>
      </View>
    </View>
  );
};

export default LimitedItem;
