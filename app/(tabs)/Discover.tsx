import CarCard from "@/Components/CarCard";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Discover() {

    //smaller parts of the screen
    type FilterScrollviewBtnProps = {
        typeName: string;
    };

    const FilterScrollviewBtn: React.FC<FilterScrollviewBtnProps> = ({typeName}) => (
        <View style={styles.filterBtnCell}>
            <TouchableOpacity style={styles.filterBtn}>
                <Text>{typeName}</Text>
            </TouchableOpacity>
        </View>
    );

    const FilterBar = () => (
        <View style={styles.filterContainer}>
            <Text>Filter Car Types</Text>
            <ScrollView horizontal={true} style={styles.filterBarScrollview} 
            contentContainerStyle={styles.filterBarRow} showsHorizontalScrollIndicator={false}>
                
                <FilterScrollviewBtn typeName={"SUV"} />
                <FilterScrollviewBtn typeName={"SC"} />
                <FilterScrollviewBtn typeName={"Truck"} />
                <FilterScrollviewBtn typeName={"SUV"} />
                <FilterScrollviewBtn typeName={"SC"} />
                <FilterScrollviewBtn typeName={"Truck"} />
                <FilterScrollviewBtn typeName={"SUV"} />
                <FilterScrollviewBtn typeName={"SC"} />
                <FilterScrollviewBtn typeName={"Truck"} />
                <FilterScrollviewBtn typeName={"SUV"} />
                <FilterScrollviewBtn typeName={"SC"} />
                <FilterScrollviewBtn typeName={"Truck"} />
                
                
            </ScrollView>
        </View>
    );

    return (
        <View
            style={styles.container}
        >
            <FilterBar/>
            <ScrollView horizontal={false} style={styles.carScrollView}
            contentContainerStyle={styles.carColumn}>
                <CarCard name={'Fiat punto'} cost={100} image={undefined} />
                <CarCard name={'Fiat punto'} cost={100} image={undefined} />
                <CarCard name={'Fiat punto'} cost={100} image={undefined} />
                <CarCard name={'Fiat punto'} cost={100} image={undefined} />
                <CarCard name={'Fiat punto'} cost={100} image={undefined} />

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
  filterContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#cececeff',
    justifyContent: "center",
    alignItems: "center",
  },
  filterBarScrollview: {
    width: '100%',
    height: 60,
    gap: 20,
  },
  filterBarRow: {
    justifyContent: "center", 
    alignItems: "center",
    
  },
  filterBtnCell: {
    width: 60,
    height: 40,
    marginLeft: 5,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  filterBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    height: '100%',
    width: 50,
  },
  carScrollView: {
    width: '100%',
    height: '90%',
  },
  carColumn: {
    justifyContent: "center", 
    alignItems: "center",
  }
});