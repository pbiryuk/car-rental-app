// src/components/CarDetailsClient.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Car } from "@/types/car";
import CarBookingForm from "./CarBookingForm/CarBookingForm";
// Примітка: Loader не потрібен, оскільки завантаження відбувається на сервері

interface CarDetailsClientProps {
  initialCar: Car;
}

// Функція для форматування пробігу
const formatMileage = (mileage: number) => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const CarDetailsClient: React.FC<CarDetailsClientProps> = ({ initialCar }) => {
  // Дані вже завантажені і передані як prop
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
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        {brand} {model}, {year}
      </h1>

      <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-10 flex flex-col lg:flex-row gap-10">
        {/* Ліва Колонка: Деталі та Опис */}
        <div className="lg:w-2/3">
          <div className="relative w-full mb-6 rounded-lg overflow-hidden max-h-[500px] h-[300px] lg:h-[400px]">
            <Image
              src={img}
              alt={`${brand} ${model}`}
              fill
              sizes="66vw"
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

          {/* Характеристики */}
          <div className="mb-6 border-t pt-4">
            <h2 className="text-2xl font-semibold mb-3">
              Технічні Характеристики
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm text-gray-600">
              {detailsList.map((detail, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded-md">
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Умови Оренди */}
          <div className="mb-6 border-t pt-4">
            <h2 className="text-2xl font-semibold mb-3">
              Умови Оренди та Додаткові Опції
            </h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {allDetails.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium"
                >
                  {item.includes("Minimum ag:") ? `Min Age: ${minAge}` : item}
                </span>
              ))}
            </div>
          </div>

          <div className="text-xl font-bold mt-4">
            Вартість оренди:{" "}
            <span className="text-green-600">{rentalPrice}$ / hour</span>
          </div>
        </div>

        {/* Права Колонка: Форма Бронювання */}
        <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-5 text-center">
            Забронювати {model}
          </h2>
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
