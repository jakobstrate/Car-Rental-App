import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.view}
    >
      <Text style={styles.title}>
        PrimeCar
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate("/Discover")}>
          <Text style={styles.btnText}>Enter Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate("/Login")}>
          <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
        
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  btnText: {
    fontSize: 24,
  }
});
