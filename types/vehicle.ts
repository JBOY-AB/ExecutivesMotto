export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";
export type Transmission = "Automatic" | "Manual";
export type VehicleCondition = "Foreign Used" | "Nigerian Used" | "Brand New";
export type VehicleStatus = "available" | "sold";

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  condition: VehicleCondition;
  engineCapacity?: string;
  horsepower?: number;
  exteriorColour?: string;
  interiorColour?: string;
  location?: string;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  status: VehicleStatus;
}
