import React, { useState, useEffect } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  getProductoById,
  putProducto,
} from "../../shared/hooks/productosApi";
import axios from "axios";

interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  codigoBarra?: string;
  precioVenta: number;
  stockActual: number;
  activo?: boolean;
  categoriaId?: number;
  categoriaNombre?: string;
  categoria?: {
    id: number;
    nombre?: string;
    descripcion?: string;
    activa?: boolean;
    creadaEn?: string;
    actualizadaEn?: string;
  };
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nuevo, setNuevo] = useState({
    nombre: "",
    descripcion: "",
    codigoBarra: "",
    precioVenta: 0,
    stockActual: 0,
    categoriaId: 1,
    activo: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const data = await getProductos();
        setProductos(Array.isArray(data) ? data : []);
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
      }
      setLoading(false);
    };
    fetchProductos();
  }, []);

  const agregarProducto = async () => {
    if (!nuevo.nombre) return;
    setLoading(true);
    try {
      const productoCreado = await createProducto(nuevo);
      setProductos((prev) => [...prev, productoCreado]);
      setNuevo({
        nombre: "",
        descripcion: "",
        codigoBarra: "",
        precioVenta: 0,
          stockActual: 0,
          categoriaId: 1,
          activo: true,
      });
      setError("");
    } catch (err: unknown) {
      let msg = "Error al crear producto";
      if (axios.isAxiosError(err) && err.response?.data) {
        const d: any = err.response.data;
        if (typeof d === "string") msg += ": " + d;
        else if (d.message) msg += ": " + d.message;
        else if (d.error) msg += ": " + d.error;
      } else if (err instanceof Error) {
        msg += ": " + err.message;
      }
      setError(msg);
    }
    setLoading(false);
  };

  // eliminarProducto removed: removal handled via edit (activo) or server-side tools

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<Producto> | null>(null);

  const startEdit = (p: Producto) => {
    setEditingId(p.id);
    setEditingData({ ...p });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData(null);
  };

  const saveEdit = async () => {
    if (!editingId || !editingData) return;
    setLoading(true);
    try {
      // To satisfy backend PUT expectation, fetch the current full product, merge changes and call PUT
      const serverProducto = await getProductoById(editingId);
      const merged: any = { ...serverProducto };
      if (editingData.nombre !== undefined) merged.nombre = editingData.nombre;
      if (editingData.descripcion !== undefined) merged.descripcion = editingData.descripcion;
      if (editingData.codigoBarra !== undefined) merged.codigoBarra = editingData.codigoBarra;
      if (editingData.precioVenta !== undefined) merged.precioVenta = Number(editingData.precioVenta);
      if (editingData.stockActual !== undefined) merged.stockActual = Number(editingData.stockActual);
      if (editingData.activo !== undefined) merged.activo = editingData.activo;
      if ((editingData as any).categoriaId !== undefined) merged.categoria = { id: Number((editingData as any).categoriaId) };

      const updated = await putProducto(editingId, merged as any);
      setProductos((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setError("");
      cancelEdit();
    } catch (err: unknown) {
      const msg = formatAxiosError(err, 'PUT');
      setError("Error al actualizar producto: " + msg);
      console.error(err);
    }
    setLoading(false);
  };

  const toggleActiveInline = async (p: Producto, nuevoActivo: boolean) => {
    setLoading(true);
    try {
      const updated = await updateProducto(p.id, { activo: nuevoActivo } as any);
      setProductos((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
      setError("");
    } catch (err: unknown) {
      const msg = formatAxiosError(err, 'PATCH');
      setError("Error al actualizar activo: " + msg);
      console.error(err);
    }
    setLoading(false);
  };

  function formatAxiosError(err: unknown, expectedMethod?: string) {
    if (axios.isAxiosError(err)) {
      const method = (err.config && (err.config.method || expectedMethod)) || expectedMethod || 'request';
      const url = err.config?.url || '<unknown url>';
      const status = err.response?.status;
      const data = err.response?.data;
      let parts = [`${method.toUpperCase()} ${url}`];
      if (status) parts.push(`status=${status}`);
      if (data) {
        try {
          parts.push(`body=${typeof data === 'string' ? data : JSON.stringify(data)}`);
        } catch (e) {
          parts.push(`body=${String(data)}`);
        }
      }
      return parts.join(' | ');
    }
    if (err instanceof Error) return err.message;
    return String(err);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Gestión de Productos</h2>
      <div style={{ marginBottom: "0.5rem", fontSize: "0.95rem", color: "#555" }}>
        <strong>Ayuda:</strong> Completa los campos para agregar un producto. <br />
        <span style={{ color: "#c00" }}>*</span> indica campo obligatorio.
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ width: "140px" }}>Nombre *</th>
            <th style={{ width: "160px" }}>Descripción</th>
            <th style={{ width: "120px" }}>Código de Barra</th>
            <th style={{ width: "110px" }}>Precio Venta *</th>
            <th style={{ width: "110px" }}>Stock Actual *</th>
            <th style={{ width: "110px" }}>ID Categoría *</th>
            <th style={{ width: "90px" }}>Activo</th>
            <th style={{ width: "90px" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                placeholder="Nombre del producto *"
                value={nuevo.nombre}
                onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                required
                style={{ width: "100%" }}
              />
            </td>
            <td>
              <input
                placeholder="Descripción breve"
                value={nuevo.descripcion}
                onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
                style={{ width: "100%" }}
              />
            </td>
            <td>
              <input
                placeholder="Código de barra (opcional)"
                value={nuevo.codigoBarra}
                onChange={(e) => setNuevo({ ...nuevo, codigoBarra: e.target.value })}
                style={{ width: "100%" }}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Precio de venta *"
                value={nuevo.precioVenta}
                min={0}
                onChange={(e) => setNuevo({ ...nuevo, precioVenta: Number(e.target.value) })}
                required
                style={{ width: "100%" }}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Stock actual *"
                value={nuevo.stockActual}
                min={0}
                onChange={(e) => setNuevo({ ...nuevo, stockActual: Number(e.target.value) })}
                required
                style={{ width: "100%" }}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="ID de categoría *"
                value={nuevo.categoriaId}
                min={1}
                onChange={(e) => setNuevo({ ...nuevo, categoriaId: Number(e.target.value) })}
                required
                style={{ width: "100%" }}
              />
            </td>
            <td style={{ textAlign: 'center' }}>
              <input
                type="checkbox"
                checked={!!nuevo.activo}
                onChange={(e) => setNuevo({ ...nuevo, activo: e.target.checked })}
              />
            </td>
            <td>
              <button onClick={agregarProducto} disabled={loading} style={{ width: "100%" }}>Agregar</button>
            </td>
          </tr>
        </tbody>
      </table>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Código Barra</th>
              <th>Precio Venta</th>
              <th>Stock Actual</th>
              <th>Categoría</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                {editingId === p.id && editingData ? (
                  <>
                    <td>
                      <input
                        value={editingData.nombre ?? ''}
                        onChange={(e) => setEditingData({ ...editingData, nombre: e.target.value })}
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>
                      <input
                        value={editingData.descripcion ?? ''}
                        onChange={(e) => setEditingData({ ...editingData, descripcion: e.target.value })}
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>
                      <input
                        value={editingData.codigoBarra ?? ''}
                        onChange={(e) => setEditingData({ ...editingData, codigoBarra: e.target.value })}
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={String(editingData.precioVenta ?? 0)}
                        onChange={(e) => setEditingData({ ...editingData, precioVenta: Number(e.target.value) })}
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={String(editingData.stockActual ?? 0)}
                        onChange={(e) => setEditingData({ ...editingData, stockActual: Number(e.target.value) })}
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={String(editingData.categoriaId ?? 1)}
                        onChange={(e) => setEditingData({ ...editingData, categoriaId: Number(e.target.value) })}
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={!!editingData.activo}
                        onChange={(e) => setEditingData({ ...editingData, activo: e.target.checked })}
                      />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={saveEdit} disabled={loading}>Guardar</button>
                        <button onClick={cancelEdit} disabled={loading}>Cancelar</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{p.nombre}</td>
                    <td>{p.descripcion}</td>
                    <td>{p.codigoBarra}</td>
                    <td>${p.precioVenta}</td>
                    <td>{p.stockActual}</td>
                    <td>{p.categoria?.nombre || p.categoriaNombre || p.categoriaId}</td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={!!p.activo}
                        disabled
                      />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => startEdit(p)} disabled={loading}>Editar</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
