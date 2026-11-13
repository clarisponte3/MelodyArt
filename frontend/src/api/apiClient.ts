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
// HELPER: DETECCIÓN DE RUTAS DE VERIFICACIÓN DE SESIÓN / PERFIL SILENCIOSO
// =============================================================================
const isSessionOrProfileCheck = (config?: InternalAxiosRequestConfig): boolean => {
  if (!config?.url) return false;
  const url = config.url.toLowerCase();
  const method = config.method?.toLowerCase() || 'get';

  // Rutas directas de consulta/validación de sesión
  if (
    url.includes('/usuarios/me') ||
    url.includes('/auth/me') ||
    url.includes('/auth/check') ||
    url.includes('/auth/validate') ||
    url.includes('/auth/verify')
  ) {
    return true;
  }

  // GET a perfil de usuario (ej. /api/usuarios/123 al montar la app)
  if (method === 'get' && url.includes('/usuarios/')) {
    return true;
  }

  return false;
};

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
      const isSilentCheck = isSessionOrProfileCheck(error.config);
      const hasToken = !!useAuthStore.getState().token;

      switch (status) {
        case 400:
          // Si hay errores de validación de campos (@Valid), se rechaza para manejo inline en formularios
          if (errorData?.detalles && Object.keys(errorData.detalles).length > 0) {
            return Promise.reject(errorData);
          }
          showToast('error', defaultMessage, 'Solicitud Inválida');
          break;

        case 401:
          // Si es verificación de sesión o el usuario no está autenticado, silenciar sin toast
          if (isSilentCheck || !hasToken) {
            useAuthStore.getState().logout(undefined, true);
            return Promise.resolve({ data: null } as any);
          }

          // Token expirado o credenciales inválidas para usuario con sesión activa
          useAuthStore.getState().logout('Tu sesión ha expirado o las credenciales son inválidas.');
          if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/registro')) {
            window.location.href = `/login?session=expired&redirect=${encodeURIComponent(
              window.location.pathname
            )}`;
          }
          break;

        case 403:
          // Si es verificación silenciosa de sesión o el usuario no tiene sesión iniciada, silenciar sin toast
          if (isSilentCheck || !hasToken) {
            useAuthStore.getState().logout(undefined, true);
            return Promise.resolve({ data: null } as any);
          }

          // Solo mostrar acceso denegado si un usuario autenticado intenta acceder a una ruta sin permisos
          showToast('error', 'No tienes permisos suficientes para realizar esta acción.', 'Acceso Denegado (403)');
          break;

        case 404:
          // Si es una verificación de sesión/perfil, silenciar
          if (isSilentCheck) {
            return Promise.resolve({ data: null } as any);
          }
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
