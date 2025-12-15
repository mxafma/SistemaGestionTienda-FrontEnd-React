import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  getToken, 
  setToken, 
  removeToken,
  getStoredUser,
  setStoredUser,
  removeStoredUser,
  setOnUnauthorized,
  clearAuthData 
} from './api/apiClient';

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
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: Usuario) => void;
  logout: () => void;
  hasRole: (role: string) => boolean;
  isActive: () => boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => getStoredUser());
  const [accessToken, setAccessToken] = useState<string | null>(() => getToken());

  const logout = useCallback(() => {
    setUsuario(null);
    setAccessToken(null);
    clearAuthData();
  }, []);

  // Register logout callback for 401 responses
  useEffect(() => {
    setOnUnauthorized(() => {
      logout();
      window.location.href = '/login';
    });
  }, [logout]);

  // Sync state changes to localStorage
  useEffect(() => {
    if (usuario) {
      setStoredUser(usuario);
    } else {
      removeStoredUser();
    }
  }, [usuario]);

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    } else {
      removeToken();
    }
  }, [accessToken]);

  const login = (token: string, user: Usuario) => {
    setAccessToken(token);
    setUsuario(user);
  };

  const hasRole = (role: string) => !!usuario && !!usuario.rol && usuario.rol === role;
  const isActive = () => !!usuario && usuario.activo === true;

  const isAuthenticated = !!accessToken && !!usuario;

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      accessToken,
      isAuthenticated, 
      login, 
      logout, 
      hasRole, 
      isActive 
    }}>
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
