import Link from "next/link";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <svg>
            <use href="/images/icons.svg#icon-Logo"></use>
          </svg>
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/catalog">Catalog</Link>
      </nav>
    </header>
  );
};

export default Header;
