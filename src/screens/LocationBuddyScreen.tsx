import { Text, View } from "react-native"
import { LocationBuddyScreenProps, RootStackParamList, TabsScreenProps } from "../types/navigator.type"
import { RouteProp } from "@react-navigation/native";

const LocationBuddyScreen = ({
    route,
    navigation,
}: LocationBuddyScreenProps & { route: RouteProp<RootStackParamList, 'LocationBuddy'> }) => {
    return (
        <View className="flex flex-1 h-full w-full">
            <Text>Location Buddy Screen</Text>
        </View>
    )
}

export default LocationBuddyScreen;