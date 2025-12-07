"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCarStore } from "@/store/carStore";
import { Car } from "@/types/car";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

const formatMileage = (mileage: number) => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const toggleFavorite = useCarStore((state) => state.toggleFavorite);
  const favorites = useCarStore((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const { brand, model, year, img, rentalPrice, mileage, address } = car;

  return (
    <div className={styles.card}>
      <button
        onClick={() => toggleFavorite(car)}
        className={`${styles.favoriteButton} ${
          isFavorite ? "isFavorite" : "notFavorite"
        }`}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <div className={styles.imageWrapper}>
        <Image
          src={img}
          alt={`${brand} ${model}`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.titleLine}>
          <h2 className={styles.title}>
            {brand} {model}
          </h2>
          <p className={styles.price}>{rentalPrice}</p>
        </div>

        <div className={styles.details}>
          <span className={styles.detailItem}>Year: {year}</span>
          <span className={styles.detailItem}>
            City: {address.split(",")[0].trim()}
          </span>
          <span className={styles.detailItem}>
            Mileage: {formatMileage(mileage)} km
          </span>
        </div>

        <Link href={`/catalog/${car.id}`}>
          <button className={styles.readMoreButton}>Read more</button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
