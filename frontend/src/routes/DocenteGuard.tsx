import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface DocenteGuardProps {
  children: React.ReactNode;
}

/**
 * Protege las rutas del Portal Docente.
 * - Si no está autenticado → redirige a /login-docente
 * - Si está autenticado pero NO tiene rol DOCENTE/MAESTRO/ADMIN → muestra acceso denegado
 */
export const DocenteGuard: React.FC<DocenteGuardProps> = ({ children }) => {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login-docente" state={{ from: location }} replace />;
  }

  const isDocente =
    role === 'ROLE_DOCENTE' ||
    role === 'ROLE_MAESTRO' ||
    role === 'ROLE_ADMIN' ||
    role === 'ROLE_ADMINISTRADOR';

  if (!isDocente) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center text-red-400 text-3xl">
          🔒
        </div>
        <h2 className="text-2xl font-bold text-white">Acceso Denegado</h2>
        <p className="text-sm text-gray-400 text-center max-w-sm">
          Esta sección es exclusiva del <strong className="text-neon-yellow">Portal Docente</strong>.
          Tu cuenta no cuenta con los permisos necesarios para acceder a este módulo.
        </p>
        <a
          href="/dashboard"
          className="px-5 py-2 rounded-xl border border-neon-cyan/40 text-neon-cyan text-sm hover:bg-neon-cyan/10 transition-colors"
        >
          Volver a mi Dashboard
        </a>
      </div>
    );
  }

  return <>{children}</>;
};
