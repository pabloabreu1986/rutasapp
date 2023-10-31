import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps' // remove PROVIDER_GOOGLE import if not using Google Maps
import Icon from 'react-native-vector-icons/Ionicons'

// Hooks
import { useLocation } from '../hooks/useLocation'
import { LoadingScreen } from '../screens/LoadingScreen'
import { Fab } from './Fab'

export const Map = () => {
    const [showPolyline, setShowPolyline] = useState<boolean>(true)

    const {
        hasLocation,
        initialPosition,
        routeLines,
        userLocation,
        getCurrentLocation,
        followUserLocation
    } = useLocation()

    const mapViewRef = useRef<MapView>()
    const followingRef = useRef(true)

    useEffect(() => {
        followUserLocation()
    }, [])

    useEffect(() => {
        if (!followingRef.current) return

        const { latitude, longitude } = userLocation
        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude
            }
        })
    }, [userLocation])

    const centerPosition = async () => {
        const { latitude, longitude } = await getCurrentLocation()
        followingRef.current = true
        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude
            }
        })
    }
    if (!hasLocation) {
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                ref={el => (mapViewRef.current = el!)}
                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                // showsUserLocation // Hide user position
                style={styles.map}
                region={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.latitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
                onTouchStart={() => (followingRef.current = false)}>
                <Marker
                    coordinate={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude
                    }}>
                    <View
                        style={{
                            borderWidth: 4,
                            borderRadius: 50,
                            borderColor: '#f64b4a'
                        }}>
                        <Icon name="car" size={40} color="#f64b4a" />
                    </View>
                </Marker>

                {showPolyline && (
                    <Polyline
                        coordinates={routeLines}
                        strokeColor="#f64b4a"
                        strokeWidth={5}
                    />
                )}
            </MapView>
            <Fab
                iconName="compass-outline"
                style={{ position: 'absolute', bottom: 20, right: 20 }}
                onPress={centerPosition}
            />
            <Fab
                iconName="brush-outline"
                style={{ position: 'absolute', bottom: 100, right: 20 }}
                onPress={() => setShowPolyline(!showPolyline)}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {},
    map: {
        ...StyleSheet.absoluteFillObject
    },
    text: {}
})
