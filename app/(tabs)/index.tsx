import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await AsyncStorage.getItem("currentUser");
      if (user) {
        setFullName(JSON.parse(user).fullName);
      }
    };
    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUser");
    setFullName(null);
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>PrimeCar</Text>
      {fullName && <Text style={styles.welcomeText}>Welcome, {fullName}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate("/Discover")}
      >
        <Text style={styles.btnText}>Enter Location</Text>
      </TouchableOpacity>

      {!fullName ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("/Login")}
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
