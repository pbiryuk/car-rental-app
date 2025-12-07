// src/app/catalog/page.tsx
"use client";

import React, { useEffect } from "react";
import { useCarStore } from "@/store/carStore";
import CarCard from "../../components/CarCard/CarCard";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import Loader from "../../components/Loader/Loader";

// 👈 Підключаємо CSS Module
import styles from "./catalog.module.css";

const CatalogPage: React.FC = () => {
  const { cars, isLoading, error, hasMore, fetchCars, loadMoreCars } =
    useCarStore();

  useEffect(() => {
    if (cars.length === 0) {
      fetchCars(true);
    }
  }, [fetchCars, cars.length]);

  const handleLoadMore = () => {
    loadMoreCars();
  };

  return (
    <div className={styles.catalogPage}>
      <h1 className={styles.catalogTitle}>Каталог Автомобілів</h1>

      <FilterComponent />

      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.catalogGrid}>
        {cars.length === 0 && !isLoading && !error ? (
          <p className={styles.noCars}>
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

      {isLoading && <Loader />}

      {!isLoading && hasMore && cars.length > 0 && (
        <div className={styles.loadMoreWrapper}>
          <button
            onClick={handleLoadMore}
            className={styles.loadMoreButton}
            type="button"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
