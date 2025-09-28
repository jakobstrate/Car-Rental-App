import { Booking } from "@/types/Booking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type BookingContextType = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (booking: Booking) => void;
  clearBookings: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider ({ children } : {children : ReactNode}) {
  const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const storedBookings = await AsyncStorage.getItem("bookings");
                if (storedBookings) {
                    setBookings(JSON.parse(storedBookings));
                }
            } catch (error) {
                console.error("Failed to load bookings from storage", error);
            }
        };
        loadBookings();
    }, []);

    useEffect(() => {
        const saveBookings = async () => {
            try {
                await AsyncStorage.setItem("bookings", JSON.stringify(bookings));
            } catch (error) {
                console.error("Failed to save bookings to storage", error);
            }
        };
        saveBookings();
    }, [bookings]);

    const addBooking = (booking: Booking) => {
        setBookings((prevBookings) => [...prevBookings, booking]);
    };

    const removeBooking = (booking: Booking) => {
        setBookings((prevBookings) => prevBookings.filter(b => b !== booking));
    }

    const clearBookings = () => {
        setBookings([]);
    }

    return (
        <BookingContext.Provider value={{ bookings, addBooking, removeBooking, clearBookings }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBookings() {
    const context = useContext(BookingContext); 
    if (context === undefined) {
        throw new Error("useBookings must be used within a BookingProvider");
    }
    return context;
}