import React from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const SideBar = ({ 
  items, 
  onItemPress, 
  isVisible, 
  onClose 
}: { 
  items: string[]; 
  onItemPress: (item: string) => void; 
  isVisible: boolean; 
  onClose: () => void; 
}) => {
  const translateX = useState(new Animated.Value(-width))[0];

  // Hiệu ứng mở SideBar
  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, translateX]);

  return (
    <Animated.View
      style={[{ width: width * 0.8, transform: [{ translateX }] }]}
      className='z-10 absolute top-0 left-0 h-full bg-gray-800'>
      <View className='flex-1 p-5'>
        <Text className='text-white text-xl font-bold mb-5'>SideBar</Text>

        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onItemPress(item);
              onClose();
            }}
            className='mb-4 p-3 bg-gray-700 rounded'>
            <Text className='text-white text-base'>{item}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={onClose}
          className='mt-auto p-3 bg-red-600 rounded'>
          <Text className='text-white text-center text-base'>Close</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default SideBar;
