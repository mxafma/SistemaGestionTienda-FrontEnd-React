import { useEffect, useState, useCallback } from "react";
import { getUsuarios } from "./usuariosApi";
import type { UsuarioDTO } from "./usuariosApi";

export default function useUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsuarios();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return {
    usuarios,
    userCount: usuarios.length,
    loading,
    error,
    refresh: fetchUsuarios,
  };
}
