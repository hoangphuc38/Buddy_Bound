import { Text, View } from "react-native"
import { TabsScreenProps } from "../types/navigator.type"

const SettingScreen = ({ navigation }: TabsScreenProps) => {
    return (
        <View className="flex flex-1 h-full w-full">
            <Text>Setting Screen</Text>
        </View>
    )
}

export default SettingScreen;