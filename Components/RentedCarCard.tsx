import { Booking } from '@/types/Booking';
import { RootStackParamList } from "@/types/navigation";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateRangeViewBar from './DateRangeViewBar';
import { API } from "@/constants"

type MyRentalsNavProp = NativeStackNavigationProp<RootStackParamList, "MyRentals">;

export default function RentedCarCard({ booking }: { booking: Booking }) {
    const navigation = useNavigation<MyRentalsNavProp>();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("BookingDetails", { booking: booking })}>
            <View style={styles.topRow}>
                <Text style={styles.carTitle} adjustsFontSizeToFit={true}>{booking.car.brand + " " + booking.car.modelName}</Text>
            </View>
            <View style={styles.middleRow}>
                <View style={styles.detailsBox}>
                    <Text style={styles.boldTxt}>Due Cost: {booking.totalCost}</Text>
                    <Text style={styles.boldTxt}>Deadline for payment: </Text>
                    <Text>{new Date(booking.rentalEnd).toLocaleString("en-GB")}</Text>

                    <Text style={styles.boldTxt} >Rental period:</Text>
                </View>
                <Image source={{ uri: `${API}/${booking.car.image}` }} style={styles.carImg} />

            </View>
            <View style={styles.bottomRow}>

                <DateRangeViewBar startDate={new Date(booking.rentalStart)} endDate={new Date(booking.rentalEnd)} style={{ height: 40 }} />
            </View>


        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffffff',
        width: '90%',
        height: 200,
        marginVertical: 8,
        borderRadius: 15,
        flexDirection: 'column',
        paddingLeft: 12,

        borderTopWidth: 0,
        borderRightWidth: 1,
        borderBottomWidth: 4,
        borderLeftWidth: 1,

        borderColor: "rgba(0, 0, 0, 0.2)",
    },
    detailsBox: {
        flexDirection: 'column',
        width: '50%',
    },
    carTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 32,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    carImg: {
        width: '50%',
        height: '100%',
        resizeMode: 'contain',
        marginBottom: 4,
    },
    topRow: {
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleRow: {
        flexDirection: 'row',
        height: '50%',
    },
    bottomRow: {
        justifyContent: 'center',
        height: '30%',
        alignItems: 'center',
        gap: 20,
        bottom: 5
    },
    boldTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },

});
