import React from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return (
    <div
      style={{
        height: "200px",             // altura fija
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "0.5rem",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="img-fluid"
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          objectFit: "cover",       // evita deformación
        }}
        onError={(e) => {
          const placeholderUrl = "https://media.makeameme.org/created/placeholder-9d395b173f.jpg";
          if (e.currentTarget.src !== placeholderUrl) {
            e.currentTarget.src = placeholderUrl;
          }
        }}
      />
    </div>
  );
};

export default ProductImage;
