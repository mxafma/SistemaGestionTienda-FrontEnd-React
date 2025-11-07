import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../shared/hooks/useCart';
import CartItem from '../../components/ProductCard/CartItem';
import CartSummary from '../../components/ProductCard/CartSummary';

const Cart: React.FC = () => {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
          <h2 className="mb-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">¡Agrega algunos productos para empezar a comprar!</p>
          <Link to="/products" className="btn btn-foodix">
            <i className="bi bi-shop me-2"></i>
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Título */}
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold text-dark mb-0">Mi carrito de compras</h2>
        </div>
        <div className="col-auto">
          <button 
            className="btn btn-outline-danger"
            onClick={clearCart}
          >
            <i className="bi bi-trash me-2"></i>
            Limpiar carrito
          </button>
        </div>
      </div>

      <div className="row">
        {/* Lista de productos */}
        <div className="col-lg-8">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Resumen y total */}
        <div className="col-lg-4">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;