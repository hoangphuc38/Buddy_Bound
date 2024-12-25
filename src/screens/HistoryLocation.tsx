import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Image, View } from 'react-native';
import Header from '../components/Header';
import { LocationHistoryScreenProps } from '../types/navigator.type';
import Mapbox, { MapView, Camera, MarkerView } from '@rnmapbox/maps';
import { LocationHistoryApi } from '../api/location-history.api';
import { TLocationHistory } from '../types/location-history.type';
import Config from'react-native-config';


const locations = require('../assets/data/location-history.json');
const HistoryLocation = ({ navigation }: LocationHistoryScreenProps) => {
    const [height] = useState(new Animated.Value(200));
    const [isExpanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [locationHistories, setLocationHistories] = useState<TLocationHistory[]>(locations);
    const [isMapReady, setIsMapReady] = useState(false);

    const fetch = async () => {
        try {
            const { data } = await LocationHistoryApi.get();
            setLocationHistories(data);
            setLoading(false);
        } catch (error) {
            console.log('err: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const initializeMap = async () => {
            try {
                await Mapbox.setTelemetryEnabled(false);
                fetch();
                setIsMapReady(true);
            } catch (error) {
                console.error('Error initializing map:', error);
            }
        };

        initializeMap();
    }, []);

    if (loading || !isMapReady) {
        return (
            <View className="flex flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2C7CC1" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Header onBack={() => navigation.pop()} title="Your location history" />
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    zoomEnabled={true}
                    styleURL="mapbox://styles/mapbox/outdoors-v12"
                    rotateEnabled={true}
                    attributionEnabled={true}
                    logoEnabled={true}
                >
                    <Camera
                        zoomLevel={10}
                        centerCoordinate={
                            locationHistories?.length
                                ? [locationHistories[0].longitude, locationHistories[0].latitude]
                                : [10.181667, 36.806389]
                        }
                        animationMode={'flyTo'}
                        animationDuration={6000}
                    />
                    {locationHistories?.map((location) => (
                        <MarkerView
                        key={location.id.toString()}
                        coordinate={[location.longitude, location.latitude]}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <View
                            className="w-[50px] h-[50px] items-center justify-center"

                        >
                            <Image
                                source={{ uri: location.user.avatar }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    borderWidth: 2,
                                    borderColor: '#FF6600',
                                }}
                            />
                        </View>
                    </MarkerView>
                    ))}
                </MapView>
            </View>
        </View>
    );
};


export default HistoryLocation;
