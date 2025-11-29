import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../../shared/types/types';

interface ProductListProps {
  products: Product[];
  agregarAlCarrito: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, agregarAlCarrito }) => {
  return (
    <div className="container my-4">
      <div className="row">
        
        {products
          .filter((p) => p.active !== false)  // <--- para filtrar los inactivos
          .map((product: Product) => (
          <div key={product.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <ProductCard product={product} onAddToCart={agregarAlCarrito} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;