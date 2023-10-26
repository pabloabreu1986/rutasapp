import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Context
import { PermissionsContext } from '../context/PermissionsContext'

// Screens
import { PermissionsScreen } from '../screens/PermissionsScreen'
import { MapScreen } from '../screens/MapScreen'
import { LoadingScreen } from '../screens/LoadingScreen'

const Stack = createNativeStackNavigator()

export const StackNavigator = () => {
    const { permissions } = useContext(PermissionsContext)

    if (permissions.locationStatus === 'unavailable') {
        return <LoadingScreen />
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: 'white'
                }
            }}>
            {permissions.locationStatus === 'granted' ? (
                <Stack.Screen name="MapScreen" component={MapScreen} />
            ) : (
                <Stack.Screen
                    name="PermissionsScreen"
                    component={PermissionsScreen}
                />
            )}
        </Stack.Navigator>
    )
}
