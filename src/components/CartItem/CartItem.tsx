import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const itemSubtotal = item.price * (item.quantity > 0 ? item.quantity : 0);

  return (
    <div className={styles.cartItem}>
      <img src={item.image} alt={item.title} className={styles.itemImage} />
      <div className={styles.itemDetails}>
        <Link to={`/product/${item.id}`} className={styles.itemTitle}>
            {item.title}
        </Link>
        <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
      </div>
      <div className={styles.itemQuantity}>
        <label htmlFor={`quantity-${item.id}`} className={styles.quantityLabel}>Cantidad:</label>
        <input
          id={`quantity-${item.id}`}
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className={styles.quantityInput}
        />
      </div>
       <div className={styles.itemSubtotal}>
            Subtotal: ${itemSubtotal.toFixed(2)}
       </div>
      <button onClick={handleRemove} className={`${styles.removeButton} danger`}>
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;