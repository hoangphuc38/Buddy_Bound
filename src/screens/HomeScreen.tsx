import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TabsScreenProps } from '../types/navigator.type';
import React from 'react';
import BuddyItem, { Buddy } from '../components/BuddyItem';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import GroupItem, { Group } from '../components/GroupItem';

const HomeScreen = ({ navigation }: TabsScreenProps) => {
    const data: Buddy[] = [
        { id: 1, name: 'Mom' },
        { id: 2, name: 'Boss' },
        { id: 3, name: 'Mom' },
        { id: 4, name: 'Boss' },
        { id: 5, name: 'Mom' },
        { id: 6, name: 'Boss' },
    ];

    const dataGroup: Group[] = [
        { id: 1, name: 'Family' },
        { id: 2, name: 'Company' },
    ];

    return (
        <View className="flex flex-1 px-4 mt-2">
            <View className='flex flex-row justify-center items-center mb-4'>
                <Text className='font-nunitoBold text-header text-center text-main font-bold'>Your Buddy</Text>
            </View>

            <View className='flex mb-2'>
                <View className='flex flex-row justify-between items-center mb-4'>
                    <Text className='font-nunitoBold text-title text-main font-bold'>Buddies</Text>
                    <TouchableOpacity>
                        <ChevronRightIcon size={20} color="#2C7CC1" />
                    </TouchableOpacity>
                </View>

                <View className='mb-4'>
                    <FlatList data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <BuddyItem
                                item={item}
                                press={() => { navigation.push('LocationBuddy', { userID: item.id }) }}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View className='flex flex-row justify-between items-center mb-4'>
                    <Text className='font-nunitoBold text-title text-main font-bold'>Groups</Text>
                    <TouchableOpacity>
                        <ChevronRightIcon size={20} color="#2C7CC1" />
                    </TouchableOpacity>
                </View>

                <View className='mb-4'>
                    <FlatList data={dataGroup}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <GroupItem
                                item={item}
                                press={() => { navigation.push('LocationGroup', { groupID: item.id }) }}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;