import React, { useEffect, useState } from "react";
import Hero from "../../widgets/Hero/Hero";
import ProductList from "../../components/ProductCard/ProductList";

import type { Product } from "../../shared/types/types";
import { getProductos } from "../../shared/hooks/productosApi";

import { mapProductosToProducts } from "../../shared/hooks/productAdapter";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Productos locales (JSON) están disponibles en el adaptador para fallback

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const dtoList = await getProductos();
        const mapped = mapProductosToProducts(dtoList);
        setProducts(mapped);
        setError(null);
      } catch (err) {
        console.error("Error al cargar productos en Home:", err);
        setError("Error al cargar productos.");
        // Si quieres, puedes dejar un fallback al JSON local:
        // setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

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

        {loading && <p>Cargando productos...</p>}

        {error && (
          <p style={{ color: "red", marginTop: "1rem" }}>
            {error}
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          // ProductList ya filtra los inactivos: p.active !== false
          <ProductList
            products={products}
            agregarAlCarrito={agregarAlCarrito}
          />
        )}

        {!loading && !error && products.length === 0 && (
          <p className="mt-3">No hay productos para mostrar.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
