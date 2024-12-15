import {
  faGear,
  faSortDown,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Text, TouchableOpacity, View} from 'react-native';

type OptionProps = {
  isChange: boolean;
  onPress: () => void;
};

export const OptionStatus = ({isChange, onPress}: OptionProps) => {
  return isChange ? (
    <View className="flex flex-row bg-backButton px-2 py-1 rounded-[5px]">
      <View className="flex flex-row items-center">
        <FontAwesomeIcon icon={faUserGroup} size={13} color="#2C7CC1" />
        <Text className="text-[11px] font-bold text-main ml-[6px]">
          Everyone
        </Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <FontAwesomeIcon
          icon={faSortDown}
          size={12}
          color="#2C7CC1"
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View className="flex flex-row bg-backButton px-2 py-1 rounded-[5px]">
      <View className="flex flex-row items-center">
        <FontAwesomeIcon icon={faGear} size={13} color="#2C7CC1" />
        <Text className="text-[11px] font-bold text-main ml-[6px]">
          Limited buddies
        </Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <FontAwesomeIcon
          icon={faSortDown}
          size={12}
          color="#2C7CC1"
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
