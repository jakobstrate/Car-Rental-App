import { Booking } from "./Booking";
import { Car } from "./Car";


export type RootStackParamList = {
  Discover: undefined;
  CarDetails: { car: Car };
  Home: undefined;
  MyRentals: undefined;
  BookingDetails: { booking: Booking };
};