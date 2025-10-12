import CarCard from "@/Components/CarCard";
import ModalFilter from "@/Components/ModalFilter";
import { useCar } from "@/context/CarContext";
import { useRef, useState } from "react";
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Discover() {
    const { cars } = useCar();

    const [filters, setFilters] = useState({
        carType: null,
        transmission: null,
        fuelType: null,
        color: null,
        numberOfSeats: null,
    });

    const scrollY = useRef(new Animated.Value(0)).current;

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
        <View style={filterBarStyles.filterContainer}>
            <ScrollView horizontal={true} contentContainerStyle={filterBarStyles.filterBarRow} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={filterBarStyles.clearBtn} onPress={clearFilters}>
                    <Text style={filterBarStyles.clearBtnTxt}>Clear Filters</Text>
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
    <View style={styles.container}>
      <FilterBar />
      <View style={styles.scrollArea}>
        <Animated.View
          style={[
            styles.circle,
            styles.topRightCircle,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, height * 4],
                    outputRange: [0, -80],
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
                    inputRange: [0, height * 4],
                    outputRange: [120, 20],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.ScrollView
          style={styles.carScrollView}
          contentContainerStyle={styles.carColumn}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              name={`${car.brand} ${car.modelName}`}
              cost={car.rentPerHour}
              image={car.image}
              car={car}
            />
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
  },
  scrollArea: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
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
  carScrollView: {
    flex: 1,
  },
  carColumn: {
    paddingBottom: 120,
    gap: 15,
    alignItems: "center",
    paddingTop: 20,
  },
});



const filterBarStyles = StyleSheet.create({
  filterContainer: {
    paddingTop: 15,
    position: 'absolute',
    backgroundColor: "#ffffffff",
    zIndex: 10,
    elevation: 5,
  },
  filterBarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  clearBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    boxShadow: "0 -2px 0px #0000000a, 0 3px 2px rgba(0,0,0,0.25)",
  },
  clearBtnTxt: {
    color: '#000000ff',
    fontWeight: '600'
  }
});
