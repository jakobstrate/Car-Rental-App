import { Car } from "./Car";

export type Booking = {
    car: Car;
    rentalStart: Date;
    rentalEnd: Date;
    totalCost: number;
};