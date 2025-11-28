import { useEffect, useState, useCallback } from "react";
import { getProductos } from "./productosApi";
import type { ProductoDTO } from "./productosApi";

export default function useProductos() {
  const [productos, setProductos] = useState<ProductoDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductos();
      setProductos(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return {
    productos,
    productCount: productos.length,
    loading,
    error,
    refresh: fetchProductos,
  };
}
