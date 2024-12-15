import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faUsers} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onPrimaryAction: () => void;
  primaryActionIcon?: string;
  sideTitleIcon?: IconProp
}

const Header = ({title, sideTitleIcon, onBack, onPrimaryAction}: HeaderProps) => {
  return (
    <View className="fixed top-0 left-0 right-0 h-[70px] bg-white border-b-[0.5px] border-[#A4A7AE] flex items-center px-4 justify-between z-50 flex-row">
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="Go back">
          <FontAwesomeIcon icon={faAngleLeft} size={20} color="#535862" />
        </TouchableOpacity>
      )}
      <View className="flex flex-row items-center space-x-2">
        {sideTitleIcon && <FontAwesomeIcon icon={faUsers} size={20}/>}
        <Text className="font-interBold text-2xl">{title}</Text>
      </View>

      <TouchableOpacity
        onPress={onPrimaryAction}
        className="h-9 px-4 text-sm"
      />
    </View>
  );
};

export default Header;
