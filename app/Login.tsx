import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import GradientNavButton from "@/Components/GradientNavButton";
import NavButton from "@/Components/NavButton";
import { useUser } from "@/context/UserContext";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useUser();

    const handleLogin = async () => {
        login(email, password, navigation)
    };

    return (
        <View style={styles.view}>
            <Text style={styles.title}>PrimeCar</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Email:</Text>
                <TextInput style={styles.inputBar} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
                <Text style={styles.inputTitle}>Password:</Text>
                <TextInput style={styles.inputBar} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            </View>
            <View style={styles.btnContainer}>
                <GradientNavButton
                    buttonStyle={styles.loginBtn}
                    onPress={handleLogin}
                    textStyle={styles.loginBtnText}
                    text="Login"
                    colors={["#0093CB", "#1E7A9D"]}
                />
                <NavButton
                    buttonStyle={styles.registerBtn}
                    onPress={() => navigation.navigate("Register")}
                    textStyle={styles.registerBtnText}
                    text="Don't have an account? Register here"
                />
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

    loginBtn: {
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

    loginBtnText: {
        fontSize: 36,
        color: "#F5FFFF",
    },

    registerBtn: {
        padding: 10,
        color: "#D9D9D9",
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
