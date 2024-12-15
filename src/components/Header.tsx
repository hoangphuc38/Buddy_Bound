import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onPrimaryAction: () => void;
  primaryActionIcon?: string;
}

const Header = ({title, onBack, onPrimaryAction}: HeaderProps) => {
  return (
    <View className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 justify-between z-50 flex-row">
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="Go back">
          <FontAwesomeIcon icon={faAngleLeft} size={20} color="#535862" />
        </TouchableOpacity>
      )}

      <Text className="font-medium text-xl text-[#252B37]">{title}</Text>

      <TouchableOpacity
        onPress={onPrimaryAction}
        className="h-9 px-4 text-sm"
      />
    </View>
  );
};

export default Header;
