import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { LocationHistoryScreenProps } from '../types/navigator.type';
import Mapbox, { MapView, Camera, MarkerView } from '@rnmapbox/maps';
import { LocationHistoryApi } from '../api/location-history.api';
import { TLocationHistory } from '../types/location-history.type';
import Calendar from '../assets/icons/calendar.svg';
import Clock from '../assets/icons/clock.svg';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';


const HistoryLocation = ({ navigation }: LocationHistoryScreenProps) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    const [loading, setLoading] = useState<boolean>(true);
    const [locationHistories, setLocationHistories] = useState<TLocationHistory[]>();
    const [isMapReady, setIsMapReady] = useState(false);
    const [openFromPicker, setOpenFromPicker] = useState(false);
    const [from, setFrom] = useState(currentDate);
    const [to, setTo] = useState(new Date());
    const [openToPicker, setOpenToPicker] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [currentLocation, setCurrentLocation] = useState<TLocationHistory>();
    const cameraRef = useRef<Camera>(null);


    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(currentLocation?.createdAt ? new Date(currentLocation.createdAt) : new Date());

    const fetch = async () => {
        try {
            const { data } = await LocationHistoryApi.get(from.toISOString().split('T')[0], to.toISOString().split('T')[0]);
            setLocationHistories(data.reverse());
            setLoading(false);
        } catch (error) {
            console.log('err: ', error);
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (!locationHistories) {return;}
        if (locationHistories.length === 0) { return; }
        if (currentIndex < locationHistories.length) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            const nextLocation = locationHistories[nextIndex - 1];
            setCurrentLocation(nextLocation);
            setCameraCenter(nextLocation);
        }
    };

    const handleBack = () => {
        if (!locationHistories) { return; }
        if (locationHistories.length === 0) { return; }
        if (currentIndex > 1) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            const prevLocation = locationHistories[prevIndex - 1];
            setCurrentLocation(prevLocation);
            setCameraCenter(prevLocation);
        }
    };

    const setCameraCenter = (location: TLocationHistory) => {
        setIsMapReady(true);
        const newCenter = [location.longitude, location.latitude];
        cameraRef.current?.flyTo(newCenter, 6000);
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
            <View style={{ flex: 1 }} className="relative">
                <MapView
                    style={{ height: '73%' }}
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
                        ref={cameraRef}
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
                <View className="absolute bottom-0 items-center">
                    <View className="flex flex-col space-y-2 justify-center my-3 px-2">
                        <View className="flex flex-col">
                            <View className="flex w-full flex-row items-center justify-between">
                                <View className="flex flex-row space-x-2">
                                    <Calendar width={22} height={22} />
                                    <Text className="font-interRegular text-gray-600">{formattedDate}</Text>
                                </View>
                                <View className="flex flex-row">
                                    <View>
                                        <Clock width={22} height={22} />
                                    </View>
                                    <Text className="font-interRegular text-gray-600">{currentLocation ? format(new Date(currentLocation?.createdAt), 'h:mm a') : ''}</Text>
                                </View>
                            </View>
                        </View>
                        <View className="flex flex-row justify-between items-center">
                            <TouchableOpacity className="bg-secondary w-[100px] flex items-center justify-center rounded-lg" onPress={handleBack}>
                                <Text className="font-interBold text-white text-center py-2">Previous</Text>
                            </TouchableOpacity>
                            <Text className="font-interRegular text-gray-700">Point {currentIndex} of {locationHistories?.length}</Text>
                            <TouchableOpacity className="bg-secondary w-[100px] rounded-lg" onPress={handleNext}>
                                <Text className="font-interBold text-white text-center py-2">Next</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex flex-row items-center justify-between">
                            <TouchableOpacity className="bg-gray-200 py-2 px-2 rounded-lg flex flex-row space-x-2 items-center" onPress={() => setOpenFromPicker(true)}>
                                <Calendar width={22} height={22} />
                                <Text className="text-gray-500 font-interRegular">{format(from, 'MMMM dd, yyyy')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-gray-200 py-2 px-2 rounded-lg flex flex-row space-x-2 items-center" onPress={() => setOpenToPicker(true)}>
                                <Calendar width={22} height={22} />
                                <Text className="text-gray-500 font-interRegular">{format(to, 'MMMM dd, yyyy')}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                open={openFromPicker}
                                date={from}
                                mode="date"
                                onConfirm={date => {
                                    setOpenFromPicker(false);
                                    setFrom(date);
                                }}
                                onCancel={() => {
                                    setOpenFromPicker(false);
                                }}
                            />
                            <DatePicker
                                modal
                                open={openToPicker}
                                date={to}
                                mode="date"
                                onConfirm={date => {
                                    setOpenToPicker(false);
                                    setTo(date);
                                }}
                                onCancel={() => {
                                    setOpenToPicker(false);
                                }}
                            />
                        </View>
                        <View className="flex flex-row items-center justify-end">
                            <TouchableOpacity className="py-2 px-2 bg-primary rounded-lg" onPress={fetch}>
                                <Text className="font-interRegular text-white">Show history</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};


export default HistoryLocation;
