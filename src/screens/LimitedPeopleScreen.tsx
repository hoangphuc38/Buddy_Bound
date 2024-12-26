import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { LimitedPeopleScreenProps } from '../types/navigator.type';
import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { RelationshipApi } from '../api/relationship.api';
import { TBlockedUser } from '../types/user.type';
import { toast, ToastOptions } from '@baronha/ting';

const LimitedPeopleScreen = ({
    route,
    navigation,
}: LimitedPeopleScreenProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [data, setData] = useState<TBlockedUser[]>([]);

    const fetchAPI = async () => {
        try {
            setLoading(true);
            const { data } = await RelationshipApi.getLimitedPeople();
            setData(data);
            setLoading(false);
        }
        catch (err) {
            console.log('Err: ', err);
            setLoading(false);
        }
    };

    const breakReRelationship = async (id: number) => {
        try {
            setLoading(true);
            await RelationshipApi.limitRelationship(undefined, id);
              const options: ToastOptions = {
                title: 'Unlimit relationship',
                message: 'Unlimit successfully',
                preset: 'done',
                backgroundColor: '#e2e8f0',
              };
              toast(options);
              fetchAPI();
              setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    const renderItem = ({ item }: { item: TBlockedUser }) => (
        <View className="w-full rounded-lg px-[13] py-[9] justify-between items-center flex-row">
            <View className="items-center flex-row gap-[10]">
                <Image
                    source={{ uri: item.blockedUser.avatar }}
                    className="w-[55] h-[55] border-[#2C7CC1] rounded-full" />
                <View>
                    <Text className="font-interBold">{item.blockedUser.fullName}</Text>
                    {
                        item.blockedUser.phoneNumber && (
                            <Text className="">{item.blockedUser.phoneNumber}</Text>
                        )
                    }
                </View>
            </View>
            <TouchableOpacity><Text className="text-secondary font-interBold" onPress={() => breakReRelationship(item.id)}>Break restriction</Text></TouchableOpacity>
        </View>
    );

    return (
        <>
            <Header title="Limited People List"
                onBack={() => navigation.pop()}
                onPrimaryAction={() => { }} />
            <View className="flex flex-1 px-4 mt-4">
                <View className="w-full mt-[15] mb-4">
                    <SearchBar placeholder="Search by name" onSearch={text => setSearchText(text)} value={searchText} />
                </View>
                {
                    loading ? (
                        <View className="flex flex-1 justify-center items-center">
                            <ActivityIndicator style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                size="small"
                                color="#2C7CC1"
                            />
                        </View>
                    ) : (
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                        />
                    )
                }
            </View>
        </>
    );
};

export default LimitedPeopleScreen;
