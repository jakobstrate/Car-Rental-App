import { ImageSourcePropType } from "react-native";

export type Car = {
  id: number;
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
  SUV='SUV',
  Sedan='Sedan',
  Hatchback='Hatchback',
  Coupe='Coupe',
  Convertible='Covertible',
  Truck='Truck',
  Van='Van',
  Wagon='Wagon',
  SportsCar='Sports Car',
}

export enum TransmissionType { 
  Automatic='AUTOMATIC',
  Manual='MANUAL',
  SemiAutomatic='SEMI-AUTOMATIC',
}

export enum FuelType {
  Petrol='PETROL',
  Diesel='DIESEL',
  Electric='ELECTRIC',
  Hybrid='HYBRID',
}