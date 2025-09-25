import { ImageSourcePropType } from "react-native";

export type Car = {
  modelName: string;
  modelYear: number;
  brand: string;
  carType: string;
  rentPerHour: number;
  transmission: string;
  fuelType: string;
  mileage: string;
  image: ImageSourcePropType;
  color: string;
  description: string;
  numberOfSeats: number;
  available: boolean;
};