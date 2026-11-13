import type { Vehicle } from "@/types/vehicle";

// Demonstration inventory. Replace with confirmed stock before publishing.
export const vehicles: Vehicle[] = [
  {
    id: "em-001", slug: "porsche-panamera-4", brand: "Porsche", model: "Panamera 4", year: 2022,
    price: 205000000, mileage: 18500, fuelType: "Petrol", transmission: "Automatic", condition: "Foreign Used",
    engineCapacity: "3.0 L", horsepower: 330, exteriorColour: "Jet Black", interiorColour: "Black leather",
    location: "Location to be confirmed",
    description: "A sample listing for an executive sports saloon, balancing a composed cabin with a focused drive. Confirm the exact vehicle history, specification and availability with the dealership.",
    features: ["Panoramic roof", "Adaptive air suspension", "Leather interior", "Navigation system", "Parking sensors"],
    images: ["/images/vehicles/porsche-panamera.jpg", "/images/vehicles/chevrolet-camaro-blue.jpg", "/images/vehicles/audi-a5-orange.jpg"],
    featured: true, status: "available",
  },
  {
    id: "em-002", slug: "mercedes-amg-gt-s", brand: "Mercedes-Benz", model: "AMG GT S", year: 2022,
    price: 145000000, mileage: 20400, fuelType: "Petrol", transmission: "Automatic", condition: "Foreign Used",
    engineCapacity: "4.0 L", horsepower: 515, exteriorColour: "Selenite Grey", interiorColour: "Black leather",
    location: "Location to be confirmed",
    description: "A sample performance coupe entry with a low profile and a purposeful stance. Vehicle-specific imagery and all specification details should be confirmed before publication.",
    features: ["AMG performance seats", "Performance exhaust", "LED headlights", "Navigation system", "Parking sensors"],
    images: ["/images/vehicles/mercedes-amg.jpg", "/images/vehicles/mercedes-amg-gt-yellow.jpg", "/images/vehicles/mercedes-amg-gt-red.jpg"],
    featured: true, status: "available",
  },
  {
    id: "em-003", slug: "bmw-4-series-coupe", brand: "BMW", model: "4 Series Coupe", year: 2021,
    price: 98000000, mileage: 31000, fuelType: "Petrol", transmission: "Automatic", condition: "Foreign Used",
    engineCapacity: "3.0 L", horsepower: 382, exteriorColour: "Portimao Blue", interiorColour: "Black leather",
    location: "Location to be confirmed",
    description: "A demonstration listing for a premium two-door coupe. Confirm the actual trim, service history, equipment and current availability before purchase.",
    features: ["M Sport styling", "Sport seats", "Rear-view camera", "Navigation system", "Dual-zone climate control"],
    images: ["/images/vehicles/bmw-4-series.jpg", "/images/vehicles/chevrolet-camaro-blue.jpg", "/images/vehicles/mercedes-amg-gt-red.jpg"],
    featured: true, status: "available",
  },
  {
    id: "em-004", slug: "ford-expedition-limited", brand: "Ford", model: "Expedition Limited", year: 2022,
    price: 115000000, mileage: 25200, fuelType: "Petrol", transmission: "Automatic", condition: "Nigerian Used",
    engineCapacity: "3.5 L", horsepower: 400, exteriorColour: "Star White", interiorColour: "Ebony leather",
    location: "Location to be confirmed",
    description: "A sample large-SUV entry with a spacious cabin and three-row layout. Confirm the precise configuration, condition, service history and availability with the dealership.",
    features: ["Three-row seating", "Four-wheel drive", "Power tailgate", "Rear camera", "Climate control"],
    images: ["/images/vehicles/ford-expedition.jpg", "/images/vehicles/honda-cr-v.jpg"],
    featured: false, status: "available",
  },
  {
    id: "em-005", slug: "ferrari-sf90-stradale", brand: "Ferrari", model: "SF90 Stradale", year: 2021,
    price: 720000000, mileage: 12400, fuelType: "Hybrid", transmission: "Automatic", condition: "Foreign Used",
    engineCapacity: "4.0 L", horsepower: 986, exteriorColour: "Rosso Corsa", interiorColour: "Black leather",
    location: "Location to be confirmed",
    description: "A demonstration listing for a hybrid supercar. Vehicle photographs are illustrative placeholders and do not confirm the exact car on offer.",
    features: ["Plug-in hybrid powertrain", "All-wheel drive", "Carbon-fibre trim", "Digital cockpit", "Performance drive modes"],
    images: ["/images/vehicles/ferrari-sf90-1.jpg", "/images/vehicles/ferrari-sf90-2.jpg"],
    featured: false, status: "available",
  },
  {
    id: "em-006", slug: "audi-r8-v10", brand: "Audi", model: "R8 V10", year: 2022,
    price: 190000000, mileage: 13200, fuelType: "Petrol", transmission: "Automatic", condition: "Foreign Used",
    engineCapacity: "5.2 L", horsepower: 562, exteriorColour: "Daytona Grey", interiorColour: "Black leather",
    location: "Location to be confirmed",
    description: "A sample high-performance coupe listing with a naturally aspirated V10 configuration. Confirm the exact variant, history, specifications and availability with the dealership.",
    features: ["Quattro all-wheel drive", "Virtual cockpit", "Sport exhaust", "Leather sport seats", "Parking sensors"],
    images: ["/images/vehicles/audi-r8.jpg", "/images/vehicles/audi-a5-orange.jpg"],
    featured: false, status: "available",
  },
  {
    id: "em-007", slug: "audi-a5-coupe", brand: "Audi", model: "A5 Coupe", year: 2021,
    price: 65000000, mileage: 28100, fuelType: "Petrol", transmission: "Automatic", condition: "Foreign Used",
    engineCapacity: "2.0 L", horsepower: 261, exteriorColour: "Tango Red", interiorColour: "Black leather",
    location: "Location to be confirmed",
    description: "A demonstration entry for a refined everyday coupe. Confirm the exact model-year specification and equipment before publication.",
    features: ["LED headlights", "Power front seats", "Rear camera", "Bluetooth audio", "Cruise control"],
    images: ["/images/vehicles/audi-a5-orange.jpg", "/images/vehicles/audi-r8.jpg"],
    featured: false, status: "available",
  },
  {
    id: "em-008", slug: "lamborghini-huracan-evo", brand: "Lamborghini", model: "Huracán EVO", year: 2023,
    price: 450000000, mileage: 8500, fuelType: "Petrol", transmission: "Automatic", condition: "Foreign Used",
    engineCapacity: "5.2 L", horsepower: 631, exteriorColour: "Bianco Icarus", interiorColour: "Nero Ade",
    location: "Location to be confirmed",
    description: "An illustrative supercar listing for the sample catalog. Confirm vehicle identity, condition, ownership records and current availability before making a purchase decision.",
    features: ["Naturally aspirated V10", "All-wheel drive", "Carbon-ceramic brakes", "Digital cockpit", "Drive mode selector"],
    images: ["/images/vehicles/lamborghini-huracan.jpg", "/images/vehicles/ferrari-sf90-1.jpg"],
    featured: false, status: "available",
  },
];

export const availableVehicles = vehicles.filter((vehicle) => vehicle.status === "available");
export const featuredVehicles = availableVehicles.filter((vehicle) => vehicle.featured);
export const getVehicleBySlug = (slug: string) => availableVehicles.find((vehicle) => vehicle.slug === slug);
