import { default_theme } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

const TitleCard = () => {
    return (
        <View style={styles.root}>
            <View style={styles.shadow}>
                <LinearGradient
                    style={styles.gradient}
                    colors={[default_theme.title_top, default_theme.title_bottom]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <Text style={styles.text}>PrimeCar</Text>
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        borderRadius: 20,
        width: "100%",
    },

    text: {
        fontSize: 58,
        fontWeight: "800",
        color: default_theme.text,
        textAlign: "center",
    },

    gradient: {
        borderRadius: 20,
    },

    shadow: {
        borderRadius: 20,
        boxShadow:
            "0px 4px 4px 0px #0000007f, \
            0px -4px 0px 0px #F0CF75",
    },
})

export default TitleCard;
