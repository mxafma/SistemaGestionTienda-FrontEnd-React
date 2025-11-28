import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUsuarios, createUsuario, deleteUsuario } from "../../shared/hooks/usuariosApi";
import type { UsuarioDTO, UsuarioPayload } from "../../shared/hooks/usuariosApi";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
  const [nuevo, setNuevo] = useState<UsuarioPayload>({ nombre: "", apellido: "", email: "", password: "", rol: "USER", activo: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (err: unknown) {
        let msg = "Error al cargar usuarios";
        if (axios.isAxiosError(err) && err.response?.data) {
          const d: any = err.response.data;
          if (typeof d === "string") msg += ": " + d;
          else if (d.message) msg += ": " + d.message;
        } else if (err instanceof Error) msg += ": " + err.message;
        setError(msg);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const agregarUsuario = async () => {
    if (!nuevo.nombre || !nuevo.email) return;
    setLoading(true);
    try {
      // Build payload matching backend expectation (server currently expects passwordHash)
      const payload: any = { ...nuevo };
      // prefer sending passwordHash if backend expects it
      if (nuevo.password) {
        payload.passwordHash = nuevo.password;
        delete payload.password;
      }
      payload.rol = (nuevo.rol || "USER").toUpperCase();
      payload.activo = true;
      console.log("Crear usuario - payload:", payload);
      const creado = await createUsuario(payload);
      console.log("Crear usuario - respuesta:", creado);
      setUsuarios((prev) => [...prev, creado]);
      setNuevo({ nombre: "", apellido: "", email: "", password: "", rol: "USER" });
      setError("");
    } catch (err: unknown) {
      let msg = "Error al crear usuario";
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const data = err.response?.data;
        console.error("Error crear usuario - axios error", { status, data, err });
        msg += status ? ` (status ${status})` : "";
        if (data) {
          if (typeof data === "string") msg += ": " + data;
          else if (data.message) msg += ": " + data.message;
          else msg += ": " + JSON.stringify(data);
        }
      } else if (err instanceof Error) {
        console.error("Error crear usuario", err);
        msg += ": " + err.message;
      } else {
        console.error("Error crear usuario - unknown", err);
      }
      setError(msg);
    }
    setLoading(false);
  };

  const eliminar = async (id: number) => {
    setLoading(true);
    try {
      await deleteUsuario(id);
      // Eliminar es un soft-delete en backend; mejor refrescar la lista desde la API
      try {
        const refreshed = await getUsuarios();
        setUsuarios(refreshed);
      } catch (fetchErr) {
        // Si falla el refresco, al menos quitar del listado en UI
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
      }
      setError("");
    } catch (err: unknown) {
      let msg = "Error al eliminar usuario";
      if (axios.isAxiosError(err) && err.response?.data) {
        const d: any = err.response.data;
        if (typeof d === "string") msg += ": " + d;
        else if (d.message) msg += ": " + d.message;
      } else if (err instanceof Error) msg += ": " + err.message;
      setError(msg);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Gestión de Usuarios</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input placeholder="Nombre" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
        <input placeholder="Apellido" value={nuevo.apellido} onChange={(e) => setNuevo({ ...nuevo, apellido: e.target.value })} />
        <input placeholder="Email" value={nuevo.email} onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })} />
        <input placeholder="Password" type="password" value={nuevo.password} onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })} />
        <select value={nuevo.rol} onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value })}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={!!nuevo.activo} onChange={(e) => setNuevo({ ...nuevo, activo: e.target.checked })} />
          Activo
        </label>
        <button onClick={agregarUsuario} disabled={loading}>Agregar</button>
      </div>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>{String(u.activo)}</td>
                <td>
                  <button onClick={() => eliminar(u.id)} disabled={loading}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
