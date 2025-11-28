import React from "react";

const boletasEjemplo = [
  { id: 1, fecha: "2025-11-01", usuario: "Juan Perez", total: 150 },
  { id: 2, fecha: "2025-11-02", usuario: "Ana Lopez", total: 200 },
];

export default function BoletasPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Boletas</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {boletasEjemplo.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.fecha}</td>
              <td>{b.usuario}</td>
              <td>${b.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
