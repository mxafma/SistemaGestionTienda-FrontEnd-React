import React from 'react';
import { useCart } from '../../shared/hooks/useCart';
import type { CartItem as CartItemType } from '../../shared/types/types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart, formatPrice } = useCart();

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Imagen del producto */}
          <div className="col-md-2">
            <img 
              src={item.image} 
              alt={item.name}
              className="img-fluid rounded"
              style={{ maxWidth: '80px', height: '80px', objectFit: 'cover' }}
            />
          </div>

          {/* Información del producto */}
          <div className="col-md-4">
            <h5 className="card-title mb-1">{item.name}</h5>
            <p className="text-muted small mb-0">
              {item.description}
            </p>
            <span className="text-success fw-bold">{formatPrice(item.price)} x{item.quantity}</span>
          </div>

          {/* Controles de cantidad */}
          <div className="col-md-3">
            <div className="d-flex align-items-center justify-content-center">
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => decrementQuantity(item.id)}
              >
                <i className="bi bi-dash"></i>
              </button>
              
              <span className="mx-3 fw-bold">{item.quantity}</span>
              
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => incrementQuantity(item.id)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>

          {/* Subtotal y eliminar */}
          <div className="col-md-3 text-end">
            <div className="d-flex align-items-center justify-content-end">
              <div className="me-3">
                <div className="fw-bold text-success">{formatPrice(item.subtotal)}</div>
              </div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
                title="Eliminar producto"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
