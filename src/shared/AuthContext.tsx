import React, { createContext, useContext, useEffect, useState } from 'react';

type Usuario = {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  rol?: string;
  activo?: boolean;
};

type AuthContextValue = {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  loginLocal: (u: Usuario) => void;
  logout: () => void;
  hasRole: (role: string) => boolean;
  isActive: () => boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'usuario';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Usuario) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (usuario) localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    else localStorage.removeItem(STORAGE_KEY);
  }, [usuario]);

  const loginLocal = (u: Usuario) => setUsuario(u);
  const logout = () => setUsuario(null);

  const hasRole = (role: string) => !!usuario && !!usuario.rol && usuario.rol === role;
  const isActive = () => !!usuario && usuario.activo === true;

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated: !!usuario, loginLocal, logout, hasRole, isActive }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
