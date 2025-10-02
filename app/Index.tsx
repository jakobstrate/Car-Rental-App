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
            {user && <Text style={styles.welcomeText}>Welcome {user.fullName}</Text>}

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
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 58,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },

  welcomeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 50,
    textAlign: "center",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 14,
    marginVertical: 10,
    width: "80%",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#269accff",
  },
});


