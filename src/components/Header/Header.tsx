import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>FakeStore</Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Productos</Link>
          <Link to="/cart" className={styles.navLink}>
            Carrito
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;