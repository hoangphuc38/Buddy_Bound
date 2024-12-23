import { View } from 'react-native';
import { LimitedPeopleScreenProps } from '../types/navigator.type';
import { Text } from 'react-native';

const LimitedPeopleScreen = ({
    route,
    navigation
}: LimitedPeopleScreenProps) => {
    return (
        <View>
            <Text>Limited</Text>
        </View>
    )
}

export default LimitedPeopleScreen;