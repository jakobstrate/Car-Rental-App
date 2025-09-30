import RentedCarCard from "@/Components/RentedCarCard";
import { useBookings } from "@/context/BookingContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function MyRentals() {
  const { bookings } = useBookings();
  return (
      <View style={styles.container}>
        <Text style={styles.title}>My Rentals</Text>
        <ScrollView horizontal={false} style={styles.carScrollView}
          contentContainerStyle={styles.carColumn}>
          {bookings.map((booking, index) => (
            <RentedCarCard 
              key={index}
              booking={booking}
            />
          ))}
          
                
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },
  carScrollView: {
    width: '100%',
    height: '90%',
  },
  carColumn: {
    justifyContent: "center", 
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    margin: 10,
    fontWeight: "bold",
  },
});