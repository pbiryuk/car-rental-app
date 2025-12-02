// src/components/Header/Header.tsx
import Link from "next/link";
import styles from "./Header.module.css"; // Імпорт стилів

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>RentalCar</div>
      <nav className={styles.nav}>
        <Link href="/" passHref className={styles.link}>
          Home
        </Link>
        <Link href="/catalog" passHref className={styles.link}>
          Catalog
        </Link>
      </nav>
    </header>
  );
};

export default Header;
