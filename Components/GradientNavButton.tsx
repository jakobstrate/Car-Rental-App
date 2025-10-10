import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { default_theme } from "@/styles/colors";
import { ReactNode } from "react";

interface GradientNavButtonProps {
    children?: ReactNode
    onPress?: () => void
    style?: ViewStyle | ViewStyle[]
}

const GradientNavButton = (props: GradientNavButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.shadow}>
            <LinearGradient
                style={[styles.gradient, props.style]}
                colors={[default_theme.blue_container_from, default_theme.blue_container_to]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                {props.children}
            </LinearGradient>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    shadow: {
        borderRadius: 20,

        boxShadow:
            "0px 4px 4px 0px #00000040, \
            0px -4px 0px 0px hsl(210, 100%, 61%)",
    },

    gradient: {
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default GradientNavButton;
