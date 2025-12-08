"use client";

import React from "react";
import Image from "next/image";
import CarBookingForm from "../CarBookingForm/CarBookingForm";
import { Car } from "@/types/car";
import styles from "./CarDetailsClient.module.css";

interface CarDetailsClientProps {
  initialCar: Car;
}

const CarDetailsClient: React.FC<CarDetailsClientProps> = ({ initialCar }) => {
  const {
    brand,
    model,
    year,
    type,
    img,
    description,
    rentalPrice,
    accessories,
    functionalities,
    rentalConditions,
    address,
    mileage,
    fuelConsumption,
    engineSize,
  } = initialCar;

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const minAgeCondition = rentalConditions?.find((cond) =>
    cond.toLowerCase().includes("minimum ag")
  );
  const minAge = minAgeCondition
    ? minAgeCondition.replace(/Minimum ag:?\s*/i, "").trim()
    : "N/A";

  const shortAddress = address
    ? address.split(",").slice(-2).join(",").trim()
    : "";

  const allAccessories = [...(accessories || []), ...(functionalities || [])];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.imageWrapper}>
            <Image
              src={img}
              alt={`${brand} ${model}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.bookingBlockWrapper}>
            <CarBookingForm
              carName={`${brand} ${model}`}
              rentalPrice={String(rentalPrice)}
              minAge={minAge}
            />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
                {brand} {model}, {year}
              </h1>
              <span className={styles.carId}>
                Id: {String(initialCar.id).slice(0, 4)}
              </span>
            </div>
            <div className={styles.locationMileage}>
              <div className={styles.location}>
                <svg className={styles.icon} width="16" height="16">
                  <use href="/images/icons.svg#icon-Location" />
                </svg>
                <span>{shortAddress}</span>
              </div>
              <div className={styles.mileage}>
                Mileage: {mileage.toLocaleString()} km
              </div>
            </div>
            <div className={styles.price}>${rentalPrice}</div>
            {description && (
              <p className={styles.descriptionLine}>{description}</p>
            )}
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Rental Conditions:</h2>
            <ul className={styles.conditionsList}>
              {rentalConditions?.map((cond, index) => (
                <li key={index}>
                  <svg>
                    <use href="/images/icons.svg#icon-check-circle" />
                  </svg>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Car Specifications:</h2>
            <ul className={styles.specificationsList}>
              <li>
                <svg className={styles.icon} width="16" height="16">
                  <use href="/images/icons.svg#icon-calendar" />
                </svg>
                Year: {year}
              </li>
              <li>
                <svg className={styles.icon} width="16" height="16">
                  <use href="/images/icons.svg#icon-car" />
                </svg>
                Type: {capitalizeFirst(type)}
              </li>
              <li>
                <svg className={styles.icon} width="16" height="16">
                  <use href="/images/icons.svg#icon-fuel-pump" />
                </svg>
                Fuel Consumption: {fuelConsumption} L
              </li>
              <li>
                <svg className={styles.icon} width="16" height="16">
                  <use href="/images/icons.svg#icon-gear" />
                </svg>
                Engine Size: {engineSize}
              </li>
            </ul>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Accessories & Functionalities:
            </h2>
            <ul className={styles.conditionsList}>
              {allAccessories.map((item, index) => (
                <li key={index}>
                  <svg>
                    <use href="/images/icons.svg#icon-check-circle" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsClient;
