import React from 'react';
import Hero from '../../widgets/Hero/Hero';
import ProductList from '../../components/ProductCard/ProductList';
import productosData from '../../data/products.json';

const Home: React.FC = () => {
  const agregarAlCarrito = (id: number) => {
    console.log(`Producto ${id} agregado al carrito`);
  };

  return (
    <div>
      <Hero
        title="Tienda online Foodix"
        description="Insumos gourmet de máxima calidad para restaurantes, chefs y amantes de la cocina. También para quienes buscan ese ingrediente especial que marque la diferencia en casa."
        image="/src/shared/assets/banner4.png"
      />
      <section className="container py-5 text-center">
        <h2 className="section-title">Nuestros productos</h2>
        <ProductList products={productosData} agregarAlCarrito={agregarAlCarrito} />
      </section>
    </div>
  );
};

export default Home;