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
  rentalEnd: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString() , // next day
  totalCost: 69.000,
}

type MyRentalsNavProp = NativeStackNavigationProp<RootStackParamList, "MyRentals">;

export default function RentedCarCard({ booking } : { booking: Booking }) {
  const navigation = useNavigation<MyRentalsNavProp>();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("BookingDetails", { booking: booking })}>
      <View style={styles.detailsBox}>
        <Text style={styles.carTitle}>{booking.car.brand + booking.car.modelName}</Text>
        <Text>Due Cost: {booking.totalCost}</Text>
        <Text>Deadline for payment: {booking.rentalEnd}</Text>
        <Text>Renting period: {booking.rentalStart + " -> " + booking.rentalEnd}</Text>
        
      </View>
      
      <Image source={booking.car.image} style={styles.carImg} />
      
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