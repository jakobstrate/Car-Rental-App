import { router } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
        <TextInput style={styles.inputBar}>Username</TextInput>
        <Text style={styles.inputTitle}>Password:</Text>
        <TextInput style={styles.inputBar}>Password</TextInput>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => router.navigate("/Discover")}>
            <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={() => router.navigate("/Login")}>
            <Text style={styles.registerBtnText}>Already have an account? Login Here</Text>
        </TouchableOpacity>
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
    fontSize: 64,
    margin: 10,
  },
  btnContainer: {
    gap: 5
  },
  loginBtn: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  registerBtn: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: '100%',
    height: 40,
    justifyContent: 'center'
  },
  loginBtnText: {
    fontSize: 24,
  },
  registerBtnText: {
    fontSize: 12,
  },
  inputContainer: {
    width: '80%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBar: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: '100%',
  },
  inputTitle: {
    width: '100%',
    
  },
});