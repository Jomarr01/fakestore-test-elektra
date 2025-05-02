import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>{'Lo sentimos, la página que buscas no existe o no está disponible.'}</p>
      <Link to="/" style={{ marginTop: '20px', display: 'inline-block' }}>
        Volver a la página principal
      </Link>
    </div>
  );
};

export default NotFoundPage;