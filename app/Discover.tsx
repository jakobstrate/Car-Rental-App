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
            <ScrollView horizontal={true} style={styles.filterBarScrollview} 
            contentContainerStyle={styles.filterBarRow} showsHorizontalScrollIndicator={false}>
                <FilterScrollviewBtn typeName={"Sedan" } />
                <FilterScrollviewBtn typeName={"SUV"} />
                <FilterScrollviewBtn typeName={"Sportscar"} />
                <FilterScrollviewBtn typeName={"Hatchback"} />
                <FilterScrollviewBtn typeName={"Wagon"} />
                

            </ScrollView>
        </View>
    );
    useEffect(() => {
      axios.get('http://83.89.249.249:3000/cars').then( (res) => {setCars(res.data.cars)})
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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },

  filterContainer: {
    width: "100%",
    paddingVertical: 10,
    shadowColor: "#000",
  },
  filterBarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  filterBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterBtnTextActive: {
    color: "#fff",
  },

  // Car Card List
  carScrollView: {
    flex: 1,
    marginTop: 10,
  },
  carColumn: {
    paddingBottom: 120,
    gap: 15,
    alignItems: "center",
  },
});

