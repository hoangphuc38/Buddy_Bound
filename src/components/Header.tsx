import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Back from '../assets/icons/back.svg';
import { SvgProps } from 'react-native-svg';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onPrimaryAction?: () => void;
  PrimaryIcon?: React.FunctionComponent<SvgProps>;
  SideTitleIcon?: React.FunctionComponent<SvgProps>;
  primaryText?: string
}

const Header = ({title, SideTitleIcon, onBack, onPrimaryAction, PrimaryIcon, primaryText}: HeaderProps) => {
  return (
    <View className="fixed top-0 left-0 right-0 h-[60px] bg-white border-b-[0.5px] border-[#A4A7AE] flex items-center px-4 justify-between z-50 flex-row">
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="Go back">
          <Back width={25} height={25} />
        </TouchableOpacity>
      )}
      <View className="flex flex-row items-center space-x-2">
        {SideTitleIcon && <SideTitleIcon height={23} width={23} />}
        <Text className="font-interMedium text-[18px] tracking-tight">{title}</Text>
      </View>

      <TouchableOpacity
        onPress={onPrimaryAction}
      >
        {PrimaryIcon && <PrimaryIcon width={22} height={22} />}
        {primaryText && <Text className="font-interBold text-primary">{primaryText}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
