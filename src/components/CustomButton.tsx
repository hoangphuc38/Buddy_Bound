import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface IButtonProps {
  item: ButtonProps;
  isSelected: boolean;
  press: () => void;
}

export type ButtonProps = {
  id: string;
  name: string;
  type: string,
  icon?: React.ReactNode;
  defaultColor?: string;
  activeColor?: string
};

const CustomButton = ({ item, isSelected,  press }: IButtonProps) => {

  return (
    <TouchableOpacity
      onPress={press}
      className={
        isSelected
          ? 'flex-row items-center justify-center space-x-2 p-2 rounded-md border-2 border-secondary mr-4 mb-4'
          : 'flex-row items-center justify-center space-x-2 p-2 rounded-md border-2 border-main mr-4 mb-4'
      }>
      {item.icon && React.cloneElement(item.icon as React.ReactElement, {
        color: isSelected ? '#FF6600' : '#2C7CC1',
        size: 24,
      })}
      <Text
        style={{
          color: isSelected ? '#FF6600' : '#2C7CC1',
          fontWeight: 'bold',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
