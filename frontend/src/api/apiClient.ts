import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { BackendErrorResponse } from '../types';
import { useAuthStore } from '../store/authStore';
import { showToast } from '../store/notificationStore';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// =============================================================================
// INTERCEPTOR DE SOLICITUD (REQUEST): INYECCIÓN DE JWT BEARER
// =============================================================================
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// =============================================================================
// INTERCEPTOR DE RESPUESTA (RESPONSE): CAPTURA DE GlobalExceptionHandler
// =============================================================================
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<BackendErrorResponse>) => {
    if (error.response) {
      const status = error.response.status;
      const errorData: BackendErrorResponse = error.response.data;
      const defaultMessage = errorData?.message || 'Ocurrió un error en la solicitud.';

      switch (status) {
        case 400:
          // Si hay errores de validación de campos (@Valid), se rechaza para manejo inline en formularios
          if (errorData?.detalles && Object.keys(errorData.detalles).length > 0) {
            return Promise.reject(errorData);
          }
          showToast('error', defaultMessage, 'Solicitud Inválida');
          break;

        case 401:
          // Token expirado o credenciales inválidas
          useAuthStore.getState().logout('Tu sesión ha expirado o las credenciales son inválidas.');
          if (!window.location.pathname.includes('/login')) {
            window.location.href = `/login?session=expired&redirect=${encodeURIComponent(
              window.location.pathname
            )}`;
          }
          break;

        case 403:
          showToast('error', 'No tienes permisos suficientes para realizar esta acción.', 'Acceso Denegado (403)');
          break;

        case 404:
          showToast('warning', defaultMessage || 'El recurso solicitado no fue encontrado.', 'No Encontrado (404)');
          break;

        case 409:
          showToast('error', defaultMessage || 'Conflicto: El registro ya existe o viola una regla de unicidad.', 'Conflicto de Datos (409)');
          break;

        case 500:
        default:
          showToast(
            'error',
            'El servidor de SonoraSync experimentó un error temporal. Intenta nuevamente.',
            'Error del Servidor (500)'
          );
          break;
      }

      return Promise.reject(errorData || error);
    } else if (error.request) {
      showToast(
        'error',
        'No fue posible comunicarse con la API de SonoraSync (Render / Local). Revisa tu conexión a internet.',
        'Fallo de Red'
      );
    }

    return Promise.reject(error);
  }
);

export default apiClient;
