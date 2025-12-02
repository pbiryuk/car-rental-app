// src/components/FilterComponent.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useCarStore } from "@/store/carStore";

const FilterComponent: React.FC = () => {
  const {
    applyFilters,
    fetchCars,
    filters,
    brands, // 👈 отримуємо список брендів
    fetchBrandsList, // 👈 отримуємо дію завантаження брендів
  } = useCarStore();

  const [localFilters, setLocalFilters] = useState(filters);

  // 1. Завантаження брендів при монтуванні компонента
  useEffect(() => {
    fetchBrandsList();
  }, [fetchBrandsList]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    // Обробка числових полів
    const finalValue =
      name === "price" || name.includes("mileage")
        ? value
          ? Number(value)
          : null
        : value;

    setLocalFilters((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Оновлюємо глобальний стан фільтрів (скидає cars та page=1)
    applyFilters(localFilters);

    // 2. Запускаємо новий пошук з новим фільтром
    fetchCars(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg justify-center lg:justify-start"
    >
      {/* Фільтр по Бренду (використовує динамічний список brands) */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Car Brand</label>
        <select
          name="brand"
          value={localFilters.brand || ""}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg min-w-[200px]"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Фільтр по Ціні (за годину) */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Price / 1h</label>
        <select
          name="price"
          value={localFilters.price || ""}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg min-w-[150px]"
        >
          <option value="">Any Price</option>
          {/* Створення списку цін з кроком $10 */}
          {Array.from({ length: 50 }, (_, i) => (i + 1) * 10).map((price) => (
            <option key={price} value={price}>
              {price}$
            </option>
          ))}
        </select>
      </div>

      {/* Фільтр по Пробігу (від/до) */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Car Mileage / km</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="mileageFrom"
            placeholder="From"
            value={localFilters.mileageFrom || ""}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg w-28"
          />
          <input
            type="number"
            name="mileageTo"
            placeholder="To"
            value={localFilters.mileageTo || ""}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg w-28"
          />
        </div>
      </div>

      {/* Кнопка Пошуку */}
      <div className="flex items-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          style={{ cursor: "pointer" }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default FilterComponent;
