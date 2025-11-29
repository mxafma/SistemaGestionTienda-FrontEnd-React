import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGallery from '../../components/ProductCard/ProductGallery';
import ProductDetailInfo from '../../components/ProductCard/ProductDetailInfo';
import RelatedProducts from '../../components/ProductCard/RelatedProducts';
import type { Product } from '../../shared/types/types';
import { getProductoById, getProductos } from '../../shared/hooks/productosApi';
import { mapProductoToProduct, mapProductosToProducts } from '../../shared/hooks/productAdapter';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Cargar producto individual desde backend y mapear
        if (id) {
          const dto = await getProductoById(id);
          const mapped = mapProductoToProduct(dto);
          setProduct(mapped);
        }

        // Cargar lista completa para productos relacionados
        const dtos = await getProductos();
        const mappedList = mapProductosToProducts(dtos);
        setAllProducts(mappedList);
      } catch (err) {
        console.error('Error cargando detalle de producto:', err);
        setProduct(null);
        setAllProducts([]);
      }
    };

    fetch();
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
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

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
            product={product}
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