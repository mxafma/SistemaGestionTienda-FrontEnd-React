import apiClient from "../api/apiClient";

const API_URL = "https://meticulous-youth-production.up.railway.app/api/usuarios";

export interface UsuarioPayload {
  nombre: string;
  apellido?: string;
  email: string;
  password?: string;
  rol?: string;
  activo?: boolean;
}

export interface UsuarioDTO {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  rol?: string;
  activo?: boolean;
  creadoEn?: string;
}

export const getUsuarios = async (): Promise<UsuarioDTO[]> => {
  const res = await apiClient.get<UsuarioDTO[]>(API_URL);
  return res.data;
};

export const getUsuarioById = async (id: number | string): Promise<UsuarioDTO> => {
  const res = await apiClient.get<UsuarioDTO>(`${API_URL}/${id}`);
  return res.data;
};

export const createUsuario = async (usuario: UsuarioPayload): Promise<UsuarioDTO> => {
  const res = await apiClient.post<UsuarioDTO>(API_URL, usuario);
  return res.data;
};

export const updateUsuario = async (id: number | string, usuario: UsuarioPayload): Promise<UsuarioDTO> => {
  const res = await apiClient.put<UsuarioDTO>(`${API_URL}/${id}`, usuario);
  return res.data;
};

export const deleteUsuario = async (id: number | string): Promise<void> => {
  await apiClient.delete(`${API_URL}/${id}`);
};
