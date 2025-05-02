import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header/Header';

import HomePage from './pages/HomePage/HomePage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import Checkout from './pages/Checkout/Checkout';
import NotFoundPage from './pages/NotFoundPage';

import './styles/global.css';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Checkout />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
};

export default App;