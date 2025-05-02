import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Checkout.module.css';

const Checkout: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  return (
    <div className={styles.Checkout}>
      <h1 className={styles.title}>Tu Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Tu carrito está vacío.</p>
          <Link to="/" className={styles.continueShopping}>
            Seguir comprando
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.cartItemsList}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className={styles.cartSummary}>
             <div className={styles.summaryDetails}>
                 <p className={styles.totalText}>
                   Total: <span className={styles.totalAmount}>${getCartTotal().toFixed(2)}</span>
                 </p>
             </div>
             <div className={styles.summaryActions}>
                 <button onClick={clearCart} className={`${styles.clearButton} danger`}>
                    Vaciar Carrito
                 </button>
                 <button className={styles.checkoutButton}>
                    Proceder al Pago (Simulado)
                 </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;