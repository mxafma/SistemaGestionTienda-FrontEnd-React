import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './app/router';
import { CartProvider } from './entities/cart/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <AppRouter />
    </CartProvider>
  </StrictMode>,
)
