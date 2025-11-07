import React from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <img
      src={src}
      className="card-img-top obj-cover-200"
      alt={alt}
      onError={(e) => {
        const placeholderUrl = 'https://media.makeameme.org/created/placeholder-9d395b173f.jpg';
        if (e.currentTarget.src !== placeholderUrl) {
          e.currentTarget.src = placeholderUrl;
        }
      }}
    />
  );
};

export default ProductImage;