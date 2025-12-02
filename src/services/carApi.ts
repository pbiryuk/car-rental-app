// src/services/carApi.ts
import axios from "axios";
import { Car, Filters, CarApiResponse } from "@/types/car";

const BASE_URL = "https://car-rental-api.goit.global";
export const CARS_PER_PAGE = 12;

// 👈 НОВИЙ ІНТЕРФЕЙС для уникнення 'any'
interface CarSearchParams {
  page: string;
  limit: string;
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
}

interface FetchCarsParams {
  page: number;
  limit: number;
  filters: Filters;
}

/**
 * Функція для отримання списку автомобілів з API з підтримкою фільтрації та пагінації.
 */
export const fetchCarsFromApi = async ({
  page,
  limit,
  filters,
}: FetchCarsParams): Promise<{ cars: Car[]; hasMore: boolean }> => {
  try {
    // 👈 ВИКОРИСТАННЯ CarSearchParams
    const params: CarSearchParams = {
      page: page.toString(),
      limit: limit.toString(),

      ...(filters.brand && { brand: filters.brand }),
      ...(filters.price && { rentalPrice: filters.price.toString() }),
      ...(filters.mileageFrom && {
        minMileage: filters.mileageFrom.toString(),
      }),
      ...(filters.mileageTo && { maxMileage: filters.mileageTo.toString() }),
    };

    const response = await axios.get<CarApiResponse>(`${BASE_URL}/cars`, {
      params: params,
    });

    const data = response.data;
    const hasMore = data.cars.length === limit;

    return {
      cars: data.cars,
      hasMore: hasMore,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Помилка API (список авто):",
        error.response?.data || error.message
      );
    } else {
      console.error("Невідома помилка:", error);
    }
    throw new Error(
      "Не вдалося завантажити автомобілі. Перевірте з'єднання та API."
    );
  }
};

/**
 * Функція для отримання деталей одного автомобіля за ID (/cars/{id})
 */
export const fetchCarById = async (id: string): Promise<Car> => {
  try {
    const response = await axios.get<Car>(`${BASE_URL}/cars/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`Автомобіль з ID ${id} не знайдено (404).`);
      }
      console.error(
        "Помилка API (деталі авто):",
        error.response?.data || error.message
      );
    } else {
      console.error("Невідома помилка:", error);
    }
    throw new Error("Не вдалося завантажити деталі автомобіля.");
  }
};

/**
 * Функція для отримання списку доступних брендів (/brands)
 */
export const fetchBrands = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${BASE_URL}/brands`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Помилка API при запиті брендів:", error.message);
    } else {
      console.error("Невідома помилка:", error);
    }
    throw new Error("Не вдалося завантажити список брендів.");
  }
};
