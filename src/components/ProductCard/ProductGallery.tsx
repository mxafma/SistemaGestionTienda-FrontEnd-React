import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  images?: string[];  // Opcional
  image?: string;     // Imagen principal (fallback)
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ 
  images, 
  image, 
  productName 
}) => {
  // Si hay múltiples imágenes, usar images; si no, usar image como array
  const galleryImages = images && images.length > 0 ? images : [image || ''];
  const [mainImage, setMainImage] = useState(galleryImages[0]);

  // Actualizar imagen principal cuando cambien las props
  useEffect(() => {
    setMainImage(galleryImages[0]);
  }, [images, image, galleryImages]);

  const handleThumbnailClick = (selectedImage: string) => {
    setMainImage(selectedImage);
  };

  return (
    <div>
      {/* Imagen principal */}
      <img 
        src={mainImage} 
        className="img-fluid rounded shadow-sm mb-3" 
        alt={productName}
        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
        onError={() => {/* Error loading image */}}
      />
      
      {/* Miniaturas - Solo mostrar si hay más de una imagen */}
      {galleryImages.length > 1 && (
        <div className="d-flex flex-wrap gap-2">
          {galleryImages.map((galleryImage, index) => (
            <img
              key={index}
              src={galleryImage}
              className={`img-thumbnail thumb-img ${mainImage === galleryImage ? 'border-primary border-3' : ''}`}
              style={{ 
                width: '70px', 
                height: '70px', 
                objectFit: 'cover', 
                cursor: 'pointer' 
              }}
              alt={`${productName} ${index + 1}`}
              onClick={() => handleThumbnailClick(galleryImage)}
              onError={() => {/* Error loading thumbnail */}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;