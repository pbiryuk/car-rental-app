"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
    email: "",
    comment: "",
  });

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    if (!formData.name || !formData.email || !startDate || !endDate) {
      setNotification({
        message: "Please fill out all required fields.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setNotification({
        message: `Your booking request for ${carName} (Price: ${rentalPrice}, Min Age: ${minAge}) has been sent! We will contact you soon.`,
        type: "success",
      });
      setFormData({ name: "", email: "", comment: "" });
      setDateRange([null, null]);
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
          <p>{notification.message}</p>
        </div>
      )}

      <h3 className={styles.formTitle}>Book your car now</h3>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={styles.inputGroup}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name*"
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email*"
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.inputGroup}>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update: [Date | null, Date | null]) =>
            setDateRange(update)
          }
          placeholderText="Booking date"
          disabled={isSubmitting}
          className={styles.datepickerInput}
          popperPlacement="bottom-end"
          popperClassName="custom-datepicker-popper"
          wrapperClassName={styles.datePickerWrapper} // для ширини input
        />
      </div>

      <div className={`${styles.inputGroup} ${styles.lastInputGroup}`}>
        <textarea
          name="comment"
          rows={3}
          value={formData.comment}
          onChange={handleChange}
          placeholder="Comment"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default CarBookingForm;
