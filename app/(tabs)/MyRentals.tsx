import RentedCarCard from "@/Components/RentedCarCard";
import { ScrollView, StyleSheet, Text, View } from "react-native";


export default function MyRentals() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Rentals</Text>
            <ScrollView horizontal={false} style={styles.carScrollView}
                    contentContainerStyle={styles.carColumn}>
                <RentedCarCard name={'Coca Kapow'} due={'100$'} deadline={'11/07'} image={undefined} rentPeriod={'12/7->16/6'} />
                
        
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