import { create } from "zustand";
import { Car, Filters } from "@/types/car";
import {
  fetchCarsFromApi,
  fetchBrands,
  CARS_PER_PAGE,
} from "@/services/carApi";

interface CarState {
  cars: Car[];
  favorites: Car[];
  filters: Filters;
  page: number;
  hasMore: boolean;
  brands: string[];

  isLoading: boolean;
  error: string | null;

  fetchCars: (newSearch: boolean) => Promise<void>;
  applyFilters: (newFilters: Partial<Filters>) => void;
  loadMoreCars: () => Promise<void>;
  toggleFavorite: (car: Car) => void;
  fetchBrandsList: () => Promise<void>;
}

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
  cars: [],
  favorites: getInitialFavorites(),
  filters: { brand: null, price: null, mileageFrom: null, mileageTo: null },
  page: 1,
  hasMore: true,
  brands: [],
  isLoading: false,
  error: null,

  applyFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1,
      cars: [],
      hasMore: true,
    }));
  },

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

  loadMoreCars: async () => {
    if (!get().hasMore || get().isLoading) return;

    set({ page: get().page + 1 });
    await get().fetchCars(false);
  },

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

  fetchBrandsList: async () => {
    if (get().brands.length > 0) return; 

    try {
      const brandsList = await fetchBrands();
      set({ brands: brandsList });
    } catch (error) {
      console.error("Помилка при завантаженні брендів:", error);
    }
  },
}));
