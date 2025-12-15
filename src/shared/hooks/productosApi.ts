import apiClient from "../api/apiClient";

const API_URL = "https://fortunate-forgiveness-production.up.railway.app/api/productos";

export interface ProductoPayload {
  nombre: string;
  descripcion?: string;
  codigoBarra?: string;
  precioVenta: number;
  stockActual: number;
  activo?: boolean;
  categoriaId: number;
}

export interface ProductoDTO extends ProductoPayload {
  id: number;
  categoriaNombre?: string;
}

export const getProductos = async (): Promise<ProductoDTO[]> => {
  const res = await apiClient.get<ProductoDTO[]>(API_URL);
  return res.data;
};

export const getProductoById = async (id: number | string): Promise<ProductoDTO> => {
  const res = await apiClient.get<ProductoDTO>(`${API_URL}/${id}`);
  return res.data;
};

export const createProducto = async (producto: ProductoPayload): Promise<ProductoDTO> => {
  const res = await apiClient.post<ProductoDTO>(API_URL, producto);
  return res.data;
};

export const updateProducto = async (id: number | string, producto: ProductoPayload): Promise<ProductoDTO> => {
  // Try PATCH first (partial update). If server only supports full replace via PUT, fallback to PUT.
  try {
    const resPatch = await apiClient.patch<ProductoDTO>(`${API_URL}/${id}`, producto);
    return resPatch.data;
  } catch (err: unknown) {
    if ((err as any)?.response?.status === 404) {
      const res = await apiClient.put<ProductoDTO>(`${API_URL}/${id}`, producto);
      return res.data;
    }
    // If PATCH failed for another reason, rethrow to be handled by caller
    throw err;
  }
};

export const deleteProducto = async (id: number | string): Promise<void> => {
  await apiClient.delete(`${API_URL}/${id}`);
};

// Full replace using PUT (server expects full Producto object)
export const putProducto = async (id: number | string, producto: any): Promise<ProductoDTO> => {
  const res = await apiClient.put<ProductoDTO>(`${API_URL}/${id}`, producto);
  return res.data;
};

// Stock-specific endpoints (controller exposes PATCH endpoints)
export const aumentarStock = async (id: number | string, cantidad: number): Promise<ProductoDTO> => {
  const res = await apiClient.patch<ProductoDTO>(`${API_URL}/${id}/aumentar-stock?cantidad=${cantidad}`);
  return res.data;
};

export const setStock = async (id: number | string, nuevoStock: number): Promise<ProductoDTO> => {
  const res = await apiClient.patch<ProductoDTO>(`${API_URL}/${id}/stock?nuevoStock=${nuevoStock}`);
  return res.data;
};
