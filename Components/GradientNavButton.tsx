import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';

interface GradientNavButtonProps {
    text: string
    onPress?: () => void
    buttonStyle?: ViewStyle
    textStyle?: TextStyle
    colors?: string[]
}

const GradientNavButton = (props: GradientNavButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <LinearGradient
                colors={props.colors ?? ["#000000", "#ffffff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.button, props.buttonStyle]}
            >
                <Text style={[styles.text, props.textStyle]}>
                    {props.text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: "#000000",
        fontSize: 24,
    },
})

export default GradientNavButton
