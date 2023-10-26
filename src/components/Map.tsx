import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps' // remove PROVIDER_GOOGLE import if not using Google Maps

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
                showsUserLocation
                style={styles.map}
                region={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.latitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
                onTouchStart={() => (followingRef.current = false)}>
                {/* <Marker
                    image={require('../assets/custom-marker.png')}
                    coordinate={{
                        latitude: 37.73455,
                        longitude: -122.4324
                    }}
                    title="Marcador"
                    description="Descripción del marcador"
                /> */}

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
