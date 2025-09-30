import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import GradientNavButton from "@/Components/GradientNavButton";
import NavButton from "@/Components/NavButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


export default function Register() {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!fullName || !email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        const user = { fullName, email, password };

        // Get current users array or create empty
        const storedUsers = await AsyncStorage.getItem("users");
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        // Check if email already exists
        if (users.some(u => u.email === email)) {
            Alert.alert("Error", "Email already registered");
            return;
        }

        users.push(user);
        await AsyncStorage.setItem("users", JSON.stringify(users));

        Alert.alert("Success", "Account created!");
        navigation.goBack();
    };

    return (
        <View style={styles.view}>
            <Text style={styles.title}>PrimeCar</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Full Name:</Text>
                <TextInput style={styles.inputBar} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
                <Text style={styles.inputTitle}>Email:</Text>
                <TextInput style={styles.inputBar} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
                <Text style={styles.inputTitle}>Password:</Text>
                <TextInput style={styles.inputBar} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            </View>
            <View style={styles.btnContainer}>
                <GradientNavButton
                    buttonStyle={styles.registerBtn}
                    onPress={handleRegister}
                    textStyle={styles.registerBtnText}
                    text="Register"
                    colors={["#0093CB", "#1E7A9D"]}
                />
                <NavButton
                    buttonStyle={styles.loginBtn}
                    onPress={() => navigation.navigate("Login")}
                    textStyle={styles.loginBtnText}
                    text="Already have an account? Login here."
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
