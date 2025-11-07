import React from 'react';
import ProductList from '../../components/ProductCard/ProductList';
import productosData from '../../data/products.json';

const Products: React.FC = () => {
  const agregarAlCarrito = (id: number) => {
    // Legacy callback - ahora el carrito se maneja directamente en ProductButton
  };

  return (
    <div>
      {/* TÍTULO / BREADCRUMB */}
      <header className="container py-4">
        <div className="text-center">
          <h2 className="section-title">Productos</h2>
        </div>
      </header>

      {/* GRID DE PRODUCTOS */}
      <main className="container py-4">
        <ProductList products={productosData} agregarAlCarrito={agregarAlCarrito} />
      </main>
    </div>
  );
};

export default Products;