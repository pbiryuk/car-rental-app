// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.css"; // Імпорт стилів

const HomePage = () => {
  // ✅ ВИПРАВЛЕНО: Використовуємо кореневий шлях до статичного зображення у папці public
  const imageUrl = "/images/banner.jpg";

  return (
    <div className={styles.heroSection}>
      {/* Зображення з затемненням */}
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt="Find your perfect rental car"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority // Використовуємо priority для зображення банера
        />
        <div className={styles.overlay}></div>
      </div>

      {/* Контент (заголовок, опис, кнопка) */}
      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>

        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>

        {/* Кнопка "View Catalog" */}
        <Link href="/catalog" passHref>
          <button className={styles.catalogButton}>View Catalog</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
