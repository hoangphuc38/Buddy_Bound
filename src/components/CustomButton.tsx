import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface IButtonProps {
  item: ButtonProps;
  press: () => void;
}

export type ButtonProps = {
  id: string;
  name: string;
  icon?: React.ReactNode;
  defaultColor?: string;
  activeColor?: string;
};

const CustomButton = ({ item, press }: IButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
    press();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={
        isPressed
          ? 'flex-row items-center justify-center space-x-2 p-2 rounded-md border-2 border-secondary mr-4 mb-4'
          : 'flex-row items-center justify-center space-x-2 p-2 rounded-md border-2 border-main mr-4 mb-4'
      }>
      {item.icon && React.cloneElement(item.icon as React.ReactElement, {
        color: isPressed ? '#FF6600' : '#2C7CC1',
        size: 24,
      })}
      <Text
        style={{
          color: isPressed ? '#FF6600' : '#2C7CC1',
          fontWeight: 'bold',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
