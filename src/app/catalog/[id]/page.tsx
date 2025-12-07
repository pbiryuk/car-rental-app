// src/app/catalog/[id]/page.tsx
import CarDetailsClient from "@/components/CarDetailsClient/CarDetailsClient";
import { Car } from "@/types/car";

interface CarDetailsPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

const CarDetailsPage = async ({ params }: CarDetailsPageProps) => {
  // якщо params може бути промісом, треба зробити await
  const { id } = "then" in params ? await params : params;

  // Fetch car data
  const res = await fetch(`https://car-rental-api.goit.global/cars/${id}`);
  const car: Car = await res.json();

  return <CarDetailsClient initialCar={car} />;
};

export default CarDetailsPage;
