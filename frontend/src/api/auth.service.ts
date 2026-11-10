import apiClient from './apiClient';
import { AuthResponseDTO, LoginRequestDTO, UsuarioRequestDTO, UsuarioResponseDTO } from '../types';

export const AuthService = {
  login: async (credentials: LoginRequestDTO): Promise<AuthResponseDTO> => {
    const { data } = await apiClient.post<AuthResponseDTO>('/api/auth/login', credentials);
    return data;
  },

  register: async (userData: UsuarioRequestDTO): Promise<UsuarioResponseDTO> => {
    const { data } = await apiClient.post<UsuarioResponseDTO>('/api/usuarios', userData);
    return data;
  },

  getProfile: async (idUsuario: number): Promise<UsuarioResponseDTO> => {
    const { data } = await apiClient.get<UsuarioResponseDTO>(`/api/usuarios/${idUsuario}`);
    return data;
  },

  updateProfile: async (idUsuario: number, userData: UsuarioRequestDTO): Promise<UsuarioResponseDTO> => {
    const { data } = await apiClient.put<UsuarioResponseDTO>(`/api/usuarios/${idUsuario}`, userData);
    return data;
  },
};
