import BackBtn from "@/Components/BackBtn";
import BasicCarInfoCards from "@/Components/CarDetailsScreen/BasicCarInfoCards";
import DateRangePicker from "@/Components/DateRangePicker";
import { API } from "@/constants";
import { useBookings } from "@/context/BookingContext";
import { useUser } from "@/context/UserContext";
import { basicCarInfoCardStyle, bottomBarContainerStyles, detailsViewStyle, specItemStyle } from "@/styles/CarDetailSreensStyles/CarDetailsScrollViewStyles";
import { Booking } from "@/types/Booking";
import { Car } from "@/types/Car";
import { RootStackParamList } from "@/types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";


type Props = NativeStackScreenProps<RootStackParamList, "CarDetails">;

type CarInfoCard = {
    Icon: React.FC<SvgProps>;
    typeTxt: string;
    valueTxt: string;
};

const totalCost = (startDate: Date | undefined, endDate: Date | undefined, rentPerHour: number): number => {
    if (!startDate || !endDate) return 0;
    return (((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)) * rentPerHour);
}


export default function CarDetails({ navigation, route }: Props) {
    const { addBooking } = useBookings();
    const { loggedIn } = useUser();


    const confirmBooking = (car: Car, startDate: Date | undefined, endDate: Date | undefined) => {

        if (!loggedIn) {
            navigation.navigate("Login");
            return;
        }

        if (!startDate || !endDate) {
            alert("Please select rental dates");
            return;
        }

        const newBooking: Booking = {
            car: car,
            rentalStart: startDate.toISOString(),
            rentalEnd: endDate.toISOString(),
            totalCost: totalCost(startDate, endDate, car.rentPerHour),
        };

        addBooking(newBooking);
        navigation.navigate("MyRentalsStack", { screen: "MyRentals" });
    }

    const handleBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate("Discover");
        }
    }

    const BasicCarInfoCard: React.FC<CarInfoCard> = ({ Icon, typeTxt, valueTxt }) => (
        <View style={basicCarInfoCardStyle.container}>
            <Icon width={32} height={32} />
            <Text style={basicCarInfoCardStyle.typeTxt}>{typeTxt}</Text>
            <Text style={basicCarInfoCardStyle.valueTxt}>{valueTxt}</Text>
        </View>
    );

    const SpecTextItem: React.FC<{ valueText: string }> = ({ valueText }) => (
        <View style={specItemStyle.specContainer}>
            <Text style={specItemStyle.valueTxt}>{valueText}</Text>
        </View>
    );

    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <BackBtn onPress={handleBackPress} />
                <Text style={styles.title} adjustsFontSizeToFit={true}>{route.params.car.brand + " " + route.params.car.modelName}</Text>
            </View>
            <ScrollView style={styles.bodyScrollView} contentContainerStyle={{ alignItems: 'center', gap: 10, paddingBottom: 335, overflow: 'visible' }}>
                <Image source={{ uri: `${API}/${route.params.car.image}` }} style={styles.carImg} />
                <View style={styles.rentInfo}>
                    <Text style={styles.rentCostText}>Rent cost :</Text>
                    <Text style={styles.rentPrHourText}>{route.params.car.rentPerHour + " Dkk / Hour"}</Text>
                </View>
                <View style={styles.seperator} />
                <View style={detailsViewStyle.detailsView}>
                    <BasicCarInfoCards fuelType={route.params.car.fuelType}
                        transmission={route.params.car.transmission} mileage={route.params.car.mileage} />
                    <View>
                        <Text style={detailsViewStyle.sectionTitle}>Description</Text>
                        <Text style={detailsViewStyle.descriptionTxt}>{route.params.car.description}</Text>
                    </View>
                    <View style={styles.seperator} />
                    <View>
                        <Text style={detailsViewStyle.sectionTitle}>Specifications & Extras</Text>
                        <View style={detailsViewStyle.specGrid}>
                            <SpecTextItem valueText={route.params.car.carType} />
                            <SpecTextItem valueText={route.params.car.color} />
                            <SpecTextItem valueText={route.params.car.modelYear.toString() + " Model"} />
                            <SpecTextItem valueText={route.params.car.numberOfSeats.toString() + " Seats"} />
                            {route.params.car.extras.map((extra, index) => (
                                <SpecTextItem key={index} valueText={extra} />
                            ))}

                        </View>

                    </View>
                </View>


            </ScrollView>
            <SafeAreaView style={bottomBarContainerStyles.bottomBar} edges={['bottom']}>

                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                />

                <View style={styles.confirmRentalBar}>
                    <View>
                        <Text style={styles.totalCostText}>Total Cost: </Text>
                        <Text style={styles.totalCostValueText}>{totalCost(startDate, endDate, route.params.car.rentPerHour).toFixed(2)} Dkk</Text>
                    </View>

                    <TouchableOpacity style={styles.confirmBtn} onPress={() => confirmBooking(route.params.car, startDate, endDate)}>
                        <Text style={styles.confirmTxt}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.confirmRentalDiscTxt}>* upon returning the vehicle, the cost of the rent is reduces based on time remaining till deadline,
                    and an additional cost is added based on fuel consumption.
                </Text>
            </SafeAreaView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: "center",
        height: '100%',
        backgroundColor: '#fff',

    },
    topBar: {
        width: '100%',
        height: '7.5%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,

    },
    title: {
        position: 'absolute',
        fontSize: 32,
        fontWeight: "bold",
        left: "50%",
        transform: [{ translateX: "-50%" }],
    },
    bodyScrollView: {
        flexGrow: 1,
        height: '100%',
        width: '100%',
    },
    carImg: {
        height: 200,
        width: '95%',
        objectFit: 'cover',
        borderRadius: 20

    },
    seperator: {
        width: '90%',
        height: 1.5,
        backgroundColor: '#000000ff',
        opacity: 0.2,
    },
    rentInfo: {
        width: '90%',
        height: 24,
        justifyContent: 'space-evenly',
        alignItems: 'baseline',
        flexDirection: 'row',
        gap: 8,

    },
    rentCostText: {
        fontSize: 16,
    },
    rentPrHourText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#269accff'
    },
    confirmBtn: {
        width: 100,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#04DE4Dff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmTxt: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    confirmRentalDiscTxt: {
        fontSize: 8,
        color: '#7e7e7eff',
        width: '95%',
        textAlign: 'center',
    },
    extrasSection: {
        height: 100,
        width: '100%',
    },
    confirmRentalBar: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',

    },
    totalCostText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    totalCostValueText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#269accff'
    },

});


