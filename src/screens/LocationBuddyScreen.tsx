import {Text, TouchableOpacity, View} from 'react-native';
import {
  LocationBuddyScreenProps,
  RootStackParamList,
} from '../types/navigator.type';
import {RouteProp} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faMessage} from '@fortawesome/free-solid-svg-icons';

const LocationBuddyScreen = ({
  route,
  navigation,
}: LocationBuddyScreenProps & {
  route: RouteProp<RootStackParamList, 'LocationBuddy'>;
}) => {
  return (
    <View className="flex flex-1 h-full w-full">
      <View>
        <Text>Location Buddy Screen</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.pop()}
        className="absolute left-3 top-3 bg-backButton w-[33px] h-[33px] rounded-full items-center justify-center">
        <FontAwesomeIcon icon={faAngleLeft} size={17} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {}}
        className="absolute bottom-3 right-3 bg-backButton w-[40px] h-[40px] rounded-full items-center justify-center">
        <FontAwesomeIcon icon={faMessage} size={17} color="#125B9A" />
      </TouchableOpacity>
    </View>
  );
};

export default LocationBuddyScreen;
