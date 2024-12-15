import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import AngleRight from '../assets/icons/angle-right.svg';

export interface ISettingItem {
    Icon: React.FunctionComponent<SvgProps>,
    text: string,
    onClick: () => void
}

const SettingItem = ({ Icon, text, onClick }: ISettingItem) => {
    return (
        <TouchableOpacity onPress={onClick} className="flex m-2 bg-white flex-row justify-between items-center py-2 px-3 rounded-lg">
            <View className="flex flex-row items-center space-x-2">
                <View className="p-2 rounded-full items-center justify-center bg-slate-200">
                    <Icon width={22} height={22}/>
                </View>
                <Text className="font-interMedium">{text}</Text>
            </View>
            <AngleRight width={15} height={15}/>
        </TouchableOpacity>
    );
};

export default SettingItem;
