import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductList from "../../components/ProductCard/ProductList";
import productosData from "../../data/products.json";
import { mapProductosToProducts } from "../../shared/hooks/productAdapter";

import type { Product } from "../../shared/types/types";
import { getProductos } from "../../shared/hooks/productosApi";

const Products: React.FC = () => {
  // Estado con los productos que verán las cards
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Datos locales (JSON) que usabas antes: se usan solo como fallback para imágenes/descripción
  const localProducts: Product[] = productosData as Product[];


  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const dtoList = await getProductos(); // llamada real al backend
        const mapped = mapProductosToProducts(dtoList);
        setProducts(mapped);
        setError(null);
      } catch (err: unknown) {
        let msg = "Error al cargar productos";
        if (axios.isAxiosError(err) && err.response?.data) {
          const d: any = err.response.data;
          if (typeof d === "string") msg += ": " + d;
          else if (d.message) msg += ": " + d.message;
        } else if (err instanceof Error) {
          msg += ": " + err.message;
        }
        setError(msg);

        // Fallback: si el backend falla, usamos los productos locales del JSON
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  // El carrito ahora se maneja en ProductButton, así que aquí no hacemos nada
  const agregarAlCarrito = (_id: number) => {
    // Legacy callback
  };

  return (
    <div>
      {/* Título */}
      <header className="container py-4">
        <div className="text-center">
          <h2 className="section-title">Productos</h2>
        </div>
      </header>

      {/* Grid de productos */}
      <main className="container py-4">
        {loading && <p>Cargando productos...</p>}

        {error && (
          <p style={{ color: "red", marginBottom: "1rem" }}>
            {error}
          </p>
        )}

        {!loading && products.length > 0 && (
          <ProductList
            products={products}
            agregarAlCarrito={agregarAlCarrito}
          />
        )}

        {!loading && !error && products.length === 0 && (
          <p>No hay productos para mostrar.</p>
        )}
      </main>
    </div>
  );
};

export default Products;
