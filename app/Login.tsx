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
                <NavButton
                    buttonStyle={styles.loginBtn}
                    onPress={handleLogin}
                    textStyle={styles.loginBtnText}
                    text="Login"
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
        fontSize: 58,
        fontWeight: "800",
        color: "#fff",
        marginTop: 30,
        textAlign: "center",
    },

    btnContainer: {
        gap: 20,
        width: "60%",
    },

    loginBtn: {
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#fff"
    },

    loginBtnText: {
        fontSize: 36,
        color: "#269accff",
    },

    registerBtn: {
        padding: 10,
        backgroundColor: "#ffff",
    },

    registerBtnText: {
        fontSize: 12,
        color: "#269accff"
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
        backgroundColor: '#fff',
        width: '100%',
        marginBottom: 30,
    },

    inputTitle: {
        width: '100%',
        fontSize: 20,
        color: "#fff"
    },
});
