import React, { useState } from 'react';
import { useCart } from '../../shared/hooks/useCart';

const CartSummary: React.FC = () => {
  const { totalPrice, formatPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    // Lógica simple de cupón (puedes expandir esto)
    if (couponCode.toLowerCase() === 'descuento10') {
      setDiscount(totalPrice * 0.1);
    } else if (couponCode.toLowerCase() === 'descuento5') {
      setDiscount(totalPrice * 0.05);
    } else {
      setDiscount(0);
      alert('Cupón no válido');
    }
  };

  const finalTotal = totalPrice - discount;

  const handleCheckout = () => {
    alert('Funcionalidad de pago pendiente de implementar');
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-4">TOTAL: {formatPrice(finalTotal)}</h5>
        
        {/* Cupón de descuento */}
        <div className="mb-4">
          <label className="form-label text-muted">Cupón de descuento</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese el cupón"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button 
              className="btn btn-outline-secondary"
              onClick={handleApplyCoupon}
            >
              Aplicar
            </button>
          </div>
          
          {discount > 0 && (
            <div className="mt-2">
              <small className="text-success">
                <i className="bi bi-check-circle me-1"></i>
                Descuento aplicado: -{formatPrice(discount)}
              </small>
            </div>
          )}
        </div>

        {/* Desglose de precios */}
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          {discount > 0 && (
            <div className="d-flex justify-content-between mb-2 text-success">
              <span>Descuento:</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}
          <hr />
          <div className="d-flex justify-content-between fw-bold fs-5">
            <span>Total:</span>
            <span className="text-success">{formatPrice(finalTotal)}</span>
          </div>
        </div>

        {/* Botón de pagar */}
        <button 
          className="btn btn-success w-100 py-3 fw-bold"
          onClick={handleCheckout}
        >
          PAGAR
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
