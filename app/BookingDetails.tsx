import BackBtn from "@/Components/BackBtn";
import BasicCarInfoCards from "@/Components/CarDetailsScreen/BasicCarInfoCards";
import DateRangeViewBar from "@/Components/DateRangeViewBar";
import { API } from "@/constants";
import { useBookings } from '@/context/BookingContext';
import { bottomBarContainerStyles, detailsViewStyle, specItemStyle } from "@/styles/CarDetailSreensStyles/CarDetailsScrollViewStyles";
import { RootStackParamList } from "@/types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "BookingDetails">;

export default function BookingDetails({ navigation, route }: Props) {
    const { removeBooking } = useBookings();
    const cancelBooking = () => {

        removeBooking(route.params.booking);
        navigation.navigate("MyRentals");
    }

    const SpecTextItem: React.FC<{valueText: string }> = ({valueText }) => (
        <View style={specItemStyle.specContainer}>
            <Text style={specItemStyle.valueTxt}>{valueText}</Text>
        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <BackBtn onPress={() => navigation.goBack()}/>
                <Text style={styles.title} adjustsFontSizeToFit={true}>{route.params.booking.car.brand + " " + route.params.booking.car.modelName}</Text>
            </View>
            <ScrollView style={styles.bodyScrollView} contentContainerStyle={{ alignItems: 'center', gap: 10, paddingBottom: 335, overflow: 'visible'}}>
                <Image source={{ uri: `${API}/${route.params.booking.car.image}` }} style={styles.carImg} />
                <View style={styles.rentInfo}>
                    <Text style={styles.rentCostText}>Rent cost :</Text>
                    <Text style={styles.rentPrHourText}>{route.params.booking.car.rentPerHour + " Dkk / Hour"}</Text>
                </View>
                <View style={styles.seperator} />
                <View style={detailsViewStyle.detailsView}>
                    <BasicCarInfoCards fuelType={route.params.booking.car.fuelType} 
                    transmission={route.params.booking.car.transmission} mileage={route.params.booking.car.mileage}/>
                    <View>
                        <Text style={detailsViewStyle.sectionTitle}>Description</Text>
                        <Text style={detailsViewStyle.descriptionTxt}>{route.params.booking.car.description}</Text>
                    </View>
                    <View style={styles.seperator} />
                    <View>
                        <Text style={detailsViewStyle.sectionTitle}>Specifications & Extras</Text>
                        <View style={detailsViewStyle.specGrid}>                            
                            <SpecTextItem valueText={route.params.booking.car.carType} />
                            <SpecTextItem valueText={route.params.booking.car.color} />
                            <SpecTextItem valueText={route.params.booking.car.modelYear.toString() + " Model"} />
                            <SpecTextItem valueText={route.params.booking.car.numberOfSeats.toString() + " Seats"} />
                            {route.params.booking.car.extras.map((extra, index) => (
                            <SpecTextItem key={index} valueText={extra}/>
                            ))}
                            
                        </View>
                                            
                    </View>
                    
                </View>
            </ScrollView>
            
            <SafeAreaView style={bottomBarContainerStyles.bottomBar}edges={['bottom']}>

                <DateRangeViewBar
                    startDate={new Date(route.params.booking.rentalStart)}
                    endDate={new Date(route.params.booking.rentalEnd)}
                />

                <View style={bottomBarStyles.cancelRentalBar}>
                    <View>
                        <Text style={bottomBarStyles.totalCostText}>Total Cost: </Text>
                        <Text style={bottomBarStyles.totalCostValueText}>{route.params.booking.totalCost.toFixed(2) + "DKK"}</Text>
                    </View>

                    <TouchableOpacity style={bottomBarStyles.cancelBtn} onPress={() => cancelBooking()}>
                        <Text style={bottomBarStyles.cancelTxt}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <Text style={bottomBarStyles.cancelRentalDiscTxt}>* upon returning the vehicle, the cost of the rent is reduces based on time remaining till deadline,
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
        backgroundColor: '#fff',
        width: '100%',
        height: '7.5%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        zIndex: 10,
        boxShadow: "0 10px 10px rgba(0,0,0,0.5)",
        borderBottomColor: "rgba(0, 0, 0, 0.5)",
        borderBottomWidth: 1,
    },
    title: {
        position: 'absolute',
        fontSize: 32,
        fontWeight: "bold",
        left: "50%",
        transform: [{ translateX: "-50%" }],
    },
    bodyScrollView: {
        width: '100%',
        paddingTop: 10,
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
        alignSelf: 'center'
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
        color: '#269accff',
    },
    backBtn: {
        backgroundColor: '#007FFF',
        borderRadius: 100,
        height: 40,
        width: 80,
        alignItems: 'center',
        flexDirection: 'row',
    },
    backIcon: {
       
    },
    backTxt: {
        color: '#ffffffff',
        fontWeight: 'bold',
        right: 15,
        bottom: 1,
    }
});

const bottomBarStyles = StyleSheet.create({ 
    cancelRentalBar: {
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
    cancelBtn: {
        width: 100,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#DE3004ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelTxt: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    cancelRentalDiscTxt: {
        fontSize: 8,
        color: '#7e7e7eff',
        width: '95%',
        textAlign: 'center',
    },
});



