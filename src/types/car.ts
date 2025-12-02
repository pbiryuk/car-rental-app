// src/types/car.ts (ОНОВЛЕНА ВЕРСІЯ)

export interface Car {
  id: string; // Змінено на string (UUID)
  year: number;
  brand: string; // Змінено з 'make' на 'brand'
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string; // Наприклад, "40" (string)
  rentalCompany: string;
  address: string;
  rentalConditions: string[]; // Нове поле
  mileage: number;
}

export interface Filters {
  brand: string | null;
  price: number | null; // Максимальна ціна (можливо, string)
  mileageFrom: number | null;
  mileageTo: number | null;
}

// Інтерфейс для відповіді від API
export interface CarApiResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}
