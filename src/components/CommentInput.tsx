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
            className='flex-row items-center bg-[#F5F5F5] rounded-[20px] px-4'
            style={containerStyle}
        >
            <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder={placeholder}
                className='flex-1 mr-1 text-[#535862]'
                style={inputStyle}
                multiline
                onSubmitEditing={handleSearch}
                clearButtonMode='while-editing'
                placeholderTextColor="#A4A7AE"
            />

            <TouchableOpacity onPress={handleSearch}>
                <FontAwesomeIcon icon={faPaperPlane} size={20} color='#2C7CC1' />
            </TouchableOpacity>
        </View>
    );
};

export default CommentInput;