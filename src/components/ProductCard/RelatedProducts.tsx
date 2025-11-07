import React from 'react';
import ProductCard from './ProductCard';
import SectionTitle from '../SectionTitle/SectionTitle';
import type { Product } from '../../shared/types/types';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: number;
  maxProducts?: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  products, 
  currentProductId, 
  maxProducts = 4 
}) => {
  // Filtrar productos relacionados (excluir el actual)
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .sort(() => 0.5 - Math.random()) // Ordenar aleatoriamente
    .slice(0, maxProducts);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-5">
      <SectionTitle title="Productos relacionados" className="brand mb-4" />
      <div className="row g-4">
        {relatedProducts.map(product => (
          <div key={product.id} className="col-6 col-md-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;