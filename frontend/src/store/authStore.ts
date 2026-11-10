import { create } from 'zustand';
import { AuthResponseDTO, UserRole, UserSession } from '../types';
import { showToast } from './notificationStore';

interface AuthState {
  token: string | null;
  user: UserSession | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (authResponse: AuthResponseDTO) => void;
  logout: (reason?: string) => void;
  checkSession: () => boolean;
}

const STORAGE_KEY = 'sonorasync_auth_session';

// Intento de rehidratar desde sessionStorage
const loadInitialSession = (): UserSession | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session: UserSession = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return session;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const initialSession = loadInitialSession();

export const useAuthStore = create<AuthState>((set, get) => ({
  token: initialSession?.token || null,
  user: initialSession,
  role: initialSession?.role || null,
  isAuthenticated: !!initialSession,

  login: (authResponse: AuthResponseDTO) => {
    // Decodificar rol desde el token o asignar por defecto (ROLE_USER o ROLE_ADMIN si es admin@)
    let detectedRole: UserRole = 'ROLE_USER';
    if (authResponse.correo.toLowerCase().includes('admin')) {
      detectedRole = 'ROLE_ADMIN';
    }

    try {
      const parts = authResponse.token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        if (payload.roles && Array.isArray(payload.roles) && payload.roles.length > 0) {
          detectedRole = payload.roles[0];
        } else if (payload.role) {
          detectedRole = payload.role;
        }
      }
    } catch {
      // Ignorar fallo de decodificación y conservar el rol inferido
    }

    const session: UserSession = {
      userId: authResponse.user_id,
      correo: authResponse.correo,
      nombre: authResponse.nombre,
      role: detectedRole,
      token: authResponse.token,
      tokenType: authResponse.token_type || 'Bearer',
      expiresIn: authResponse.expires_in,
      expiresAt: Date.now() + (authResponse.expires_in || 86400000),
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));

    set({
      token: session.token,
      user: session,
      role: session.role,
      isAuthenticated: true,
    });

    showToast('success', `¡Bienvenido de nuevo, ${session.nombre}!`, 'Sesión Iniciada');
  },

  logout: (reason?: string) => {
    sessionStorage.removeItem(STORAGE_KEY);
    set({
      token: null,
      user: null,
      role: null,
      isAuthenticated: false,
    });

    if (reason) {
      showToast('warning', reason, 'Sesión Finalizada');
    } else {
      showToast('info', 'Has cerrado sesión exitosamente.', 'Hasta pronto');
    }
  },

  checkSession: () => {
    const { user } = get();
    if (!user) return false;
    if (Date.now() > user.expiresAt) {
      get().logout('Tu sesión ha expirado por inactividad.');
      return false;
    }
    return true;
  },
}));
