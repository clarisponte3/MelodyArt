import apiClient from './apiClient';
import {
  DetalleVentaRequestDTO,
  DetalleVentaResponseDTO,
  MetodoPagoResponseDTO,
  PaginationParams,
  SpringPage,
  VentaRequestDTO,
  VentaResponseDTO,
} from '../types';

export const VentasService = {
  getMetodosPago: async (): Promise<MetodoPagoResponseDTO[]> => {
    const { data } = await apiClient.get<MetodoPagoResponseDTO[]>('/api/metodos-pago');
    return data;
  },

  createVenta: async (venta: VentaRequestDTO): Promise<VentaResponseDTO> => {
    const { data } = await apiClient.post<VentaResponseDTO>('/api/ventas', venta);
    return data;
  },

  createDetalleVenta: async (detalle: DetalleVentaRequestDTO): Promise<DetalleVentaResponseDTO> => {
    const { data } = await apiClient.post<DetalleVentaResponseDTO>('/api/detalles-venta', detalle);
    return data;
  },

  getVentaById: async (id: number): Promise<VentaResponseDTO> => {
    const { data } = await apiClient.get<VentaResponseDTO>(`/api/ventas/${id}`);
    return data;
  },

  getVentas: async (params?: PaginationParams): Promise<VentaResponseDTO[] | SpringPage<VentaResponseDTO>> => {
    const { data } = await apiClient.get<VentaResponseDTO[] | SpringPage<VentaResponseDTO>>('/api/ventas', {
      params,
    });
    return data;
  },

  getDetallesByVenta: async (): Promise<DetalleVentaResponseDTO[]> => {
    const { data } = await apiClient.get<DetalleVentaResponseDTO[]>('/api/detalles-venta');
    return data;
  },
};
