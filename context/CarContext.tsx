import { API } from "@/constants";
import { Car } from "@/types/Car";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface CarContextType {
    cars: Car[];
    getRandomCar: (list?: Car[]) => Car;
}

const CarContext = createContext<CarContextType | undefined>(undefined)

export function CarProvider({ children }: { children: React.ReactNode }) {
    const [cars, setCars] = useState<Car[]>([]);

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
                    // convert string to array
                    : JSON.parse(c.extras.replace(/'/g, '"')),
            }));

            setCars(loadedCars);
        } catch (error) {
            console.error("Failed to load cars from storage", error);
        }
    };

    useEffect(() => {
        loadCars();
    }, []);


    // Since list is optional we check if it is present and is valid.
    // If so we use the given list, else we default to the internal list of all cars.
    const getRandomCar = (list?: Car[]) => {
        const dataSource = list && list.length > 0 ? list : cars;

        const randomIndex = Math.floor(Math.random() * dataSource.length);
        return dataSource[randomIndex];
    }

    const value = { cars, getRandomCar };

    return (
        <CarContext.Provider value={value}>
            {children}
        </CarContext.Provider>
    );
}

export function useCar() {
    const context = useContext(CarContext);

    if (context === undefined) {
        throw new Error("userCar must be called within a CarProvider");
    }

    return context;
}


