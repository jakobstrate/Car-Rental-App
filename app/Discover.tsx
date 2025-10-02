import CarCard from "@/Components/CarCard";
import { Car } from "@/types/Car";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
                <FilterScrollviewBtn typeName={"Sedan" } />
                <FilterScrollviewBtn typeName={"SUV"} />
                <FilterScrollviewBtn typeName={"Sportscar"} />
                <FilterScrollviewBtn typeName={"Hatchback"} />
                <FilterScrollviewBtn typeName={"Wagon"} />
                <FilterScrollviewBtn typeName={"Electric"} />
                <FilterScrollviewBtn typeName={"Hybrid"} />
            </ScrollView>
        </View>
    );
    useEffect(() => {
      const loadCars = async () => {
        try {
          const cached = await AsyncStorage.getItem("cars");
          if (cached) {
            setCars(JSON.parse(cached));
          } else {
            const res = await axios.get("http://83.89.249.249:3000/cars");
            setCars(res.data.cars);
            await AsyncStorage.setItem("cars", JSON.stringify(res.data.cars));
          }
        } catch (error) {
          console.error("Failed to load cars from storage",error);
        }
      };
      loadCars();
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
    width: 80,
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
    width: 80,
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
