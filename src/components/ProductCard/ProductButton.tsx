import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../shared/hooks/useCart';
import type { Product } from '../../shared/types/types';

interface ProductButtonProps {
  productId: number;
  product?: Product; // Producto completo para agregar al carrito
  onAddToCart?: (id: number) => void; // Callback opcional (legacy)
  disabled?: boolean;
  children?: React.ReactNode;
  variant?: 'add-to-cart' | 'view-detail';
}

const ProductButton: React.FC<ProductButtonProps> = ({ 
  productId, 
  product,
  onAddToCart, 
  disabled = false,
  children,
  variant = 'add-to-cart'
}) => {
  const { addToCart } = useCart();

  const handleClick = () => {
    if (variant === 'add-to-cart') {
      // Si tenemos el producto completo, usar el hook del carrito
      if (product) {
        addToCart(product, 1);
      }
      
      // Si hay callback legacy, también ejecutarlo
      if (onAddToCart) {
        onAddToCart(productId);
      }
    }
  };

  if (variant === 'view-detail') {
    return (
      <Link 
        to={`/product/${productId}`} 
        className="btn btn-sm btn-outline-foodix text-decoration-none"
      >
        {children || "Ver detalle"}
      </Link>
    );
  }

  return (
    <button 
      className="btn btn-foodix mt-auto"
      onClick={handleClick}
      disabled={disabled}
    >
      <i className="bi bi-cart-plus me-2"></i>
      {children || "Añadir"}
    </button>
  );
};

export default ProductButton;