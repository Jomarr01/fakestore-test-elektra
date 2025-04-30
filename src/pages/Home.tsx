import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <div className="buttons">
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <Link to={`/product/${product.id}`}>Details</Link>
            </div>
          </div>
        ))}
      </div>
      <Link to="/checkout" className="checkout-link">Go to Checkout</Link>
    </div>
  );
};

export default Home;