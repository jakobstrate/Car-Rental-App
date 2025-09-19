import type { Car } from "@/types/Car";
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function CarDetails({ car }:{car: Car}) {
    return (
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.navigate('/(tabs)/MyRentals')}><Text>Back</Text></TouchableOpacity>
            <Text style={styles.title}>Coca Kapow</Text>
            <TouchableOpacity style={styles.likeBtn}><Text>Like</Text></TouchableOpacity>
          </View>
          <ScrollView style={styles.bodyScrollView} contentContainerStyle={{alignItems: 'center', gap:10}}>
            <Image source={require("@/assets/images/placeholder.png")} style={styles.carImg} />
            <Text>Cost: 100 pr day</Text>
            <View style={styles.detailsView}>
              <Text>this is a car</Text>
            </View>
            <TextInput style={styles.datePicker}>Dates Selected</TextInput>
            <TouchableOpacity style={styles.confirmBtn}><Text style={styles.confirmTxt}>Confirm</Text></TouchableOpacity>
          </ScrollView>
        </View>
        
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: "center",
    height: '100%',
  },
  topBar: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    backgroundColor: '#2323',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: '#7e7e7eff', 
  },
  likeBtn: {
    backgroundColor: '#7e7e7eff', 
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  bodyScrollView: {
    height: '100%',
    width: '100%',
  },
  carImg: {
    height: 400,
    width: '100%',
    backgroundColor: '#686868ff', 
    
  },
  detailsView: {
    height: 240,
    width: '90%',
    backgroundColor: '#777777ff',
  },
  datePicker: {
    width: '90%',
    backgroundColor: '#707070ff',
    justifyContent: 'center'
  },
  confirmBtn: {
    width: 100,
    height: 60,
    backgroundColor: '#474747ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmTxt: {
    fontSize: 24,
    fontWeight: 'bold',
  }

});