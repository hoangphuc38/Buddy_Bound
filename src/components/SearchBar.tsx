import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onSearch: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  containerStyle,
  inputStyle,
  value,
}) => {

  return (
    <View
      className="flex-row items-center bg-backButton rounded-[10px] px-2"
      style={containerStyle}>
      <TextInput
        value={value}
        onChangeText={onSearch}
        placeholder={placeholder}
        className="flex-1 mr-2 text-primary"
        style={inputStyle}
        clearButtonMode="while-editing"
        placeholderTextColor="#2C7CC1"
      />

      <TouchableOpacity onPress={() => onSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#2C7CC1" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
