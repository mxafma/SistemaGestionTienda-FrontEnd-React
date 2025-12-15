import apiClient from '../api/apiClient';

const AUTH_URL = 'https://meticulous-youth-production.up.railway.app/api/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UsuarioResponse {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  rol?: string;
  activo?: boolean;
  creadoEn?: string;
}

export interface AuthResponse {
  message: string;
  accessToken?: string;
  usuario?: UsuarioResponse;
}

export interface RegisterRequest {
  nombre: string;
  apellido?: string;
  email: string;
  password: string;
  rol?: string;
}

export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  const res = await apiClient.post<AuthResponse>(`${AUTH_URL}/login`, payload);
  return res.data;
};

export const register = async (usuario: RegisterRequest): Promise<UsuarioResponse> => {
  const res = await apiClient.post<UsuarioResponse>(`${AUTH_URL}/register`, usuario);
  return res.data;
};
