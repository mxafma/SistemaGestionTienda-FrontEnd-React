import React from 'react';

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  return (
    <p className="card-text text-muted">
      {description}
    </p>
  );
};

export default ProductDescription;