import { Car, CarType, FuelType, TransmissionType } from "@/types/Car";
import { RootStackParamList } from "@/types/navigation";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const testCar : Car = {
  brand: "Coca",
  modelName: "Kapow",
  modelYear: 2020,
  rentPerHour: 100,
  image: require('@/assets/images/placeholder.png'),
  color: "Red",
  description: "A fast car, that sucks fluids.",
  carType: CarType.SportsCar,
  transmission: TransmissionType.Automatic,
  fuelType: FuelType.Petrol,
  mileage: "0.001 km/l",
  numberOfSeats: 4,
  extras: ["GPS", "Bluetooth"],
  isAvailable: true,
}

type DiscoverNavProp = NativeStackNavigationProp<RootStackParamList, "Discover">;

export default function CarCard({ name, cost, image }) {
  const navigation = useNavigation<DiscoverNavProp>();

  return (
    <TouchableOpacity style={styles.container}  onPress={() => navigation.navigate("CarDetails", { car: testCar }) }>
      <View style={styles.detailsBox}>
        <Text style={styles.carTitle}>{name}</Text>
        <Text>Cost: {cost}</Text>
        <Text>Cost: {cost}</Text>
        <Text>Cost: {cost}</Text>
      </View>
      
      <Image source={image} style={styles.carImg} />
      
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 200,
    marginVertical: 8, 
    backgroundColor: '#eee', 
    borderRadius: 8,
    flexDirection: 'row',
    gap: 10,
  },
  detailsBox: {
    flex: 1,
    flexDirection: 'column',
  },
  carTitle: {
    fontWeight: 'bold', 
    marginBottom: 4,
    fontSize: 32,
  },
  carImg: {
    flex: 1,
    height: '100%', 
    backgroundColor: '#ccc', 
    marginBottom: 4 
  },
});