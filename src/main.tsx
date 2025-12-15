import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import AppRouter from './app/router';
import { CartProvider } from './entities/cart/CartContext';
import { AuthProvider } from './shared/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
