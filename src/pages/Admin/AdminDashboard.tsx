import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import useProductos from "../../shared/hooks/useProductos";
import useUsuarios from "../../shared/hooks/useUsuarios";

// initial static values will be replaced by real data where available
const initialCards = [
  {
    title: "Productos",
    value: 0,
    description: "Inventario actual",
    color: "#219653",
    route: "/admin/productos",
  },
  {
    title: "Usuarios",
    value: 0,
    description: "Nuevos usuarios este mes",
    color: "#F2C94C",
    route: "/admin/usuarios",
  },
  {
    title: "Boletas",
    value: 0,
    description: "Probabilidad de aumento",
    color: "#2F80ED",
    route: "/admin/boletas",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { productCount, loading: loadingProducts, error: errorProducts } = useProductos();
  const { userCount, loading: loadingUsers, error: errorUsers } = useUsuarios();

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Dashboard Administrador</h2>
      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
        {initialCards.map((card) => {
          const value =
            card.title === "Productos"
              ? productCount ?? card.value
              : card.title === "Usuarios"
              ? userCount ?? card.value
              : card.value;
          return (
            <div
              key={card.title}
              style={{
                background: card.color,
                color: "#fff",
                borderRadius: "12px",
                padding: "1.5rem",
                flex: 1,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              onClick={() => navigate(card.route)}
            >
              <h3>{card.title}</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {card.title === "Productos" ? (loadingProducts ? "..." : value) : card.title === "Usuarios" ? (loadingUsers ? "..." : value) : value}
              </p>
              <span>
                {card.description}
                {card.title === "Productos" && productCount !== null ? `: ${productCount}` : ""}
                {card.title === "Usuarios" && userCount !== null ? `: ${userCount}` : ""}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        <div style={{ background: "#fff", borderRadius: "8px", padding: "1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <h4>Productos</h4>
          <p>Administra inventario y detalles de productos.</p>
        </div>
        <div style={{ background: "#fff", borderRadius: "8px", padding: "1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <h4>Usuarios</h4>
          <p>Gestión de cuentas y roles de usuario.</p>
        </div>
        <div style={{ background: "#fff", borderRadius: "8px", padding: "1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <h4>Boletas</h4>
          <p>Visualiza boletas generadas por el sistema.</p>
        </div>
      </div>
    </div>
  );
}
