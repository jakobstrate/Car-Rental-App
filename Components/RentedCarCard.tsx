import { Booking } from '@/types/Booking';
import { Car, CarType, FuelType, TransmissionType } from "@/types/Car";
import { RootStackParamList } from "@/types/navigation";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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


const testBooking : Booking = {
  car: testCar,
  rentalStart: new Date().toISOString(),
  rentalEnd: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), 
  totalCost: 69.000,
}

type MyRentalsNavProp = NativeStackNavigationProp<RootStackParamList, "MyRentals">;

export default function RentedCarCard({ name, due, deadline, rentPeriod, image }) {
  const navigation = useNavigation<MyRentalsNavProp>();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("BookingDetails", { booking: testBooking })}>
      <View style={styles.detailsBox}>
        <Text style={styles.carTitle}>{name}</Text>
        <Text>Due Cost: {due}</Text>
        <Text>Deadline for payment: {deadline}</Text>
        <Text>Renting period: {rentPeriod}</Text>
        
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