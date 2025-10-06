import RentedCarCard from "@/Components/RentedCarCard";
import { useBookings } from "@/context/BookingContext";
import { useUser } from "@/context/UserContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function MyRentals() {
    const { bookings } = useBookings();
    const { loggedIn } = useUser();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && !loggedIn) {
            navigation.navigate("Login")
        }
    }, [isFocused, loggedIn]);

    if (!loggedIn) {
        // Return nothing while we redirect to login page.
        return null;
    }

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
        top: 50,
    },
    carScrollView: {
        width: '100%',
        height: '90%',
    },
    carColumn: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontSize: 48,
        margin: 10,
        fontWeight: "bold",
        color: 'white'
    },
});
