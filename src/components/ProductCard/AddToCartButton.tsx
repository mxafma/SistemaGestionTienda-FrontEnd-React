import React from 'react';

interface AddToCartButtonProps {
  productId: number;
  quantity: number;
  onAddToCart: (productId: number, quantity: number) => void;
  disabled?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  productId, 
  quantity, 
  onAddToCart,
  disabled = false 
}) => {
  const handleClick = () => {
    onAddToCart(productId, quantity);
  };

  return (
    <button 
      className="btn btn-foodix"
      onClick={handleClick}
      disabled={disabled}
    >
      <i className="bi bi-cart-plus"></i> Añadir al carrito
    </button>
  );
};

export default AddToCartButton;