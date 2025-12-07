"use client";

import React, { useState, useEffect } from "react";
import { useCarStore } from "@/store/carStore";
import styles from "./FilterComponent.module.css";

const FilterComponent: React.FC = () => {
  const { applyFilters, fetchCars, filters, brands, fetchBrandsList } =
    useCarStore();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    fetchBrandsList();
  }, [fetchBrandsList]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const finalValue =
      name === "price" || name.includes("mileage")
        ? value
          ? Number(value)
          : null
        : value;
    setLocalFilters((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(localFilters);
    fetchCars(true);
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>Car Brand</label>
        <select
          name="brand"
          value={localFilters.brand || ""}
          onChange={handleFilterChange}
          className={styles.selectInput}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Price / 1h</label>
        <select
          name="price"
          value={localFilters.price || ""}
          onChange={handleFilterChange}
          className={styles.selectInput}
        >
          <option value="">Any Price</option>
          {Array.from({ length: 50 }, (_, i) => (i + 1) * 10).map((price) => (
            <option key={price} value={price}>
              {price}$
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Car Mileage / km</label>
        <div className={styles.mileageGroup}>
          <input
            type="number"
            name="mileageFrom"
            placeholder="From"
            value={localFilters.mileageFrom || ""}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="mileageTo"
            placeholder="To"
            value={localFilters.mileageTo || ""}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </div>
    </form>
  );
};

export default FilterComponent;
