import CarCard from "@/Components/CarCard";
import axios from "axios"
import { Car } from "@/types/Car"
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

export default function Discover() {
    const [cars, setCars] = useState<Car[]>([]);
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
                
                <FilterScrollviewBtn typeName={"SUV" } />
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
    useEffect(() => {
      axios.get('http://localhost:3000/cars').then( (res) => {setCars(res.data.cars)})
    }, [])
    

    return (
        <View
            style={styles.container}
        >
            <FilterBar/>
            <ScrollView horizontal={false} style={styles.carScrollView}
            contentContainerStyle={styles.carColumn}>
                {cars?.map( car => [
                  <CarCard key={car.id} name={car.brand +  " " + car.modelName} cost={car.rentPerHour} image={car.image}></CarCard>
                ])}
                <Text>Cars: {JSON.stringify(cars)}</Text>
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
