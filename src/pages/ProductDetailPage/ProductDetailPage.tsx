import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types';
import { fetchProductById } from '../../api/fakeStoreApi';
import { useCart } from '../../contexts/CartContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import styles from './ProductDetailPage.module.css';
import NotFoundPage from '../NotFoundPage';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setError("ID no válido.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err: any) {
        // Si el error es porque no se encontró el producto (lanzado desde la API)
        if (err.message && err.message.includes('not found')) {
          setError('Producto no encontrado.');
          setProduct(null);
        } else {
          setError('Error al cargar el producto. Intenta de nuevo.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      console.log(`${product.title} agregado al carrito.`);
    }
  };


  if (loading) {
    return <div className="loading-container"><LoadingSpinner /></div>;
  }

  // Si hubo un error y el producto es null (ej: 404), muestra NotFoundPage
  if (error && !product) {
    return <NotFoundPage />;
  }

  // Si hubo otro tipo de error (ej. de red) pero tal vez tenías datos viejos, muestra el error
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Si no hay carga, no hay error, pero aún no hay producto
  if (!product) {
    return <NotFoundPage />;
  }


  return (
    <div className={styles.pdpContainer}>
      <div className={styles.imageSection}>
        <img src={product.image} alt={product.title} className={styles.productImage} />
      </div>
      <div className={styles.detailsSection}>
        <h1 className={styles.productTitle}>{product.title}</h1>
        <p className={styles.productCategory}>{product.category}</p>
        <p className={styles.productRating}>
          Rating: {product.rating.rate}/5 ({product.rating.count} reviews)
        </p>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        <button onClick={handleAddToCart} className={styles.addToCartButton}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;