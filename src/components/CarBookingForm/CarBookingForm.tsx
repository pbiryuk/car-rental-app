// src/components/CarBookingForm.tsx
"use client";

import React, { useState } from "react";
// import { useRouter } from 'next/navigation'; // 👈 ВИДАЛЕНО НЕВИКОРИСТАНИЙ ІМПОРТ

interface CarBookingFormProps {
  carName: string;
  rentalPrice: string;
  minAge: string;
}

const CarBookingForm: React.FC<CarBookingFormProps> = ({
  carName,
  rentalPrice,
  minAge,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    rentalDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    // 1. Проста Валідація
    if (!formData.name || !formData.phone || !formData.rentalDate) {
      setNotification({
        message: "Будь ласка, заповніть всі обов'язкові поля.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    // Імітація успішної відправки (оскільки немає API для бронювання)
    setTimeout(() => {
      setIsSubmitting(false);

      // 2. Нотифікація про вдалу оренду (вимога ТЗ)
      setNotification({
        // 👈 ЕКРАНУВАННЯ АПОСТРОФА (react/no-unescaped-entities)
        message: `Бронювання ${carName} успішно підтверджено! Ми зв&apos;яжемося з Вами найближчим часом.`,
        type: "success",
      });

      // Очищення форми
      setFormData({ name: "", phone: "", email: "", rentalDate: "" });
    }, 1500);
  };

  const notificationClasses =
    notification?.type === "success"
      ? "bg-green-100 border-green-400 text-green-700"
      : "bg-red-100 border-red-400 text-red-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {notification && (
        <div
          className={`border px-4 py-3 rounded relative text-sm ${notificationClasses}`}
          role="alert"
        >
          <p className="font-bold">
            {notification.type === "success" ? "Успіх!" : "Помилка!"}
          </p>
          <p>{notification.message}</p>
        </div>
      )}

      <p className="text-sm text-gray-600">
        Мінімальний вік для оренди:{" "}
        <span className="font-semibold text-blue-600">{minAge}</span>
      </p>

      {/* Поля форми */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Ваше Ім&apos;я *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Телефон *
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="rentalDate"
          className="block text-sm font-medium text-gray-700"
        >
          Дата Оренди *
        </label>
        <input
          type="date"
          name="rentalDate"
          id="rentalDate"
          value={formData.rentalDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50"
        style={{ cursor: "pointer" }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Обробка..." : `Забронювати за ${rentalPrice}$/год`}
      </button>
    </form>
  );
};

export default CarBookingForm;
