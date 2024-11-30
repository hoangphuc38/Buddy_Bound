import { Text, View } from "react-native"
import { TabsScreenProps } from "../types/navigator.type"

const HomeScreen = ({ navigation }: TabsScreenProps) => {
    return (
        <View className="flex flex-1 h-full w-full">
            <Text>Home Screen</Text>
        </View>
    )
}

export default HomeScreen;