import { ActivityIndicator, View } from 'react-native';
import { RelationshipRequestScreenProps } from '../types/navigator.type';
import { Text } from 'react-native';
import { useState } from 'react';
import React from 'react';
import Header from '../components/Header';
import { TRelationship } from '../types/relationship.type';
import { RelationshipApi } from '../api/relationship.api';

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

            </View>
        </>
    )
}

export default RelationshipRequestScreen;