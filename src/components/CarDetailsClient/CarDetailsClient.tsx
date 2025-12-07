"use client";

import React from "react";
import Image from "next/image";
import { Car } from "@/types/car";
import CarBookingForm from "../CarBookingForm/CarBookingForm";
import styles from "./CarDetailsClient.module.css";

interface CarDetailsClientProps {
  initialCar: Car;
}

const formatMileage = (mileage: number) => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const CarDetailsClient: React.FC<CarDetailsClientProps> = ({ initialCar }) => {
  const car = initialCar;
  const {
    brand,
    model,
    year,
    img,
    description,
    rentalPrice,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
    rentalConditions,
    mileage,
    address,
  } = car;

  const minAgeCondition = rentalConditions.find((cond) =>
    cond.includes("Minimum ag:")
  );
  const minAge = minAgeCondition
    ? minAgeCondition.replace("Minimum ag: ", "").trim()
    : "N/A";

  const allDetails = [...rentalConditions, ...accessories, ...functionalities];

  const detailsList = [
    `Fuel Consumption: ${fuelConsumption} L/100km`,
    `Engine Size: ${engineSize}`,
    `Mileage: ${formatMileage(mileage)} km`,
    `Year: ${year}`,
    `Address: ${address}`,
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {brand} {model}, {year}
      </h1>

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

          <p className={styles.description}>{description}</p>

          <div className={styles.characteristics}>
            <h2>Технічні Характеристики</h2>
            <ul>
              {detailsList.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className={styles.conditions}>
            <h2>Умови Оренди та Додаткові Опції</h2>
            <div className={styles.tags}>
              {allDetails.map((item, index) => (
                <span key={index} className={styles.tag}>
                  {item.includes("Minimum ag:") ? `Min Age: ${minAge}` : item}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.rentalPrice}>
            Вартість оренди: <span>{rentalPrice}$ / hour</span>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <h2>Забронювати {model}</h2>
          <CarBookingForm
            carName={`${brand} ${model}`}
            rentalPrice={rentalPrice}
            minAge={minAge}
          />
        </div>
      </div>
    </div>
  );
};

export default CarDetailsClient;
