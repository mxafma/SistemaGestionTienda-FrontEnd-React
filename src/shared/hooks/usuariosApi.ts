import axios from "axios";

const API_URL = "https://meticulous-youth-production.up.railway.app/api/usuarios";

export interface UsuarioPayload {
  nombre: string;
  apellido?: string;
  email: string;
  password?: string;
  passwordHash?: string;
  rol?: string;
  activo?: boolean;
}

export interface UsuarioDTO extends UsuarioPayload {
  id: number;
  activo?: boolean;
  creadoEn?: string;
}

export const getUsuarios = async (): Promise<UsuarioDTO[]> => {
  const res = await axios.get<UsuarioDTO[]>(API_URL);
  return res.data;
};

export const getUsuarioById = async (id: number | string): Promise<UsuarioDTO> => {
  const res = await axios.get<UsuarioDTO>(`${API_URL}/${id}`);
  return res.data;
};

export const createUsuario = async (usuario: UsuarioPayload): Promise<UsuarioDTO> => {
  const res = await axios.post<UsuarioDTO>(API_URL, usuario, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateUsuario = async (id: number | string, usuario: UsuarioPayload): Promise<UsuarioDTO> => {
  const res = await axios.put<UsuarioDTO>(`${API_URL}/${id}`, usuario);
  return res.data;
};

export const deleteUsuario = async (id: number | string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
