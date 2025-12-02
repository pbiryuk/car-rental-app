// src/components/CarCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; // 👈 ІМПОРТ NEXT.JS IMAGE
import { useCarStore } from "@/store/carStore";
import { Car } from "@/types/car";

interface CarCardProps {
  car: Car;
}

// Функція для форматування пробігу (вимога ТЗ: 5000 -> 5 000 km)
const formatMileage = (mileage: number) => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const toggleFavorite = useCarStore((state) => state.toggleFavorite);
  const favorites = useCarStore((state) => state.favorites);

  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const { brand, model, year, img, rentalPrice, mileage, address } = car;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
      {/* Кнопка "Обране" */}
      <button
        onClick={() => toggleFavorite(car)}
        className={`absolute top-4 right-4 p-2 rounded-full z-10 ${
          isFavorite ? "text-red-500" : "text-gray-300 hover:text-red-400"
        }`}
        style={{ cursor: "pointer" }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Зображення (ОНОВЛЕНО НА <Image />) */}
      <div className="relative h-48">
        <Image
          src={img}
          alt={`${brand} ${model}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
          priority={true}
          className="rounded-t-xl"
        />
      </div>

      <div className="p-4 flex-grow flex flex-col">
        {/* Заголовок */}
        <h2 className="text-xl font-semibold mb-2">
          {brand} {model}
        </h2>

        {/* Ціна */}
        <p className="text-lg font-bold text-blue-600 mb-3">{rentalPrice}</p>

        {/* Деталі */}
        <div className="text-sm text-gray-500 space-y-1 mb-4 flex-grow">
          <p>Рік: {year}</p>
          <p>Місто: {address.split(",")[0].trim()}</p>
          <p>Пробіг: {formatMileage(mileage)} km</p>
        </div>

        {/* Кнопка "Read more" */}
        <Link href={`/catalog/${car.id}`} className="block mt-auto">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            style={{ cursor: "pointer" }}
          >
            Read more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
