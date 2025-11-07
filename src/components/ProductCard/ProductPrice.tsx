import React from 'react';

interface ProductPriceProps {
  price: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  return (
    <p className="card-text text-muted mb-3 card-price-product">
      {formatPrice(price)}
    </p>
  );
};

export default ProductPrice;