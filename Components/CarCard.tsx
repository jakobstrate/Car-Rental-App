import { Car, CarType, FuelType, TransmissionType } from "@/types/Car";
import { RootStackParamList } from "@/types/navigation";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API = "http://83.89.249.249:3000"

const testCar : Car = {
  brand: "Volkswagen",
  modelName: "Polo",
  modelYear: 2020,
  rentPerHour: 100,
  image: require('@/assets/images/vwpolo.png'),
  color: "Red",
  description: "A fast car, that sucks fluids.",
  carType: CarType.SportsCar,
  transmission: TransmissionType.Automatic,
  fuelType: FuelType.Petrol,
  mileage: "0.001 km/l",
  numberOfSeats: 4,
  extras: ["GPS", "Bluetooth", "Jerker"],
  isAvailable: true,
}

type DiscoverNavProp = NativeStackNavigationProp<RootStackParamList, "Discover">;

export default function CarCard({ name, cost, image, car }) {
  const navigation = useNavigation<DiscoverNavProp>();

  return (
    <TouchableOpacity style={styles.container}  onPress={() => navigation.navigate("CarDetails", { car: testCar }) }>
      <View style={styles.detailsBox}>
        <Text style={styles.carTitle}>{car.brand + " " + car.modelName}</Text>
        <Text>{car.description}</Text>
        <Text style={styles.carCost}>Cost: {car.rentPerHour + "$ / hour"}</Text>
      </View>
      
      <Image source={{uri: `${API}/${car.image}`}} style={styles.carImg} />
      
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 180,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  // Car details
  detailsBox: {
    flex: 0.6,
    padding: 12,
    justifyContent: 'space-between',
  },
  carTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#111',
  },
  carDescription: {
    fontSize: 14,
    color: '#555',
  },
  carCost: {
    fontWeight: '600',
    fontSize: 16,
    color: '#269accff',

  },

  // car image
  carImg: {
    flex: 1,
    backgroundColor: 'lightgrey',
    height: '100%',
    resizeMode: 'cover',
  },
});