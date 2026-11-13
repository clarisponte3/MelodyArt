import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { AuthService } from '../../api/auth.service';
import { showToast } from '../../store/notificationStore';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import { BookOpen, Eye, EyeOff, AlertTriangle, GraduationCap } from 'lucide-react';

export const LoginDocentePage: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { login, role } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!correo.trim() || !contrasena.trim()) {
      setErrorMsg('Por favor ingresa tu correo institucional y contraseña.');
      return;
    }

    setIsLoading(true);
    try {
      const authResponse = await AuthService.login({ correo: correo.trim(), contrasena });
      login(authResponse);

      // Verificar que el rol obtenido del token sea de Docente/Admin
      // Leer el rol recién seteado del store
      const freshRole = useAuthStore.getState().role;
      const isDocente =
        freshRole === 'ROLE_DOCENTE' ||
        freshRole === 'ROLE_MAESTRO' ||
        freshRole === 'ROLE_ADMIN' ||
        freshRole === 'ROLE_ADMINISTRADOR';

      if (!isDocente) {
        // Usuario válido pero sin rol de docente → forzar logout y denegar
        useAuthStore.getState().logout(undefined, true);
        setErrorMsg(
          'Este acceso es exclusivo para personal académico (Docentes). Tu cuenta no tiene los permisos necesarios. Usa el portal de alumnos en su lugar.'
        );
        return;
      }

      showToast('success', `Bienvenido al Portal Docente, ${authResponse.nombre}.`, 'Acceso Concedido');
      navigate('/docente/pase-lista');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Credenciales incorrectas. Verifica tu correo y contraseña.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* ENCABEZADO PORTAL DOCENTE */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-yellow/10 border-2 border-neon-yellow/40 mb-4 shadow-neon-yellow">
            <GraduationCap className="w-8 h-8 text-neon-yellow" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-1">
            Portal <span className="neon-text-yellow">Docente</span>
          </h1>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Acceso exclusivo para personal académico de SonoraSync. Utiliza tus credenciales institucionales.
          </p>
        </div>

        <GlassCard accent="gold" className="p-8">
          {/* BANNER DE ERROR */}
          {errorMsg && (
            <div className="flex items-start gap-3 p-3 mb-5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* CORREO INSTITUCIONAL */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Correo Institucional
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="docente@sonorasync.edu.mx"
                className="w-full bg-dark-900 border border-white/15 focus:border-neon-yellow rounded-xl py-3 px-4 text-sm text-white outline-none transition-colors placeholder:text-gray-600"
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            {/* CONTRASEÑA */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-dark-900 border border-white/15 focus:border-neon-yellow rounded-xl py-3 px-4 pr-11 text-sm text-white outline-none transition-colors"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-neon-yellow transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* BOTÓN DE ACCESO */}
            <NeonButton
              variant="gold"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 justify-center"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-neon-yellow/40 border-t-neon-yellow rounded-full animate-spin" />
                  Verificando acceso...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Acceder al Portal Docente
                </span>
              )}
            </NeonButton>
          </form>
        </GlassCard>

        {/* SEPARADOR */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-500">
            ¿Eres alumno o cliente?{' '}
            <Link to="/login" className="text-neon-cyan hover:underline font-medium">
              Iniciar sesión en portal de alumnos
            </Link>
          </p>
          <p className="text-[10px] text-gray-600">
            Acceso restringido · Solo personal autorizado por SonoraSync Academia
          </p>
        </div>
      </div>
    </div>
  );
};
