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

  const {
    brand,
    model,
    year,
    img,
    rentalPrice,
    mileage,
    address,
    rentalCompany,
    type,
  } = car;

  return (
    <div className={styles.card}>
      <button
        onClick={() => toggleFavorite(car)}
        className={styles.favoriteButton}
      >
        <svg width="16" height="16">
          <use
            href={`/images/icons.svg#${
              isFavorite ? "icon-Active" : "icon-Default"
            }`}
          />
        </svg>
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
            {brand} <span className={styles.model}>{model}</span>, {year}
          </h2>
          <p className={styles.price}>${rentalPrice}</p>
        </div>

        <div className={`${styles.detailsRow} ${styles.detailsRowTop}`}>
          <span className={styles.detailItem}>
            {address.split(",")[1].trim()}
          </span>
          <span className={styles.detailItem}>
            {address.split(",")[2].trim()}
          </span>
          <span className={styles.detailItem}>{rentalCompany}</span>
        </div>

        <div className={styles.detailsRow}>
          <span className={styles.detailItem}>{type}</span>
          <span className={styles.detailItem}>{formatMileage(mileage)} km</span>
        </div>

        <Link href={`/catalog/${car.id}`}>
          <button className={styles.readMoreButton}>Read more</button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
