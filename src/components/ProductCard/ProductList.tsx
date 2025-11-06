import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../../shared/types/types';

interface ProductListProps {
  products: Product[];
  agregarAlCarrito: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, agregarAlCarrito }) => {
  return (
    <div className="product-list">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;