import { Text, View } from "react-native"
import { LocationGroupScreenProps, RootStackParamList, TabsScreenProps } from "../types/navigator.type"
import { RouteProp } from "@react-navigation/native";

const LocationGroupScreen = ({
    route,
    navigation,
}: LocationGroupScreenProps & { route: RouteProp<RootStackParamList, 'LocationGroup'> }) => {
    return (
        <View className="flex flex-1 h-full w-full">
            <Text>Group Buddy Screen</Text>
        </View>
    )
}

export default LocationGroupScreen;