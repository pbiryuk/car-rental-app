// src/app/catalog/page.tsx
"use client";

import React, { useEffect } from "react";
import { useCarStore } from "@/store/carStore";

// 👈 ВИКОРИСТАННЯ ВІДНОСНИХ ШЛЯХІВ для виправлення 2307 помилок
import CarCard from "../../components/CarCard/CarCard";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import Loader from "../../components/Loader";

const CatalogPage: React.FC = () => {
  // Отримуємо необхідні дані та дії зі Store
  const {
    cars,
    isLoading,
    error,
    hasMore,
    fetchCars,
    loadMoreCars,
    // 👈 ВИДАЛЕНО filters, щоб виправити помилку @typescript-eslint/no-unused-vars
  } = useCarStore();

  // 1. Початкове завантаження даних при першому рендері
  useEffect(() => {
    // Завантажуємо дані лише якщо список cars порожній
    if (cars.length === 0) {
      fetchCars(true);
    }
  }, [fetchCars, cars.length]);

  // 2. Обробка кліку на "Load More" (вимога ТЗ: Пагінація)
  const handleLoadMore = () => {
    loadMoreCars();
  };

  return (
    <div className="container mx-auto p-4">
      {/* Заголовок сторінки */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Каталог Автомобілів
      </h1>

      {/* Фільтри */}
      <FilterComponent />

      {error && <p className="text-red-500 text-center my-4">{error}</p>}

      {/* Відображення списку автомобілів */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-8">
        {cars.length === 0 && !isLoading && !error ? (
          <p className="col-span-4 text-center text-xl text-gray-500">
            На жаль, за обраними критеріями автомобілі не знайдено.
          </p>
        ) : (
          cars.map((car) => (
            <li key={car.id}>
              <CarCard car={car} />
            </li>
          ))
        )}
      </ul>

      {/* Завантажувач (вимога ТЗ: Loader при асинхронних запитах) */}
      {isLoading && <Loader />}

      {/* Кнопка "Load More" */}
      {!isLoading && hasMore && cars.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="text-blue-600 font-medium hover:text-blue-800 transition duration-150"
            style={{ cursor: "pointer" }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
