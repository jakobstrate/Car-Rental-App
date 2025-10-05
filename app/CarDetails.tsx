import BackIcon from "@/assets/images/icons/BackIcon.svg";
import FuelTypeIcon from "@/assets/images/icons/FuelTypeIcon.svg";
import MileageIcon from "@/assets/images/icons/MileageIcon.svg";
import TransmissionTypeIcon from "@/assets/images/icons/TransmissionIcon.svg";
import DateRangePicker from "@/Components/DateRangePicker";
import { useBookings } from "@/context/BookingContext";
import { useUser } from "@/context/UserContext";
import { Booking } from "@/types/Booking";
import { Car } from "@/types/Car";
import { RootStackParamList } from "@/types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { API } from "@/constants"



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

    const BasicCarInfoCard: React.FC<CarInfoCard> = ({ Icon, typeTxt, valueTxt }) => (
        <View style={basicCarInfoCardStyle.container}>
            <Icon width={32} height={32} />
            <Text style={basicCarInfoCardStyle.typeTxt}>{typeTxt}</Text>
            <Text style={basicCarInfoCardStyle.valueTxt}>{valueTxt}</Text>
        </View>
    );

    const SpecTextItem: React.FC<{ specText: string, valueText: string }> = ({ specText, valueText }) => (
        <View style={specItemStyle.specContainer}>
            <Text style={specItemStyle.specTxt}>{specText}</Text>
            <Text style={specItemStyle.seperatorColon}>{":"}</Text>
            <Text style={specItemStyle.valueTxt}>{valueText}</Text>
        </View>
    );

    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}><BackIcon width={42} height={42} /></TouchableOpacity>
                <Text style={styles.title} adjustsFontSizeToFit={true}>{route.params.car.brand + " " + route.params.car.modelName}</Text>
            </View>
            <ScrollView style={styles.bodyScrollView} contentContainerStyle={{ alignItems: 'center', gap: 10, paddingBottom: 100 }}>
                <Image source={{ uri: `${API}/${route.params.car.image}` }} style={styles.carImg} />
                <View style={styles.rentInfo}>
                    <Text style={styles.rentCostText}>Rent cost :</Text>
                    <Text style={styles.rentPrHourText}>{route.params.car.rentPerHour + " Dkk / Hour"}</Text>
                </View>
                <View style={styles.seperator} />
                <View style={detailsViewStyle.detailsView}>
                    <View style={detailsViewStyle.basicCarInfoCards}>
                        <BasicCarInfoCard Icon={FuelTypeIcon} typeTxt='FuelType' valueTxt={route.params.car.fuelType} />
                        <BasicCarInfoCard Icon={TransmissionTypeIcon} typeTxt='Transmission' valueTxt={route.params.car.transmission} />
                        <BasicCarInfoCard Icon={MileageIcon} typeTxt='Mileage' valueTxt={route.params.car.mileage} />
                    </View>
                    <View>
                        <Text style={detailsViewStyle.sectionTitle}>Description</Text>
                        <Text style={detailsViewStyle.descriptionTxt}>{route.params.car.description}</Text>
                    </View>
                    <View>
                        <Text style={detailsViewStyle.sectionTitle}>Specifications</Text>
                        <View style={detailsViewStyle.specBox}>
                            <SpecTextItem specText="Car Type" valueText={route.params.car.carType} />
                            <SpecTextItem specText="Color" valueText={route.params.car.color} />
                            <SpecTextItem specText="Model Year" valueText={route.params.car.modelYear.toString()} />
                            <SpecTextItem specText="Number of Seats" valueText={route.params.car.numberOfSeats.toString()} />
                        </View>
                    </View>
                    <View style={styles.extrasSection}>
                        <Text style={detailsViewStyle.sectionTitle}>Extras</Text>
                        {route.params.car.extras.map((extra, index) => (
                            <Text key={index} style={detailsViewStyle.descriptionTxt} >
                                - {extra}
                            </Text>
                        ))}
                    </View>
                </View>


            </ScrollView>
            <View style={styles.bottomBar}>

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
            </View>
        </View>

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
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 10,
        paddingLeft: 10,
    },
    backBtn: {
        //backgroundColor: '#7e7e7eff', 

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
        backgroundColor: '#fff',

    },
    carImg: {
        height: 200,
        width: '100%',
        objectFit: 'contain',

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
        color: '#000000ff',
    },
    rentPrHourText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#269accff',
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
    bottomBar: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        height: '20%',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 10,
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
        color: '#269accff',
    },

});

const detailsViewStyle = StyleSheet.create({
    detailsView: {
        height: 360,
        width: '90%',
        gap: 10,
    },
    basicCarInfoCards: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10,
    },
    specBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionTxt: {
        fontSize: 16,
    }
});


const basicCarInfoCardStyle = StyleSheet.create({

    container: {
        height: 100,
        width: 100,
        backgroundColor: '#d9d9d94f',
        borderRadius: 20,
        borderColor: '#00000014',
        borderWidth: 1,
        paddingLeft: 8,
        paddingTop: 8,
        
    },
    typeTxt: {
        fontSize: 14,
    },
    valueTxt: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000ff',
    }
});

const specItemStyle = StyleSheet.create({
    specContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    specTxt: {
        flex: 1,
        fontSize: 18,
        color: '#000000ff',
        textAlign: 'left',
    },
    seperatorColon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000ff',
        textAlign: 'center',
    },
    valueTxt: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000ff',
        textAlign: 'right',
        
    }
});
