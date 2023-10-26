import React from 'react'
import { View, StyleSheet } from 'react-native'

// Components
import { Map } from '../components/Map'

export const MapScreen = () => {
    return (
        <View style={styles.container}>
            <Map />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
