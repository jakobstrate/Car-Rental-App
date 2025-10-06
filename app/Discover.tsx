import CarCard from "@/Components/CarCard";
import ModalFilter from "@/Components/ModalFilter";
import { Car } from "@/types/Car";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { API } from "@/constants"


export default function Discover() {
    const [cars, setCars] = useState<Car[]>([]);

    const [filters, setFilters] = useState({
        carType: null,
        transmission: null,
        fuelType: null,
        color: null,
        numberOfSeats: null,
    });

    const handleFilterChange = (key: string, value: string | null) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            carType: null,
            transmission: null,
            fuelType: null,
            color: null,
            numberOfSeats: null,
        });
    };


    const FilterBar = () => (
        <View style={styles.filterContainer}>
            <ScrollView horizontal={true} contentContainerStyle={styles.filterBarRow} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.clearBtn} onPress={clearFilters}>
                    <Text>Clear Filters</Text>
                </TouchableOpacity>

                <ModalFilter
                    label={"Car Type"}
                    options={["Sedan", "SUV", "SportsCar", "Hatchback", "Wagon"]}
                    onSelect={(value) => handleFilterChange("carType", value)} />

                <ModalFilter
                    label={"Transmission"}
                    options={["Manual", "Automatic"]}
                    onSelect={(value) => handleFilterChange("transmission", value)} />

                <ModalFilter
                    label={"Fuel"}
                    options={["Petrol", "Diesel", "Electric", "Hybrid"]}
                    onSelect={(value) => handleFilterChange("fuelType", value)} />

                <ModalFilter
                    label={"Color"}
                    options={["White", "Black", "Red", "Silver", "Blue", "Yellow", "Gray", "Orange", "Lime", "Brown", "Green"]}
                    onSelect={(value) => handleFilterChange("color", value)} />

                <ModalFilter
                    label={"Seats"}
                    options={["2", "4", "5", "7"]}
                    onSelect={(value) => handleFilterChange("numberOfSeats", value)} />
            </ScrollView>
        </View>
    );

    useEffect(() => {
        const loadCars = async () => {
            try {
                const cached = await AsyncStorage.getItem("cars");
                let loadedCars;
                if (cached) {
                    loadedCars = JSON.parse(cached);
                } else {
                    const res = await axios.get(`${API}/cars`);
                    loadedCars = res.data.cars;
                    await AsyncStorage.setItem("cars", JSON.stringify(loadedCars));
                }

                // Work around so that extras is always loaded as an array.
                // CarDetails fails if extras are not in an array.
                loadedCars = loadedCars.map((c) => ({
                    ...c,
                    extras: Array.isArray(c.extras)
                        ? c.extras
                        : JSON.parse(c.extras.replace(/'/g, '"')), // convert string to array
                }));

                setCars(loadedCars);
            } catch (error) {
                console.error("Failed to load cars from storage", error);
            }
        };

        loadCars();
    }, []);

    const filteredCars = cars.filter((car) => {
        return (
            (!filters.carType || car.carType === filters.carType) &&
            (!filters.transmission || car.transmission === filters.transmission) &&
            (!filters.fuelType || car.fuelType === filters.fuelType) &&
            (!filters.color || car.color === filters.color) &&
            (!filters.numberOfSeats || car.numberOfSeats?.toString() === filters.numberOfSeats)
        );
    });


    return (
        <View
            style={styles.container}
        >
            <FilterBar />
            <ScrollView horizontal={false} style={styles.carScrollView}
                contentContainerStyle={styles.carColumn}>
                {filteredCars.map((car) => (
                    <CarCard
                        key={car.id}
                        name={car.brand + "" + car.modelName}
                        cost={car.rentPerHour}
                        image={car.image}
                        car={car} />
                ))}
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
    },

    clearBtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
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

