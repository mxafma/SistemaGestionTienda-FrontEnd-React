import React, { useState, useEffect } from 'react';
import { useCart } from '../../shared/hooks/useCart';
import type { Product as ProductType } from '../../shared/types/types';
import ProductDescription from './ProductDescription';
import QuantitySelector from './QuantitySelector';
import AddToCartButton from './AddToCartButton';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
}

interface ProductDetailInfoProps {
  product: Product;
  originalProduct: ProductType; // Producto completo para el carrito
  onAddToCart?: (productId: number, quantity: number) => void; // Ahora opcional
}

const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({ product, originalProduct, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  
  // 🛒 Hook del carrito
  const { addToCart } = useCart();

  // Resetear cantidad cuando cambie el producto
  useEffect(() => {
    setQuantity(1);
  }, [product.id]);

  // Función para agregar al carrito
  const handleAddToCart = () => {
    addToCart(originalProduct, quantity);
    
    // Si hay callback legacy, también ejecutarlo
    if (onAddToCart) {
      onAddToCart(product.id, quantity);
    }
  };

  return (
    <div>
      <h2 className="fw-bold">{product.nombre}</h2>
      <p className="text-muted fs-5 mb-3">
        {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.precio)}
      </p>
      <ProductDescription description={product.descripcion} />
      
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