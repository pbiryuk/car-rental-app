export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface Filters {
  brand: string | null;
  price: number | null;
  mileageFrom: number | null;
  mileageTo: number | null;
}

export interface CarApiResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}
