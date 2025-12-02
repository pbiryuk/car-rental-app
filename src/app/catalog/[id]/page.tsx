// src/app/catalog/[id]/page.tsx
// Зверніть увагу: 'use client' відсутній, оскільки це Server Component

import { notFound } from "next/navigation";
import { fetchCarById } from "@/services/carApi";
// Примітка: Шлях імпорту Client Component може вимагати коригування
import CarDetailsClient from "../../../components/CarDetailsClient";

interface CarDetailsPageProps {
  params: {
    id: string; // ID автомобіля з маршруту
  };
}

interface MetadataProps {
  params: {
    id: string;
  };
}

// 👈 ДОДАНО: Асинхронна функція для генерації метаданих
// Це допомагає Next.js коректно ідентифікувати сторінку як Server Component і вирішує проблему з params.
export async function generateMetadata({ params }: MetadataProps) {
  const { id } = params;

  try {
    const car = await fetchCarById(id);
    return {
      title: `${car.brand} ${car.model}, ${car.year} | RentalCar`,
      description: car.description,
    };
  } catch {
    return {
      title: "Авто не знайдено | RentalCar",
    };
  }
}

// Компонент є ASYNC Server Component.
const CarDetailsPage = async ({ params }: CarDetailsPageProps) => {
  // Доступ до params.id тепер коректний завдяки generateMetadata та async-функції
  const { id } = params;

  let carData = null;

  try {
    // 1. Отримання даних на сервері
    carData = await fetchCarById(id);
  } catch {
    // 2. Обробка помилки (наприклад, 404)
    notFound();
  }

  // 3. Передача отриманих даних у Client Component для відображення UI
  return <CarDetailsClient initialCar={carData} />;
};

export default CarDetailsPage;
