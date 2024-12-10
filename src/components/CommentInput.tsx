import { faMagnifyingGlass, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleProp,
    ViewStyle
} from 'react-native';

interface SearchBarProps {
    placeholder?: string;
    onPress: (text: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
}

const CommentInput: React.FC<SearchBarProps> = ({
    placeholder = 'Search...',
    onPress,
    containerStyle,
    inputStyle
}) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        onPress(searchText);
    };

    return (
        <View
            className='flex-row items-center bg-backButton rounded-[10px] px-2'
            style={containerStyle}
        >
            <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder={placeholder}
                className='flex-1 mr-2 text-gray-700'
                style={inputStyle}
                multiline
                onSubmitEditing={handleSearch}
                clearButtonMode='while-editing'
                placeholderTextColor="#2C7CC1"
            />

            <TouchableOpacity onPress={handleSearch}>
                <FontAwesomeIcon icon={faPaperPlane} size={20} color='#2C7CC1' />
            </TouchableOpacity>
        </View>
    );
};

export default CommentInput;