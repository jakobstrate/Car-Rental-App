import GradientNavButton from "@/Components/GradientNavButton";
import NavButton from "@/Components/NavButton";
import { router } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Register() {
    return (
        <View
            style={styles.view}
        >
            <Text style={styles.title}>
                PrimeCar
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Username:</Text>
                <TextInput style={styles.inputBar}></TextInput>
                <Text style={styles.inputTitle}>Password:</Text>
                <TextInput style={styles.inputBar}></TextInput>
            </View>
            <View style={styles.btnContainer}>
                <GradientNavButton
                    buttonStyle={styles.registerBtn}
                    onPress={() => router.navigate("/Login")}
                    textStyle={styles.registerBtnText}
                    text="Register"
                    colors={["#0093CB", "#1E7A9D"]}
                >
                </GradientNavButton>
                <NavButton
                    buttonStyle={styles.loginBtn}
                    onPress={() => router.navigate("/Login")}
                    textStyle={styles.loginBtnText}
                    text="Already have an account? Login here."
                >
                </NavButton>
            </View>


        </View>
    );
}


const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 60,
        color: "#005ACD",

        textShadowColor: "#000000",
        textShadowOffset: {
            width: 3,
            height: 3,
        },

        textShadowRadius: 4,
        margin: 10,
    },

    btnContainer: {
        gap: 10,
        width: "60%",
    },

    registerBtn: {
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },

        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 4,
    },

    registerBtnText: {
        fontSize: 36,
        color: "#F5FFFF",
    },

    loginBtn: {
        padding: 10,
        backgroundColor: "#D9D9D9",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },

        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 4,
    },

    loginBtnText: {
        fontSize: 12,
        color: "#000000"
    },

    inputContainer: {
        width: '80%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputBar: {
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#F1F1F1',
        width: '100%',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },

        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 4,

        marginBottom: 30,
    },

    inputTitle: {
        width: '100%',
        fontSize: 20,
    },
});
