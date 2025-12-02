// src/store/carStore.ts
import { create } from "zustand";
import { Car, Filters } from "@/types/car";
// Імпортуємо обидві функції сервісу
import {
  fetchCarsFromApi,
  fetchBrands,
  CARS_PER_PAGE,
} from "@/services/carApi";

interface CarState {
  // Дані
  cars: Car[];
  favorites: Car[];
  filters: Filters;
  page: number;
  hasMore: boolean;
  brands: string[]; // 👈 НОВЕ ПОЛЕ

  // Стан UI
  isLoading: boolean;
  error: string | null;

  // Дії (Actions)
  fetchCars: (newSearch: boolean) => Promise<void>;
  applyFilters: (newFilters: Partial<Filters>) => void;
  loadMoreCars: () => Promise<void>;
  toggleFavorite: (car: Car) => void;
  fetchBrandsList: () => Promise<void>; // 👈 НОВА ДІЯ
}

// Функція для отримання обраних з localStorage
const getInitialFavorites = (): Car[] => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Помилка читання localStorage", e);
      return [];
    }
  }
  return [];
};

export const useCarStore = create<CarState>((set, get) => ({
  // Ініціалізація стану
  cars: [],
  favorites: getInitialFavorites(),
  filters: { brand: null, price: null, mileageFrom: null, mileageTo: null },
  page: 1,
  hasMore: true,
  brands: [], // Ініціалізація
  isLoading: false,
  error: null,

  // --- Actions ---

  // 1. Зміна фільтрів
  applyFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1,
      cars: [],
      hasMore: true,
    }));
  },

  // 2. Додати/видалити з обраних (без змін)
  toggleFavorite: (car) => {
    const currentFavorites = get().favorites;
    const isFavorite = currentFavorites.some((fav) => fav.id === car.id);

    const newFavorites = isFavorite
      ? currentFavorites.filter((fav) => fav.id !== car.id)
      : [...currentFavorites, car];

    try {
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Помилка запису в localStorage", e);
    }

    set({ favorites: newFavorites });
  },

  // 3. Завантажити більше (без змін)
  loadMoreCars: async () => {
    if (!get().hasMore || get().isLoading) return;

    set({ page: get().page + 1 });
    await get().fetchCars(false);
  },

  // 4. Функція для отримання авто з API (без змін, окрім імпорту)
  fetchCars: async (newSearch: boolean = false) => {
    const { page, filters, isLoading } = get();

    if (isLoading && !newSearch) return;

    set({ isLoading: true, error: null });

    try {
      const currentPage = newSearch ? 1 : page;

      const { cars: newCars, hasMore: newHasMore } = await fetchCarsFromApi({
        page: currentPage,
        limit: CARS_PER_PAGE,
        filters: filters,
      });

      set((state) => ({
        cars: newSearch ? newCars : [...state.cars, ...newCars],
        page: currentPage,
        hasMore: newHasMore,
        isLoading: false,
      }));
    } catch (error) {
      if (!newSearch && get().page > 1) {
        set((state) => ({ page: state.page - 1 }));
      }
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Невідома помилка завантаження.",
      });
    }
  },

  // 5. Дія для отримання списку брендів (НОВА)
  fetchBrandsList: async () => {
    if (get().brands.length > 0) return; // Завантажуємо лише один раз
    // Примітка: Індикатор isLoading не використовуємо, щоб не блокувати головний спінер
    // set({ isLoading: true, error: null });

    try {
      const brandsList = await fetchBrands();
      set({ brands: brandsList });
    } catch (error) {
      console.error("Помилка при завантаженні брендів:", error);
      // set({ error: 'Помилка завантаження брендів.' });
    }
  },
}));
