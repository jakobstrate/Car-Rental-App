import RentedCarCard from "@/Components/RentedCarCard";
import { useBookings } from "@/context/BookingContext";
import { useUser } from "@/context/UserContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function MyRentals() {
    const { bookings } = useBookings();
    const { loggedIn } = useUser();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const scrollY = useRef(new Animated.Value(0)).current;
    
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
            <Animated.View
                style={[
                    styles.circle,
                    styles.topRightCircle,
                    {
                        transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [0, height*2],
                                outputRange: [0, -60],
                                extrapolate: "clamp",
                            }),
                        },
                        ],
                    },
                ]}
            />
            <Animated.View
                style={[
                styles.circle,
                styles.bottomLeftCircle,
                {
                    transform: [
                    {
                        translateY: scrollY.interpolate({
                            inputRange: [0, height*2],
                            outputRange: [60, 0],
                            extrapolate: "clamp",
                        }),
                    },
                    ],
                },
                ]}
            />
            <Animated.ScrollView horizontal={false} style={styles.carScrollView}
                contentContainerStyle={styles.carColumn}
                onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}>
                {bookings.map((booking, index) => (
                    <RentedCarCard
                        key={index}
                        booking={booking}
                    />
                ))}


            </Animated.ScrollView>
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
        paddingBottom: 100,
    },
    title: {
        fontSize: 48,
        margin: 10,
        fontWeight: "bold",
        color: 'white',
        zIndex: 10,
        backgroundColor: "#007FFF",
        borderRadius: 20,
        padding: 10,
        boxShadow: "0 -2px 0px #369AFF, 0 3px 2px rgba(0,0,0,0.25)",
    },
    circle: {
        position: "absolute",
        backgroundColor: "#007BFF",
        opacity: 0.5,
    },
    topRightCircle: {
        top: -200, 
        right: -width * 0.25,
        width: width * 0.9,
        height: width * 0.9,
        borderRadius: width * 0.45,
    },
    bottomLeftCircle: {
        bottom: -width * 0.4,
        left: -width * 0.3,
        width: width * 0.9,
        height: width * 0.9,
        borderRadius: width * 0.45,
    },
});
