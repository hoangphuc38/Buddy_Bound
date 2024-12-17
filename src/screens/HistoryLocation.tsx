import React, { useState } from 'react';
import { Animated, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import ExpandIcon from '../assets/icons/expand.svg';
import CollapseIcon from '../assets/icons/collapse.svg';
import { LocationHistoryScreenProps } from '../types/navigator.type';

const HistoryLocation = ({ navigation }: LocationHistoryScreenProps) => {
    const [height] = useState(new Animated.Value(200)); // Use Animated.Value for animated height
    const [isExpanded, setExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<'location' | 'post'>('location');

    const handleExpand = () => {
        Animated.timing(height, {
            toValue: isExpanded ? 200 : 400,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setExpanded(!isExpanded);
    };

    return (
        <>
            <Header onBack={() => navigation.pop()} title="Your location history" />
            <Animated.View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    backgroundColor: 'rgb(219, 234, 254)',
                    width: '100%',
                    height: height,
                    position: 'relative',
                }}
            >
                <TouchableOpacity
                    onPress={handleExpand}
                    className="p-[7px] bg-white absolute top-2 right-2 rounded-full"
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                        elevation: 2,
                    }}
                >
                    {!isExpanded ? (
                        <ExpandIcon width={20} height={20} />
                    ) : (
                        <CollapseIcon width={20} height={20} />
                    )}
                </TouchableOpacity>
            </Animated.View>
        </>
    );
};

export default HistoryLocation;
