import React from 'react';

interface ProductTitleProps {
  title: string;
  id: number;
}

const ProductTitle: React.FC<ProductTitleProps> = ({ title, id }) => {
  return (
    <h5 className="card-title">
      <a href={`detalle-producto.html?id=${id}`} className="text-decoration-none">
        {title}
      </a>
    </h5>
  );
};

export default ProductTitle;