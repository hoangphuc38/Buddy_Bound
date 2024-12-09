import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const searchIcon = require('../assets/images/search-icon.png');

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Search...',
  onSearch,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim()); // Gửi từ khóa tìm kiếm
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#125B9A"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch} // Gửi khi nhấn Enter
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Image source={searchIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(44, 124, 193, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#125B9A',
    height: 45
  },
  searchButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
