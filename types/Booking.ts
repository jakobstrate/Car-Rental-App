import { Car } from "./Car";

export type Booking = {
    car: Car;
    rentalStart: string;
    rentalEnd: string;
    totalCost: number;
};