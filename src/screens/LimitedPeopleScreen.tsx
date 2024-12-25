import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { LimitedPeopleScreenProps } from '../types/navigator.type';
import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { TRelationship } from '../types/relationship.type';
import { RelationshipApi } from '../api/relationship.api';

const LimitedPeopleScreen = ({
    route,
    navigation
}: LimitedPeopleScreenProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [data, setData] = useState<TRelationship[]>([]);

    const fetchAPI = async () => {
        try {
            setLoading(true);
            const { data } = await RelationshipApi.getLimitedPeople();
            setData(data);
            console.log("check limit: ", data);
            setLoading(false);
        }
        catch (err) {
            console.log("Err: ", err);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAPI();
    }, [])

    const renderItem = ({ item }: { item: TRelationship }) => (
        <TouchableOpacity className="w-full rounded-lg px-[13] py-[9] justify-between items-center flex-row">
            <View className="items-center flex-row gap-[10]">
                <Image
                    source={{ uri: item.receiver.avatar }}
                    className="w-[55] h-[55] border-[#2C7CC1] rounded-full" />
                <View>
                    <Text className="font-interBold">{item.receiver.fullName}</Text>
                    {
                        item.receiver.phoneNumber && (
                            <Text className="">{item.receiver.phoneNumber}</Text>
                        )
                    }
                </View>
            </View>
            <Text className="text-[#FF6600] font-interBold">{item.receiverRole}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <Header title="Limited People List"
                onBack={() => navigation.pop()}
                onPrimaryAction={() => { }} />
            <View className="flex flex-1 px-4 mt-4">
                <View className='w-full mt-[15] mb-4'>
                    <SearchBar placeholder='Search by name' onSearch={text => setSearchText(text)} value={searchText}></SearchBar>
                </View>
                {
                    loading ? (
                        <View className='flex flex-1 justify-center items-center'>
                            <ActivityIndicator style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}
                                size='small'
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
    )
}

export default LimitedPeopleScreen;