import { Text, View } from "react-native"
import { WelcomeScreenProps } from "../types/navigator.type"

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
    return (
        <View className="flex flex-1 h-full w-full">
            <Text>Home Screen</Text>
        </View>
    )
}

export default WelcomeScreen;