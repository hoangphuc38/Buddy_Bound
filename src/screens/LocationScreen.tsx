import { StyleSheet, Text, View } from 'react-native';
import { TabsScreenProps } from '../types/navigator.type';
import React from 'react';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';

// Use a public token instead of secret key
Mapbox.setAccessToken('set public key here'); // Replace with pk.* token
Mapbox.setTelemetryEnabled(false);

const HomeScreen = ({ navigation }: TabsScreenProps) => {
    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    zoomEnabled={true}
                    styleURL="mapbox://styles/mapbox/light-v11"
                    rotateEnabled={true}
                    attributionEnabled={true}
                    logoEnabled={true}
                >
                    <Camera 
                        zoomLevel={10} 
                        centerCoordinate={[10.181667, 36.806389]} 
                        // pitch={60} 
                        animationMode={'flyTo'} 
                        animationDuration={6000}
                    />
                    <PointAnnotation 
                        id='marker' 
                        coordinate={[10.181667, 36.806389]}
                    >
                        <View style={styles.markerContainer}>
                            <View style={styles.marker} />
                        </View>
                    </PointAnnotation>
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        overflow: 'hidden'
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    markerContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        borderWidth: 2,
        borderColor: 'white',
    }
});

export default HomeScreen;