import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"

interface NavButtonProps {
    text: string
    onPress?: () => void
    buttonStyle?: ViewStyle
    textStyle?: TextStyle
}

const NavButton = (props: NavButtonProps) => {
    return (
        <TouchableOpacity style={[styles.button, props.buttonStyle]} onPress={props.onPress}>
            <Text style={[styles.text, props.textStyle]}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#DDDDDD',
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: "#000000",
        fontSize: 24,
    },
})

export default NavButton
