import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

export interface IPermissionItem {
  Icon: React.FunctionComponent<SvgProps>;
  backgroundColor: string;
  text: string;
  isEnabled: boolean;
  description: string;
  onChange: (value: boolean) => void;
}

const PermissionItem = ({ Icon, backgroundColor, description, text, isEnabled, onChange }: IPermissionItem) => {
  return (
    <TouchableOpacity className="flex m-2 bg-white flex-row justify-between items-center py-2 px-3 rounded-lg">
      <View className="flex flex-row items-center space-x-2">
        <View className={`p-2 rounded-full items-center justify-center ${backgroundColor}`}>
          <Icon width={22} height={22} />
        </View>
        <View className="flex flex-col justify-center">
          <Text className="font-interRegular">{text}</Text>
          <Text className="font-interLight text-gray-600 text-[12px]">{description}</Text>
        </View>
      </View>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#125B9A' : '#f4f3f4'}
        value={isEnabled}
        onValueChange={onChange}
      />
    </TouchableOpacity>
  );
};

export default PermissionItem;
