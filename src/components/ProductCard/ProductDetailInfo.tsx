import React, { useState, useEffect } from 'react';
import { useCart } from '../../shared/hooks/useCart';
import type { Product as ProductType } from '../../shared/types/types';
import ProductDescription from './ProductDescription';
import QuantitySelector from './QuantitySelector';
import AddToCartButton from './AddToCartButton';

interface ProductDetailInfoProps {
  product: ProductType; // Usa SIEMPRE el Product unificado (name, price, description, etc.)
  onAddToCart?: (productId: number, quantity: number) => void;
}

const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setQuantity(1);
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);

    if (onAddToCart) {
      onAddToCart(product.id, quantity);
    }
  };

  // Si el producto está inactivo, solo mostramos info básica
  if (product.active === false) {
    return (
      <div>
        <h2 className="fw-bold">{product.name}</h2>
        <p className="text-muted">Este producto no está disponible actualmente.</p>
        <ProductDescription description={product.description} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="fw-bold">{product.name}</h2>

      <p className="text-muted fs-5 mb-3">
        {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })
          .format(product.price)}   {/* <- AQUÍ: usamos price, no precio */}
      </p>

      <ProductDescription description={product.description} />

      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
      />

      <AddToCartButton
        productId={product.id}
        quantity={quantity}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductDetailInfo;
