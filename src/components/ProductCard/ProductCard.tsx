import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.preventDefault();
     event.stopPropagation();
     addToCart(product);

     console.log(`${product.title} agregado al carrito.`);
  };

  return (
    <Link to={`/product/${product.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
           <img src={product.image} alt={product.title} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <div className={styles.actions}>
             <button onClick={handleAddToCart} className={styles.addButton}>
               Añadir al carrito
             </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;