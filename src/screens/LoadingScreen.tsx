import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const LoadingScreen = () => {
    return (
        <View style={{ ...styles.container }}>
            <Text style={{ ...styles.text }}>{'LoadingScreen'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {}
})
