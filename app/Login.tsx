import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GradientNavButton from "@/Components/GradientNavButton";
import NavButton from "@/Components/NavButton";
import { useUser } from "@/context/UserContext";
import { StackActions, useNavigation } from "@react-navigation/native";
import TitleCard from "@/Components/TitleCard";
import { default_theme } from "@/styles/colors";


const { width, height } = Dimensions.get("window");

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useUser();


    const handleLogin = async () => {
        login(email, password, navigation)
    };

    return (
        <View style={styles.root}>
            <TitleCard />

            <View style={styles.circleContainer}>
                <View style={[styles.circle, styles.circle1]} />
                <View style={[styles.circle, styles.circle2]} />
            </View>

            <View style={styles.inputView}>
                <View style={styles.emailView}>
                    <Text style={styles.inputTitle}>Email:</Text>
                    <View style={styles.shadow}>
                        <TextInput
                            style={styles.inputBar}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={styles.passView}>
                    <Text style={styles.inputTitle}>Password:</Text>
                    <View style={styles.shadow}>
                        <TextInput
                            style={styles.inputBar}
                            secureTextEntry
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.buttonView}>
                <View style={{ height: "40%" }}>
                    <GradientNavButton
                        onPress={handleLogin}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginText}>Login</Text>
                    </GradientNavButton>
                </View>

                <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.smallButtonText}>Don't have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 40,
        paddingHorizontal: 15,
        gap: 100,
    },

    inputView: {
        width: "90%",
        height: "30%",
        gap: 30,
    },

    emailView: {
        height: "40%",
    },

    passView: {
        height: "40%",
    },

    inputTitle: {
        fontSize: 20,
        color: "#000",
        marginLeft: 40,
    },

    shadow: {
        height: "50%",
        borderRadius: 20,
        boxShadow: "0px 4px 4px 0px #2A52BE",
    },

    inputBar: {
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#EEEEEE',
        width: '100%',
        marginBottom: 30,
        height: "100%",
    },

    buttonView: {
        width: "75%",
        height: "18%",
        gap: 40,
        marginTop: 40,
    },

    loginButton: {
        width: "100%",
        height: "100%",
    },

    loginText: {
        fontSize: 32,
        fontWeight: "500",
        color: default_theme.text,
        textAlign: "center",
    },

    smallButton: {
        alignSelf: "center",
        height: "25%",
        width: "70%",
        justifyContent: "center",
        backgroundColor: "#D9D9D9",
        borderRadius: 20,

        boxShadow:
            "0px 4px 4px 0px #00000040, \
            0px -4px 0px 0px #8B8B8B40",
    },

    smallButtonText: {
        fontSize: 12,
        fontWeight: "400",
        color: "#000000",
        textAlign: "center",
    },

    circle: {
        position: "absolute",
        zIndex: -10,
        borderRadius: width * 0.5,
    },

    circleContainer: {
        position: "absolute",
        width: "100%",
        height: "50%",
    },

    circle1: {
        position: "absolute",
        top: -width * 0.5,
        right: -width * 0.4,
        width: width * 1.1,
        height: width * 1.2,
        borderRadius: width * 0.55,
        backgroundColor: "#007bffff",
        opacity: 0.3,
        transform: [{ scaleX: 1.2 }, { rotate: "25deg" }],
    },

    circle2: {
        position: "absolute",
        bottom: -width * 0.6,
        left: -width * 0.3,
        width: width * 1.1,
        height: width * 1.1,
        borderRadius: width * 10,
        backgroundColor: "#009dffff",
        opacity: 0.15,
    },
});
