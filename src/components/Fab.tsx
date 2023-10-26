import React from 'react'
import {
    Text,
    TouchableNativeFeedback,
    View,
    Platform,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
    iconName: string
    onPress: () => void
    style: StyleProp<ViewStyle>
}

export const Fab = ({ iconName, style, onPress }: Props) => {
    return (
        <View style={{ ...(style as any) }}>
            <TouchableOpacity
                activeOpacity={0.75}
                style={{ ...styles.blackButton }}
                onPress={onPress}>
                <Icon name={iconName} size={35} color={'white'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    blackButton: {
        backgroundColor: '#c95c5c',
        borderRadius: 100,
        height: 60,
        width: 60,
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
        // Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.84,

        elevation: 6
    }
})
