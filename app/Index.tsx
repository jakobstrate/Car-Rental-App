import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "@/context/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
    const { user, logout } = useUser();
    const navigation = useNavigation();

    const handleLogout = async () => {
        logout()
    };

    return (
        <View style={styles.view}>
            <Text style={styles.title}>PrimeCar</Text>
            {user && <Text style={styles.welcomeText}>Welcome, {user.fullName}</Text>}

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("DiscoverStack")}
            >
                <Text style={styles.btnText}>Enter Location</Text>
            </TouchableOpacity>

            {!user ? (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.btnText}>Logout</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 64,
        margin: 10,
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginVertical: 5,
        width: 200,
    },
    btnText: {
        fontSize: 24,
    },
});
