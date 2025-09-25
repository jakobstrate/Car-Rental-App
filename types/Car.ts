import { ImageSourcePropType } from "react-native";

export type Car = {
  brand: string;
  modelName: string;
  modelYear: number;
  rentPerHour: number;
  image: ImageSourcePropType;
  color: string;
  description: string;
  carType: CarType;
  transmission: TransmissionType;
  fuelType: FuelType;
  mileage: string;
  numberOfSeats: number;
  extras: string[];
  isAvailable: boolean;
};

export enum CarType {
  SUV,
  Sedan,
  Hatchback,
  Coupe,
  Convertible,
  Truck,
  Van,
  Wagon,
  SportsCar,
}

export enum TransmissionType { 
  Automatic,
  Manual,
  SemiAutomatic,
}

export enum FuelType {
  Petrol,
  Diesel,
  Electric,
  Hybrid,
}