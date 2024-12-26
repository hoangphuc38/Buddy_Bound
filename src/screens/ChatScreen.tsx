import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ChatScreenProps } from '../types/navigator.type';
import Message from '../components/Message';
import Send from '../assets/icons/send.svg';
import ChatHeader from '../components/ChatHeader';
import { TMessage, TSendMessage } from '../types/message.type';
import { MessageApi } from '../api/message.api';
import { Asset } from 'react-native-image-picker';
import { useInput } from '../hooks/useInput';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { TCreateImage } from '../types/image.type';
import useWebSocketConnection from '../hooks/useWebsocket';
import { UserContext } from '../contexts/user-context';

const ChatScreen = ({ navigation, route }: ChatScreenProps) => {
    const { groupId, user, group } = route.params;

    const [messages, setMessages] = useState<TMessage[]>([]);
    const [imageList, setImageList] = useState<Asset[]>([]);
    const [text, setText] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);
    const { user: currentUser } = useContext(UserContext);

    const {
        value: messageValue,
        handleInputChange: handleMessageChange,
        setEnteredValue: setMessageValue,
        hasError: messageHasError,
    } = useInput({
        defaultValue: '',
        validationFn: (emailText) => emailText !== '' && emailText !== undefined && emailText?.length > 0,
    });

    const handleNewMessage = (groupId: number, message: TMessage) => {
        if (message.member.user.id === currentUser?.id) {
            return;
        }
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const { connected, subscribeToGroup } = useWebSocketConnection({
        onMessageReceived: handleNewMessage,
        debug: true,
    });

    // Kết nối WebSocket khi component mount
    useEffect(() => {
        if (connected) {
            subscribeToGroup(groupId);
        }
    }, [connected, groupId]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const { data } = await MessageApi.getAll(0, 20, groupId);
                console.log('message: ', data);
                setMessages(data);
            }
            catch (err) {
                console.log('MessageErr: ', err);
            }
        };

        fetchAPI();
    }, []);

    const handleBack = () => {
        navigation.pop();
    };

    const handleRemoveImage = (fileName: string | undefined) => {
        setImageList(prev =>
            prev.filter((item, index) => item.fileName !== fileName),
        );
    };

    const handleSendMessage = async () => {
        Keyboard.dismiss();

        if ((!messageValue || messageValue.trim() === '') && (!imageList || imageList.length === 0)) {
            return;
        }

        const stringDto: TSendMessage = {
            groupId: groupId,
            content: messageValue,
        };

        const images: TCreateImage[] = imageList ? imageList.map(item => ({
            uri: item.uri,
            name: item.fileName,
            type: item.type,
        })) : [];

        try {
            const { data } = await MessageApi.send(stringDto, images);

            setMessages(prevMessages => [...prevMessages, data]);

            setMessageValue('');
            setImageList([]);
        }
        catch (err) {
            console.log('SendErr: ', err);
        }
    };

    return (
        <View className="flex flex-col h-full relative">
            <ChatHeader back={handleBack} item={group ? group : user} />
            <FlatList
                className="top-[90px] px-4 w-full"
                data={messages}
                renderItem={({ item }) => (
                    <Message message={item} isSender={user?.id === item.member.user.id} />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 170 }}
            />

            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
                setIsFocused(false);
            }}>
                <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
                    {imageList.length > 0 && (
                        <FlatList
                            data={imageList}
                            horizontal
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            renderItem={({ item }) => (
                                <View className="relative mr-2">
                                    <Image
                                        source={{ uri: item.uri }}
                                        className="w-16 h-16 rounded-lg"
                                    />
                                    <TouchableOpacity
                                        onPress={() => handleRemoveImage(item.fileName)}
                                        className="absolute top-0 right-0 p-1 bg-black/50 rounded-full"
                                    >
                                        <XMarkIcon size={16} color="white" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    )}
                    <View className="flex flex-row items-center">
                        <TextInput
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 font-interLight mr-3"
                            placeholder="Type a message..."
                            placeholderTextColor="black"
                            value={messageValue}
                            onChange={handleMessageChange}
                            multiline
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />

                        <TouchableOpacity
                            className="bg-blue-500 w-10 h-10 rounded-full items-center justify-center"
                            onPress={() => handleSendMessage()}
                        >
                            <Send width={20} height={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default ChatScreen;
