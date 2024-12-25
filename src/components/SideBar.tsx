import React from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
      className='z-10 absolute top-0 left-0 h-full bg-[#125B9A]'>
      <View className='flex-1 p-5'>
        <View className='flex-row w-full mb-3'>
          <TouchableOpacity className='absolute right-0' onPress={onClose}>
            <FontAwesomeIcon icon={faXmark} color='white' size={16} />
          </TouchableOpacity>
        </View>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onItemPress(item);
            }}
            className='mb-4 p-3'>
            <Text className='text-white text-base font-interMedium'>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

export default SideBar;
