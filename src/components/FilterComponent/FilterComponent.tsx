"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCarStore } from "@/store/carStore";
import styles from "./FilterComponent.module.css";

interface CustomSelectProps {
  options: string[];
  value: string | null;
  onChange: (val: string) => void;
  placeholder: string;
  listClassName?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  listClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.customSelectWrapper} ref={wrapperRef}>
      <div className={styles.customSelectHeader} onClick={handleToggle}>
        <span>{value || placeholder}</span>
        <svg className={styles.selectArrow}>
          <use
            xlinkHref={
              isOpen
                ? "/images/icons.svg#icon-Up-arrow"
                : "/images/icons.svg#icon-Down-arrow"
            }
          />
        </svg>
      </div>

      {isOpen && (
        <ul className={`${styles.customSelectList} ${listClassName}`}>
          {options.map((opt) => (
            <li
              key={opt}
              className={styles.customSelectItem}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FilterComponent: React.FC = () => {
  const { applyFilters, fetchCars, filters, brands, fetchBrandsList } =
    useCarStore();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    fetchBrandsList();
  }, [fetchBrandsList]);

  const formatMileage = (label: string, value?: number | null) =>
    value !== null && value !== undefined
      ? `${label} ${value.toLocaleString("en-US")}`
      : label;

  const handleMileageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "mileageFrom" | "mileageTo",
    label: string
  ) => {
    let raw = e.target.value.replace(new RegExp(label, "i"), "").trim();
    raw = raw.replace(/,/g, "").replace(/\s+/g, "");
    const num = raw === "" ? null : Number(raw);
    if (isNaN(num as number)) return;

    setLocalFilters((prev) => ({
      ...prev,
      [field]: num,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(localFilters);
    fetchCars(true);
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      {/* Car Brand */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Car brand</label>
        <div className={styles.brandSelect}>
          <CustomSelect
            options={brands}
            value={localFilters.brand}
            onChange={(val) =>
              setLocalFilters((prev) => ({ ...prev, brand: val }))
            }
            placeholder="Choose a brand"
            listClassName={styles.brandSelectList}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Price / 1 hour</label>
        <div className={styles.priceSelect}>
          <CustomSelect
            options={Array.from({ length: 50 }, (_, i) =>
              ((i + 3) * 10).toString()
            )}
            value={localFilters.price ? `To $${localFilters.price}` : null}
            onChange={(val) =>
              setLocalFilters((prev) => ({ ...prev, price: Number(val) }))
            }
            placeholder="Choose a price"
            listClassName={styles.priceSelectList}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Car mileage / km</label>
        <div className={styles.mileageGroup}>
          <input
            type="text"
            name="mileageFrom"
            autoComplete="off"
            value={`${formatMileage(
              "From",
              localFilters.mileageFrom ?? undefined
            )}`}
            onChange={(e) => handleMileageChange(e, "mileageFrom", "From")}
          />
          <input
            type="text"
            name="mileageTo"
            autoComplete="off"
            value={`${formatMileage(
              "To",
              localFilters.mileageTo ?? undefined
            )}`}
            onChange={(e) => handleMileageChange(e, "mileageTo", "To")}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </div>
    </form>
  );
};

export default FilterComponent;
