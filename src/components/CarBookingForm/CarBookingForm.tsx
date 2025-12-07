"use client";

import React, { useState } from "react";
import styles from "./CarBookingForm.module.css";

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

    if (!formData.name || !formData.phone || !formData.rentalDate) {
      setNotification({
        message: "Будь ласка, заповніть всі обов'язкові поля.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setNotification({
        message: `Бронювання ${carName} успішно підтверджено! Ми зв'яземося з Вами найближчим часом.`,
        type: "success",
      });
      setFormData({ name: "", phone: "", email: "", rentalDate: "" });
    }, 1500);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {notification && (
        <div
          className={`${styles.notification} ${
            notification.type === "success" ? styles.success : styles.error
          }`}
        >
          <p className={styles.notificationTitle}>
            {notification.type === "success" ? "Успіх!" : "Помилка!"}
          </p>
          <p>{notification.message}</p>
        </div>
      )}

      <p>
        Мінімальний вік для оренди: <strong>{minAge}</strong>
      </p>

      <div className={styles.inputGroup}>
        <label htmlFor="name">Ваше Ім&apos;я *</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phone">Телефон *</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="rentalDate">Дата Оренди *</label>
        <input
          type="date"
          name="rentalDate"
          id="rentalDate"
          value={formData.rentalDate}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Обробка..." : `Забронювати за ${rentalPrice}$/год`}
      </button>
    </form>
  );
};

export default CarBookingForm;
