import { ActivityIndicator, FlatList, View } from 'react-native';
import { RelationshipRequestScreenProps } from '../types/navigator.type';
import { useEffect, useState } from 'react';
import React from 'react';
import Header from '../components/Header';
import { TRelationship } from '../types/relationship.type';
import { RelationshipApi } from '../api/relationship.api';
import RequestItem from '../components/RequestItem';
import { toast, ToastOptions } from '@baronha/ting';

const RelationshipRequestScreen = ({
    route,
    navigation
}: RelationshipRequestScreenProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<TRelationship[]>([]);

    const fetchAPI = async () => {
        try {
            setLoading(true);
            const { data } = await RelationshipApi.getPendingRelationship();
            setData(data);
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

    const handleAccept = async (id: number) => {
        try {
            await RelationshipApi.acceptRequest(id);

            const options: ToastOptions = {
                title: 'New Relationship',
                message: 'You have accepted the relationship request!',
                preset: 'done',
                backgroundColor: '#e2e8f0',
            };
            toast(options);
        }
        catch (err) {
            console.log("Err: ", err);
        }
    }

    return (
        <>
            <Header title="Relationship Requests"
                onBack={() => navigation.pop()}
                onPrimaryAction={() => { }} />
            <View className="flex flex-1 px-4 mt-4">
                {
                    loading ? (
                        <View className="flex flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="#2C7CC1" />
                        </View>
                    ) : (
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <RequestItem
                                    item={item}
                                    onAccept={() => handleAccept(item.id)}
                                    onReject={() => { }}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    )
                }
            </View>
        </>
    )
}

export default RelationshipRequestScreen;