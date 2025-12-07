import Link from "next/link";
import styles from "./home.module.css";

const HomePage = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>

        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link href="/catalog">
          <button className={styles.catalogButton}>View Catalog</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
