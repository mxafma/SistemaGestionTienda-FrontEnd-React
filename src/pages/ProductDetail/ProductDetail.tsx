import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGallery from '../../components/ProductCard/ProductGallery';
import ProductDetailInfo from '../../components/ProductCard/ProductDetailInfo';
import RelatedProducts from '../../components/ProductCard/RelatedProducts';
import productsData from '../../data/products.json';
import type { Product } from '../../shared/types/types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Cargar todos los productos
    setAllProducts(productsData);

    // Buscar el producto específico
    if (id) {
      const foundProduct = productsData.find(p => p.id === parseInt(id, 10));
      setProduct(foundProduct || null);
    }
  }, [id]);

  const handleAddToCart = (productId: number, quantity: number) => {
    console.log(`Añadir al carrito: Producto ${productId}, Cantidad: ${quantity}`);
    // Aquí iría la lógica para agregar al carrito
  };

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          Producto no encontrado
        </div>
      </div>
    );
  }

  // Usar el array de imágenes si existe, si no, usar la imagen principal
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Galería de imágenes */}
        <div className="col-md-6">
          <ProductGallery 
            images={productImages}
            productName={product.name}
          />
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          <ProductDetailInfo 
            product={{
              id: product.id,
              nombre: product.name,
              precio: product.price,
              descripcion: product.description
            }}
            originalProduct={product}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* Productos relacionados */}
      <RelatedProducts 
        products={allProducts}
        currentProductId={product.id}
      />
    </div>
  );
};

export default ProductDetail;