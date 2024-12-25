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
      className="flex-row items-center bg-gray-100 rounded-[10px] px-2 py-[2]"
      style={containerStyle}>
      <TextInput
        value={value}
        onChangeText={onSearch}
        placeholder={placeholder}
        className="flex-1 mr-2 text-main"
        style={inputStyle}
        clearButtonMode="while-editing"
        placeholderTextColor="black"
      />

      <TouchableOpacity onPress={() => onSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
