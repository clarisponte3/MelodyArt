import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthService } from '../../api/auth.service';
import { useAuthStore } from '../../store/authStore';
import { NeonButton } from '../../components/ui/NeonButton';
import { GlassCard } from '../../components/ui/GlassCard';
import { Music, Mail, Lock, Eye, EyeOff, AlertCircle, AlertTriangle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const isSessionExpired = searchParams.get('session') === 'expired';
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!correo.trim() || !contrasena) {
      setErrorMessage('Por favor ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.login({ correo: correo.trim(), contrasena });
      login(response);

      // Redirigir según rol
      if (response.correo.toLowerCase().includes('admin')) {
        navigate('/admin/dashboard');
      } else {
        navigate(redirectPath);
      }
    } catch (err: any) {
      if (err?.message) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Credenciales inválidas. Revisa tu correo y contraseña.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* BANNER DE SESIÓN EXPIRADA */}
        {isSessionExpired && (
          <div className="mb-6 p-4 rounded-xl border border-neon-orange/40 bg-neon-orange/10 flex items-center gap-3 text-neon-orange text-xs">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.</span>
          </div>
        )}

        <GlassCard accent="cyan" className="p-8">
          {/* HEADER DEL FORM */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/40 flex items-center justify-center mx-auto mb-3 shadow-neon-cyan/20">
              <Music className="w-6 h-6 text-neon-cyan animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Iniciar Sesión</h1>
            <p className="text-xs text-gray-400">
              Accede a tu cuenta de SonoraSync / MelodyArt
            </p>
          </div>

          {/* ALERTA DE ERROR */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl border border-red-500/40 bg-red-950/40 flex items-center gap-2.5 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* INPUT CORREO */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="ejemplo@sonorasync.com"
                  required
                  className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* INPUT CONTRASEÑA */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-gray-300">
                  Contraseña
                </label>
                <span className="text-[11px] text-gray-400 hover:text-neon-cyan cursor-pointer transition-colors">
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* BOTÓN SUBMIT */}
            <NeonButton variant="cyan" type="submit" disabled={loading} className="w-full py-3">
              {loading ? 'Verificando credenciales...' : 'Entrar a SonoraSync'}
            </NeonButton>
          </form>

          {/* FOOTER DEL FORM */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
            <span>¿Aún no tienes cuenta? </span>
            <Link to="/registro" className="text-neon-pink font-semibold hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
