import 'react-native-gesture-handler'
import { enableLatestRenderer } from 'react-native-maps'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

// Google Maps
enableLatestRenderer()

// Navigation
import { StackNavigator } from './src/navigator/Navigator'

// Providers
import { PermissionsProvider } from './src/context/PermissionsContext'

const AppState = ({ children }: any) => {
    return <PermissionsProvider>{children}</PermissionsProvider>
}

const App = () => {
    return (
        <NavigationContainer>
            <AppState>
                <StackNavigator />
            </AppState>
        </NavigationContainer>
    )
}

export default App
