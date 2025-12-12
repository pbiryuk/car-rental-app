"use client";

import React, { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./CarBookingForm.module.css";
import "./DayPickerCustom.css";
import { enUS } from "date-fns/locale";

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

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [hoveredDay, setHoveredDay] = useState<Date | undefined>(undefined);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const startDate = dateRange?.from;
  const endDate = dateRange?.to;

  const togglePicker = () => {
    const opening = !isPickerVisible;
    setIsPickerVisible(opening);
    if (opening) {
      setDateRange(undefined);
      setHoveredDay(undefined);
    }
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);

    if (
      range?.from &&
      range?.to &&
      range.from.getTime() !== range.to.getTime()
    ) {
      setTimeout(() => {
        setIsPickerVisible(false);
      }, 400);
    }
  };

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
        message: "Please fill all required fields and select a date range.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    const minAgeNumber = minAge.replace(/\D/g, "");

    setTimeout(() => {
      setNotification({
        message: `Your booking request for ${carName} (Price: $${rentalPrice}, Min Age: ${minAgeNumber}) has been sent!`,
        type: "success",
      });
      setFormData({ name: "", email: "", comment: "" });
      setDateRange(undefined);
      setIsSubmitting(false);
    }, 1500);
  };

  const displayDateText =
    startDate && endDate
      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      : "Booking date";

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

      <div className={styles.inputGroup} style={{ position: "relative" }}>
        <input
          type="text"
          value={displayDateText}
          onClick={togglePicker}
          readOnly
          disabled={isSubmitting}
          className={styles.datepickerInput}
        />

        {isPickerVisible && (
          <div className={styles.dayPickerContainer}>
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={handleRangeSelect}
              onDayMouseEnter={setHoveredDay}
              numberOfMonths={1}
              weekStartsOn={1}
              fromDate={new Date()}
              locale={enUS}
              formatters={{
                formatWeekdayName: (day, options) => {
                  return day.toLocaleDateString(
                    options?.locale?.code || "en-US",
                    { weekday: "short" }
                  );
                },
              }}
              modifiers={{
                hoverRange: (day) =>
                  dateRange?.from && !dateRange.to && hoveredDay
                    ? day >= dateRange.from && day <= hoveredDay
                    : false,
              }}
              modifiersClassNames={{
                hoverRange: "rdp-day_hoverRange",
              }}
              showOutsideDays
              navLayout="around"
            />
          </div>
        )}
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
