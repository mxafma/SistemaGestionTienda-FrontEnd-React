import React from 'react';
import { Link } from 'react-router-dom';

interface ProductTitleProps {
  title: string;
  id: number;
}

const ProductTitle: React.FC<ProductTitleProps> = ({ title, id }) => {
  return (
    <h6 className="card-title mb-1 card-title-product">
      <Link to={`/product/${id}`} className="text-decoration-none text-dark">
        {title}
      </Link>
    </h6>
  );
};

export default ProductTitle;