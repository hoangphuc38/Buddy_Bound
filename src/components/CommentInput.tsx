import {
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onPress?: (e: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

const CommentInput: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onPress,
  onChange,
  containerStyle,
  inputStyle,
  value,
}) => {

  return (
    <View
      className="flex-row items-center bg-[#F5F5F5] rounded-[20px] px-3 mx-4"
      style={containerStyle}>
      <TextInput
        value={value}
        placeholder={placeholder}
        className="flex-1 mr-1 text-[#535862]"
        style={inputStyle}
        onChange={onChange}
        multiline
        clearButtonMode="while-editing"
        placeholderTextColor="#A4A7AE"
      />

      <TouchableOpacity onPress={onPress}>
        <FontAwesomeIcon icon={faPaperPlane} size={20} color="#2C7CC1" />
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;
