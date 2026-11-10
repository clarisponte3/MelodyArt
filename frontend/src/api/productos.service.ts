import apiClient from './apiClient';
import {
  CategoriaResponseDTO,
  MarcaResponseDTO,
  PaginationParams,
  ProductoResponseDTO,
  SpringPage,
} from '../types';

export const ProductosService = {
  getProductos: async (params?: PaginationParams): Promise<ProductoResponseDTO[] | SpringPage<ProductoResponseDTO>> => {
    const { data } = await apiClient.get<ProductoResponseDTO[] | SpringPage<ProductoResponseDTO>>('/api/productos', {
      params,
    });
    return data;
  },

  getProductoById: async (id: number): Promise<ProductoResponseDTO> => {
    const { data } = await apiClient.get<ProductoResponseDTO>(`/api/productos/${id}`);
    return data;
  },

  getCategorias: async (): Promise<CategoriaResponseDTO[]> => {
    const { data } = await apiClient.get<CategoriaResponseDTO[]>('/api/categorias');
    return data;
  },

  getMarcas: async (): Promise<MarcaResponseDTO[]> => {
    const { data } = await apiClient.get<MarcaResponseDTO[]>('/api/marcas');
    return data;
  },
};
