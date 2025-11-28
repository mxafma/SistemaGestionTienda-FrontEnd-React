import axios from 'axios';

const AUTH_URL = 'https://meticulous-youth-production.up.railway.app/api/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse<T = any> {
  message: string;
  usuario: T | null;
}

export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${AUTH_URL}/login`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
};

export const register = async (usuario: any): Promise<any> => {
  const res = await axios.post<any>(`${AUTH_URL}/register`, usuario, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
};
