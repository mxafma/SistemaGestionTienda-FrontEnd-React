import React, { useState, useEffect } from "react";

interface ProductGalleryProps {
  images?: string[];   // Opcional
  image?: string;      // Imagen principal (fallback)
  productName: string;
}

const PLACEHOLDER =
  "https://media.makeameme.org/created/placeholder-9d395b173f.jpg";

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  image,
  productName,
}) => {
  // Normalizamos: si hay múltiples imágenes, usamos images; si no, usamos image como array; si no hay nada, array vacío
  const galleryImages: string[] =
    images && images.length > 0
      ? images
      : image
      ? [image]
      : [];

  const [mainImage, setMainImage] = useState<string>(
    galleryImages[0] || PLACEHOLDER
  );

  // Actualizar imagen principal cuando cambian las props
  useEffect(() => {
    const imgs =
      images && images.length > 0
        ? images
        : image
        ? [image]
        : [];

    if (imgs.length > 0) {
      setMainImage(imgs[0]);
    } else {
      setMainImage(PLACEHOLDER);
    }
  }, [images, image]);

  const handleThumbnailClick = (selectedImage: string) => {
    setMainImage(selectedImage);
  };

  return (
    <div>
      {/* Imagen principal */}
      <div
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <img
          src={mainImage}
          className="img-fluid rounded shadow-sm mb-3"
          alt={productName}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain", // si prefieres recorte, cambia a "cover"
          }}
          onError={(e) => {
            if (e.currentTarget.src !== PLACEHOLDER) {
              e.currentTarget.src = PLACEHOLDER;
            }
          }}
        />
      </div>

      {/* Miniaturas - solo si hay más de una imagen válida */}
      {galleryImages.length > 1 && (
        <div className="d-flex flex-wrap gap-2 mt-2">
          {galleryImages.map((galleryImage, index) => (
            <div
              key={index}
              style={{
                width: "70px",
                height: "70px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <img
                src={galleryImage}
                className={`img-thumbnail thumb-img ${
                  mainImage === galleryImage ? "border-primary border-3" : ""
                }`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt={`${productName} ${index + 1}`}
                onClick={() => handleThumbnailClick(galleryImage)}
                onError={(e) => {
                  if (e.currentTarget.src !== PLACEHOLDER) {
                    e.currentTarget.src = PLACEHOLDER;
                  }
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
