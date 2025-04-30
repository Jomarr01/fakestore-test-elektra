import React from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="container">
      <h1>Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty</p> :
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.title} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      }
      <h2>Total: ${total}</h2>
    </div>
  );
};

export default Checkout;