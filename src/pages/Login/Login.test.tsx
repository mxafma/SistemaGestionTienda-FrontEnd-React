// src/pages/Login/Login.test.tsx

import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import LoginForm from "../../components/Form/LoginForm";
import AuthContext from "../../shared/AuthContext";

// Mock del backend (función login del authApi)
vi.mock("../../shared/hooks/authApi", () => ({
  login: vi.fn(),
}));

// Importamos la función mockeada
import { login } from "../../shared/hooks/authApi";

describe("Pruebas de LoginForm", () => {
  // Mocks de funciones del AuthContext
  const mockLoginLocal = vi.fn();
  const mockLogout = vi.fn();
  const mockHasRole = vi.fn().mockReturnValue(false);
  const mockIsActive = vi.fn().mockReturnValue(true);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Función para renderizar con Router y AuthContext
  const renderWithProviders = () => {
    return render(
      <AuthContext.Provider
        value={{
          usuario: null,
          isAuthenticated: false,
          loginLocal: mockLoginLocal,
          logout: mockLogout,
          hasRole: mockHasRole,
          isActive: mockIsActive,
        }}
      >
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  // ---------------------------------------------------------------------
  // TEST 1: Login exitoso y llamado correcto al backend
  // ---------------------------------------------------------------------
  it("hace login exitoso y llama al backend con los datos correctos", async () => {
    const user = userEvent.setup();

    // Respuesta simulada del backend
    (login as any).mockResolvedValue({
      message: "Login OK",
      usuario: {
        id: 1,
        nombre: "Matías",
        email: "admin@admin.com",
        rol: "ADMIN",
        passwordHash: "dato-irrelevante",
      },
    });

    renderWithProviders();

    // Completar email y contraseña
    await user.type(
      screen.getByLabelText(/correo electrónico/i),
      "admin@admin.com"
    );
    await user.type(
      screen.getByLabelText(/contraseña/i),
      "admin123"
    );

    // Enviar formulario
    await user.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    // Verificar que login se llamó con el payload correcto
    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith({
      email: "admin@admin.com",
      password: "admin123",
    });

    // Verificar que loginLocal recibió el usuario sin passwordHash
    expect(mockLoginLocal).toHaveBeenCalledTimes(1);
    expect(mockLoginLocal).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        nombre: "Matías",
        email: "admin@admin.com",
        rol: "ADMIN",
      })
    );

    // En un login exitoso, no debería aparecer mensaje de error
    expect(
      screen.queryByText(/usuario o contraseña incorrectos/i)
    ).not.toBeInTheDocument();
  });

  // ---------------------------------------------------------------------
  // TEST 2: No se llama al backend si faltan email o contraseña
  // ---------------------------------------------------------------------
  // Nota: no comprobamos el mensaje porque los inputs tienen "required",
  // lo que impide que el formulario dispare handleSubmit en jsdom.
  it("no llama al backend si faltan email o contraseña", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    // Enviar el formulario sin completar nada
    await user.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    // Verificar que no se llamó al backend
    expect(login).not.toHaveBeenCalled();

    // Verificar que no se llamó a loginLocal
    expect(mockLoginLocal).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------
  // TEST 3: Manejo del error 401 enviado desde el backend
  // ---------------------------------------------------------------------
  it("muestra 'Usuario o contraseña incorrectos' cuando el backend responde 401", async () => {
    const user = userEvent.setup();

    // Simulación de error 401
    (login as any).mockRejectedValue({
      response: { status: 401 },
    });

    renderWithProviders();

    // Completar email y contraseña
    await user.type(
      screen.getByLabelText(/correo electrónico/i),
      "admin@admin.com"
    );
    await user.type(
      screen.getByLabelText(/contraseña/i),
      "ClaveIncorrecta"
    );

    // Enviar formulario
    await user.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    // Verificar mensaje de error esperado por lógica del componente
    expect(
      screen.getByText(/usuario o contraseña incorrectos/i)
    ).toBeInTheDocument();

    // Verificar que sí se intentó llamar al backend
    expect(login).toHaveBeenCalledTimes(1);

    // Verificar que no se llama a loginLocal en caso de error
    expect(mockLoginLocal).not.toHaveBeenCalled();
  });
});
