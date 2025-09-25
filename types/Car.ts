import { ImageSourcePropType } from "react-native";

export type Car = {
  brand: string;
  modelName: string;
  modelYear: number;
  rentPerHour: number;
  image: ImageSourcePropType;
  color: string;
  description: string;
  carType: string;
  transmission: string;
  fuelType: string;
  mileage: string;
  numberOfSeats: number;
  isAvailable: boolean;
};