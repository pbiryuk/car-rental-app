import CarDetailsClient from "@/components/CarDetailsClient/CarDetailsClient";
import { Car } from "@/types/car";
import { fetchCarById } from "@/services/carApi";

interface CarDetailsPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

const CarDetailsPage = async ({ params }: CarDetailsPageProps) => {
  const { id } = "then" in params ? await params : params;

  let car: Car | null = null;

  try {
    car = await fetchCarById(id);
  } catch (error) {
    console.error("Error fetching car:", error);
    return <p>Car not found or an error occurred.</p>;
  }

  return <CarDetailsClient initialCar={car} />;
};

export default CarDetailsPage;
