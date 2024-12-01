import { Text, View } from 'react-native';
import { TabsScreenProps } from '../types/navigator.type';
import React from 'react';

const HomeScreen = ({ navigation }: TabsScreenProps) => {
    return (
        <View className="flex flex-1 h-full w-full">
            <Text>HomeScreen</Text>
        </View>
    );
};

export default HomeScreen;