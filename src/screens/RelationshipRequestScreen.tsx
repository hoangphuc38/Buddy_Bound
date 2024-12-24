import { ActivityIndicator, FlatList, View } from 'react-native';
import { RelationshipRequestScreenProps } from '../types/navigator.type';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import Header from '../components/Header';
import { TRelationship } from '../types/relationship.type';
import { RelationshipApi } from '../api/relationship.api';
import RequestItem from '../components/RequestItem';

const RelationshipRequestScreen = ({
    route,
    navigation
}: RelationshipRequestScreenProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<TRelationship[]>([]);

    const fetchAPI = async () => {
        try {
            setLoading(true);
            const { data } = await RelationshipApi.getRelationshipsByType({ type: "FAMILY", isPending: "true" });
            const { data: friend } = await RelationshipApi.getRelationshipsByType({ type: "FRIEND", isPending: "true" });

            const combinedGroups = [...data, ...friend];
            setData(combinedGroups);
            setLoading(false);
        }
        catch (err) {
            console.log("Err: ", err);
            setLoading(false);
        }
    }

    useEffect(() => {
        //fetchAPI();
    }, [])

    if (loading) {
        return (
            <View className="flex flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#2C7CC1" />
            </View>
        );
    }

    return (
        <>
            <Header title="Relationship Requests"
                onBack={() => navigation.pop()}
                onPrimaryAction={() => { }} />
            <View className="flex flex-1 px-4 mt-4">
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <RequestItem
                            item={item}
                            onAccept={() => { }}
                            onReject={() => { }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </>
    )
}

export default RelationshipRequestScreen;